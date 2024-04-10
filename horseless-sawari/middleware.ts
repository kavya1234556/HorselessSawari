import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log('middleware', req.nextUrl.pathname);
    console.log('middleware', req.nextauth.token);

    if (
      req.nextUrl.pathname.startsWith('/dashboard') &&
      req.nextauth.token?.role !== 'ADMIN'
    ) {
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
    if (
      req.nextUrl.pathname.startsWith('/dashboardM') &&
      req.nextauth.token?.role !== 'MANAGER'
    ) {
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 'ADMIN',
    },
  }
);

export const config = { matcher: ['/dashboard', '/dashboardM'] };
