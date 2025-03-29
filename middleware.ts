import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách các route cần bảo vệ
const protectedRoutes = ["/chatbot"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    const token = request.cookies.get("access_token")?.value || "";

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chatbot"],
};
