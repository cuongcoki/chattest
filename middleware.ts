import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách các route cần bảo vệ
const protectedRoutes = ["/chatbot"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (protectedRoutes.includes(pathname)) {
    // Check for regular access token in cookies
    const accessToken = request.cookies.get("access_token")?.value || "";
    
    // Check for guest token in cookies
    const guestToken = request.cookies.get("guest_token")?.value || "";

    // If neither token exists, redirect to sign-in
    if (!accessToken && !guestToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chatbot","/"],
   
};