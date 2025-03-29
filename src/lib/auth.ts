import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not configured");

export function verifyToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, JWT_SECRET as string);
    return decoded;
    
  } catch (error) {
    console.error("[AUTH] Token verification failed:", error);
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}