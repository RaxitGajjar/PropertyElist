"use client";

import React from "react";
import { PropertyFormData } from "../types";

interface Props {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export default function StatusSection({ formData, setFormData }: Props) {
  const currentStatus = (formData.projectStatus as string) || "New Launch";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">
      <h2 className="text-2xl font-bold border-b border-slate-100 pb-4 mb-8 text-slate-900">
        🚩 Project Status
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Status */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Project Status
          </label>
          <select
            value={currentStatus}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                projectStatus: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          >
            <option value="New Launch">New Launch</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        {/* Featured Property */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Featured Property
          </label>
          <select
            value={(formData.featured as string) || "No"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                featured: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Property Visibility */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Property Visibility
          </label>
          <select
            value={(formData.visibility as string) || "Active"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                visibility: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Launch Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Launch Date
          </label>
          <input
            type="date"
            value={(formData.launchDate as string) || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                launchDate: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          />
        </div>

        {/* Possession Date */}
        {currentStatus !== "Ready to Move" && currentStatus !== "Completed" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Possession Date
            </label>
            <input
              type="date"
              value={(formData.possessionDate as string) || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  possessionDate: e.target.value,
                }))
              }
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            />
          </div>
        )}

        {/* Completion Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Completion Date
          </label>
          <input
            type="date"
            value={(formData.completionDate as string) || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                completionDate: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          />
        </div>

        {/* Project Approval */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Project Approval
          </label>
          <select
            value={(formData.projectApproval as string) || "Approved"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                projectApproval: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          >
            <option value="Approved">Approved</option>
            <option value="Applied">Applied</option>
            <option value="Not Required">Not Required</option>
          </select>
        </div>

        {/* Total Towers */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Total Towers
          </label>
          <input
            type="number"
            placeholder="Ex. 4"
            value={(formData.totalTowers as string | number) || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                totalTowers: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Total Units */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Total Units
          </label>
          <input
            type="number"
            placeholder="Ex. 240"
            value={(formData.totalUnits as string | number) || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                totalUnits: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>
    </div>
  );
}