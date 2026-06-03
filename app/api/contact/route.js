import { NextResponse } from 'next/server';

/* ── Rate limiter (in-process, resets per cold start) ──────────────── */
const _hits = new Map();
function rateOk(ip) {
  const slot = Math.floor(Date.now() / 3_600_000);
  const key  = `${ip}:${slot}`;
  const n    = (_hits.get(key) || 0) + 1;
  _hits.set(key, n);
  if (_hits.size > 5000) {
    for (const k of _hits.keys()) {
      if (!k.endsWith(`:${slot}`) && !k.endsWith(`:${slot - 1}`)) _hits.delete(k);
    }
  }
  return n <= 5; // 5 submissions per IP per hour
}

/* ── Validation ─────────────────────────────────────────────────────── */
function validate(body) {
  const e = {};
  const name    = String(body?.name    ?? '').trim();
  const email   = String(body?.email   ?? '').trim();
  const message = String(body?.message ?? '').trim();
  if (name.length < 2)                               e.name    = 'Name is required';
  if (name.length > 100)                             e.name    = 'Name too long';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))    e.email   = 'Valid email required';
  if (message.length < 10)                           e.message = 'Message too short (min 10 chars)';
  if (message.length > 5000)                         e.message = 'Message too long';
  return e;
}

/* ── Gmail transporter (created once per cold start) ────────────────── */
let _transporter = null;
async function getTransporter() {
  if (_transporter) return _transporter;
  const nodemailer = await import('nodemailer');
  _transporter = nodemailer.default.createTransport({
    host:   'smtp.gmail.com',
    port:   465,
    secure: true, // SSL
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  return _transporter;
}

/* ── POST ───────────────────────────────────────────────────────────── */
export async function POST(req) {
  try {
    /* Rate limit */
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (!rateOk(ip)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    /* Parse */
    let body;
    try { body = await req.json(); }
    catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

    /* Honeypot */
    if (body?.website && String(body.website).length > 0) {
      return NextResponse.json({ success: true });
    }

    /* Validate */
    const errs = validate(body);
    if (Object.keys(errs).length) {
      return NextResponse.json({ error: 'Validation failed', details: errs }, { status: 422 });
    }

    const name     = String(body.name).trim();
    const email    = String(body.email).trim();
    const phone    = String(body.phone    ?? '').trim();
    const business = String(body.business ?? '').trim();
    const industry = String(body.industry ?? '').trim();
    const message  = String(body.message).trim();
    const ts       = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });

    /* ── Check Gmail env vars ─────────────────────────────────── */
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.warn('[contact] GMAIL_USER or GMAIL_APP_PASSWORD not set — emails skipped.');
      return NextResponse.json({ success: true, emailSent: false });
    }

    const transporter  = await getTransporter();
    const adminEmail   = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;

    /* ── Admin notification email → your Gmail ────────────────── */
    await transporter.sendMail({
      from:     `"Crearelabs" <${process.env.GMAIL_USER}>`,
      to:       adminEmail,
      replyTo:  email,   // ← hitting Reply in Gmail goes straight to the lead
      subject:  `🔔 New enquiry: ${name}${business ? ` — ${business}` : ''}`,
      text: `
New lead from crearelabs.in
────────────────────────────
Name:     ${name}
Email:    ${email}
Phone:    ${phone || '—'}
Business: ${business || '—'}
Industry: ${industry || '—'}
Time:     ${ts} IST
IP:       ${ip}

Message:
${message}
────────────────────────────
Reply to this email to respond to the lead.
`.trim(),
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f4f4f8;font-family:system-ui,sans-serif">
<div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#FF6B35,#FF3D00);padding:28px 32px">
    <div style="font-size:12px;color:rgba(255,255,255,.8);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Crearelabs · crearelabs.in</div>
    <div style="font-size:22px;font-weight:700;color:#ffffff">🔔 New Enquiry</div>
  </div>

  <!-- Lead details -->
  <div style="padding:28px 32px 0">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${[
        ['Name',     name],
        ['Email',    `<a href="mailto:${email}" style="color:#FF6B35;text-decoration:none;font-weight:600">${email}</a>`],
        ['Phone',    phone    || '<span style="color:#aaa">—</span>'],
        ['Business', business || '<span style="color:#aaa">—</span>'],
        ['Industry', industry || '<span style="color:#aaa">—</span>'],
        ['Time',     `${ts} IST`],
      ].map(([l, v]) => `
        <tr>
          <td style="padding:11px 0;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#999;width:90px;vertical-align:top;border-bottom:1px solid #f0f0f0">${l}</td>
          <td style="padding:11px 0 11px 16px;color:#111;border-bottom:1px solid #f0f0f0">${v}</td>
        </tr>`).join('')}
    </table>
  </div>

  <!-- Message -->
  <div style="padding:20px 32px">
    <div style="font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#999;margin-bottom:10px">Message</div>
    <div style="background:#FFF8F5;border-left:4px solid #FF6B35;padding:16px 20px;border-radius:0 8px 8px 0;font-size:15px;line-height:1.75;color:#333;white-space:pre-wrap">${
      message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    }</div>
  </div>

  <!-- Reply CTA -->
  <div style="padding:4px 32px 32px">
    <a href="mailto:${email}?subject=Re: Your enquiry to Crearelabs&body=Hi ${encodeURIComponent(name.split(' ')[0])},%0A%0AThanks for reaching out to Crearelabs.%0A%0A"
       style="display:inline-block;background:#FF6B35;color:#ffffff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">
      Reply to ${name.split(' ')[0]} →
    </a>
    <p style="font-size:12px;color:#bbb;margin-top:14px">
      Sent from the contact form on crearelabs.in &nbsp;·&nbsp; ${ts} IST
    </p>
  </div>
</div>
</body>
</html>`,
    });

    /* ── Auto-reply to visitor ────────────────────────────────── */
    await transporter.sendMail({
      from:    `"Crearelabs" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: `Thanks for reaching out, ${name.split(' ')[0]}! 👋`,
      text: `
Hi ${name.split(' ')[0]},

Thanks for contacting Crearelabs! We've received your message and will get back to you within 1 business day.

For a faster response, WhatsApp us:
https://wa.me/918448807923

Your message:
"${message.slice(0, 300)}${message.length > 300 ? '…' : ''}"

— The Crearelabs Team
Noida, Uttar Pradesh · ahirwarsanjay0901@gmail.com · +91 8448807923
https://crearelabs.in
`.trim(),
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f4f4f8;font-family:system-ui,sans-serif">
<div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">

  <div style="background:linear-gradient(135deg,#FF6B35,#FF3D00);padding:28px 32px">
    <div style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#ffffff">Crearelabs</div>
    <div style="font-size:13px;color:rgba(255,255,255,.8);margin-top:4px">Tech + Marketing for restaurants, brands & retailers</div>
  </div>

  <div style="padding:32px">
    <h2 style="font-family:Georgia,serif;font-size:22px;color:#111;margin:0 0 16px">Hi ${name.split(' ')[0]}, message received! 👋</h2>
    <p style="color:#555;font-size:15px;line-height:1.75;margin:0 0 16px">
      Thanks for reaching out to Crearelabs. We've received your message and will get back to you within <strong style="color:#111">1 business day</strong>.
    </p>
    <p style="color:#555;font-size:15px;line-height:1.75;margin:0 0 28px">
      Need a faster response? WhatsApp us — we reply within 2 hours on business days (Mon–Fri, 10am–7pm IST).
    </p>

    <a href="https://wa.me/918448807923?text=Hi+Crearelabs!+I+just+sent+a+message+via+the+website+and+wanted+to+follow+up."
       style="display:inline-block;background:#25D366;color:#ffffff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">
      💬 WhatsApp Us
    </a>

    <div style="margin-top:28px;padding:18px 20px;background:#FFF8F5;border:1px solid #FFD9C7;border-radius:10px">
      <div style="font-size:12px;font-weight:700;color:#FF6B35;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Your message</div>
      <p style="color:#666;font-size:14px;line-height:1.7;margin:0;font-style:italic">
        "${message.slice(0, 300).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}${message.length > 300 ? '…' : ''}"
      </p>
    </div>

    <p style="font-size:11px;color:#bbb;margin-top:28px;padding-top:18px;border-top:1px solid #f0f0f0">
      Crearelabs &nbsp;·&nbsp; Noida, Uttar Pradesh, India &nbsp;·&nbsp;
      <a href="mailto:ahirwarsanjay0901@gmail.com" style="color:#FF6B35">ahirwarsanjay0901@gmail.com</a> &nbsp;·&nbsp;
      <a href="https://crearelabs.in" style="color:#FF6B35">crearelabs.in</a>
    </p>
  </div>
</div>
</body>
</html>`,
    });

    return NextResponse.json({ success: true, emailSent: true });

  } catch (err) {
    console.error('[contact] Error:', err?.message || err);

    // Give a useful hint if it's an auth error
    if (err?.code === 'EAUTH' || err?.responseCode === 535) {
      return NextResponse.json({
        error: 'Email configuration error. Please contact us directly at ahirwarsanjay0901@gmail.com or WhatsApp +91 8448807923.',
      }, { status: 500 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
