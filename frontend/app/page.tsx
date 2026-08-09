"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectItem {
  id: number | string;
  slug?: string;
  title?: string;
  city?: string;
  location?: string;
  property_type?: string;
  developer?: string;
  category?: string;
  details?: string;
  images?: string;
}

interface LocationItem {
  display_name: string;
}

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("BUY");
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("Apartment / Penthouse");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "Aniket Builder",
    email: "aniket@propertyelist.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem("property_is_logged_in");
    if (authStatus === "true") {
      setIsLoggedIn(true);
      const savedUser = sessionStorage.getItem("user") || sessionStorage.getItem("property_user_data");
      if (savedUser) {
        try {
          setUserData(JSON.parse(savedUser));
        } catch {
          // ignore parse error
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Property Inquiry!",
      message: "Ramesh Bhai inquired about Aniket Elite Apartments.",
      time: "10 mins ago",
      unread: true
    },
    {
      id: 2,
      title: "Broker Contact Lead",
      message: "Ketan Shah requested a call back for commercial listing.",
      time: "2 hours ago",
      unread: true
    }
  ]);

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackProjects: ProjectItem[] = [
    {
      id: 1,
      slug: "aniket-elite-ahmedabad",
      title: "Aniket Elite",
      city: "Ahmedabad",
      location: "Science City Circle",
      property_type: "Apartment / Penthouse",
      developer: "Aniket Group (Builder)",
      category: "New Projects",
      details: "42 Limited Homes and 6 Commercial Shops",
      images: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      slug: "skyline-avenue-ahmedabad",
      title: "Skyline Avenue",
      city: "Ahmedabad",
      location: "SG Highway",
      property_type: "Office Space",
      developer: "Skyline Realty (Broker)",
      category: "Agent / Broker Properties",
      details: "Grade A Commercial Office Spaces",
      images: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      slug: "royal-palms-gandhinagar",
      title: "Royal Palms Villa",
      city: "Gandhinagar",
      location: "Koba Circle",
      property_type: "Bungalow / Row House / Villa",
      developer: "Rajeshbhai Patel (Owner)",
      category: "Owner Properties",
      details: "Luxury 4 BHK Bungalows Gated Community",
      images: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    },
  ];

  useEffect(() => {
    let isSubscribed = true;
    const fetchMySQLProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects?city=${encodeURIComponent(selectedCity)}`);
        const data = await response.json();
        
        if (isSubscribed) {
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          } else {
            const filteredFallback = fallbackProjects.filter(
              (p) => p.city?.toLowerCase() === selectedCity.toLowerCase()
            );
            setProjects(filteredFallback.length > 0 ? filteredFallback : fallbackProjects);
          }
        }
      } catch {
        if (isSubscribed) {
          setProjects(fallbackProjects);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchMySQLProjects();
    return () => {
      isSubscribed = false;
    };
  }, [selectedCity]);

  const filteredProjects = projects.filter((project) => {
    const matchesQuery = searchQuery
      ? project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesQuery;
  });

  const newProjectsList = filteredProjects.filter(p => !p.category || p.category === "New Projects" || p.developer?.includes("Builder") || p.developer?.includes("Group"));
  const agentPropertiesList = filteredProjects.filter(p => p.category === "Agent / Broker Properties" || p.developer?.includes("Broker") || p.developer?.includes("Realty") || p.developer?.includes("Agency"));
  const ownerPropertiesList = filteredProjects.filter(p => p.category === "Owner Properties" || p.developer?.includes("Owner") || (!p.developer?.includes("Builder") && !p.developer?.includes("Broker") && !p.developer?.includes("Realty")));

  useEffect(() => {
    let isSubscribed = true;
    const fetchLocations = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery + ", " + selectedCity + ", Gujarat, India"
          )}&addressdetails=1&limit=10`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: LocationItem[] = await response.json();
        if (isSubscribed) {
          const places = data.map((item) => item.display_name);
          setSuggestions(places);
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const debounceTimer = setTimeout(fetchLocations, 300);
    return () => {
      isSubscribed = false;
      clearTimeout(debounceTimer);
    };
  }, [searchQuery, selectedCity]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePostPropertyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push("/post-property");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      intent: activeTab.toLowerCase(),
      city: selectedCity,
      query: searchQuery,
      type: selectedPropertyType,
    }).toString();

    router.push(`/buy?${queryParams}`);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    router.push("/");
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const propertyOptions = [
    { label: "Apartment / Penthouse", value: "Apartment / Penthouse" },
    { label: "Bungalow / Row House / Villa", value: "Bungalow / Row House / Villa" },
    { label: "Farmhouse", value: "Farmhouse" },
    { label: "Office Space", value: "Office Space" },
    { label: "Shop / Showroom", value: "Shop / Showroom" },
    { label: "Warehouse / Industrial Shed", value: "Warehouse / Industrial Shed" },
    { label: "Plot", value: "Plot" },
    { label: "Agricultural Land", value: "Agricultural Land" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative">
      
      <style jsx global>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popUp {
          from { opacity: 0; transform: scale(0.96) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-page {
          animation: pageFadeIn 0.3s ease-out forwards;
        }
        .animate-pop {
          animation: popUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        section {
          animation: pageFadeIn 0.5s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-slate-100 sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="PropertyELIST" 
              className="h-36 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10 font-bold text-xs uppercase tracking-widest text-slate-700">
            <Link href="/" className="text-emerald-600">Home</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">Listings</Link>
            <Link href="/services" className="hover:text-emerald-600 transition">Services</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">About</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-4 relative">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                
                {/* NOTIFICATIONS BELL DROPDOWN */}
                <div className="relative" ref={notifDropdownRef}>
                  <button 
                    onClick={() => {
                      setShowNotifDropdown(!showNotifDropdown);
                      setShowProfileDropdown(false);
                    }}
                    className="relative bg-slate-100 hover:bg-slate-200 border border-slate-300 p-2.5 rounded-full transition cursor-pointer"
                    title="Leads Notifications"
                  >
                    🔔
                    {notifications.some(n => n.unread) && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    )}
                  </button>

                  {showNotifDropdown && (
                    <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 text-slate-900 space-y-3 animate-pop">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Leads & Notifications</span>
                        <button 
                          onClick={markAllNotificationsRead}
                          className="text-[10px] font-bold text-emerald-600 hover:underline uppercase"
                        >
                          Mark all read
                        </button>
                      </div>

                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className={`p-3 rounded-xl border text-xs transition ${notif.unread ? "bg-emerald-50/60 border-emerald-200" : "bg-slate-50 border-slate-200"}`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-slate-900">{notif.title}</span>
                              <span className="text-[10px] text-slate-400">{notif.time}</span>
                            </div>
                            <p className="text-slate-600 text-[11px] leading-relaxed">{notif.message}</p>
                          </div>
                        ))}
                      </div>

                      <Link href="/profile?tab=activity" className="block text-center bg-slate-900 hover:bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-widest py-2 rounded-lg transition">
                        View All Inquiries in Dashboard
                      </Link>
                    </div>
                  )}
                </div>

                {/* PROFILE DROPDOWN */}
                <div className="relative" ref={profileDropdownRef}>
                  <button 
                    onClick={() => {
                      setShowProfileDropdown(!showProfileDropdown);
                      setShowNotifDropdown(false);
                    }}
                    className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-2 rounded-full transition cursor-pointer"
                  >
                    <img 
                      src={userData.avatar} 
                      alt={userData.name} 
                      className="w-8 h-8 rounded-full object-cover border border-emerald-500"
                    />
                    <span className="text-xs font-bold uppercase text-slate-800 hidden md:inline">{userData.name}</span>
                    <span className="text-[10px] text-slate-500">▼</span>
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-3 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-3 text-slate-900 space-y-1 animate-pop">
                      <div className="px-3 py-2 border-b border-slate-100 mb-2">
                        <p className="text-xs font-bold uppercase text-slate-900">{userData.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{userData.email}</p>
                      </div>

                      <Link href="/profile?tab=activity" className="block px-3 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-emerald-50 hover:text-emerald-600 transition">
                        📊 My Activity & Leads Inquiries
                      </Link>
                      <Link href="/profile?tab=listings" className="block px-3 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-emerald-50 hover:text-emerald-600 transition">
                        🏠 Active & Deactive Properties
                      </Link>
                      <Link href="/profile?tab=package" className="block px-3 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-emerald-50 hover:text-emerald-600 transition">
                        📦 Package, Expiry & Tax Invoice
                      </Link>
                      <Link href="/profile?tab=settings" className="block px-3 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-emerald-50 hover:text-emerald-600 transition">
                        ⚙️ Security & Change Password
                      </Link>

                      <div className="pt-2 border-t border-slate-100 mt-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <>
                <Link href="/login" className="text-slate-800 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest px-3 py-2.5 transition">
                  Login
                </Link>
                <Link href="/signup" className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 transition shadow-md">
                  Sign Up
                </Link>
              </>
            )}

            <button 
              onClick={handlePostPropertyClick}
              className="relative bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-widest px-5 py-3 transition shadow-md inline-flex items-center ml-2 cursor-pointer"
            >
              <span className="absolute -top-3.5 right-2 bg-slate-950 text-emerald-400 text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded-full border border-emerald-500/30 shadow">
                Free
              </span>
              Post Property
            </button>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center px-4 animate-page">
          <div className="bg-white border border-slate-200 p-8 max-w-md w-full rounded-2xl shadow-2xl text-slate-900 relative animate-pop">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-base cursor-pointer"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <span className="bg-emerald-50 border border-emerald-300 text-emerald-600 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full inline-block mb-3">
                Authentication Required
              </span>
              <h3 className="text-xl font-light tracking-[0.15em] uppercase text-slate-900 mb-2">
                Please Sign In or Register
              </h3>
            </div>
            <div className="space-y-3">
              <Link href="/login" className="block w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-3.5 text-center rounded-lg transition shadow-lg">
                Sign In to Existing Account
              </Link>
              <Link href="/signup" className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-widest py-3.5 text-center rounded-lg transition border border-slate-300">
                Create New Free Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Search Section */}
      <section className="relative h-[720px] flex items-center justify-center text-white px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')` }}
        ></div>
        <div className="absolute inset-0 bg-slate-950/50"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 w-full animate-page">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4">
            Exceptional Living
          </h1>
          <p className="text-slate-200 text-xs md:text-sm uppercase tracking-widest mb-8 font-semibold">
            Discover the pinnacle of luxury homes
          </p>

          <div className="bg-white/95 backdrop-blur-md p-5 max-w-4xl mx-auto rounded-xl shadow-2xl text-slate-900 text-left">
            <div className="flex gap-6 border-b border-slate-200 pb-3 mb-4 text-xs font-black tracking-widest">
              {["BUY", "RENT"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 transition cursor-pointer ${
                    activeTab === tab
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border-r border-slate-200 pr-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select City</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent font-bold text-sm focus:outline-none text-slate-800 py-1 cursor-pointer"
                >
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                  <option value="Surat">Surat</option>
                  <option value="Vadodara">Vadodara</option>
                </select>
              </div>

              <div className="border-r border-slate-200 pr-3 relative" ref={dropdownRef}>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Type Area / Landmark
                </label>
                <input 
                  type="text" 
                  value={searchQuery}
                  placeholder={`Search in ${selectedCity}...`}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if (suggestions.length > 0) setIsOpen(true); }}
                  className="w-full bg-transparent font-bold text-sm focus:outline-none text-slate-800 py-1 placeholder-slate-400"
                />

                {isOpen && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 shadow-2xl max-h-60 overflow-y-auto z-50 rounded-lg animate-pop">
                    {suggestions.map((place, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSearchQuery(place);
                          setIsOpen(false);
                        }}
                        className="px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-600 hover:text-white cursor-pointer transition border-b border-slate-100 last:border-none truncate"
                      >
                        📍 {place}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pr-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Property Type</label>
                <select 
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full bg-transparent font-bold text-sm focus:outline-none text-slate-800 py-1 cursor-pointer"
                >
                  {propertyOptions.map((option, idx) => (
                    <option key={idx} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button 
                  type="submit" 
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-3.5 transition text-center shadow-md cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* TOP SPONSORED BANNER AD SECTION */}
      <section className="py-10 px-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group bg-slate-900">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition duration-700"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full shadow">
                ⚡ SPONSORED ADVERTISEMENT
              </span>

              <h2 className="text-2xl md:text-4xl font-light text-white tracking-wide uppercase mt-4">
                Aniket Elite - Ultra Luxury Living
              </h2>

              <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed">
                4 BHK Premium Apartments & Exclusive Commercial Spaces at Science City Circle, Ahmedabad. Book your dream home with 0% Brokerage.
              </p>

              <div className="flex gap-4 mt-4 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                <span>✓ Ready Possession</span>
                <span>•</span>
                <span>✓ Prime Location</span>
                <span>•</span>
                <span>✓ Premium Amenities</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link 
                href="/projects/aniket-elite-ahmedabad" 
                className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 text-center transition rounded-lg shadow-xl hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="py-12 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
          <div>
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
              Featured Listings
            </span>
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">
              Featured Projects in {selectedCity} ({filteredProjects.length})
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 uppercase font-bold text-xs tracking-widest">
            Loading Projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-bold text-sm">
            No projects found in {selectedCity}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((scheme) => (
              <div key={scheme.id} className="border border-slate-200 bg-white group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
                <div className="h-60 bg-slate-100 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-500"
                    style={{ backgroundImage: `url('${scheme.images || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"}')` }}
                  ></div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900">{scheme.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 tracking-wide">{scheme.location} • {scheme.details}</p>
                  {scheme.developer && (
                    <p className="text-emerald-700 text-[11px] font-bold mt-2">
                      Listed by: <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 uppercase">{scheme.developer}</span>
                    </p>
                  )}

                  <div className="mt-5">
                    <Link href={`/projects/${scheme.slug}`} className="block w-full text-center border border-slate-900 py-3 text-xs uppercase tracking-widest font-bold hover:bg-slate-900 hover:text-white transition rounded">
                      View Project Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* NEW PROJECTS SECTION */}
      <section className="py-12 px-8 max-w-7xl mx-auto bg-slate-50/50 border-y border-slate-100 my-4">
        <div className="flex justify-between items-end mb-12 border-b border-slate-200 pb-6">
          <div>
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
              Latest Launches
            </span>
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">
              New Projects ({newProjectsList.length})
            </h2>
          </div>
        </div>

        {newProjectsList.length === 0 ? (
          <div className="text-center py-10 text-slate-400 font-bold text-xs">
            No new projects available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newProjectsList.map((scheme) => (
              <div key={scheme.id} className="border border-slate-200 bg-white group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
                <div className="h-60 bg-slate-100 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-500"
                    style={{ backgroundImage: `url('${scheme.images || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"}')` }}
                  ></div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900">{scheme.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 tracking-wide">{scheme.location} • {scheme.details}</p>
                  {scheme.developer && (
                    <p className="text-emerald-700 text-[11px] font-bold mt-2">
                      Builder: <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 uppercase">{scheme.developer}</span>
                    </p>
                  )}

                  <div className="mt-5">
                    <Link href={`/projects/${scheme.slug}`} className="block w-full text-center border border-slate-900 py-3 text-xs uppercase tracking-widest font-bold hover:bg-slate-900 hover:text-white transition rounded">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AGENT / BROKER PROPERTIES SECTION */}
      <section className="py-12 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
          <div>
            <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
              Verified Real Estate Experts
            </span>
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">
              Agent & Broker Properties ({agentPropertiesList.length})
            </h2>
          </div>
        </div>

        {agentPropertiesList.length === 0 ? (
          <div className="text-center py-10 text-slate-400 font-bold text-xs">
            No agent listings available currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agentPropertiesList.map((scheme) => (
              <div key={scheme.id} className="border border-slate-200 bg-white group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
                <div className="h-60 bg-slate-100 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-500"
                    style={{ backgroundImage: `url('${scheme.images || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}')` }}
                  ></div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900">{scheme.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 tracking-wide">{scheme.location} • {scheme.details}</p>
                  {scheme.developer && (
                    <p className="text-blue-700 text-[11px] font-bold mt-2">
                      Agent: <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 uppercase">{scheme.developer}</span>
                    </p>
                  )}

                  <div className="mt-5">
                    <Link href={`/projects/${scheme.slug}`} className="block w-full text-center border border-slate-900 py-3 text-xs uppercase tracking-widest font-bold hover:bg-slate-900 hover:text-white transition rounded">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* OWNER PROPERTIES SECTION */}
      <section className="py-12 px-8 max-w-7xl mx-auto bg-slate-50/50 border-y border-slate-100 my-4">
        <div className="flex justify-between items-end mb-12 border-b border-slate-200 pb-6">
          <div>
            <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
              Direct From Owners (0% Brokerage)
            </span>
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">
              Owner Properties ({ownerPropertiesList.length})
            </h2>
          </div>
        </div>

        {ownerPropertiesList.length === 0 ? (
          <div className="text-center py-10 text-slate-400 font-bold text-xs">
            No direct owner listings available currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ownerPropertiesList.map((scheme) => (
              <div key={scheme.id} className="border border-slate-200 bg-white group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
                <div className="h-60 bg-slate-100 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-500"
                    style={{ backgroundImage: `url('${scheme.images || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"}')` }}
                  ></div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900">{scheme.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 tracking-wide">{scheme.location} • {scheme.details}</p>
                  {scheme.developer && (
                    <p className="text-amber-700 text-[11px] font-bold mt-2">
                      Owner: <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 uppercase">{scheme.developer}</span>
                    </p>
                  )}

                  <div className="mt-5">
                    <Link href={`/projects/${scheme.slug}`} className="block w-full text-center border border-slate-900 py-3 text-xs uppercase tracking-widest font-bold hover:bg-slate-900 hover:text-white transition rounded">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BOTTOM SPONSORED BANNER AD SECTION */}
      <section className="py-10 px-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group bg-slate-900">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition duration-700"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full shadow">
                ⚡ SPONSORED ADVERTISEMENT
              </span>

              <h2 className="text-2xl md:text-4xl font-light text-white tracking-wide uppercase mt-4">
                Aniket Elite - Ultra Luxury Living
              </h2>

              <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed">
                4 BHK Premium Apartments & Exclusive Commercial Spaces at Science City Circle, Ahmedabad. Book your dream home with 0% Brokerage.
              </p>

              <div className="flex gap-4 mt-4 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                <span>✓ Ready Possession</span>
                <span>•</span>
                <span>✓ Prime Location</span>
                <span>•</span>
                <span>✓ Premium Amenities</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link 
                href="/projects/aniket-elite-ahmedabad" 
                className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 text-center transition rounded-lg shadow-xl hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 uppercase font-bold tracking-widest text-slate-900">
            <Link href="/" className="hover:text-emerald-600">Site</Link>
            <Link href="/buy" className="hover:text-emerald-600">Listings</Link>
            <Link href="/services" className="hover:text-emerald-600">Services</Link>
            <Link href="/buy" className="hover:text-emerald-600">About</Link>
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