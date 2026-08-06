"use client";

import ResidentialSection from "./ResidentialSection";
import CommercialSection from "./CommercialSection";
import IndustrialSection from "./IndustrialSection";

interface PropertyDetailsSectionProps {
  formData: {
    propertyType: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      propertyType: string;
      projectName: string;
      developerName: string;
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
      priceOnRequest: boolean;
    }>
  >;
}

export default function PropertyDetailsSection({
  formData,
  setFormData,
}: PropertyDetailsSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

      <h2 className="text-2xl font-bold border-b pb-4 mb-8">
        🏠 Property Details
      </h2>

      {/* Property Type */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <div>
          <label className="block text-sm font-semibold mb-2">
            Property Type *
          </label>

          <select
            value={formData.propertyType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                propertyType: e.target.value,
              }))
            }
            className="w-full border rounded-xl p-4"
          >
            <option>Apartment</option>
            <option>Penthouse</option>
            <option>Villa</option>
            <option>Bungalow</option>
            <option>Row House</option>
            <option>Plot</option>
            <option>Shop</option>
            <option>Showroom</option>
            <option>Commercial Office</option>
            <option>Warehouse</option>
            <option>Industrial Shed</option>
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
      ].includes(formData.propertyType) && (
        <ResidentialSection propertyType={formData.propertyType} />
      )}

      {/* Commercial */}

      {[
        "Shop",
        "Showroom",
        "Commercial Office",
      ].includes(formData.propertyType) && (
        <CommercialSection propertyType={formData.propertyType} />
      )}

      {/* Industrial */}

      {[
        "Warehouse",
        "Industrial Shed",
      ].includes(formData.propertyType) && (
        <IndustrialSection propertyType={formData.propertyType} />
      )}

    </div>
  );
}