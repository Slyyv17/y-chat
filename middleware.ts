import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = verifyToken(req);

  if (token instanceof NextResponse) {
    return token; // Unauthorized or invalid token response
  }

  return NextResponse.next(); // Allow request to continue
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard/:path*"], // Protects all /dashboard routes
};
