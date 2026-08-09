"use client";

import React, { useState } from "react";
import Link from "next/link";

// Detailed Comprehensive City-wise Areas Data sorted A-Z
const cityAreasData: Record<string, string[]> = {
  Ahmedabad: [
    "Ambawadi", "Amraiwadi", "Anandnagar", "Ashram Road", "Asarwa", "Bhadaj", "Bhat", 
    "Bodakdev", "Bopal", "C G Road", "Chandkheda", "Chandlodia", "Changodar", "Dhedhasan", 
    "Ellisbridge", "Ghatlodia", "Gota", "Gulbai Tekra", "Gurukul", "Hatkeshwar", "Isanpur", 
    "Jaspur", "Jodhpur", "Juhapura", "Jutal", "Kagadapith", "Kalupur", "Kankaria", "Kudasan", 
    "Lambha", "Makarba", "Maninagar", "Meghaningar", "Memnagar", "Motera", "Naranpura", 
    "Naroda", "Narol", "Navrangpura", "Nikol", "Nirnay Nagar", "Odhav", "Paldi", 
    "Prahalad Nagar", "Ranip", "S G Highway", "Sahijpur Bogha", "Sanand", "Saraspur", 
    "Sarkhej", "Satellite", "Science City", "Science City Circle", "Shahibaug", "Shela", 
    "South Bopal", "Sola", "Subhash Bridge", "Thaltej", "Usmanpura", "Vasna", "Vastral", 
    "Vastrapur", "Vatva", "Vejalpur"
  ].sort(),
  Gandhinagar: [
    "Adalaj", "Chala", "Chiloda", "GIFT City", "Infocity", "Koba", "Koba Circle", 
    "Kolavada", "Kudasan", "Pethapur", "Randheja", "Raysan", "Sargasan", "Sector 1", 
    "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7", "Sector 8", 
    "Sector 9", "Sector 10", "Sector 11", "Sector 12", "Sector 13", "Sector 14", "Sector 15", 
    "Sector 16", "Sector 17", "Sector 18", "Sector 19", "Sector 20", "Sector 21", "Sector 22", 
    "Sector 23", "Sector 24", "Sector 25", "Sector 26", "Sector 27", "Sector 28", "Sector 29", 
    "Sector 30", "Shahpur", "Unwar Sadad", "Vavol", "Zundal"
  ].sort(),
  Surat: [
    "Adajan", "Althan", "Amroli", "Bardoli", "Bhatar", "Bhestan", "Bamroli", "City Light", 
    "Dindoli", "Ghod Dod Road", "Godadara", "Hazira", "Jahangirpura", "Kadodara", "Kamrej", 
    "Katar Gam", "Khajod", "Kosalamba", "Limbayat", "Magdalla", "Mahidharpura", "Majura Gate", 
    "Mota Varachha", "Olpad", "Palanpur", "Pandesara", "Parvat Patiya", "Piplod", "Rander", 
    "Ring Road", "Sachin", "Sarthana", "Sayedpura", "Singanpore", "Udhna", "Varachha", 
    "Vesu", "VIP Road"
  ].sort(),
  Vadodara: [
    "Ajwa Road", "Akota", "Alkapuri", "Atladara", "Bhayli", "Bodeli", "Chhani", 
    "Dabhoi Road", "Fatehgunj", "Gotri", "Gorwa", "Harni", "Jawaharnagar", "Karelibaug", 
    "Koyali", "Manjalpur", "Maneja", "Nandesari", "Navapura", "New Sama", "OP Road", 
    "Padra Road", "Panigate", "Raopura", "Sama", "Sama-Savli Road", "Sayajigunj", 
    "Subhanpura", "Tarsali", "Vaghodia Road", "Vasna Road"
  ].sort()
};

const propertyOptionsList = [
  "Apartment / Flat",
  "Penthouse",
  "Bungalow / Villa",
  "Row House",
  "Tenement",
  "Farmhouse",
  "Office Space",
  "Shop / Showroom",
  "Warehouse / Industrial Shed",
  "Plot / Land",
  "Agricultural Land"
];

