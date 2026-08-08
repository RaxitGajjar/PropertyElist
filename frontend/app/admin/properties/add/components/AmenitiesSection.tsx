"use client";

import React from "react";
import { PropertyFormData } from "../types";

interface Props {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

const amenities = {
  Leisure: [
    "Swimming Pool",
    "Club House",
    "Gym",
    "Indoor Games",
    "Outdoor Games",
    "Children Play Area",
    "Jogging Track",
    "Senior Citizen Sitout",
    "Party Lawn",
  ],

  "Parking & Security": [
    "CCTV",
    "24x7 Security",
    "Visitor Parking",
    "Fire Safety",
    "Intercom",
    "Boom Barrier",
  ],

  Building: [
    "Lift",
    "Power Backup",
    "Solar System",
    "EV Charging",
    "Rain Water Harvesting",
  ],

  Lifestyle: [
    "Garden",
    "Temple",
    "Library",
    "Banquet Hall",
    "Conference Room",
    "Business Lounge",
    "Yoga Deck",
    "Sky Lounge",
    "Gazebo",
    "Amphitheatre",
    "Cafeteria",
    "WiFi",
  ],
};

export default function AmenitiesSection({ formData, setFormData }: Props) {
  const selectedAmenities: string[] = formData.amenities || [];

  const handleCheckboxChange = (item: string) => {
    setFormData((prev) => {
      const currentList: string[] = prev.amenities || [];
      const updatedList = currentList.includes(item)
        ? currentList.filter((a) => a !== item)
        : [...currentList, item];

      return {
        ...prev,
        amenities: updatedList,
      };
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 font-sans">
      <h2 className="text-2xl font-bold border-b border-slate-100 pb-4 mb-8 text-slate-900">
        ⭐ Amenities
      </h2>

      {Object.entries(amenities).map(([category, list]) => (
        <div key={category} className="mb-10 last:mb-0">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl inline-block border border-emerald-100">
            {category}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {list.map((item) => {
              const isChecked = selectedAmenities.includes(item);
              return (
                <label
                  key={item}
                  className={`flex items-center gap-3 border rounded-xl p-3.5 cursor-pointer transition ${
                    isChecked
                      ? "bg-emerald-50/80 border-emerald-500 font-bold text-emerald-900 shadow-xs"
                      : "hover:bg-slate-50 border-slate-200 text-slate-700 font-medium"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item)}
                    className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs">{item}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}