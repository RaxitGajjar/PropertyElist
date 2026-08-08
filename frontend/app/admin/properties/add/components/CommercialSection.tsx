"use client";

import React from "react";
import AreaInput from "./AreaTemp";
import { PropertyFormData } from "../types";

interface Props {
  propertyType: string;
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export default function CommercialSection({
  propertyType,
  formData,
  setFormData,
}: Props) {
  return (
    <div className="font-sans">
      {/* Shop */}
      {propertyType === "Shop" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AreaInput
            label="Carpet Area"
            value={formData.carpetArea ?? ""}
            unit={formData.carpetAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                carpetArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                carpetAreaUnit: unit,
              }))
            }
          />

          <AreaInput
            label="Super Built-up Area"
            value={formData.superBuiltupArea ?? ""}
            unit={formData.superBuiltupAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                superBuiltupArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                superBuiltupAreaUnit: unit,
              }))
            }
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Bathrooms
            </label>
            <select
              value={formData.bathrooms ? String(formData.bathrooms) : "1"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bathrooms: e.target.value,
                }))
              }
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

      {/* Showroom */}
      {propertyType === "Showroom" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AreaInput
            label="Carpet Area"
            value={formData.carpetArea ?? ""}
            unit={formData.carpetAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                carpetArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                carpetAreaUnit: unit,
              }))
            }
          />

          <AreaInput
            label="Super Built-up Area"
            value={formData.superBuiltupArea ?? ""}
            unit={formData.superBuiltupAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                superBuiltupArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                superBuiltupAreaUnit: unit,
              }))
            }
          />

          <AreaInput
            label="Built-up Area"
            value={formData.builtupArea ?? ""}
            unit={formData.builtupAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                builtupArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                builtupAreaUnit: unit,
              }))
            }
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Bathrooms
            </label>
            <select
              value={formData.bathrooms ? String(formData.bathrooms) : "1"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bathrooms: e.target.value,
                }))
              }
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

      {/* Commercial Office */}
      {propertyType === "Commercial Office" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AreaInput
            label="Carpet Area"
            value={formData.carpetArea ?? ""}
            unit={formData.carpetAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                carpetArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                carpetAreaUnit: unit,
              }))
            }
          />

          <AreaInput
            label="Super Built-up Area"
            value={formData.superBuiltupArea ?? ""}
            unit={formData.superBuiltupAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                superBuiltupArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                superBuiltupAreaUnit: unit,
              }))
            }
          />

          <AreaInput
            label="Built-up Area"
            value={formData.builtupArea ?? ""}
            unit={formData.builtupAreaUnit ?? "Sq.Ft."}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                builtupArea: value,
              }))
            }
            onUnitChange={(unit) =>
              setFormData((prev) => ({
                ...prev,
                builtupAreaUnit: unit,
              }))
            }
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Bathrooms
            </label>
            <select
              value={formData.bathrooms ? String(formData.bathrooms) : "1"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bathrooms: e.target.value,
                }))
              }
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