"use client";

import React from "react";
import Link from "next/link";

export default function PackagesPage() {
  // ૧. બિલ્ડર્સ, બ્રોકર્સ અને તેમની લાઈવ ચાલી રહેલી પ્રોપર્ટીઝનો ડેટા
  const activeSubscribers = [
    {
      id: "sub-1",
      name: "Aniket Group",
      role: "Builder",
      packageName: "Pro Builder Plan",
      totalAllowedProperties: 10,
      activeProperties: [
        { id: "p1", title: "Aniket Elite", location: "Science City, Ahmedabad", type: "Commercial" },
        { id: "p2", title: "Aniket Sky", location: "SG Highway, Ahmedabad", type: "3 BHK Apartment" },
      ],
    },
    {
      id: "sub-2",
      name: "Rahul Patel",
      role: "Broker",
      packageName: "Agent Booster Plan",
      totalAllowedProperties: 5,
      activeProperties: [
        { id: "p3", title: "Luxuria Heights", location: "Bodakdev, Ahmedabad", type: "4 BHK Flat" },
      ],
    },
    {
      id: "sub-3",
      name: "Jay Shah",
      role: "Owner",
      packageName: "Owner Direct Plan",
      totalAllowedProperties: 1,
      activeProperties: [
        { id: "p4", title: "Independent Villa", location: "Bopal, Ahmedabad", type: "Villa" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-6 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-10 border-b border-slate-800 pb-5">
            <span className="text-2xl font-black bg-emerald-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg">
              P
            </span>
            <span className="text-xl font-bold tracking-wide">PropertyElist</span>
          </div>

          <nav className="space-y-2">
            <Link href="/admin/dashboard" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition">
              📊 Dashboard
            </Link>
            <Link href="/admin/properties" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition">
              🏢 All Properties
            </Link>
            <Link href="/admin/properties/add" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition">
              ➕ Add Property
            </Link>
            <Link href="/admin/inquiries" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition">
              📩 Leads / Inquiries
            </Link>
            <Link href="/admin/packages" className="flex items-center gap-3 bg-emerald-600 text-white font-semibold px-4 py-3 rounded-xl transition shadow">
              📦 Packages & Tracking
            </Link>
            <Link href="/admin/payments" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition">
              💳 Payment History
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition">
              ⚙️ Security & Settings
            </Link>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition uppercase tracking-widest">
            ← Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">📦 Package & Property Tracking</h1>
            <p className="text-slate-500 mt-1">બિલ્ડરે પેકેજ લીધું હોય તેની કઈ-કઈ પ્રોપર્ટી ચાલે છે તેનો લાઈવ હિસાબ</p>
          </div>
        </div>

        {/* Builder & Agent Property Usage Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeSubscribers.map((item) => {
            const usedCount = item.activeProperties.length;
            const percentage = (usedCount / item.totalAllowedProperties) * 100;

            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                {/* Top Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">{item.name}</h2>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.packageName}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Property Limit Used</span>
                    <p className="text-lg font-black text-slate-900">
                      {usedCount} / {item.totalAllowedProperties}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Active Properties List for this Builder */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    🏢 Live Running Properties ({usedCount})
                  </h3>

                  <div className="space-y-2">
                    {item.activeProperties.map((prop) => (
                      <div key={prop.id} className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{prop.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">📍 {prop.location}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
                          Active Scheme
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}