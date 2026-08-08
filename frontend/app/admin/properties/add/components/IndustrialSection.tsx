"use client";

import React from "react";
import AreaInput from "./AreaTemp";
import { PropertyFormData } from "../types";

interface Props {
  propertyType: string;
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export default function IndustrialSection({
  propertyType,
  formData,
  setFormData,
}: Props) {
  return (
    <div className="font-sans">
      {/* Warehouse */}
      {propertyType === "Warehouse" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AreaInput
            label="Plot Area"
            value={formData.plotArea ?? ""}
            unit={formData.plotAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                plotArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                plotAreaUnit: unit,
              }))
            }
          />

          <AreaInput
            label="Construction Area"
            value={formData.constructionArea ?? ""}
            unit={formData.constructionAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                constructionArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                constructionAreaUnit: unit,
              }))
            }
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Shed Height (Feet)
            </label>
            <input
              type="number"
              value={(formData.shedHeight as string | number) ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shedHeight: e.target.value,
                }))
              }
              placeholder="Ex. 25"
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Washroom
            </label>
            <select
              value={formData.washrooms ? String(formData.washrooms) : "1"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  washrooms: e.target.value,
                }))
              }
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5+">5+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Store Room
            </label>
            <select
              value={(formData.storeRoom as string) ?? "No"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  storeRoom: e.target.value,
                }))
              }
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Parking
            </label>
            <select
              value={formData.parking ? String(formData.parking) : "0"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  parking: e.target.value,
                }))
              }
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

      {/* Industrial Shed */}
      {propertyType === "Industrial Shed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AreaInput
            label="Plot Area"
            value={formData.plotArea ?? ""}
            unit={formData.plotAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                plotArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                plotAreaUnit: unit,
              }))
            }
          />

          <AreaInput
            label="Construction Area"
            value={formData.constructionArea ?? ""}
            unit={formData.constructionAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                constructionArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                constructionAreaUnit: unit,
              }))
            }
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Shed Height (Feet)
            </label>
            <input
              type="number"
              value={(formData.shedHeight as string | number) ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shedHeight: e.target.value,
                }))
              }
              placeholder="Ex. 30"
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Washroom
            </label>
            <select
              value={formData.washrooms ? String(formData.washrooms) : "1"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  washrooms: e.target.value,
                }))
              }
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5+">5+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Store Room
            </label>
            <select
              value={(formData.storeRoom as string) ?? "No"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  storeRoom: e.target.value,
                }))
              }
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Parking
            </label>
            <select
              value={formData.parking ? String(formData.parking) : "0"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  parking: e.target.value,
                }))
              }
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
    </div>
  );
}