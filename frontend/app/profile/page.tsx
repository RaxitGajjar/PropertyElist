"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  status: string;
  leadsCount: number;
  views: number;
}

function ProfileContent() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams?.get("tab");

  // સીધું ઇનિશિયલ સ્ટેટમાં જ URL ની વેલ્યુ સેટ કરી દીધી (useEffect ની જરૂર નથી)
  const [activeTab, setActiveTab] = useState(tabFromUrl || "activity");

  // Mock User Data
  const user = {
    name: "Aniket Builder",
    email: "aniket@propertyelist.com",
    phone: "+91 98250 12345",
    role: "Luxury Real Estate Developer",
    packageDetails: {
      name: "Gold Pro Builder Package",
      purchaseDate: "15 June 2026",
      expiryDate: "15 June 2027",
      status: "Active",
      billNumber: "INV-2026-8849",
      amountPaid: "₹ 15,000"
    }
  };

  // User's Properties Listing
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Aniket Elite Luxury Apartment",
      location: "Science City Circle, Ahmedabad",
      price: "₹ 1.25 Cr",
      status: "Active",
      leadsCount: 14,
      views: 320
    },
    {
      id: 2,
      title: "Science City Commercial Shop",
      location: "Science City Circle, Ahmedabad",
      price: "₹ 75 Lakhs",
      status: "Deactive",
      leadsCount: 3,
      views: 95
    }
  ]);

  // Editing Property State
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleEditClick = (prop: Property) => {
    setEditingProperty(prop);
    setEditTitle(prop.title);
    setEditPrice(prop.price);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    setProperties(properties.map(p => {
      if (p.id === editingProperty.id) {
        return { ...p, title: editTitle, price: editPrice };
      }
      return p;
    }));
    setEditingProperty(null);
    alert("Property updated successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordMsg("Please fill in all fields.");
      return;
    }
    setPasswordMsg("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="PropertyELIST" 
              className="h-36 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-700 uppercase">Welcome, {user.name}</span>
            <Link href="/" className="bg-slate-900 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded transition hover:bg-emerald-600">
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit space-y-2">
          <button
            onClick={() => setActiveTab("activity")}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
              activeTab === "activity" ? "bg-emerald-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            📊 My Activity & Leads Inquiries
          </button>
          <button
            onClick={() => setActiveTab("listings")}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
              activeTab === "listings" ? "bg-emerald-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            🏠 Active & Deactive Properties
          </button>
          <button
            onClick={() => setActiveTab("package")}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
              activeTab === "package" ? "bg-emerald-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            📦 Package, Expiry & Tax Invoice
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
              activeTab === "settings" ? "bg-emerald-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            ⚙️ Security & Change Password
          </button>
        </aside>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-8">
          
          {/* TAB 1: MY ACTIVITY */}
          {activeTab === "activity" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest block mb-1">Analytics</span>
                  <h2 className="text-2xl font-light uppercase tracking-wide text-slate-900">My Activity & Leads Inquiries</h2>
                </div>
                <span className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold px-4 py-2 rounded-full">
                  Total Leads Received: 17
                </span>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-slate-900">Ramesh Bhai (Inquiry)</h4>
                    <p className="text-xs text-slate-500">Inquired about Aniket Elite Apartments • 10 mins ago</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">New Lead</span>
                </div>
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-slate-900">Ketan Shah (Broker Lead)</h4>
                    <p className="text-xs text-slate-500">Requested a call back for commercial listing • 2 hours ago</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Connected</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROPERTIES */}
          {activeTab === "listings" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest block mb-1">Portfolio</span>
                  <h2 className="text-2xl font-light uppercase tracking-wide text-slate-900">Active & Deactive Properties</h2>
                </div>

                <div className="space-y-4">
                  {properties.map((prop) => (
                    <div key={prop.id} className="border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base font-bold text-slate-900 uppercase">{prop.title}</h3>
                          <span className={`text-[9px] font-black px-2 py-0.5 uppercase tracking-widest rounded ${
                            prop.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                          }`}>
                            {prop.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">📍 {prop.location} (Location Locked)</p>
                        <div className="flex gap-4 mt-2 text-xs font-bold text-slate-700">
                          <span>💰 Price: {prop.price}</span>
                          <span>🔥 Leads: {prop.leadsCount} Inquiries</span>
                          <span>👀 Views: {prop.views}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleEditClick(prop)}
                        className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition shadow cursor-pointer"
                      >
                        Edit Property
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PACKAGE */}
          {activeTab === "package" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
              <div>
                <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest block mb-1">Subscription Details</span>
                <h2 className="text-2xl font-light uppercase tracking-wide text-slate-900">Package, Expiry & Tax Invoice</h2>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{user.packageDetails.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded inline-block mt-1">
                      {user.packageDetails.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase font-bold">Amount Paid</p>
                    <p className="text-lg font-black text-emerald-600">{user.packageDetails.amountPaid}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500 uppercase font-bold">Purchase Date:</p>
                    <p className="font-semibold text-slate-800">{user.packageDetails.purchaseDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 uppercase font-bold">Package Expiry Date:</p>
                    <p className="font-semibold text-rose-600">{user.packageDetails.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 uppercase font-bold">Invoice / Bill Number:</p>
                    <p className="font-semibold text-slate-800">{user.packageDetails.billNumber}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button 
                    onClick={() => alert("Downloading official tax invoice PDF...")}
                    className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded transition shadow cursor-pointer"
                  >
                    📄 Download Tax Invoice (Bill)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY */}
          {activeTab === "settings" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
              <div>
                <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest block mb-1">Account Security</span>
                <h2 className="text-2xl font-light uppercase tracking-wide text-slate-900">Security & Change Password</h2>
              </div>

              {passwordMsg && (
                <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-900 text-xs font-bold">
                  {passwordMsg}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Current Password</label>
                  <input 
                    type="password" 
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">New Password</label>
                  <input 
                    type="password" 
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition shadow cursor-pointer"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}

        </div>

      </main>

      {/* EDIT MODAL */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white border border-slate-200 p-8 max-w-md w-full rounded-2xl shadow-2xl text-slate-900 relative">
            <button 
              onClick={() => setEditingProperty(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-base cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full inline-block mb-2">
                🔒 Location Security Lock Active
              </span>
              <h3 className="text-xl font-bold uppercase text-slate-900">Edit Property Details</h3>
              <p className="text-xs text-slate-500 mt-1">Title and price can be updated, but location is permanently locked for data integrity.</p>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Property Title *</label>
                <input 
                  type="text" 
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Location (Locked / Unchangeable)</label>
                <input 
                  type="text" 
                  disabled
                  value={editingProperty.location}
                  className="w-full bg-slate-200 border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Price *</label>
                <input 
                  type="text" 
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function UserPrivateProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-slate-500 uppercase tracking-widest text-xs">Loading Profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}