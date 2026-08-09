"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔄 સેશન સ્ટોરેજમાંથી યુઝરનો ડેટા ચેક કરવાનું ફંક્શન
  const checkUserAuth = () => {
    // જૂના localStorage નો ડેટા સાફ કરો
    localStorage.removeItem("property_is_logged_in");
    localStorage.removeItem("property_user_data");

    const isLoggedIn = sessionStorage.getItem("property_is_logged_in");
    const storedUser = sessionStorage.getItem("user");

    if (isLoggedIn === "true" && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserAuth();

    // પેજ પર ગમે ત્યારે સ્ટેટ ચેન્જ થાય ત્યારે તુરંત અપડેટ માટે
    const interval = setInterval(() => {
      checkUserAuth();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    setShowDropdown(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full bg-white border-b border-slate-100 py-4 px-8 flex justify-between items-center relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-black bg-emerald-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-md">
          P
        </span>
        <span className="text-xl font-extrabold text-slate-900 tracking-tight">PropertyElist</span>
      </Link>

      {/* Right Side Actions */}
      <div className="flex items-center gap-5">
        {user ? (
          /* 🟢 લોગિન થયા પછી આ નોટિફિકેશન અને અવતાર પ્રોફાઇલ દેખાશે */
          <div className="flex items-center gap-4 relative">
            {/* Notification Icon */}
            <div className="relative cursor-pointer bg-slate-100 hover:bg-slate-200 p-2.5 rounded-full transition">
              <span className="text-lg">🔔</span>
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                2
              </span>
            </div>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 p-1.5 pr-3 rounded-full transition cursor-pointer border border-slate-200"
              >
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
                />
                <span className="text-xs text-slate-600 font-bold">▼</span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name || "User"}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    👤 My Profile
                  </Link>
                  <Link
                    href="/my-properties"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    🏢 My Properties
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition border-t border-slate-100 cursor-pointer"
                  >
                    🚪 LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 🔑 લોગિન ન હોય ત્યારે LOGIN / SIGN UP */
          <div className="flex items-center gap-3">
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
          </div>
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