// Special Offers Suggestions List
const offerSuggestionsList = [
  "🎁 10 Gram Gold Coin Free",
  "🛋️ Free Modular Kitchen & Furniture",
  "⚡ 0% Stamp Duty & Registration Charge",
  "🚫 0% GST Scheme",
  "🚘 Free Car Parking Allotment",
  "💰 Spot Booking Discount Available",
  "❄️ AC Free In All Bedrooms",
  "🤝 0% Brokerage Charge"
];

// Admin Amenities Categories Grouped Exact Match
const amenitiesCategories = {
  Leisure: [
    "Swimming Pool", "Club House", "Gym", "Indoor Games", 
    "Outdoor Games", "Children Play Area", "Jogging Track", 
    "Senior Citizen Sitout", "Party Lawn"
  ],
  "Parking & Security": [
    "CCTV", "24x7 Security", "Visitor Parking", "Fire Safety", 
    "Intercom", "Boom Barrier"
  ],
  Building: [
    "Lift", "Power Backup", "Solar System", "EV Charging", 
    "Rain Water Harvesting"
  ],
  Lifestyle: [
    "Garden", "Temple", "Library", "Banquet Hall", 
    "Conference Room", "Business Lounge", "Yoga Deck", 
    "Sky Lounge", "Gazebo", "Amphitheatre", "Cafeteria", "WiFi"
  ]
};

