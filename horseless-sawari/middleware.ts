import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   console.log("middleware running--------");
//   // return NextResponse.redirect(new URL('/home', request.url))
// }

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
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
// export const config = { matcher: ["/admin"] };
