"use client";

import React, { useState } from "react";

export default function AdminSettingsPage() {
  const [adminEmail, setAdminEmail] = useState("admin@propertyelist.com");
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpTargetType, setOtpTargetType] = useState<"PASSWORD" | "EMAIL">("PASSWORD");
  const [inputOtp, setInputOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const [loginLogs] = useState([
    {
      id: "LOG-901",
      ip: "103.211.54.12",
      location: "Ahmedabad, Gujarat, India",
      device: "Chrome (Windows 11 PC)",
      date: "06/08/2026",
      time: "05:40 PM",
      status: "Current Active Session",
    },
    {
      id: "LOG-900",
      ip: "49.36.128.45",
      location: "Ahmedabad, Gujarat, India",
      device: "Safari (iPhone 15 Pro)",
      date: "05/08/2026",
      time: "10:15 AM",
      status: "Successful",
    },
  ]);

  const handleInitiateChange = (type: "PASSWORD" | "EMAIL") => {
    setMessage({ type: "", text: "" });

    if (type === "PASSWORD") {
      if (!passwordData.currentPassword) {
        setMessage({ type: "error", text: "મહેરબાની કરીને વર્તમાન પાસવર્ડ દાખલ કરો." });
        return;
      }
      if (passwordData.newPassword.length < 6) {
        setMessage({ type: "error", text: "નવો પાસવર્ડ ઓછામાં ઓછો 6 અક્ષરનો હોવો જોઈએ." });
        return;
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setMessage({ type: "error", text: "નવો પાસવર્ડ અને કન્ફર્મ પાસવર્ડ મેચ થતા નથી." });
        return;
      }
    } else if (type === "EMAIL") {
      if (!newAdminEmail.trim() || !newAdminEmail.includes("@")) {
        setMessage({ type: "error", text: "મહેરબાની કરીને માન્ય નવું એડમિન ઈમેઈલ આઈડી દાખલ કરો." });
        return;
      }
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setOtpTargetType(type);
    setShowOtpModal(true);
    setInputOtp("");

    alert(`[SECURITY DEMO] વેરિફિકેશન OTP: ${randomOtp}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputOtp !== generatedOtp) {
      alert("❌ અમાન્ય OTP!");
      return;
    }

    setShowOtpModal(false);

    if (otpTargetType === "PASSWORD") {
      setMessage({ type: "success", text: "🔒 OTP વેરિફિકેશન સફળ! એડમિન પાસવર્ડ બદલાઈ ગયો છે." });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else if (otpTargetType === "EMAIL") {
      setAdminEmail(newAdminEmail);
      setNewAdminEmail("");
      setMessage({ type: "success", text: "📧 OTP વેરિફિકેશન સફળ! નવું એડમિન આઈડી સેટ થઈ ગયું છે." });
    }
  };

  return (
    <div className="p-8 font-sans text-slate-900 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">🛡️ Security & Settings</h1>
        <p className="text-slate-500 mt-1">એડમિન આઈડી, પાસવર્ડ અને લૉગિન ટ્રેકિંગ મોડ્યુલ</p>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-xl text-sm font-bold mb-6 ${
            message.type === "success"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-rose-100 text-rose-800 border border-rose-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Change Admin ID */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">📧 Change Admin ID / Email</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Current Active Admin ID</label>
              <input type="text" disabled value={adminEmail} className="w-full p-3.5 border border-slate-200 rounded-xl font-bold text-slate-500 bg-slate-100 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">New Admin Email ID</label>
              <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="newadmin@propertyelist.com"
                className="w-full p-3.5 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition"
              />
            </div>
            <button
              type="button"
              onClick={() => handleInitiateChange("EMAIL")}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl transition text-sm shadow-md cursor-pointer"
            >
              📲 Send OTP & Update Admin ID
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">🔐 Change Admin Password</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full p-3.5 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full p-3.5 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full p-3.5 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleInitiateChange("PASSWORD")}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl transition text-sm shadow-md cursor-pointer"
            >
              📲 Send OTP & Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-1">📍 Detected Admin Login Activity</h2>
        <p className="text-xs text-slate-500 mb-4">તમારા એકાઉન્ટમાં ક્યાંથી અને કયા IP પરથી લૉગિન કરવામાં આવ્યું હતું તેનો લાઈવ ડેટા</p>
        <div className="space-y-3">
          {loginLogs.map((log) => (
            <div key={log.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 text-sm">📍 {log.location}</p>
                <p className="text-xs text-slate-600">🌐 IP Address: {log.ip}</p>
                <p className="text-[11px] text-slate-500">💻 Device: {log.device}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800">📅 {log.date}</p>
                <p className="text-[11px] text-slate-500">⏰ {log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">🔒 Enter OTP Verification Code</h3>
            <p className="text-xs text-slate-500 mb-6">વેરિફિકેશન માટે મોકલેલો 6-અંકનો OTP દાખલ કરો.</p>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value)}
                placeholder="123456"
                className="w-full p-3.5 border border-slate-200 rounded-xl font-mono font-bold text-center text-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 tracking-widest bg-slate-50"
              />
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowOtpModal(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition text-sm cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl transition text-sm shadow-md cursor-pointer">
                  ✅ Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}