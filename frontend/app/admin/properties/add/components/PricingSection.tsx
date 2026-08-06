"use client";

interface PricingSectionProps {
  formData: {
    propertyPrice: string;
    priceType: string;
    bookingAmount: string;
    maintenanceCharges: string;
    pricePerSqft: string;
    priceOnRequest: boolean;
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
      priceOnRequest: boolean;
    }>
  >;
}

export default function PricingSection({
  formData,
  setFormData,
}: PricingSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold border-b pb-4 mb-8">
        💰 Pricing Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Property Price */}
        <div>
          <label className="block text-sm font-semibold mb-2">
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
            className="w-full border rounded-xl p-4 disabled:bg-gray-100"
          />
        </div>

        {/* Price Type */}
        <div>
          <label className="block text-sm font-semibold mb-2">
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
            className="w-full border rounded-xl p-4"
          >
            <option>Fixed Price</option>
            <option>Negotiable</option>
            <option>Price On Request</option>
          </select>
        </div>

        {/* Booking Amount */}
        <div>
          <label className="block text-sm font-semibold mb-2">
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
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* Maintenance */}
        <div>
          <label className="block text-sm font-semibold mb-2">
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
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* Price Per Sq.Ft */}
        <div>
          <label className="block text-sm font-semibold mb-2">
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
            className="w-full border rounded-xl p-4"
          />
        </div>

      </div>

      {/* Price On Request */}
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
          className="w-5 h-5"
        />

        <label
          htmlFor="priceOnRequest"
          className="font-medium"
        >
          Display Price On Request instead of actual price
        </label>
      </div>
    </div>
  );
}