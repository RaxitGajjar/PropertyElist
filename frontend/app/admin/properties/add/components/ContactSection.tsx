"use client";

import React from "react";
import { PropertyFormData } from "../types";

interface Props {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export default function ContactSection({ formData, setFormData }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">
      <h2 className="text-2xl font-bold border-b border-slate-100 pb-4 mb-8 text-slate-900">
        📞 Contact Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Person Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Contact Person Name
          </label>
          <input
            type="text"
            value={(formData.contactName as string) ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactName: e.target.value,
              }))
            }
            placeholder="e.g. Rahul Sharma"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={(formData.contactPhone as string) ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactPhone: e.target.value,
              }))
            }
            placeholder="+91 98765 43210"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={(formData.whatsappNumber as string) ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                whatsappNumber: e.target.value,
              }))
            }
            placeholder="+91 98765 43210"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={(formData.contactEmail as string) ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactEmail: e.target.value,
              }))
            }
            placeholder="contact@builder.com"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>
    </div>
  );
}