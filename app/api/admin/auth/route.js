import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';
import { createHmac }   from 'crypto';

/* ── Brute-force guard ──────────────────────────────────────── */
const _attempts = new Map();
function checkBrute(ip) {
  const now  = Date.now();
  const slot = _attempts.get(ip) || { count: 0, lockedUntil: 0 };
  if (slot.lockedUntil > now) return false;
  if (slot.count >= 5) { slot.lockedUntil = now + 15 * 60 * 1000; slot.count = 0; _attempts.set(ip, slot); return false; }
  return true;
}
function recordAttempt(ip, success) {
  if (success) { _attempts.delete(ip); return; }
  const slot = _attempts.get(ip) || { count: 0, lockedUntil: 0 };
  slot.count += 1;
  _attempts.set(ip, slot);
}

/* ── Token ──────────────────────────────────────────────────── */
function makeToken() {
  const secret = process.env.ADMIN_SECRET || 'dev-secret-change-in-production';
  const day    = Math.floor(Date.now() / 86400000); // changes daily
  return createHmac('sha256', secret).update(`admin:${day}`).digest('hex');
}

/* ── POST — login ────────────────────────────────────────────── */
export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkBrute(ip)) {
    return NextResponse.json({ error: 'Too many failed attempts. Try again in 15 minutes.' }, { status: 429 });
  }

  let body;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({
      error: 'ADMIN_PASSWORD env var not set. Go to Vercel → Settings → Environment Variables and add it, then redeploy.',
    }, { status: 500 });
  }

  const correct = body?.password === adminPassword;
  recordAttempt(ip, correct);

  if (!correct) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('cl_admin', makeToken(), {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 8, // 8 hours
    path:     '/',
  });

  return NextResponse.json({ ok: true });
}

/* ── DELETE — logout ─────────────────────────────────────────── */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('cl_admin');
  return NextResponse.json({ ok: true });
}
