import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ૧. જો યુઝર /admin અથવા તેના કોઈ પણ સબ-પેજ પર જવાની કોશિશ કરે
  if (pathname.startsWith("/admin")) {
    
    // /admin/login પેજ ખોલવાની છૂટ આપો
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // ૨. કૂકીઝમાંથી સિક્યોરિટી ટોકન ચેક કરો
    const adminToken = request.cookies.get("adminToken")?.value;

    // જો લોગિન ટોકન ન હોય અથવા વેલિડ ન હોય, તો સર્વર લેવલ પર જ અટકાવીને સીધા લોગિન પેજ પર જ મોકલો
    if (!adminToken || adminToken !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 🎯 આ સિક્યોરિટી ફ્લો /admin ના તમામ રુટ્સ પર લાગુ થશે
export const config = {
  matcher: ["/admin/:path*"],
};