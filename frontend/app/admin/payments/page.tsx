"use client";

import React from "react";
import Link from "next/link";
import { PaymentRecord } from "../properties/add/types";

export default function PaymentsPage() {
  const payments: PaymentRecord[] = [
    {
      id: "TXN-9081",
      userName: "Aniket Group",
      role: "Builder",
      packageName: "Builder Pro Plan",
      amountPaid: 25000,
      paymentMethod: "UPI",
      paymentDate: "01/01/2026",
      expiryDate: "31/12/2026",
      status: "Success",
    },
    {
      id: "TXN-8821",
      userName: "Rahul Patel",
      role: "Broker",
      packageName: "Broker Booster Plan",
      amountPaid: 10000,
      paymentMethod: "Card",
      paymentDate: "15/03/2026",
      expiryDate: "15/09/2026",
      status: "Success",
    },
    {
      id: "TXN-7612",
      userName: "Jay Shah",
      role: "Owner",
      packageName: "Owner Direct Plan",
      amountPaid: 2500,
      paymentMethod: "NetBanking",
      paymentDate: "01/07/2026",
      expiryDate: "01/10/2026",
      status: "Success",
    },
  ];

  const totalRevenue = payments.reduce((sum, p) => sum + p.amountPaid, 0);

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-6">
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
            <Link href="/admin/packages" className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white font-medium px-4 py-3 rounded-xl transition">
              📦 Packages & Users
            </Link>
            <Link href="/admin/payments" className="flex items-center gap-3 bg-emerald-600 text-white font-semibold px-4 py-3 rounded-xl transition shadow">
              💳 Payment History
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
            <h1 className="text-3xl font-extrabold text-slate-900">💳 Payment History & Accounts</h1>
            <p className="text-slate-500 mt-1">વેબસાઇટના તમામ પેકેજ સબ્સ્ક્રિપ્શન અને કલેક્શનનો હિસાબ</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 max-w-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Total Collection</p>
          <p className="text-4xl font-black text-emerald-600">₹{totalRevenue.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">Transactions List ({payments.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs uppercase border-b">
                  <th className="p-4">Txn ID</th>
                  <th className="p-4">User Details</th>
                  <th className="p-4">Package</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4 font-mono text-xs font-bold text-slate-600">{p.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{p.userName}</p>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded mt-0.5 inline-block font-semibold">{p.role}</span>
                    </td>
                    <td className="p-4 text-slate-700 font-medium">{p.packageName}</td>
                    <td className="p-4 font-black text-slate-900">₹{p.amountPaid.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-slate-600 text-sm">{p.paymentMethod}</td>
                    <td className="p-4 text-xs font-semibold text-slate-600">{p.expiryDate}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}