"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetInput, setResetInput] = useState("");
  const [forgotStep, setForgotStep] = useState(1);
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 💡 sessionStorage સેટ કર્યું છે જેથી ટેબ ક્લોઝ થતાં ઓટોમેટિક લોગઆઉટ થઈ જાય
    sessionStorage.setItem("property_is_logged_in", "true");
    sessionStorage.setItem("user", JSON.stringify({
      name: identifier.split("@")[0] || "User",
      email: identifier || "user@propertyelist.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    }));

    alert("Login successful!");
    router.push("/");
    router.refresh();
  };

  const handleSendResetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetInput.trim()) {
      alert("Please enter your registered Email Address or Mobile Number.");
      return;
    }
    alert(`Verification OTP sent to ${resetInput}`);
    setForgotStep(2);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetOtp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    alert("Password reset successfully! You can now log in with your new password.");
    setShowForgotModal(false);
    setForgotStep(1);
    setResetInput("");
    setResetOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative flex flex-col justify-between transition-opacity duration-500 opacity-100">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .custom-animate {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="PropertyELIST" 
              className="h-36 w-auto object-contain"
            />
          </Link>

          <Link href="/" className="text-slate-800 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest px-4 py-2.5 transition">
            ← Back to Site
          </Link>
        </div>
      </header>

      {/* Main Login */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full bg-white border border-slate-200 p-8 md:p-10 rounded-2xl shadow-xl custom-animate">
          <div className="text-center mb-8">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
              Secure Access
            </span>
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">
              Welcome Back
            </h2>
            <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">
              Sign in to your PropertyELIST account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Address / Mobile Number
              </label>
              <input 
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@example.com or 9876543210"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotModal(true)}
                  className="text-emerald-600 text-xs font-bold hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition shadow-md cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500">
            Dont have an account?{" "}
            <Link href="/signup" className="text-emerald-600 font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center px-4 custom-animate">
          <div className="bg-white border border-slate-200 p-8 max-w-md w-full rounded-2xl shadow-2xl text-slate-900 relative">
            <button 
              onClick={() => {
                setShowForgotModal(false);
                setForgotStep(1);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-base cursor-pointer"
            >
              ✕
            </button>

            {forgotStep === 1 ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-light tracking-[0.15em] uppercase text-slate-900 mb-2">
                    Reset Password
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Enter your Email or Mobile Number to receive an OTP
                  </p>
                </div>

                <form onSubmit={handleSendResetOtp} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Email or Mobile Number
                    </label>
                    <input 
                      type="text"
                      required
                      value={resetInput}
                      onChange={(e) => setResetInput(e.target.value)}
                      placeholder="name@example.com or 9876543210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition shadow-md mt-2 cursor-pointer"
                  >
                    Send OTP
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-light tracking-[0.15em] uppercase text-slate-900 mb-2">
                    Set New Password
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Enter OTP sent to <span className="text-emerald-600 font-bold">{resetInput}</span>
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      6-Digit OTP
                    </label>
                    <input 
                      type="text"
                      maxLength={6}
                      required
                      value={resetOtp}
                      onChange={(e) => setResetOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-center text-lg tracking-[0.3em] font-bold text-slate-900 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <input 
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Confirm New Password
                    </label>
                    <input 
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition shadow-md mt-2 cursor-pointer"
                  >
                    Reset Password
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>© 2026 PropertyElist. All Rights Reserved.</p>
          <Link href="/" className="hover:text-emerald-600 font-bold uppercase tracking-widest">Home</Link>
        </div>
      </footer>
    </div>
  );
}