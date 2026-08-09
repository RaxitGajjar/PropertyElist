import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ૧. જો યુઝર /admin પેજીસ પર જવાની કોશિશ કરે
  if (pathname.startsWith("/admin")) {
    
    // /admin/login પેજ ખોલવાની છૂટ આપો
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // બ્રાઉઝર કુકીઝમાંથી એડમિન ઓથોરાઈઝેશન ટોકન ચેક કરો
    const adminToken = request.cookies.get("adminToken")?.value;

    // જો ટોકન ન હોય તો પેજ ઓપન ન થવા દો અને સીધા /admin/login પર મોકલી દો
    if (!adminToken || adminToken !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 🎯 ફક્ત એડમિન ના બધા જ રસ્તાઓ પર આ સિક્યોરિટી ચાલશે
export const config = {
  matcher: ["/admin/:path*"],
};