"use client";

import { useMemo } from "react";
import { locations } from "./locations";

interface LocationSectionProps {
  formData: {
    city: string;
    location: string;
    fullAddress: string;
    googleMapLink: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      propertyType: string;
      projectName: string;
      builderName: string;
      propertyTitle: string;
      city: string;
      location: string;
      fullAddress: string;
      googleMapLink: string;
      propertyPrice: string;
      priceType: string;
      bookingAmount: string;
      maintenanceCharges: string;
      pricePerSqft: string;
      estimatedEmi: string;
      priceOnRequest: boolean;
    }>
  >;
}

export default function LocationSection({
  formData,
  setFormData,
}: LocationSectionProps) {
  const cityLocations = useMemo(() => {
    const selected =
      locations[formData.city as keyof typeof locations] ?? [];

    return [...selected].sort((a, b) => a.localeCompare(b));
  }, [formData.city]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold border-b pb-4 mb-8">
        📍 Location Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* City */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            City *
          </label>

          <select
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                city: e.target.value,
                location: "",
              }))
            }
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select City</option>

            {Object.keys(locations)
              .sort((a, b) => a.localeCompare(b))
              .map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Location *
          </label>

          <select
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            disabled={!formData.city}
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
          >
            <option value="">
              {formData.city
                ? "Select Location"
                : "Select City First"}
            </option>

            {cityLocations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Full Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            Full Address
          </label>

          <textarea
            rows={3}
            value={formData.fullAddress}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                fullAddress: e.target.value,
              }))
            }
            placeholder="Enter Complete Address"
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Google Map Link */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            Google Map Link
          </label>

          <input
            type="url"
            value={formData.googleMapLink}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                googleMapLink: e.target.value,
              }))
            }
            placeholder="https://maps.google.com/..."
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

      </div>
    </div>
  );
}