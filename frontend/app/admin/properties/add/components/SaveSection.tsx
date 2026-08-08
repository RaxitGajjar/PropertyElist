"use client";

import React, { useState } from "react";
import { PropertyFormData } from "../types";

interface SaveSectionProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export default function SaveSection({ formData }: SaveSectionProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (status: "Published" | "Draft") => {
    setLoading(true);

    try {
      const updatedFormData: Record<string, unknown> = {
        ...formData,
        status: status,
      };

      const submitData = new FormData();

      Object.keys(updatedFormData).forEach((key) => {
        const value = updatedFormData[key];
        if (
          key !== "coverImage" &&
          key !== "galleryImages" &&
          key !== "floorPlans" &&
          key !== "masterPlan" &&
          key !== "brochure" &&
          key !== "projectVideo" &&
          value !== null &&
          value !== undefined
        ) {
          if (Array.isArray(value)) {
            submitData.append(key, JSON.stringify(value));
          } else {
            submitData.append(key, String(value));
          }
        }
      });

      // Files append કરો
      if (formData.coverImage) submitData.append("coverImage", formData.coverImage);
      if (formData.masterPlan) submitData.append("masterPlan", formData.masterPlan);
      if (formData.brochure) submitData.append("brochure", formData.brochure);
      if (formData.projectVideo) submitData.append("projectVideo", formData.projectVideo);

      if (formData.galleryImages?.length) {
        formData.galleryImages.forEach((file) => submitData.append("galleryImages", file));
      }
      if (formData.floorPlans?.length) {
        formData.floorPlans.forEach((file) => submitData.append("floorPlans", file));
      }

      console.log(`Submitting Property as ${status}:`, updatedFormData);

      alert(`Property ${status === "Draft" ? "Saved as Draft" : "Published"} successfully!`);
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Something went wrong while saving!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 font-sans">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Ready to Publish?</h3>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">
          Save as draft to complete later, or publish directly to frontend.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <button
          type="button"
          onClick={() => {
            if (confirm("Are you sure you want to reset all fields?")) {
              window.location.reload();
            }
          }}
          disabled={loading}
          className="px-5 py-3.5 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 transition disabled:opacity-50 cursor-pointer"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={() => handleSubmit("Draft")}
          disabled={loading}
          className="px-6 py-3.5 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-600 transition shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : "Save as Draft"}
        </button>

        <button
          type="button"
          onClick={() => handleSubmit("Published")}
          disabled={loading}
          className="px-7 py-3.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-500 transition shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Publishing..." : "Publish Property"}
        </button>
      </div>
    </div>
  );
}