import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log('middleware', req.nextUrl.pathname);
    if (
      req.nextUrl.pathname.startsWith('/ManagerD') &&
      req.nextauth.token?.role !== 'MANAGER'
    ) {
      console.log('Access denied for /ManagerD');
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
    if (
      req.nextUrl.pathname.startsWith('/dashboard') &&
      req.nextauth.token?.role !== 'ADMIN'
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

export const config = { matcher: ['/dashboard', '/ManagerD'] };
