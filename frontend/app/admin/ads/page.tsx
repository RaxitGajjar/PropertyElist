"use client";

import React, { useState } from "react";

export default function SponsoredAdsPage() {
  const [ads, setAds] = useState([
    {
      id: "AD-501",
      platform: "Instagram",
      title: "Aniket Elite - Luxury 3 BHK Campaign",
      budget: "₹ 5,000",
      duration: "7 Days",
      status: "Active",
      reach: "45,200 People",
    },
    {
      id: "AD-502",
      platform: "Facebook",
      title: "Commercial Shops & Offices Boost",
      budget: "₹ 8,000",
      duration: "15 Days",
      status: "Active",
      reach: "82,500 People",
    },
    {
      id: "AD-503",
      platform: "Google Search",
      title: "Ahmedabad Top Builders Keyword Ad",
      budget: "₹ 12,000",
      duration: "30 Days",
      status: "Paused",
      reach: "1,15,000 Impressions",
    },
  ]);

  const [newAd, setNewAd] = useState({
    platform: "Instagram",
    title: "",
    budget: "",
    duration: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);

  // 🚀 Create New Sponsored Ad
  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAd.title || !newAd.budget) {
      alert("મહેરબાની કરીને ટાઇટલ અને બજેટ દાખલ કરો.");
      return;
    }

    const created = {
      id: `AD-${Math.floor(100 + Math.random() * 900)}`,
      platform: newAd.platform,
      title: newAd.title,
      budget: `₹ ${newAd.budget}`,
      duration: newAd.duration || "7 Days",
      status: "Active",
      reach: "New Campaign",
    };

    setAds([created, ...ads]);
    setNewAd({ platform: "Instagram", title: "", budget: "", duration: "" });
    setShowAddModal(false);
    alert("🎉 નવી સ્પૉન્સર્ડ એડ સફળતાપૂર્વક લાઈવ થઈ ગઈ છે!");
  };

  // 🗑️ Remove / Pause Ad
  const handleRemoveAd = (id: string) => {
    if (confirm("શું તમે ખરેખર આ એડને રિમૂવ કરવા માંગો છો?")) {
      setAds(ads.filter((ad) => ad.id !== id));
    }
  };

  // ⚡ Toggle Status
  const toggleAdStatus = (id: string) => {
    setAds(
      ads.map((ad) =>
        ad.id === id
          ? { ...ad, status: ad.status === "Active" ? "Paused" : "Active" }
          : ad
      )
    );
  };

  return (
    <div className="p-8 font-sans text-slate-900 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">📢 Sponsored Ads Manager</h1>
          <p className="text-slate-500 mt-1">ફેસબુક, ઇન્સ્ટાગ્રામ અને ગૂગલ પર ચાલતી સ્પૉન્સર્ડ એડ્સનું ડાયરેક્ટ મેનેજમેન્ટ</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-xl transition shadow-md text-sm cursor-pointer"
        >
          + Run New Sponsored Ad
        </button>
      </div>

      {/* 📊 ADS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  🌐 {ad.platform}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    ad.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {ad.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{ad.title}</h3>
              <p className="text-xs text-slate-500 font-semibold">💰 Budget: {ad.budget} ({ad.duration})</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">📈 Estimated Reach: {ad.reach}</p>
            </div>

            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => toggleAdStatus(ad.id)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition cursor-pointer"
              >
                {ad.status === "Active" ? "⏸️ Pause" : "▶️ Resume"}
              </button>
              <button
                onClick={() => handleRemoveAd(ad.id)}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ➕ NEW AD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg border border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">🚀 Run New Sponsored Ad</h3>
            <p className="text-xs text-slate-500 mb-6">સોશિયલ મીડિયા અથવા ગૂગલ પર નવી એડ લોન્ચ કરો</p>
            
            <form onSubmit={handleCreateAd} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Select Platform</label>
                <select
                  value={newAd.platform}
                  onChange={(e) => setNewAd({ ...newAd, platform: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Instagram">📸 Instagram Sponsored Ad</option>
                  <option value="Facebook">👥 Facebook Sponsored Ad</option>
                  <option value="Google Search">🔍 Google Search & Display Ad</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Campaign Title / Banner Heading</label>
                <input
                  type="text"
                  placeholder="e.g. Luxury 4 BHK Booking Open"
                  value={newAd.title}
                  onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    placeholder="5000"
                    value={newAd.budget}
                    onChange={(e) => setNewAd({ ...newAd, budget: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="7 Days"
                    value={newAd.duration}
                    onChange={(e) => setNewAd({ ...newAd, duration: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl transition text-sm shadow-md cursor-pointer"
                >
                  🚀 Launch Ad Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}