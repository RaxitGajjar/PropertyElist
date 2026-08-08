"use client";

import React, { useState } from "react";

export default function AdminLeadInboxPage() {
  const [leads, setLeads] = useState([
    {
      id: "LEAD-301",
      customerName: "Kiran Shah",
      phone: "+91 98240 11111",
      property: "Property X (Aniket Elite)",
      hiddenSource: "Instagram Sponsored Ad", // 👈 ફક્ત એડમિન જ જોઈ શકશે (કસ્ટમરને અજાણ રાખવા)
      status: "Unassigned",
      assignedTo: "None",
    },
    {
      id: "LEAD-302",
      customerName: "Manoj Patel",
      phone: "+91 97230 22222",
      property: "Property Y (Luxuria Sky)",
      hiddenSource: "Google Search Ad", // 👈 ફક્ત એડમિન માટે
      status: "Unassigned",
      assignedTo: "None",
    },
  ]);

  const [builders] = useState([
    "Aniket Builder (Team A)",
    "Skyline Developers (Team B)",
    "In-house Sales Executive",
  ]);

  // 🤝 Assign Lead to Builder
  const handleAssign = (leadId: string, builderName: string) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId
          ? { ...lead, assignedTo: builderName, status: "Assigned" }
          : lead
      )
    );
    alert(`🎉 લીડ સફળતાપૂર્વક "${builderName}" ને અસાઇન થઈ ગઈ છે! (કસ્ટમરને પ્લેટફોર્મ સોર્સની ખબર નહીં પડે)`);
  };

  return (
    <div className="p-8 font-sans text-slate-900 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">📥 Admin Central Lead Inbox</h1>
        <p className="text-slate-500 mt-1">બધી જ સોશિયલ મીડિયા લીડ્સ પહેલાં અહીં આવશે. માત્ર તમે જ જોઈ શકશો કે કઈ લીડ ક્યાંથી આવી છે.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-sm">Incoming Unassigned Leads</h3>
          <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
            🔔 Admin Private Control Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-xs uppercase border-b border-slate-200">
                <th className="p-4">👤 Customer Details</th>
                <th className="p-4">🏢 Target Property</th>
                <th className="p-4">🔒 Hidden Source (Only For You)</th>
                <th className="p-4">⚙️ Assign to Builder/Team</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50 transition align-top">
                  <td className="p-4">
                    <p className="font-bold text-slate-900 text-base">{lead.customerName}</p>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">📞 {lead.phone}</p>
                  </td>

                  <td className="p-4">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 inline-block">
                      🎯 {lead.property}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-mono">
                      🕵️‍♂️ {lead.hiddenSource}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">કસ્ટમરની નજરે આ ગુપ્ત રહેશે</p>
                  </td>

                  <td className="p-4">
                    {lead.status === "Unassigned" ? (
                      <select
                        onChange={(e) => handleAssign(lead.id, e.target.value)}
                        defaultValue=""
                        className="p-2.5 border border-slate-300 bg-white rounded-xl text-xs font-bold text-slate-800 outline-none shadow-sm cursor-pointer hover:border-emerald-500"
                      >
                        <option value="" disabled>-- Select Builder to Assign --</option>
                        {builders.map((b, idx) => (
                          <option key={idx} value={b}>{b}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 inline-block">
                        ✅ Assigned to: {lead.assignedTo}
                      </span>
                    )}
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