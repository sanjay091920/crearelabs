import { NextResponse } from 'next/server';

async function computeHmac(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2,'0')).join('');
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token  = request.cookies.get('cl_admin')?.value;
    const secret = process.env.ADMIN_SECRET || 'dev-secret-change-in-production';
    const day    = Math.floor(Date.now() / 86400000);
    const expected = await computeHmac(secret, `admin:${day}`);
    if (!token || token !== expected) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };