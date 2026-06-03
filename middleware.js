import { NextResponse } from 'next/server';
import { createHmac }   from 'crypto';

function validToken(token) {
  if (!token) return false;
  const secret = process.env.ADMIN_SECRET || 'dev-secret-change-in-production';
  const day    = Math.floor(Date.now() / 86400000);
  const good   = createHmac('sha256', secret).update(`admin:${day}`).digest('hex');
  return token === good;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes (not /admin/login or /api/admin/auth)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('cl_admin')?.value;
    if (!validToken(token)) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
