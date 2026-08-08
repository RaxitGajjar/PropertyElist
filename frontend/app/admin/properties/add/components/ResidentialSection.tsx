"use client";

import { useState } from "react";
import AreaInput from "./AreaTemp";
import { PropertyFormData, SectionProps } from "../types";

interface ResidentialSectionProps extends SectionProps {
  propertyType: string;
}

export default function ResidentialSection({
  propertyType,
  formData,
  setFormData,
}: ResidentialSectionProps) {
  const [totalFloors, setTotalFloors] = useState<number>(1);

  const updateField = (key: string, val: unknown) => {
    setFormData((prev: PropertyFormData) => ({
      ...prev,
      [key]: val,
    }));
  };

  return (
    <div className="font-sans">
      {/* Apartment & Penthouse */}
      {["Apartment", "Penthouse"].includes(propertyType) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">BHK</label>
            <select
              value={(formData.bhk as string) || ""}
              onChange={(e) => updateField("bhk", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="">Select BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
              <option value="5 BHK">5 BHK</option>
              <option value="6 BHK">6 BHK</option>
              <option value="7 BHK">7 BHK</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bedrooms</label>
            <select
              value={formData.bedrooms ? String(formData.bedrooms) : "1"}
              onChange={(e) => updateField("bedrooms", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bathrooms</label>
            <select
              value={formData.bathrooms ? String(formData.bathrooms) : "1"}
              onChange={(e) => updateField("bathrooms", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="7+">7+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Balcony</label>
            <select
              value={formData.balcony ? String(formData.balcony) : "0"}
              onChange={(e) => updateField("balcony", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Store Room</label>
            <select
              value={(formData.storeRoom as string) || "No"}
              onChange={(e) => updateField("storeRoom", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <AreaInput
            label="Carpet Area"
            value={formData.carpetArea ?? ""}
            unit={formData.carpetAreaUnit ?? "Sq.Ft."}
            onValueChange={(val) => updateField("carpetArea", val)}
            onUnitChange={(unit) => updateField("carpetAreaUnit", unit)}
          />

          <AreaInput
            label="Built-up Area"
            value={formData.builtupArea ?? ""}
            unit={formData.builtupAreaUnit ?? "Sq.Ft."}
            onValueChange={(val) => updateField("builtupArea", val)}
            onUnitChange={(unit) => updateField("builtupAreaUnit", unit)}
          />

          <AreaInput
            label="Super Built-up Area"
            value={formData.superBuiltupArea ?? ""}
            unit={formData.superBuiltupAreaUnit ?? "Sq.Ft."}
            onValueChange={(val) => updateField("superBuiltupArea", val)}
            onUnitChange={(unit) => updateField("superBuiltupAreaUnit", unit)}
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Facing</label>
            <select
              value={(formData.facing as string) || "East"}
              onChange={(e) => updateField("facing", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="North-East">North-East</option>
              <option value="North-West">North-West</option>
              <option value="South-East">South-East</option>
              <option value="South-West">South-West</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Total Floors</label>
            <select
              value={totalFloors}
              onChange={(e) => {
                const num = Number(e.target.value);
                setTotalFloors(num);
                updateField("totalFloors", num);
              }}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              {Array.from({ length: 42 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Property Floor</label>
            <select
              value={(formData.propertyFloor as string) || "Ground Floor"}
              onChange={(e) => updateField("propertyFloor", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="Ground Floor">Ground Floor</option>
              {Array.from({ length: totalFloors }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Parking</label>
            <select
              value={formData.parking ? String(formData.parking) : "0"}
              onChange={(e) => updateField("parking", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="4+">4+</option>
            </select>
          </div>
        </div>
      )}

      {/* Villa / Bungalow / Row House */}
      {["Villa", "Bungalow", "Row House"].includes(propertyType) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">BHK</label>
            <select
              value={(formData.bhk as string) || ""}
              onChange={(e) => updateField("bhk", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="">Select BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
              <option value="5 BHK">5 BHK</option>
              <option value="6 BHK">6 BHK</option>
              <option value="7 BHK">7 BHK</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bedrooms</label>
            <select
              value={formData.bedrooms ? String(formData.bedrooms) : "1"}
              onChange={(e) => updateField("bedrooms", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bathrooms</label>
            <select
              value={formData.bathrooms ? String(formData.bathrooms) : "1"}
              onChange={(e) => updateField("bathrooms", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="7+">7+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Balcony</label>
            <select
              value={formData.balcony ? String(formData.balcony) : "0"}
              onChange={(e) => updateField("balcony", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <AreaInput
            label="Plot Area"
            value={formData.plotArea ?? ""}
            unit={formData.plotAreaUnit ?? "Sq.Ft."}
            onValueChange={(val) => updateField("plotArea", val)}
            onUnitChange={(unit) => updateField("plotAreaUnit", unit)}
          />

          <AreaInput
            label="Construction Area"
            value={formData.constructionArea ?? ""}
            unit={formData.constructionAreaUnit ?? "Sq.Ft."}
            onValueChange={(val) => updateField("constructionArea", val)}
            onUnitChange={(unit) => updateField("constructionAreaUnit", unit)}
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Facing</label>
            <select
              value={(formData.facing as string) || "East"}
              onChange={(e) => updateField("facing", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="North-East">North-East</option>
              <option value="North-West">North-West</option>
              <option value="South-East">South-East</option>
              <option value="South-West">South-West</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Pooja Room</label>
            <select
              value={(formData.poojaRoom as string) || "No"}
              onChange={(e) => updateField("poojaRoom", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Store Room</label>
            <select
              value={(formData.storeRoom as string) || "No"}
              onChange={(e) => updateField("storeRoom", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Lift</label>
            <select
              value={(formData.lift as string) || "No"}
              onChange={(e) => updateField("lift", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Parking</label>
            <select
              value={formData.parking ? String(formData.parking) : "0"}
              onChange={(e) => updateField("parking", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="4+">4+</option>
            </select>
          </div>
        </div>
      )}

      {/* Plot */}
      {propertyType === "Plot" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AreaInput
            label="Plot Area"
            value={formData.plotArea ?? ""}
            unit={formData.plotAreaUnit ?? "Sq.Ft."}
            onValueChange={(val) => updateField("plotArea", val)}
            onUnitChange={(unit) => updateField("plotAreaUnit", unit)}
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Plot Type</label>
            <select
              value={(formData.plotType as string) || "Agriculture"}
              onChange={(e) => updateField("plotType", e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="Agriculture">Agriculture</option>
              <option value="Non Agriculture (NA)">Non Agriculture (NA)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}