"use client";

import React from "react";
import { PropertyFormData, SectionProps } from "../types";
import ResidentialSection from "./ResidentialSection";
import CommercialSection from "./CommercialSection";
import IndustrialSection from "./IndustrialSection";

export default function PropertyDetailsSection({
  formData,
  setFormData,
}: SectionProps) {
  const currentPropertyType = formData.propertyType || "Apartment";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">
      <h2 className="text-2xl font-bold border-b border-slate-100 pb-4 mb-8 text-slate-900">
        🏠 Property Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Property Type *
          </label>

          <select
            value={currentPropertyType}
            onChange={(e) =>
              setFormData((prev: PropertyFormData) => ({
                ...prev,
                propertyType: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          >
            <option value="Apartment">Apartment</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Villa">Villa</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Row House">Row House</option>
            <option value="Plot">Plot</option>
            <option value="Shop">Shop</option>
            <option value="Showroom">Showroom</option>
            <option value="Commercial Office">Commercial Office</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Industrial Shed">Industrial Shed</option>
          </select>
        </div>
      </div>

      {/* Residential */}
      {[
        "Apartment",
        "Penthouse",
        "Villa",
        "Bungalow",
        "Row House",
        "Plot",
      ].includes(currentPropertyType) && (
        <ResidentialSection
          propertyType={currentPropertyType}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Commercial */}
      {[
        "Shop",
        "Showroom",
        "Commercial Office",
      ].includes(currentPropertyType) && (
        <CommercialSection
          propertyType={currentPropertyType}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Industrial */}
      {[
        "Warehouse",
        "Industrial Shed",
      ].includes(currentPropertyType) && (
        <IndustrialSection
          propertyType={currentPropertyType}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
}