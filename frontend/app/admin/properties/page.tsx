"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PropertiesAdminPage() {
  const [syncing, setSyncing] = useState(false);

  // 🏢 પ્રોપર્ટી લિસ્ટિંગનો સંપૂર્ણ ડેટા (Featured & RERA Badge Support)
  const [properties, setProperties] = useState([
    {
      id: "RERA-8821",
      title: "Aniket Elite",
      builder: "Aniket Group",
      userRole: "Builder",
      contact: "+91 98765 43210",
      location: "Science City, S.G. Highway, Ahmedabad",
      reraNo: "PR/GJ/AHMEDABAD/AUDA/MAA12345",
      price: "₹ 75 Lacs - 1.25 Cr",
      isPaid: true,
      isFeatured: true, // 🌟 Featured Mode
      planName: "Pro Builder Plan",
      listedDate: "06/08/2026",
      status: "Active",
    },
    {
      id: "RERA-8822",
      title: "Luxuria Sky",
      builder: "Skyline Developers",
      userRole: "Broker",
      contact: "+91 91234 56789",
      location: "Bodakdev, Ahmedabad",
      reraNo: "PR/GJ/AHMEDABAD/AUDA/MAA54321",
      price: "Price on Request",
      isPaid: true,
      isFeatured: false, // 📌 Normal Mode
      planName: "Agent Booster Plan",
      listedDate: "05/08/2026",
      status: "Active",
    },
    {
      id: "P-103",
      title: "2 BHK Penthouse in Satellite",
      builder: "Ramesh Bhai",
      userRole: "Direct Owner",
      contact: "+91 99887 76655",
      location: "Satellite, Ahmedabad",
      reraNo: "N/A (Owner)",
      price: "₹ 45 Lacs",
      isPaid: false,
      isFeatured: false, // 📌 Normal Mode
      planName: "Free Listing Plan",
      listedDate: "06/08/2026",
      status: "Inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // 🔄 GujRERA Auto Sync Action
  const handleReraAutoSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert("GujRERA માંથી નવા રજિસ્ટર્ડ પ્રોજેક્ટ્સ ઓટો-સિંક થઈ ગયા!");
    }, 2000);
  };

  // ⚡ Active/Inactive Toggle
  const toggleStatus = (id: string) => {
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
          : item
      )
    );
  };

  // 🌟 Toggle Featured vs Normal Mode
  const toggleFeaturedMode = (id: string) => {
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
      )
    );
  };

  // 🔍 Filter Logic
  const filteredProperties = properties.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.builder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    const matchesType =
      typeFilter === "ALL" ||
      (typeFilter === "PAID" && item.isPaid) ||
      (typeFilter === "FREE" && !item.isPaid) ||
      (typeFilter === "FEATURED" && item.isFeatured);

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-8 font-sans text-slate-900 w-full">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">🏢 Properties & RERA Verification</h1>
          <p className="text-slate-500 mt-1">વેબસાઇટ પર લાઈવ પ્રોપર્ટીઝ, ફીચર્ડ મોડ કંટ્રોલ અને ગુજરેરા વેરિફિકેશન</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReraAutoSync}
            disabled={syncing}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl transition shadow-md flex items-center gap-2 text-sm cursor-pointer"
          >
            {syncing ? "🔄 Syncing GujRERA..." : "⚡ Run GujRERA Auto-Sync"}
          </button>
          <Link
            href="/admin/properties/add"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-3 rounded-xl transition shadow-md text-sm flex items-center gap-1"
          >
            + Add New Property
          </Link>
        </div>
      </div>

      {/* 🔍 SEARCH & FILTERS BOX */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">🔍 Search & Filter Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Search Property / Builder / Location</label>
            <input
              type="text"
              placeholder="Search Title, Name, Location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Filter Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="ALL">All Status (Active + Inactive)</option>
              <option value="Active">🟢 Active Only</option>
              <option value="Inactive">🔴 Inactive / Hidden Only</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Filter Plan & Mode</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="ALL">All Listings</option>
              <option value="FEATURED">🌟 Featured Paid Mode Only</option>
              <option value="PAID">💳 Paid Packages</option>
              <option value="FREE">🎁 Free Signups</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📑 PROPERTIES TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">
            Properties List ({filteredProperties.length} Properties)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-xs uppercase border-b border-slate-200">
                <th className="p-4">🏢 Property & RERA Badge</th>
                <th className="p-4">👤 Listed By (User)</th>
                <th className="p-4">🌟 Featured / Normal Mode</th>
                <th className="p-4">💳 Plan Type</th>
                <th className="p-4">⚙️ Status Toggle</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                    કોઈ પ્રોપર્ટી મળી નથી.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((item) => {
                  const hasValidRera = item.reraNo && item.reraNo.startsWith("PR/GJ");

                  return (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition align-top">
                      {/* Property Details & RERA Badge */}
                      <td className="p-4 min-w-[240px]">
                        <p className="font-bold text-slate-900 text-base">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium">📍 {item.location}</p>
                        
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            GujRERA: {item.reraNo}
                          </span>
                          {hasValidRera ? (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              🟢 RERA Verified
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              ⚪ Unverified
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-extrabold text-emerald-600 block mt-1.5">
                          {item.price}
                        </span>
                      </td>

                      {/* Listed By */}
                      <td className="p-4 min-w-[180px]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-800 text-sm">{item.builder}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                            {item.userRole}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">📞 {item.contact}</p>
                        <p className="text-[11px] text-slate-400 mt-1">📅 {item.listedDate}</p>
                      </td>

                      {/* Featured vs Normal Mode Toggle */}
                      <td className="p-4 min-w-[180px]">
                        <button
                          onClick={() => toggleFeaturedMode(item.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-sm border cursor-pointer ${
                            item.isFeatured
                              ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                              : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          {item.isFeatured ? "🌟 Featured Mode (Paid)" : "📌 Normal Mode (Free)"}
                        </button>
                        <p className="text-[10px] text-slate-400 mt-1">Click to toggle display rank</p>
                      </td>

                      {/* Plan Type */}
                      <td className="p-4 min-w-[150px]">
                        {item.isPaid ? (
                          <div>
                            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 inline-block mb-1">
                              💳 PAID PACKAGE
                            </span>
                            <p className="text-[11px] font-semibold text-slate-600">{item.planName}</p>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 inline-block mb-1">
                              🎁 FREE SIGNUP
                            </span>
                            <p className="text-[11px] font-semibold text-slate-500">{item.planName}</p>
                          </div>
                        )}
                      </td>

                      {/* Status Toggle */}
                      <td className="p-4">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-sm border cursor-pointer ${
                            item.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                              : "bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100"
                          }`}
                        >
                          {item.status === "Active" ? "🟢 Active" : "🔴 Inactive"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}