"use client";

import React from "react";

export interface AreaInputProps {
  label: string;
  value?: string | number;
  unit?: string;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
  placeholder?: string;
}

export default function AreaInput({
  label,
  value = "",
  unit = "Sq.Ft.",
  onValueChange,
  onUnitChange,
  placeholder = "Enter Area",
}: AreaInputProps) {
  return (
    <div className="font-sans">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{label}</label>

      <div className="flex">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value ?? ""}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
        />

        <select
          value={unit || "Sq.Ft."}
          onChange={(e) => onUnitChange(e.target.value)}
          className="rounded-r-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
        >
          <option value="Sq.Ft.">Sq.Ft.</option>
          <option value="Sq.Yd.">Sq.Yd.</option>
          <option value="Sq.Mtr.">Sq.Mtr.</option>
          <option value="Acre">Acre</option>
          <option value="Hectare">Hectare</option>
        </select>
      </div>
    </div>
  );
}