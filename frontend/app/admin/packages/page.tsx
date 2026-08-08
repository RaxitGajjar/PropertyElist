"use client";

import React, { useState } from "react";

export default function PackagesPage() {
  // 💾 Save Notification State
  const [saveMessage, setSaveMessage] = useState(false);

  // 💰 ૧. રોલ વાઇઝ ડ્યુરેશન પેકેજ કંટ્રોલર (All Editable)
  const [rolePackages, setRolePackages] = useState({
    Builder: [
      { id: "b-3", duration: "3 Months", price: 15000, limit: 10 },
      { id: "b-6", duration: "6 Months", price: 25000, limit: 15 },
      { id: "b-12", duration: "12 Months", price: 45000, limit: 25 },
    ],
    Broker: [
      { id: "br-1", duration: "1 Month", price: 3000, limit: 3 },
      { id: "br-3", duration: "3 Months", price: 8000, limit: 5 },
      { id: "br-6", duration: "6 Months", price: 14000, limit: 10 },
    ],
    Owner: [
      { id: "o-1", duration: "1 Month", price: 1000, limit: 1 },
      { id: "o-3", duration: "3 Months", price: 2500, limit: 2 },
      { id: "o-6", duration: "6 Months", price: 4500, limit: 3 },
    ],
  });

  // 👥 ૨. યુઝર્સનો ડેટા
  const [subscribers, setSubscribers] = useState([
    {
      id: "SUB-101",
      name: "Aniket Group",
      phone: "+91 98765 43210",
      email: "contact@aniketgroup.com",
      address: "Science City, S.G. Highway, Ahmedabad",
      role: "Builder",
      duration: "6 Months",
      packageAmount: 25000,
      isFreeUser: false,
      totalAllowed: 15,
      remark: "Verified Builder. Paid via Cheque.",
      billFile: "invoice_aniket_101.pdf",
      activeListings: [
        { id: "P1", title: "Aniket Elite", location: "Science City" },
        { id: "P2", title: "Aniket Sky", location: "SG Highway" },
      ],
      signupDate: "2026-08-01",
    },
    {
      id: "SUB-102",
      name: "Rahul Patel",
      phone: "+91 91234 56789",
      email: "rahul.realty@gmail.com",
      address: "Bodakdev, Ahmedabad",
      role: "Broker",
      duration: "3 Months",
      packageAmount: 8000,
      isFreeUser: false,
      totalAllowed: 5,
      remark: "Requested extra limit.",
      billFile: "",
      activeListings: [
        { id: "P3", title: "Luxuria Heights", location: "Bodakdev" },
      ],
      signupDate: "2026-08-03",
    },
    {
      id: "SUB-103",
      name: "Ramesh Bhai",
      phone: "+91 99887 76655",
      email: "ramesh.owner@gmail.com",
      address: "Satellite, Ahmedabad",
      role: "Owner",
      duration: "1 Month (Free Trial)",
      packageAmount: 0,
      isFreeUser: true,
      totalAllowed: 1,
      remark: "Direct Free Signup",
      billFile: "",
      activeListings: [
        { id: "P4", title: "2 BHK Flat in Satellite", location: "Satellite" },
      ],
      signupDate: "2026-08-06",
    },
  ]);

  // 🔍 ૩. ફિલ્ટર્સ સ્ટેટ
  const [planFilter, setPlanFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // 💾 સેવ એક્શન હેન્ડલર
  const handleSaveChanges = () => {
    setSaveMessage(true);
    setTimeout(() => {
      setSaveMessage(false);
    }, 3000);
  };

  // ⚙️ પેકેજ પ્રાઈસ અને પ્રોપર્ટી લિમિટ એડિટ હેન્ડલર
  const handleRolePackageEdit = (
    role: "Builder" | "Broker" | "Owner",
    id: string,
    field: "price" | "limit",
    value: number
  ) => {
    setRolePackages((prev) => ({
      ...prev,
      [role]: prev[role].map((pkg) =>
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      ),
    }));
  };

  // યુઝર લિમિટ એડિટ
  const handleLimitChange = (id: string, newLimit: number) => {
    setSubscribers((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, totalAllowed: newLimit } : sub))
    );
  };

  // રીમાર્ક ચેન્જ
  const handleRemarkChange = (id: string, newRemark: string) => {
    setSubscribers((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, remark: newRemark } : sub))
    );
  };

  // બિલ અપલોડ
  const handleBillUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSubscribers((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, billFile: file.name } : sub))
      );
      alert(`Bill "${file.name}" uploaded successfully!`);
    }
  };

  // પાસવર્ડ રીસેટ
  const handleResetPassword = (email: string) => {
    alert(`Password reset link sent to: ${email}`);
  };

  // 🔍 ફિલ્ટર ડેટા
  const filteredSubscribers = subscribers.filter((user) => {
    if (planFilter === "PAID" && user.isFreeUser) return false;
    if (planFilter === "FREE" && !user.isFreeUser) return false;

    if (roleFilter !== "ALL" && user.role !== roleFilter) return false;

    if (
      searchTerm &&
      !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user.phone.includes(searchTerm) &&
      !user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="p-8 font-sans text-slate-900 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">📦 Package Duration & Pricing Control</h1>
          <p className="text-slate-500 mt-1">બિલ્ડર (3,6,12M), બ્રોકર (1,3,6M) અને ઓનર (1,3,6M) ના પ્લાન, ભાવ અને પ્રોપર્ટી લિમિટ સેટ કરો</p>
        </div>

        {/* 💾 MAIN SAVE BUTTON */}
        <button
          onClick={handleSaveChanges}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2 text-sm cursor-pointer"
        >
          💾 Save All Changes
        </button>
      </div>

      {/* 🔔 Success Alert Message */}
      {saveMessage && (
        <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold rounded-xl flex items-center gap-2 shadow-sm">
          ✅ બધા ફેરફારો, પેકેજ પ્રાઈસ અને રીમાર્ક્સ સફળતાપૂર્વક સેવ થઈ ગયા છે!
        </div>
      )}

      {/* ⚙️ SECTION 1: EDITABLE PACKAGES (DURATION WISE) */}
      <div className="space-y-6 mb-8">
        {/* Builder Plans */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            🏢 Builder Plans <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">3, 6, 12 Months</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rolePackages.Builder.map((pkg) => (
              <div key={pkg.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                <span className="font-bold text-slate-800 block text-sm">📅 {pkg.duration} Plan</span>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handleRolePackageEdit("Builder", pkg.id, "price", Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 bg-white rounded-lg font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Allowed Properties</label>
                  <input
                    type="number"
                    value={pkg.limit}
                    onChange={(e) => handleRolePackageEdit("Builder", pkg.id, "limit", Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 bg-white rounded-lg font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Broker Plans */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            💼 Broker / Agent Plans <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">1, 3, 6 Months</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rolePackages.Broker.map((pkg) => (
              <div key={pkg.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                <span className="font-bold text-slate-800 block text-sm">📅 {pkg.duration} Plan</span>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handleRolePackageEdit("Broker", pkg.id, "price", Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 bg-white rounded-lg font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Allowed Properties</label>
                  <input
                    type="number"
                    value={pkg.limit}
                    onChange={(e) => handleRolePackageEdit("Broker", pkg.id, "limit", Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 bg-white rounded-lg font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Owner Plans */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            🏡 Direct Owner Plans <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">1, 3, 6 Months</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rolePackages.Owner.map((pkg) => (
              <div key={pkg.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                <span className="font-bold text-slate-800 block text-sm">📅 {pkg.duration} Plan</span>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handleRolePackageEdit("Owner", pkg.id, "price", Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 bg-white rounded-lg font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Allowed Properties</label>
                  <input
                    type="number"
                    value={pkg.limit}
                    onChange={(e) => handleRolePackageEdit("Owner", pkg.id, "limit", Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 bg-white rounded-lg font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔍 SECTION 2: FILTERS & SEARCH */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">🔍 Search & Filter Registered Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Search User / Contact</label>
            <input
              type="text"
              placeholder="Search name, phone, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Plan Type</label>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="ALL">All Users (Free + Paid)</option>
              <option value="PAID">Paid Packages Only</option>
              <option value="FREE">Free Signups Only</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">User Category</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="ALL">All Roles (Builder, Broker, Owner)</option>
              <option value="Builder">Builders</option>
              <option value="Broker">Brokers</option>
              <option value="Owner">Owners</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📑 SECTION 3: USERS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Users & Subscriptions List ({filteredSubscribers.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-xs uppercase border-b border-slate-200">
                <th className="p-4">👤 User Details</th>
                <th className="p-4">📦 Plan Duration & Price</th>
                <th className="p-4">🏢 Active Listings</th>
                <th className="p-4">📄 Invoice / Bill</th>
                <th className="p-4">🔑 Security</th>
                <th className="p-4">📝 Remark</th>
                <th className="p-4 text-center">💾 Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition align-top">
                  <td className="p-4 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900">{item.name}</span>
                      {item.isFreeUser ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">FREE</span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">PAID</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">📞 {item.phone}</p>
                    <p className="text-xs text-slate-500">✉️ {item.email}</p>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded mt-1 inline-block font-semibold">
                      Role: {item.role}
                    </span>
                  </td>

                  <td className="p-4 min-w-[150px]">
                    <p className="font-bold text-slate-800 text-sm">📅 {item.duration}</p>
                    <span className="text-sm font-extrabold text-emerald-600 block mt-1">
                      ₹ {item.packageAmount.toLocaleString()}
                    </span>
                  </td>

                  <td className="p-4 min-w-[180px]">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="number"
                        value={item.totalAllowed}
                        onChange={(e) => handleLimitChange(item.id, Number(e.target.value))}
                        className="w-14 p-1.5 border border-slate-200 bg-slate-50 rounded-lg font-bold text-slate-800 text-center text-xs outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-slate-500 font-semibold">Max Limit</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 mb-1">
                      Running: {item.activeListings.length} / {item.totalAllowed}
                    </p>
                    <div className="space-y-1">
                      {item.activeListings.map((list) => (
                        <div key={list.id} className="text-[11px] p-1.5 rounded bg-slate-100 text-slate-700 font-medium">
                          🏢 {list.title}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 min-w-[160px]">
                    {item.billFile ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                          📄 {item.billFile}
                        </span>
                        <label className="text-[11px] text-blue-600 hover:underline cursor-pointer font-semibold">
                          Re-upload Bill
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg"
                            onChange={(e) => handleBillUpload(item.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    ) : (
                      <div>
                        <label className="cursor-pointer inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl transition">
                          📤 Upload Bill
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg"
                            onChange={(e) => handleBillUpload(item.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleResetPassword(item.email)}
                      className="px-3 py-2 bg-amber-50 text-amber-700 border border-amber-300 rounded-xl text-xs font-bold hover:bg-amber-100 transition cursor-pointer"
                    >
                      🔑 Reset
                    </button>
                  </td>

                  <td className="p-4 min-w-[180px]">
                    <textarea
                      rows={2}
                      value={item.remark}
                      onChange={(e) => handleRemarkChange(item.id, e.target.value)}
                      placeholder="Add admin note..."
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50 focus:bg-white transition"
                    />
                  </td>

                  {/* 💾 ROW SAVE BUTTON */}
                  <td className="p-4 text-center">
                    <button
                      onClick={handleSaveChanges}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      💾 Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}