import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  //   const role = req.cookies.get("role")?.value; // or from JWT/session
  const role = "cashier"; // or from JWT/session

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
      role === "cashier" &&
      !req.nextUrl.pathname.startsWith("/dashboard/cashier")
    ) {
      return NextResponse.redirect(new URL("/dashboard/cashier", req.url));
    }

    if (
      role === "admin" &&
      !req.nextUrl.pathname.startsWith("/dashboard/admin")
    ) {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
  }
}
