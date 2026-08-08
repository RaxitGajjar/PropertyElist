"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // 🚪 Logout Handler
  const handleLogout = () => {
    if (confirm("શું તમે ખરેખર એડમિન પેનલમાંથી લૉગઆઉટ કરવા માંગો છો?")) {
      document.cookie = "isAdminLoggedIn=; path=/; max-age=0";
      localStorage.removeItem("isAdminLoggedIn");
      router.push("/admin/login");
      router.refresh();
    }
  };

  // Login page પર સાઈડબાર ન બતાવવો હોય તેના માટે
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "📊 Dashboard", href: "/admin/dashboard" },
    { name: "🏢 All Properties", href: "/admin/properties" },
    { name: "➕ Add Property", href: "/admin/properties/add" },
    { name: "📩 Leads / Inquiries", href: "/admin/inquiries" },
    { name: "📦 Packages & Users", href: "/admin/packages" },
    { name: "📢 Sponsored Ads", href: "/admin/ads" },
    { name: "🔗 Ads API Integration", href: "/admin/ads/connect" }, // 👈 Added Ads API Connection Link here
    { name: "⚙️ Security & Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* 🟢 Main Global Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-6 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-10 border-b border-slate-800 pb-5">
            <span className="text-2xl font-black bg-emerald-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg">
              P
            </span>
            <span className="text-xl font-bold tracking-wide">PropertyElist</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 font-medium px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-emerald-600 text-white font-semibold shadow"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 🚪 Global Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 font-bold px-4 py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          🚪 Logout Admin
        </button>
      </aside>

      {/* Main Page Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}