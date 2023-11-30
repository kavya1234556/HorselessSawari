import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    console.log("middleware", req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "ADMIN",
    },
  }
);

export const config = { matcher: ["/dashboard"] };
