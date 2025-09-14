import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // You can access req here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) return false;

        const role = token.role;
        const url = req.nextUrl.pathname;

        // Cashier can only access /cashier and /sales
        if (
          role === "cashier" &&
          !["/cashier", "/sales"].some(path => url.startsWith(path))
        ) {
          return false;
        }

        // Shopowner can access all pages (or block /cashier if needed)
        if (role === "shopowner" && url.startsWith("/cashier")) {
          return false;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/orders/:path*",
    "/cashier/:path*",
    "/reports/:path*",
    "/sales/:path*",
  ],
};
