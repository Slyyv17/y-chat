import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const result = verifyToken(req);

  if (result instanceof NextResponse) {
    return result;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat-room/:path*", "/dashboard/:path*"],
};