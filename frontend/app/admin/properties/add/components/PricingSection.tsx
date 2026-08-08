"use client";

import { PropertyFormData } from "../types";

interface PricingSectionProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<PropertyFormData>
  >;
}

export default function PricingSection({
  formData,
  setFormData,
}: PricingSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">
      <h2 className="text-2xl font-bold border-b border-slate-100 pb-4 mb-8 text-slate-900">
        💰 Pricing Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Property Price *
          </label>

          <input
            type="text"
            value={formData.propertyPrice}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                propertyPrice: e.target.value,
              }))
            }
            placeholder="Ex. 61,00,000"
            disabled={formData.priceOnRequest}
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-100 disabled:text-slate-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Price Type
          </label>

          <select
            value={formData.priceType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                priceType: e.target.value,
              }))
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          >
            <option>Fixed Price</option>
            <option>Negotiable</option>
            <option>Price On Request</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Booking Amount
          </label>

          <input
            type="text"
            value={formData.bookingAmount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bookingAmount: e.target.value,
              }))
            }
            placeholder="Ex. 2,00,000"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Maintenance Charges
          </label>

          <input
            type="text"
            value={formData.maintenanceCharges}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                maintenanceCharges: e.target.value,
              }))
            }
            placeholder="Ex. ₹2500 / Month"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Price Per Sq.Ft.
          </label>

          <input
            type="text"
            value={formData.pricePerSqft}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                pricePerSqft: e.target.value,
              }))
            }
            placeholder="Ex. ₹5500"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

      </div>

      <div className="mt-8 flex items-center gap-3">
        <input
          id="priceOnRequest"
          type="checkbox"
          checked={formData.priceOnRequest}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              priceOnRequest: e.target.checked,
            }))
          }
          className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
        />

        <label
          htmlFor="priceOnRequest"
          className="text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer"
        >
          Display Price On Request instead of actual price
        </label>
      </div>

    </div>
  );
}