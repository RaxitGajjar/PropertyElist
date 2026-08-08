"use client";

import { useState } from "react";
import Link from "next/link";

import PropertyDetailsSection from "./components/PropertyDetailsSection";
import ProjectSection from "./components/ProjectSection";
import PricingSection from "./components/PricingSection";
import LocationSection from "./components/LocationSection";
import StatusSection from "./components/StatusSection";
import AmenitiesSection from "./components/AmenitiesSection";
import MediaSection from "./components/MediaSection";
import { PropertyFormData } from "./types";

const initialFormState: PropertyFormData = {
  propertyType: "Apartment",
  projectName: "",
  developerName: "",
  propertyTitle: "",
  bhk: "",
  bedrooms: "",
  bathrooms: "",
  balcony: "",
  storeRoom: "No",
  poojaRoom: "No",
  lift: "No",
  carpetArea: "",
  carpetAreaUnit: "Sq.Ft.",
  builtupArea: "",
  builtupAreaUnit: "Sq.Ft.",
  superBuiltupArea: "",
  superBuiltupAreaUnit: "Sq.Ft.",
  plotArea: "",
  plotAreaUnit: "Sq.Ft.",
  constructionArea: "",
  constructionAreaUnit: "Sq.Ft.",
  facing: "",
  totalFloors: 1,
  propertyFloor: "Ground Floor",
  parking: "",
  plotType: "Agriculture",
  furnishing: "",
  washrooms: "",
  cabins: "",
  conferenceRooms: "",
  city: "",
  location: "",
  fullAddress: "",
  googleMapLink: "",
  propertyPrice: "",
  priceType: "Fixed Price",
  bookingAmount: "",
  maintenanceCharges: "",
  pricePerSqft: "",
  priceOnRequest: false,
  projectStatus: "New Launch",
  featured: "No",
  visibility: "Active",
  launchDate: "",
  possessionDate: "",
  completionDate: "",
  projectApproval: "Approved",
  totalTowers: "",
  totalUnits: "",
  amenities: [],
  coverImage: null,
  galleryImages: [],
  floorPlans: [],
  masterPlan: null,
  brochure: null,
  projectVideo: null,
  youtubeUrl: "",
  virtualTourUrl: "",
};

export default function AddPropertyPage() {
  const [formData, setFormData] = useState<PropertyFormData>(initialFormState);

  // 💾 Save & Publish Handler
  const handleSaveAndPublish = (e: React.FormEvent) => {
    e.preventDefault();
    alert("🚀 નવી પ્રોપર્ટી સફળતાપૂર્વક Save અને Publish થઈ ગઈ છે!");
  };

  // 📄 Save as Draft Handler
  const handleSaveAsDraft = () => {
    alert("📄 પ્રોપર્ટી ડ્રાફ્ટ (Draft) તરીકે સેવ થઈ ગઈ છે!");
  };

  // 🔄 Reset Form Handler
  const handleReset = () => {
    if (confirm("શું તમે ફોર્મની બધી જ વિગતો રીસેટ કરવા માંગો છો?")) {
      setFormData(initialFormState);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">Add New Property</h1>
            <p className="mt-2 text-gray-500">Create a New Real Estate Project</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <form onSubmit={handleSaveAndPublish} className="max-w-7xl mx-auto p-8 space-y-8">
        <PropertyDetailsSection formData={formData} setFormData={setFormData} />
        <ProjectSection formData={formData} setFormData={setFormData} />
        <PricingSection formData={formData} setFormData={setFormData} />
        <LocationSection formData={formData} setFormData={setFormData} />
        <StatusSection formData={formData} setFormData={setFormData} />
        <AmenitiesSection formData={formData} setFormData={setFormData} />
        <MediaSection formData={formData} setFormData={setFormData} />

        {/* 🎛️ SAVE, DRAFT & RESET ACTION BAR */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-8 py-3.5 transition"
          >
            🔄 Reset Form
          </button>

          <button
            type="button"
            onClick={handleSaveAsDraft}
            className="w-full sm:w-auto rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-extrabold px-8 py-3.5 transition shadow-md"
          >
            📄 Save as Draft
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-10 py-3.5 transition shadow-lg"
          >
            💾 Save & Publish
          </button>
        </div>
      </form>
    </div>
  );
}