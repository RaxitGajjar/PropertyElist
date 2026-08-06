"use client";

import { useState } from "react";

import PropertyDetailsSection from "./components/PropertyDetailsSection";
import ProjectSection from "./components/ProjectSection";
import PricingSection from "./components/PricingSection";
import LocationSection from "./components/LocationSection";
import StatusSection from "./components/StatusSection";
import AmenitiesSection from "./components/AmenitiesSection";
import MediaSection from "./components/MediaSection";

export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
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
    amenities: [] as string[],
    coverImage: null as File | null,
    galleryImages: [] as File[],
    floorPlans: [] as File[],
    masterPlan: null as File | null,
    brochure: null as File | null,
    projectVideo: null as File | null,
    youtubeUrl: "",
    virtualTourUrl: "",
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">Add New Property</h1>
            <p className="mt-2 text-gray-500">Create a New Real Estate Project</p>
          </div>
          <a href="/admin/dashboard" className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800">
            Dashboard
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <PropertyDetailsSection formData={formData} setFormData={setFormData} />
        <ProjectSection formData={formData} setFormData={setFormData} />
        <PricingSection formData={formData} setFormData={setFormData} />
        <LocationSection formData={formData} setFormData={setFormData} />
        <StatusSection formData={formData} setFormData={setFormData} />
        <AmenitiesSection formData={formData} setFormData={setFormData} />
        <MediaSection formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}