import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (token) {
    const { nextUrl } = req;
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(
        new URL("/management/dashboard/admin", nextUrl)
      );
    }
  } else {
    const { nextUrl } = req;
    if (req.nextUrl.pathname.startsWith("/management")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // return NextResponse.redirect(new URL("/", nextUrl));
  }
}
// export const config = {
//   matcher: ["/management/:path*"],
// };
