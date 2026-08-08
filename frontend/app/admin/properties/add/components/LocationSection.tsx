"use client";

import React from "react";
import { PropertyFormData, SectionProps } from "../types";

// 🌆 ગુજરાતના મુખ્ય શહેરોના તમામ વિસ્તારો (A-Z Alphabetic Order)
const cityAreasMap: Record<string, string[]> = {
  Ahmedabad: [
    "Ambawadi",
    "Bapunagar",
    "Bopal",
    "Chandkheda",
    "C.G. Road",
    "Dariapur",
    "Drive In Road",
    "Ellisbridge",
    "Ghatlodia",
    "Gita Mandir",
    "Gota",
    "Gulbai Tekra",
    "Jagnath",
    "Jamalpur",
    "Jodhpur",
    "Juhapura",
    "Kalupur",
    "Kankaria",
    "Kathwada",
    "Kharicut Canal",
    "Khokhra",
    "Kudasan",
    "Maninagar",
    "Memnagar",
    "Naroda",
    "Naranpura",
    "Narol",
    "Navrangpura",
    "Odhav",
    "Paldi",
    "Prahlad Nagar",
    "Ranip",
    "Sabarmati",
    "Satellite",
    "Science City",
    "S.G. Highway",
    "Shahibaug",
    "Shahpur",
    "Shela",
    "Shyamal",
    "South Bopal",
    "Thaltej",
    "Vasna",
    "Vastrapur",
    "Vejalpur",
    "Vastral",
    "Vatva",
  ],
  Surat: [
    "Adajan",
    "Althan",
    "Amroli",
    "Bhatar",
    "Bhestan",
    "Katargam",
    "City Light",
    "Dindoli",
    "Dumas Road",
    "Ghod Dod Road",
    "Katargam",
    "Limbayat",
    "Majura Gate",
    "Nanpura",
    "Pal",
    "Parvat Patiya",
    "Piplod",
    "Rander",
    "Ring Road",
    "Sachin",
    "Udhna",
    "Varachha",
    "Vesu",
    "Yogi Chowk",
  ],
  Vadodara: [
    "Akota",
    "Alkapuri",
    "Bajwa",
    "Bapod",
    "Chhani",
    "Danteshwar",
    "Fatehgunj",
    "Gotri",
    "Harni",
    "Karelibaug",
    "Kishanwadi",
    "Makarpura",
    "Manjalpur",
    "Nizampura",
    "OP Road",
    "Panigate",
    "Pratapnagar",
    "Raopura",
    "Sama",
    "Sayajigunj",
    "Subhanpura",
    "Tarsali",
    "Waghodia Road",
    "Warasiya",
  ],
  Rajkot: [
    "15 Feet Road",
    "150 Feet Ring Road",
    "Akshar Marg",
    "Amin Marg",
    "Bhakti Nagar",
    "Calico",
    "Corner",
    "Dhebar Road",
    "Gondal Road",
    "Gandhigram",
    "Jagnath Plot",
    "Kalawad Road",
    "Kothariya",
    "Mavdi",
    "Nana Mava",
    "Nana Mava Main Road",
    "Patel Wadi",
    "Raiya Road",
    "Raiya Telephne Exchange",
    "Sadhu Vaswani Road",
    "Sardar Nagar",
    "Tagore Road",
    "University Road",
  ],
  Gandhinagar: [
    "Adalaj",
    "Basan",
    "Chiloda",
    "Dehgam",
    "Kudasan",
    "Mansa",
    "Pargal",
    "Pethapur",
    "Raysan",
    "Sargasan",
    "Sector 1",
    "Sector 2",
    "Sector 3",
    "Sector 4",
    "Sector 5",
    "Sector 6",
    "Sector 7",
    "Sector 8",
    "Sector 9",
    "Sector 10",
    "Sector 11",
    "Sector 12",
    "Sector 15",
    "Sector 16",
    "Sector 21",
    "Sector 24",
    "Sector 28",
    "Sector 30",
    "Tarapur",
    "Vavol",
  ],
};

export default function LocationSection({ formData, setFormData }: SectionProps) {
  const updateField = (key: string, value: unknown) => {
    setFormData((prev: PropertyFormData) => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectedCity = (formData.city as string) || "Ahmedabad";
  const currentAreas = cityAreasMap[selectedCity] || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">
      <h2 className="text-2xl font-bold border-b border-slate-100 pb-4 mb-8 text-slate-900">
        📍 Location Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* City Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            City *
          </label>
          <select
            value={selectedCity}
            onChange={(e) => {
              updateField("city", e.target.value);
              updateField("location", ""); // Reset area when city changes
            }}
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          >
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Surat">Surat</option>
            <option value="Vadodara">Vadodara</option>
            <option value="Rajkot">Rajkot</option>
            <option value="Gandhinagar">Gandhinagar</option>
          </select>
        </div>

        {/* Location / Area Dropdown (All A-Z Areas) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Location
          </label>
          <select
            value={(formData.location as string) || ""}
            onChange={(e) => updateField("location", e.target.value)}
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
          >
            <option value="">-- Select Area --</option>
            {currentAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Google Map Link */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Google Map Link
          </label>
          <input
            type="url"
            value={(formData.googleMapLink as string) || ""}
            onChange={(e) => updateField("googleMapLink", e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Full Address */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Full Address
          </label>
          <textarea
            rows={3}
            value={(formData.fullAddress as string) || ""}
            onChange={(e) => updateField("fullAddress", e.target.value)}
            placeholder="Enter complete site address"
            className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>
    </div>
  );
}