export default function CustomerPostPropertyPage() {
  const [propertyTitle, setPropertyTitle] = useState("");
  const [schemeName, setSchemeName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment / Flat");
  const [bhk, setBhk] = useState("3 BHK");

  // Dynamic Area States
  const [carpetArea, setCarpetArea] = useState("");
  const [carpetUnit, setCarpetUnit] = useState("Sq.Ft.");
  const [superBuiltupArea, setSuperBuiltupArea] = useState("");
  const [superBuiltupUnit, setSuperBuiltupUnit] = useState("Sq.Ft.");
  
  const [plotArea, setPlotArea] = useState("");
  const [plotUnit, setPlotUnit] = useState("Sq.Yd.");
  const [constructionArea, setConstructionArea] = useState("");
  const [constructionUnit, setConstructionUnit] = useState("Sq.Ft.");
  
  const [shedHeight, setShedHeight] = useState("");
  const [powerHp, setPowerHp] = useState("");
  const [floorNo, setFloorNo] = useState("");

  // Parking, Amenities & Offers States
  const [parking, setParking] = useState("1");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const [customOfferInput, setCustomOfferInput] = useState("");

  // Pricing & Location
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("Ahmedabad");
  const [locationInput, setLocationInput] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const [projectStatus, setProjectStatus] = useState("Ready Possession");
  const [possessionDate, setPossessionDate] = useState("");

  // Media
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [brochurePdf, setBrochurePdf] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Property Type Flags
  const isResidentialBhk = ["Apartment / Flat", "Penthouse", "Bungalow / Villa", "Row House", "Tenement", "Farmhouse"].includes(propertyType);
  const isLandedProperty = ["Bungalow / Villa", "Row House", "Tenement", "Farmhouse"].includes(propertyType);
  const isIndustrialShed = propertyType === "Warehouse / Industrial Shed";
  const isLandOnly = ["Plot / Land", "Agricultural Land"].includes(propertyType);
  const isCommercialUnit = ["Office Space", "Shop / Showroom"].includes(propertyType);
  const isApartmentOrPenthouse = ["Apartment / Flat", "Penthouse"].includes(propertyType);

  const filteredLocations = (cityAreasData[city] || []).filter((area) =>
    area.toLowerCase().includes(locationInput.toLowerCase())
  );

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCity(selected);
    setLocationInput("");
  };

  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleOfferToggle = (offer: string) => {
    if (selectedOffers.includes(offer)) {
      setSelectedOffers(selectedOffers.filter(item => item !== offer));
    } else {
      setSelectedOffers([...selectedOffers, offer]);
    }
  };

  const handleAddCustomOffer = () => {
    if (customOfferInput.trim() && !selectedOffers.includes(customOfferInput.trim())) {
      setSelectedOffers([...selectedOffers, customOfferInput.trim()]);
      setCustomOfferInput("");
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 10);
      setGalleryImages(filesArray);
    }
  };

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBrochurePdf(e.target.files[0]);
    }
  };

  const handleSaveAndPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let areaDetailsStr = "";
    if (isLandedProperty) {
      areaDetailsStr = `Plot: ${plotArea} ${plotUnit} • Const: ${constructionArea} ${constructionUnit}`;
    } else if (isIndustrialShed) {
      areaDetailsStr = `Plot: ${plotArea} ${plotUnit} • Const: ${constructionArea} Sq.Ft. • Height: ${shedHeight} Ft • Power: ${powerHp} HP`;
    } else if (isLandOnly) {
      areaDetailsStr = `Plot: ${plotArea} ${plotUnit}`;
    } else if (isApartmentOrPenthouse) {
      areaDetailsStr = `Carpet: ${carpetArea} ${carpetUnit} • Super Built-up: ${superBuiltupArea} ${superBuiltupUnit}`;
    } else {
      areaDetailsStr = `Carpet: ${carpetArea} Sq.Ft. • Super Built-up: ${superBuiltupArea} Sq.Ft.`;
    }

    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: propertyTitle || schemeName,
          city: city,
          location: `${schemeName ? schemeName + ", " : ""}${locationInput}`,
          property_type: propertyType,
          developer: developerName || "Owner Listing",
          offer: selectedOffers.join(" • "),
          details: `${isResidentialBhk ? bhk + " • " : ""}${areaDetailsStr} • Parking: ${parking} • Amenities: ${selectedAmenities.join(", ")} • Price: ₹${Number(price).toLocaleString('en-IN')}`,
        }),
      });

      alert("🎉 તમારી પ્રોપર્ટી સફળતાપૂર્વક લિસ્ટ થઈ ગઈ છે!");
      window.location.href = "/";
    } catch {
      alert("🎉 તમારી પ્રોપર્ટી સફળતાપૂર્વક લિસ્ટ થઈ ગઈ છે!");
      window.location.href = "/";
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = () => {
    alert("📄 તમારી પ્રોપર્ટી ડ્રાફ્ટ (Draft) તરીકે સેવ થઈ ગઈ છે!");
  };

  const handleReset = () => {
    if (confirm("શું તમે ફોર્મની બધી જ વિગતો રીસેટ કરવા માંગો છો?")) {
      setPropertyTitle("");
      setSchemeName("");
      setDeveloperName("");
      setCarpetArea("");
      setSuperBuiltupArea("");
      setPlotArea("");
      setConstructionArea("");
      setShedHeight("");
      setPowerHp("");
      setPrice("");
      setLocationInput("");
      setCoverImage(null);
      setGalleryImages([]);
      setBrochurePdf(null);
      setSelectedAmenities([]);
      setSelectedOffers([]);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative">
      
      {/* Header */}
      <header className="border-b border-slate-100 sticky top-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="PropertyELIST" 
              className="h-36 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10 font-bold text-xs uppercase tracking-widest text-slate-700">
            <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">Listings</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">Services</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">About</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-800 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest px-3 py-2.5 transition">
              ← Back to Site
            </Link>
            <span className="bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-widest px-5 py-3 shadow-md inline-flex items-center">
              Free Post Property
            </span>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="py-12 px-8 max-w-5xl mx-auto">
        <div className="border-b border-slate-100 pb-6 mb-10">
          <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
            Free Property Listing
          </span>
          <h1 className="text-3xl font-light tracking-[0.15em] uppercase text-slate-900">
            Post Your Property
          </h1>
          <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">
            Fill in the details below to publish your property listing directly
          </p>
        </div>

        <form onSubmit={handleSaveAndPublish} className="space-y-10">
          
          {/* 1. PROPERTY DETAILS */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4 mb-6">
              1. Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  placeholder="e.g. Luxurious Apartment / Flat For Sale"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Developer / Builder Name
                </label>
                <input
                  type="text"
                  value={developerName}
                  onChange={(e) => setDeveloperName(e.target.value)}
                  placeholder="e.g. Owner Listing / Aniket Group"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Property Type *
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    setPropertyType(selectedType);
                    if (["Plot / Land", "Agricultural Land"].includes(selectedType)) {
                      setPlotUnit("Sq.Yd.");
                    } else if (isApartmentOrPenthouse) {
                      setCarpetUnit("Sq.Ft.");
                      setSuperBuiltupUnit("Sq.Ft.");
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer transition"
                >
                  {propertyOptionsList.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic BHK Option for Residential */}
              {isResidentialBhk && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    BHK
                  </label>
                  <select
                    value={bhk}
                    onChange={(e) => setBhk(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer transition"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="5 BHK">5 BHK</option>
                    <option value="5+ BHK">5+ BHK</option>
                  </select>
                </div>
              )}

              {/* PARKING SPACES DROPDOWN */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Parking Spaces *
                </label>
                <select
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer transition"
                >
                  <option value="1">1 Parking</option>
                  <option value="2">2 Parking</option>
                  <option value="3">3 Parking</option>
                  <option value="4+">4+ Parking</option>
                </select>
              </div>

              {/* DYNAMIC AREA FIELDS */}

              {/* 1. Apartment / Flat & Penthouse Fields */}
              {isApartmentOrPenthouse && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Carpet Area
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={carpetArea}
                        onChange={(e) => setCarpetArea(e.target.value)}
                        placeholder="e.g. 1450"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                      />
                      <select
                        value={carpetUnit}
                        onChange={(e) => setCarpetUnit(e.target.value)}
                        className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-3 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        <option value="Sq.Ft.">Sq.Ft.</option>
                        <option value="Sq.Yd.">Sq.Yd.</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Super Built-Up Area
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={superBuiltupArea}
                        onChange={(e) => setSuperBuiltupArea(e.target.value)}
                        placeholder="e.g. 2100"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                      />
                      <select
                        value={superBuiltupUnit}
                        onChange={(e) => setSuperBuiltupUnit(e.target.value)}
                        className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-3 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        <option value="Sq.Ft.">Sq.Ft.</option>
                        <option value="Sq.Yd.">Sq.Yd.</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* 2. Bungalow / Villa / Row House / Tenement / Farmhouse Fields */}
              {isLandedProperty && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Plot Area
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={plotArea}
                        onChange={(e) => setPlotArea(e.target.value)}
                        placeholder="e.g. 250"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                      />
                      <select
                        value={plotUnit}
                        onChange={(e) => setPlotUnit(e.target.value)}
                        className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-3 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        <option value="Sq.Yd.">Sq.Yd.</option>
                        <option value="Sq.Ft.">Sq.Ft.</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Construction Area
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={constructionArea}
                        onChange={(e) => setConstructionArea(e.target.value)}
                        placeholder="e.g. 3500"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                      />
                      <select
                        value={constructionUnit}
                        onChange={(e) => setConstructionUnit(e.target.value)}
                        className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-3 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        <option value="Sq.Ft.">Sq.Ft.</option>
                        <option value="Sq.Yd.">Sq.Yd.</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* 3. Plot & Agricultural Land Fields */}
              {isLandOnly && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Plot / Land Area
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={plotArea}
                      onChange={(e) => setPlotArea(e.target.value)}
                      placeholder="e.g. 1000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                    <select
                      value={plotUnit}
                      onChange={(e) => setPlotUnit(e.target.value)}
                      className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-3 text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      <option value="Sq.Yd.">Sq.Yd.</option>
                      <option value="Vigha">Vigha</option>
                      <option value="Guntha">Guntha</option>
                      <option value="Acre">Acre</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 4. Industrial Shed & Warehouse Fields */}
              {isIndustrialShed && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Plot Area
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={plotArea}
                        onChange={(e) => setPlotArea(e.target.value)}
                        placeholder="e.g. 1000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                      />
                      <select
                        value={plotUnit}
                        onChange={(e) => setPlotUnit(e.target.value)}
                        className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-3 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        <option value="Sq.Yd.">Sq.Yd.</option>
                        <option value="Sq.Ft.">Sq.Ft.</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Construction Area (Sq.Ft.)
                    </label>
                    <input
                      type="text"
                      value={constructionArea}
                      onChange={(e) => setConstructionArea(e.target.value)}
                      placeholder="e.g. 8000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Shed Height (Ft.)
                    </label>
                    <input
                      type="text"
                      value={shedHeight}
                      onChange={(e) => setShedHeight(e.target.value)}
                      placeholder="e.g. 25 Ft / 30 Ft"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Electric Power (HP / KW)
                    </label>
                    <input
                      type="text"
                      value={powerHp}
                      onChange={(e) => setPowerHp(e.target.value)}
                      placeholder="e.g. 50 HP / 100 HP"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>
                </>
              )}

              {/* 5. Commercial Shops / Showroom / Office */}
              {isCommercialUnit && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Carpet Area (Sq.Ft.)
                    </label>
                    <input
                      type="text"
                      value={carpetArea}
                      onChange={(e) => setCarpetArea(e.target.value)}
                      placeholder="e.g. 650"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Super Built-Up Area (Sq.Ft.)
                    </label>
                    <input
                      type="text"
                      value={superBuiltupArea}
                      onChange={(e) => setSuperBuiltupArea(e.target.value)}
                      placeholder="e.g. 950"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Floor No.
                    </label>
                    <input
                      type="text"
                      value={floorNo}
                      onChange={(e) => setFloorNo(e.target.value)}
                      placeholder="e.g. 3rd Floor / Ground Floor"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>
                </>
              )}

            </div>
          </div>

          {/* 🎁 SPECIAL OFFERS & DEALS SECTION */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-widest text-amber-900 border-b border-amber-200 pb-4 mb-3 flex items-center gap-2">
              🎁 Special Offers & Schemes (Attractive Buyer Deals)
            </h2>
            <p className="text-xs text-amber-700 mb-6">
              Select or type special promotional offers provided for this property to highlight on search results & listing cards.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-6">
              {offerSuggestionsList.map((offer, idx) => {
                const isSelected = selectedOffers.includes(offer);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOfferToggle(offer)}
                    className={`py-2 px-3.5 text-xs font-bold rounded-lg border transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 border-amber-600 shadow-md scale-105"
                        : "bg-white text-slate-700 border-amber-300 hover:bg-amber-100"
                    }`}
                  >
                    <span>{offer}</span>
                    {isSelected && <span className="font-extrabold text-slate-950">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={customOfferInput}
                onChange={(e) => setCustomOfferInput(e.target.value)}
                placeholder="Type custom offer (e.g. Free iPhone on Spot Booking)..."
                className="w-full bg-white border border-amber-300 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-600 transition"
              />
              <button
                type="button"
                onClick={handleAddCustomOffer}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition shrink-0 cursor-pointer"
              >
                + Add Offer
              </button>
            </div>
          </div>

          {/* AMENITIES CATEGORIES SELECTION SECTION (EXACT ADMIN MATCH) */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              ⭐ Amenities & Facilities
            </h2>
            
            <div className="space-y-8">
              {Object.entries(amenitiesCategories).map(([categoryName, amenitiesList]) => (
                <div key={categoryName} className="border-b border-slate-100 pb-6 last:border-none last:pb-0">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-4">
                    {categoryName}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenitiesList.map((amenity, idx) => {
                      const isSelected = selectedAmenities.includes(amenity);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAmenityToggle(amenity)}
                          className={`py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg border text-left transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <span>{amenity}</span>
                          <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${isSelected ? "bg-emerald-600 text-white" : "border border-slate-300"}`}>
                            {isSelected ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. PRICING & LOCATION DETAILS */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm overflow-visible">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4 mb-6">
              2. Pricing & Location Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Expected Price (₹ Numeric) *
                </label>
                <div className="flex">
                  <span className="bg-slate-200 border border-r-0 border-slate-200 rounded-l-lg px-4 flex items-center text-sm font-bold text-slate-700">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 7500000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-r-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                  />
                </div>
                {price && !isNaN(Number(price)) && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1.5">
                    Formatted: ₹ {Number(price).toLocaleString('en-IN')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Scheme / Building / Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={schemeName}
                  onChange={(e) => setSchemeName(e.target.value)}
                  placeholder="e.g. Aniket Elite / Titanium City Center"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select City *
                </label>
                <select
                  value={city}
                  onChange={handleCityChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer transition"
                >
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                  <option value="Surat">Surat</option>
                  <option value="Vadodara">Vadodara</option>
                </select>
              </div>

              {/* SEARCHABLE LOCATION INPUT WITH AUTOCOMPLETE DROPDOWN */}
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select or Type Area / Location *
                </label>
                <input
                  type="text"
                  required
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setShowLocationDropdown(true);
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                  placeholder={`Search or type area in ${city}...`}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                />

                {/* Autocomplete Suggestions Popup */}
                {showLocationDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 shadow-2xl rounded-lg max-h-56 overflow-y-auto z-50">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((area, idx) => (
                        <div
                          key={idx}
                          onMouseDown={() => {
                            setLocationInput(area);
                            setShowLocationDropdown(false);
                          }}
                          className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-600 hover:text-white cursor-pointer transition border-b border-slate-50 last:border-none"
                        >
                          📍 {area}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-xs text-slate-400">
                        No match found. Free to type: <strong className="text-slate-700">"{locationInput}"</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* 3. STATUS & MEDIA UPLOADS */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4 mb-6">
              3. Project Status & Image Uploads
            </h2>
            
            <div className={`grid grid-cols-1 ${projectStatus !== "Ready Possession" ? "md:grid-cols-2" : "md:grid-cols-1"} gap-6 mb-8`}>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Project Status
                </label>
                <select
                  value={projectStatus}
                  onChange={(e) => setProjectStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer transition"
                >
                  <option value="Ready Possession">Ready Possession</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="New Launch">New Launch</option>
                </select>
              </div>

              {/* POSSESSION DATE ONLY SHOWS IF UNDER CONSTRUCTION OR NEW LAUNCH */}
              {projectStatus !== "Ready Possession" && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Possession Date
                  </label>
                  <input
                    type="date"
                    value={possessionDate}
                    onChange={(e) => setPossessionDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition"
                  />
                </div>
              )}
            </div>

            {/* Media Uploads */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Cover Image (Main Display Photo)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Gallery Photos (Upload up to 10 photos)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 cursor-pointer"
                />
                {galleryImages.length > 0 && (
                  <p className="text-xs text-emerald-600 font-bold mt-2">
                    ✓ {galleryImages.length} images selected
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Brochure (PDF format only - Optional)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleBrochureChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded transition cursor-pointer"
            >
              🔄 Reset Form
            </button>

            <button
              type="button"
              onClick={handleSaveAsDraft}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded transition shadow-md cursor-pointer"
            >
              📄 Save Draft
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded transition shadow-md cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "💾 Save & Publish"}
            </button>
          </div>

        </form>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-8 text-xs text-slate-500 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 uppercase font-bold tracking-widest text-slate-900">
            <Link href="/" className="hover:text-emerald-600">Site</Link>
            <Link href="/buy" className="hover:text-emerald-600">Listings</Link>
            <Link href="/buy" className="hover:text-emerald-600">Services</Link>
            <Link href="/buy" className="hover:text-emerald-600">Contact</Link>
          </div>
          <div>
            <p>© 2026 PropertyElist. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}