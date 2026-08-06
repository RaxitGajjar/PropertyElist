"use client";

interface ProjectSectionProps {
  formData: {
    projectName: string;
    developerName: string;
    propertyTitle: string;
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

export default function ProjectSection({
  formData,
  setFormData,
}: ProjectSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-8 border-b pb-4">
        🏢 Project Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Project Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Project Name *
          </label>

          <input
            type="text"
            value={formData.projectName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                projectName: e.target.value,
              }))
            }
            placeholder="Ex. Aniket Elite"
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Developer Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Developer Name
          </label>

          <input
            type="text"
            value={formData.developerName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                developerName: e.target.value,
              }))
            }
            placeholder="Ex. Aniket Developers"
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Property Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            Property Title *
          </label>

          <input
            type="text"
            value={formData.propertyTitle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                propertyTitle: e.target.value,
              }))
            }
            placeholder="Ex. Premium 2 BHK Apartments Near Science City"
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

      </div>
    </div>
  );
}