import { NextResponse } from 'next/server';

/* ── Rate limiter ── */
const _hits = new Map();
function rateOk(ip) {
  const slot = Math.floor(Date.now() / 3_600_000);
  const key  = `${ip}:${slot}`;
  const n    = (_hits.get(key) || 0) + 1;
  _hits.set(key, n);
  return n <= 3; // tighter — 3 applications per IP per hour
}

/* ── Validation ── */
function validate(body) {
  const e = {};
  if (!body?.name  || String(body.name).trim().length  < 2)  e.name  = 'Name is required';
  if (!body?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim())) e.email = 'Valid email required';
  if (!body?.phone || String(body.phone).trim().length  < 7)  e.phone = 'Phone number is required';
  if (!body?.cover || String(body.cover).trim().length  < 20) e.cover = 'Cover note too short (min 20 chars)';
  if (!body?.jobId)                                            e.jobId = 'Missing job ID';
  return e;
}

/* ── Gmail transporter ── */
let _transporter = null;
async function getTransporter() {
  if (_transporter) return _transporter;
  const nodemailer = await import('nodemailer');
  _transporter = nodemailer.default.createTransport({
    host:   'smtp.gmail.com',
    port:   465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  return _transporter;
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (!rateOk(ip)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    let body;
    try { body = await req.json(); }
    catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

    const errs = validate(body);
    if (Object.keys(errs).length) {
      return NextResponse.json({ error: 'Validation failed', details: errs }, { status: 422 });
    }

    const name      = String(body.name).trim();
    const email     = String(body.email).trim();
    const phone     = String(body.phone).trim();
    const cover     = String(body.cover).trim();
    const portfolio = String(body.portfolio ?? '').trim();
    const linkedin  = String(body.linkedin  ?? '').trim();
    const jobTitle  = String(body.jobTitle  ?? body.jobId ?? 'Unknown role').trim();
    const ts        = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.warn('[apply] Gmail env vars not set — emails skipped.');
      return NextResponse.json({ success: true, emailSent: false });
    }

    const transporter = await getTransporter();
    const adminEmail  = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;

    /* ── Admin notification ─────────────────────────────────── */
    await transporter.sendMail({
      from:    `"Crearelabs Careers" <${process.env.GMAIL_USER}>`,
      to:      adminEmail,
      replyTo: email,
      subject: `📋 New application: ${name} — ${jobTitle}`,
      text: `
New job application — crearelabs.in
────────────────────────────────────
Name:      ${name}
Email:     ${email}
Phone:     ${phone}
Role:      ${jobTitle}
Time:      ${ts} IST
${portfolio ? `Portfolio: ${portfolio}` : ''}
${linkedin  ? `LinkedIn:  ${linkedin}`  : ''}

Cover Note:
${cover}
────────────────────────────────────
Reply to this email to respond to the applicant.
`.trim(),
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#f4f4f8;font-family:system-ui,sans-serif">
<div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">

  <div style="background:linear-gradient(135deg,#9B5DE5,#7B3FC7);padding:28px 32px">
    <div style="font-size:12px;color:rgba(255,255,255,.8);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Crearelabs Careers</div>
    <div style="font-size:22px;font-weight:700;color:#ffffff">📋 New Application</div>
    <div style="font-size:14px;color:rgba(255,255,255,.85);margin-top:6px">${jobTitle}</div>
  </div>

  <div style="padding:28px 32px 0">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${[
        ['Name',      name],
        ['Email',     `<a href="mailto:${email}" style="color:#9B5DE5;text-decoration:none;font-weight:600">${email}</a>`],
        ['Phone',     phone],
        ['Role',      jobTitle],
        ['Applied',   `${ts} IST`],
        ...(portfolio ? [['Portfolio', `<a href="${portfolio}" style="color:#9B5DE5">${portfolio}</a>`]] : []),
        ...(linkedin  ? [['LinkedIn',  `<a href="${linkedin}"  style="color:#9B5DE5">${linkedin}</a>`]]  : []),
      ].map(([l, v]) => `
        <tr>
          <td style="padding:11px 0;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#999;width:95px;vertical-align:top;border-bottom:1px solid #f0f0f0">${l}</td>
          <td style="padding:11px 0 11px 16px;color:#111;border-bottom:1px solid #f0f0f0">${v}</td>
        </tr>`).join('')}
    </table>
  </div>

  <div style="padding:20px 32px">
    <div style="font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#999;margin-bottom:10px">Cover Note</div>
    <div style="background:#FAF8FF;border-left:4px solid #9B5DE5;padding:16px 20px;border-radius:0 8px 8px 0;font-size:15px;line-height:1.75;color:#333;white-space:pre-wrap">${
      cover.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    }</div>
  </div>

  <div style="padding:4px 32px 32px">
    <a href="mailto:${email}?subject=Re: Your application for ${encodeURIComponent(jobTitle)} at Crearelabs&body=Hi ${encodeURIComponent(name.split(' ')[0])},%0A%0AThanks for applying for the ${encodeURIComponent(jobTitle)} role at Crearelabs.%0A%0A"
       style="display:inline-block;background:#9B5DE5;color:#ffffff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">
      Reply to ${name.split(' ')[0]} →
    </a>
    <p style="font-size:12px;color:#bbb;margin-top:14px">
      From the careers form on crearelabs.in &nbsp;·&nbsp; ${ts} IST
    </p>
  </div>
</div>
</body>
</html>`,
    });

    /* ── Auto-reply to applicant ──────────────────────────── */
    await transporter.sendMail({
      from:    `"Crearelabs Careers" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: `Application received — ${jobTitle} at Crearelabs`,
      text: `
Hi ${name.split(' ')[0]},

Thanks for applying for the ${jobTitle} role at Crearelabs!

We've received your application and will review it within 3–5 business days. If there's a strong fit we'll reach out to schedule a first call. We review every application personally.

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

  <div style="background:linear-gradient(135deg,#9B5DE5,#7B3FC7);padding:28px 32px">
    <div style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#ffffff">Crearelabs</div>
    <div style="font-size:13px;color:rgba(255,255,255,.8);margin-top:4px">Careers</div>
  </div>

  <div style="padding:32px">
    <h2 style="font-family:Georgia,serif;font-size:22px;color:#111;margin:0 0 16px">Application received! 🎉</h2>
    <p style="color:#555;font-size:15px;line-height:1.75;margin:0 0 12px">
      Hi ${name.split(' ')[0]}, thanks for applying for the <strong style="color:#9B5DE5">${jobTitle}</strong> role.
    </p>
    <p style="color:#555;font-size:15px;line-height:1.75;margin:0 0 24px">
      We've received your application and will review it within <strong style="color:#111">3–5 business days</strong>. We review every application personally — if there's a strong fit, we'll reach out to schedule a first call.
    </p>

    <div style="padding:16px 20px;background:#FAF8FF;border:1px solid #DDD0F7;border-radius:10px;font-size:14px;color:#555;line-height:1.6">
      <strong style="color:#9B5DE5">Role applied for:</strong> ${jobTitle}<br>
      <strong style="color:#9B5DE5">Application sent:</strong> ${ts} IST
    </div>

    <p style="font-size:11px;color:#bbb;margin-top:28px;padding-top:18px;border-top:1px solid #f0f0f0">
      Crearelabs &nbsp;·&nbsp; Noida, Uttar Pradesh &nbsp;·&nbsp;
      <a href="https://crearelabs.in/careers" style="color:#9B5DE5">View all open roles</a>
    </p>
  </div>
</div>
</body>
</html>`,
    });

    return NextResponse.json({ success: true, emailSent: true });

  } catch (err) {
    console.error('[apply] Error:', err?.message || err);
    if (err?.code === 'EAUTH' || err?.responseCode === 535) {
      return NextResponse.json({
        error: 'Email configuration error. Please email ahirwarsanjay0901@gmail.com directly.',
      }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
