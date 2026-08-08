"use client";

import React from "react";
import { PropertyFormData } from "../types";

interface SeoSectionProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export default function SeoSection({ formData, setFormData }: SeoSectionProps) {
  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">
      <h2 className="text-2xl font-bold border-b border-slate-100 pb-4 mb-8 text-slate-900">
        🔍 SEO & Meta Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meta Title */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Meta Title (SEO Title)
          </label>
          <input
            type="text"
            value={(formData.metaTitle as string) || ""}
            onChange={(e) => updateField("metaTitle", e.target.value)}
            placeholder="Ex. Luxury 3 BHK Apartments in Science City | Aniket Elite"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
          <p className="text-[11px] text-slate-400 mt-1">Recommended length: 50-60 characters</p>
        </div>

        {/* Meta Keywords */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Meta Keywords
          </label>
          <input
            type="text"
            value={(formData.metaKeywords as string) || ""}
            onChange={(e) => updateField("metaKeywords", e.target.value)}
            placeholder="Ex. 3 bhk flat ahmedabad, science city property, luxury apartments"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
          <p className="text-[11px] text-slate-400 mt-1">Comma separated keywords for search engines</p>
        </div>

        {/* Meta Description */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Meta Description
          </label>
          <textarea
            rows={3}
            value={(formData.metaDescription as string) || ""}
            onChange={(e) => updateField("metaDescription", e.target.value)}
            placeholder="Write a short summary of the property for Google search results..."
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
          <p className="text-[11px] text-slate-400 mt-1">Recommended length: 150-160 characters</p>
        </div>
      </div>
    </div>
  );
}