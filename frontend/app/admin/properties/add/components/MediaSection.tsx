"use client";

import React from "react";
import { PropertyFormData } from "../types";

interface Props {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export default function MediaSection({ formData, setFormData }: Props) {
  const handleSingleFile = (key: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const handleMultipleFiles = (key: string, fileList: FileList | null) => {
    if (!fileList) return;
    const filesArray = Array.from(fileList);
    setFormData((prev) => ({
      ...prev,
      [key]: filesArray,
    }));
  };

  const handleTextChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">
      <h2 className="text-2xl font-bold border-b border-slate-100 pb-4 mb-8 text-slate-900">
        🖼 Images & Media
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cover Image */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleSingleFile("coverImage", e.target.files?.[0] || null)
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-xs font-semibold text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 focus:outline-none transition cursor-pointer"
          />
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Gallery Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleMultipleFiles("galleryImages", e.target.files)}
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-xs font-semibold text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 focus:outline-none transition cursor-pointer"
          />
        </div>

        {/* Floor Plan */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Floor Plan
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleMultipleFiles("floorPlans", e.target.files)}
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-xs font-semibold text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 focus:outline-none transition cursor-pointer"
          />
        </div>

        {/* Master Plan */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Master Plan
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleSingleFile("masterPlan", e.target.files?.[0] || null)
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-xs font-semibold text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 focus:outline-none transition cursor-pointer"
          />
        </div>

        {/* Brochure */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Brochure PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              handleSingleFile("brochure", e.target.files?.[0] || null)
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-xs font-semibold text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 focus:outline-none transition cursor-pointer"
          />
        </div>

        {/* Video */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Project Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) =>
              handleSingleFile("projectVideo", e.target.files?.[0] || null)
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 text-xs font-semibold text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 focus:outline-none transition cursor-pointer"
          />
        </div>

        {/* YouTube */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={(formData.youtubeUrl as string) || ""}
            onChange={(e) => handleTextChange("youtubeUrl", e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* 360 Tour */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            360° Virtual Tour URL
          </label>
          <input
            type="url"
            value={(formData.virtualTourUrl as string) || ""}
            onChange={(e) => handleTextChange("virtualTourUrl", e.target.value)}
            placeholder="https://..."
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>
    </div>
  );
}