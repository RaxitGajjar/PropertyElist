"use client";

import React, { useState, useEffect } from "react";

interface InquiryItem {
  id: string;
  customerName: string;
  phone: string;
  targetProperty: string;
  bhk: string;
  area: string;
  source: string;
  assignedUsers: string[];
}

interface RawApiLead {
  id?: string;
  clientName?: string;
  customerName?: string;
  phone?: string;
  targetProperty?: string;
  requirement?: string;
  location?: string;
  source?: string;
  assignedUsers?: string[];
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([
    {
      id: "LEAD-101",
      customerName: "Suresh Mehta",
      phone: "+91 98765 43210",
      targetProperty: "Property Y (Luxuria Sky - 3 BHK)",
      bhk: "3 BHK",
      area: "Science City, Ahmedabad",
      source: "📸 Instagram Sponsored Ad",
      assignedUsers: [],
    },
  ]);

  const allPropertiesList = [
    { propertyName: "Property X (Aniket Elite)", area: "Science City, Ahmedabad", owner: "Aniket Builder", type: "Paid (Featured)" },
    { propertyName: "Property Y (Luxuria Sky)", area: "Science City, Ahmedabad", owner: "Skyline Developers", type: "Paid (Featured)" },
    { propertyName: "Property Z (Commercial Hub)", area: "SG Highway, Ahmedabad", owner: "Apex Realities", type: "Free Customer" },
  ];

  useEffect(() => {
    const fetchLiveLeads = async () => {
      try {
        const res = await fetch("/api/admin/inquiries");
        if (res.ok) {
          const data: RawApiLead[] = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setInquiries((prevInquiries) => {
              const existingIds = new Set(prevInquiries.map((item) => item.id));
              const newItems = data.filter((item) => item.id && !existingIds.has(item.id));
              
              if (newItems.length > 0) {
                const formattedNewItems: InquiryItem[] = newItems.map((item) => ({
                  id: item.id || `LEAD-${Date.now()}`,
                  customerName: item.clientName || item.customerName || "Meta Ad Lead",
                  phone: item.phone || "+91 9876543210",
                  targetProperty: item.targetProperty || "Property X (Aniket Elite)",
                  bhk: item.requirement || "4 BHK",
                  area: item.location || "Science City, Ahmedabad",
                  source: item.source || "👥 Facebook Sponsored Ad",
                  assignedUsers: item.assignedUsers || [],
                }));
                return [...formattedNewItems, ...prevInquiries];
              }
              return prevInquiries;
            });
          }
        }
      } catch (error) {
        console.error("Error fetching live leads:", error);
      }
    };

    fetchLiveLeads();
    const interval = setInterval(fetchLiveLeads, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateAdLead = () => {
    const newAdLead: InquiryItem = {
      id: `LEAD-${Date.now()}`,
      customerName: "Rahul Sharma (Test Lead)",
      phone: "+91 99887 76655",
      targetProperty: "Property X (Aniket Elite - 4 BHK)",
      bhk: "4 BHK",
      area: "Science City, Ahmedabad",
      source: "👥 Facebook Sponsored Ad",
      assignedUsers: [],
    };

    setInquiries([newAdLead, ...inquiries]);
    alert("🟢 નવી ફેસબુક સ્પોન્સર્ડ એડ લીડ સફળતાપૂર્વક ઇનબોક્સમાં આવી ગઈ છે!");
  };

  const handleMultiAssign = (leadId: string, selectedProp: string) => {
    if (!selectedProp) return;
    setInquiries(
      inquiries.map((item) => {
        if (item.id === leadId) {
          if (item.assignedUsers.includes(selectedProp)) {
            alert(`આ પ્રોપર્ટીને પહેલેથી જ લીડ અસાઇન કરેલી છે!`);
            return item;
          }
          return {
            ...item,
            assignedUsers: [...item.assignedUsers, selectedProp],
          };
        }
        return item;
      })
    );
  };

  const handleRemoveAssign = (leadId: string, propToRemove: string) => {
    setInquiries(
      inquiries.map((item) => {
        if (item.id === leadId) {
          return {
            ...item,
            assignedUsers: item.assignedUsers.filter((p) => p !== propToRemove),
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="p-8 font-sans text-slate-900 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Live Ad Leads & Inquiries Inbox</h1>
          <p className="text-slate-500 mt-1">ફેસબુક અને ઇન્સ્ટાગ્રામ એડ્સમાંથી આવતી લીડ્સનું રિયલ-ટાઇમ મેનેજમેન્ટ</p>
        </div>

        <button
          onClick={handleSimulateAdLead}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl text-xs shadow-md transition cursor-pointer flex items-center gap-2"
        >
          ⚡ Simulate New FB/Insta Ad Lead
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-sm">
            Active Incoming Leads ({inquiries.length})
          </h3>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            🟢 Real-Time Webhook Listener Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-xs uppercase border-b border-slate-200">
                <th className="p-4">🌐 Ad Source</th>
                <th className="p-4">CLIENT DETAILS</th>
                <th className="p-4">🎯 TARGET PROPERTY</th>
                <th className="p-4">📍 SURROUNDING PROPERTIES (X & Y)</th>
                <th className="p-4">⚙️ ASSIGN TO PROPERTIES</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((item) => {
                const surroundingProps = allPropertiesList.filter((p) =>
                  item.area.toLowerCase().includes(p.area.split(",")[0].toLowerCase())
                );

                return (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition align-top">
                    <td className="p-4">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-900 text-white inline-block">
                        {item.source}
                      </span>
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-slate-900 text-base">{item.customerName}</p>
                      <p className="text-xs font-semibold text-blue-600 mt-0.5">{item.phone}</p>
                    </td>

                    <td className="p-4">
                      <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 inline-block mb-1">
                        👉 {item.targetProperty}
                      </span>
                      <p className="text-[11px] text-slate-500">Requirement: {item.bhk}</p>
                    </td>

                    <td className="p-4">
                      <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                        📍 {item.area}
                      </span>
                      <div className="text-[11px] text-slate-600 space-y-1">
                        <p className="font-bold text-slate-800">Available in Surrounding:</p>
                        {surroundingProps.map((sp, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            <span className="font-semibold">{sp.propertyName}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 min-w-[280px]">
                      <div className="space-y-2">
                        <select
                          onChange={(e) => handleMultiAssign(item.id, e.target.value)}
                          defaultValue=""
                          className="w-full p-2.5 border border-slate-300 bg-white rounded-xl text-xs font-bold text-slate-800 outline-none shadow-sm cursor-pointer hover:border-emerald-500"
                        >
                          <option value="" disabled>-- Select Property X or Y to Assign --</option>
                          {allPropertiesList.map((prop, idx) => (
                            <option key={idx} value={`${prop.propertyName} - ${prop.owner}`}>
                              {prop.propertyName} [{prop.area}]
                            </option>
                          ))}
                        </select>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.assignedUsers.length === 0 ? (
                            <span className="text-[11px] text-amber-600 font-bold">⚠️ Not assigned yet</span>
                          ) : (
                            item.assignedUsers.map((assignedProp, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm"
                              >
                                ✅ {assignedProp}
                                <button
                                  onClick={() => handleRemoveAssign(item.id, assignedProp)}
                                  className="text-rose-600 hover:text-rose-800 font-black ml-1 cursor-pointer"
                                >
                                  ×
                                </button>
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}