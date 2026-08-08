"use client";

import React, { useState, Suspense } from "react";

function AdsConnectContent() {
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    facebook: false,
    instagram: false,
    google: false,
  });

  const handleFacebookConnect = () => {
    alert("🎉 સફળતાપૂર્વક Facebook & Instagram અકાઉન્ટ કનેક્ટ થઈ ગયું છે!");
    setConnectedPlatforms((prev) => ({ ...prev, facebook: true, instagram: true }));
  };

  const handleGoogleConnect = () => {
    alert("🎉 સફળતાપૂર્વક Google Ads અકાઉન્ટ કનેક્ટ થઈ ગયું છે!");
    setConnectedPlatforms((prev) => ({ ...prev, google: true }));
  };

  return (
    <div className="p-8 font-sans text-slate-900 w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">🔗 Social & Google Ads API Connection</h1>
        <p className="text-slate-500 mt-1">ફેસબુક, ઇન્સ્ટાગ્રામ અને ગૂગલ અકાઉન્ટ એડમિન પેનલ સાથે લિંક કરો</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Facebook Connection Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl">👥</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${connectedPlatforms.facebook ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                {connectedPlatforms.facebook ? "🟢 Connected" : "⚪ Disconnected"}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Facebook Ads API</h3>
            <p className="text-xs text-slate-500 mb-6">ઓટોમેટિક ડાયરેક્ટ લોગિન દ્વારા મેટા બિઝનેસ પેજ કનેક્ટ કરો.</p>
          </div>
          
          {!connectedPlatforms.facebook ? (
            <button
              onClick={handleFacebookConnect}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              🌐 Connect Facebook
            </button>
          ) : (
            <button
              onClick={() => setConnectedPlatforms({ ...connectedPlatforms, facebook: false })}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2 rounded-xl text-xs transition cursor-pointer"
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Instagram Connection Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl">📸</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${connectedPlatforms.instagram ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                {connectedPlatforms.instagram ? "🟢 Connected" : "⚪ Disconnected"}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Instagram Professional</h3>
            <p className="text-xs text-slate-500 mb-6">ફેસબુક સાથે લિંક થયેલ ઇન્સ્ટાગ્રામ બિઝનેસ અકાઉન્ટ કનેક્ટ કરો.</p>
          </div>

          {!connectedPlatforms.instagram ? (
            <button
              onClick={handleFacebookConnect}
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              📸 Connect Instagram
            </button>
          ) : (
            <button
              onClick={() => setConnectedPlatforms({ ...connectedPlatforms, instagram: false })}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2 rounded-xl text-xs transition cursor-pointer"
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Google Ads Connection Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl">🔍</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${connectedPlatforms.google ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                {connectedPlatforms.google ? "🟢 Connected" : "⚪ Disconnected"}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Google Ads API</h3>
            <p className="text-xs text-slate-500 mb-6">ગૂગલ ઓથોરાઇઝેશન દ્વારા સર્ચ અને ડિસ્પ્લે એડ્સ કનેક્ટ કરો.</p>
          </div>

          {!connectedPlatforms.google ? (
            <button
              onClick={handleGoogleConnect}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              🔍 Connect Google Ads
            </button>
          ) : (
            <button
              onClick={() => setConnectedPlatforms({ ...connectedPlatforms, google: false })}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2 rounded-xl text-xs transition cursor-pointer"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdsApiConnectPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <AdsConnectContent />
    </Suspense>
  );
}