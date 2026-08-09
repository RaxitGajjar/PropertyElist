"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserSignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);

  const [userRole, setUserRole] = useState("Owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = () => {
    if (!name.trim()) {
      alert("Please enter your full name first.");
      return;
    }
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setShowOtpBox(true);
    alert(`OTP sent to +91 ${mobile}`);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    setIsMobileVerified(true);
    setShowOtpBox(false);
    alert("Mobile number verified successfully!");
  };

  const handleFinalRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isMobileVerified) {
      alert("Please verify your mobile number first.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 💡 sessionStorage સેટ કર્યું છે જેથી ટેબ ક્લોઝ થતાં ઓટોમેટિક લોગઆઉટ થઈ જાય
    sessionStorage.setItem("property_is_logged_in", "true");
    sessionStorage.setItem("user", JSON.stringify({
      name: name,
      email: email || `${mobile}@propertyelist.com`,
      role: userRole,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    }));

    alert(`Account created successfully as ${userRole}! Redirecting to Home...`);
    router.push("/");
    router.refresh();
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

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full bg-white border border-slate-200 p-8 md:p-10 rounded-2xl shadow-xl custom-animate">
          <div className="text-center mb-6">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
              New Registration
            </span>
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">
              Create Account
            </h2>
            <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">
              Join PropertyELIST as Owner, Builder or Broker
            </p>
          </div>

          <form onSubmit={handleFinalRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-emerald-600">*</span>
              </label>
              <input 
                type="text"
                required
                disabled={isMobileVerified}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition disabled:opacity-50"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                I am a *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Owner", "Builder", "Broker"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setUserRole(role)}
                    className={`py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition cursor-pointer ${
                      userRole === role
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Mobile Number <span className="text-emerald-600">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex w-full">
                  <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg px-3 flex items-center text-sm font-bold text-slate-600">
                    +91
                  </span>
                  <input 
                    type="tel"
                    maxLength={10}
                    required
                    disabled={isMobileVerified}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-r-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition disabled:opacity-50"
                  />
                </div>

                {!isMobileVerified ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-slate-200 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-xs uppercase px-4 rounded-lg transition shrink-0 cursor-pointer"
                  >
                    Verify
                  </button>
                ) : (
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-300 font-bold text-xs px-4 rounded-lg flex items-center shrink-0">
                    Verified ✓
                  </span>
                )}
              </div>
            </div>

            {showOtpBox && !isMobileVerified && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase font-bold">
                  <span>Enter 6-digit OTP</span>
                  <button type="button" onClick={handleSendOtp} className="text-emerald-600 hover:underline">Resend</button>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-center text-lg tracking-widest font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase px-4 rounded transition cursor-pointer"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}

            <div className={`space-y-4 transition-all duration-300 ${!isMobileVerified ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input 
                  type="email"
                  required={isMobileVerified}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input 
                  type="password"
                  required={isMobileVerified}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <input 
                  type="password"
                  required={isMobileVerified}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition shadow-lg mt-3 cursor-pointer"
              >
                Create Account & Go to Home
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>

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