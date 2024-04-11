import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log('middleware', req.nextUrl.pathname);
    const role = String(req.nextauth.token.role);
    console.log(role);
    if (
      req.nextUrl.pathname.startsWith('/dashboardM') &&
      req.nextauth.token?.role !== role
    ) {
      console.log('Access denied for /dashboardM');
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
    if (
      req.nextUrl.pathname.startsWith('/dashboard') &&
      req.nextauth.token?.role !== role
    ) {
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ['/dashboard', '/dashboardM'] };
