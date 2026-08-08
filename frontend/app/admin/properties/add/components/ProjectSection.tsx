"use client";

import { PropertyFormData } from "../types";

interface ProjectSectionProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<PropertyFormData>
  >;
}

export default function ProjectSection({
  formData,
  setFormData,
}: ProjectSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">

      <h2 className="text-2xl font-bold mb-8 border-b border-slate-100 pb-4 text-slate-900">
        🏢 Project Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Project Name *
          </label>

          <input
            type="text"
            value={formData.projectName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                projectName: e.target.value,
              }))
            }
            placeholder="Ex. Aniket Elite"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Developer Name
          </label>

          <input
            type="text"
            value={formData.developerName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                developerName: e.target.value,
              }))
            }
            placeholder="Ex. Aniket Developers"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Property Title *
          </label>

          <input
            type="text"
            value={formData.propertyTitle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                propertyTitle: e.target.value,
              }))
            }
            placeholder="Ex. Premium 2 BHK Apartments Near Science City"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

      </div>

    </div>
  );
}