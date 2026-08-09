import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ૧. જો કોઈ /admin વાળા રસ્તા પર જવાની કોશિશ કરે
  if (pathname.startsWith("/admin")) {
    
    // /admin/login ખોલવાની પરમિશન આપો
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // ૨. બ્રાઉઝર કુકીઝમાંથી ઓથ ટોકન ચેક કરો
    const adminToken = request.cookies.get("adminToken")?.value;

    // જો લોગિન ન હોય તો ૧ સેકન્ડ માટે પણ અંદર ન જવા દો, સીધું લોગિન પર ફેંકી દો
    if (!adminToken || adminToken !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};