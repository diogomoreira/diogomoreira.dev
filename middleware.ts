import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/" || url.pathname === "/about") {
    url.pathname = "/links";
    return NextResponse.redirect(url);
  }
}
