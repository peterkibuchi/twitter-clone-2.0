import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(() => {
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
