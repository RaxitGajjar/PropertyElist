"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // 🔴 જુના localStorage ને અહીં જ સંપૂર્ણ સાફ કરી નાખો
    localStorage.removeItem("property_is_logged_in");
    localStorage.removeItem("property_user_data");
    localStorage.removeItem("user");

    // 🟢 ફક્ત sessionStorage માંથી જ ચેક કરો
    const checkUserAuth = () => {
      const isLoggedIn = sessionStorage.getItem("property_is_logged_in");
      const storedUser = sessionStorage.getItem("user");

      if (isLoggedIn === "true" && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUserAuth();
    window.addEventListener("storage", checkUserAuth);
    return () => window.removeEventListener("storage", checkUserAuth);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full bg-white border-b border-slate-100 py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-black bg-emerald-600 text-white w-9 h-9 flex items-center justify-center rounded-xl">
          P
        </span>
        <span className="text-xl font-extrabold text-slate-900 tracking-tight">PropertyElist</span>
      </Link>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          /* 👤 લોગિન પ્રોફાઈલ મેનૂ */
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl">
              👤 {user.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-extrabold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-xl transition cursor-pointer"
            >
              LOGOUT
            </button>
          </div>
        ) : (
          /* 🔑 લોગિન / સાઈનઅપ બટન્સ */
          <>
            <Link
              href="/login"
              className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition tracking-wider uppercase px-3 py-2"
            >
              LOGIN
            </Link>
            <Link
              href="/signup"
              className="text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition shadow-sm tracking-wider uppercase"
            >
              SIGN UP
            </Link>
          </>
        )}

        {/* Post Property Button */}
        <Link
          href="/post-property"
          className="relative bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition tracking-wider uppercase flex items-center gap-1.5 shadow-md"
        >
          <span className="absolute -top-2 -right-1 bg-slate-900 text-[9px] text-white font-extrabold px-1.5 py-0.5 rounded-full">
            FREE
          </span>
          POST PROPERTY
        </Link>
      </div>
    </header>
  );
}