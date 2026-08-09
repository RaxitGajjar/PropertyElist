"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // તમારો સેટ કરેલો યુઝરનેમ અને પાસવર્ડ
    if (email === "me@123" && password === "raxit@1234") {
      // 🔐 Middleware અને LocalStorage માટે Tokens સેટ કરીએ
      document.cookie = "adminToken=authenticated; path=/; max-age=" + 60 * 60 * 24 * 7;
      document.cookie = "isAdminLoggedIn=true; path=/; max-age=" + 60 * 60 * 24 * 7;

      localStorage.setItem("adminToken", "authenticated");
      localStorage.setItem("isAdminLoggedIn", "true");

      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("wrong username & password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-4 font-sans text-slate-900">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-800">
        <div className="text-center mb-8">
          <span className="text-3xl font-black bg-emerald-600 text-white w-12 h-12 inline-flex items-center justify-center rounded-2xl shadow-lg mb-3">
            P
          </span>
          <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900">
            Admin Portal
          </h2>
          <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest">
            PropertyElist Secure Login
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3.5 rounded-xl mb-6 text-xs font-bold uppercase tracking-wider text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Username / Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest p-4 rounded-xl transition shadow-lg cursor-pointer"
          >
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <Link
            href="/"
            className="text-xs font-bold text-slate-500 hover:text-emerald-600 transition uppercase tracking-widest"
          >
            ← Back to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}