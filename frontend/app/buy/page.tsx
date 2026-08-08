"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function BuyListContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams?.get("city") || "Ahmedabad";
  const initialQuery = searchParams?.get("query") || "";
  const initialType = searchParams?.get("type") || "";

  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedPropertyType, setSelectedPropertyType] = useState(initialType);

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackListings = [
    {
      id: 1,
      slug: "aniket-elite-ahmedabad",
      title: "Aniket Elite",
      price: "₹ 1.25 Cr",
      city: "Ahmedabad",
      location: "Science City Circle, Ahmedabad",
      property_type: "Apartment / Penthouse",
      developer: "Aniket Group (Builder)",
      isFeatured: true,
      details: "42 Limited Homes and 6 Commercial Shops",
      images: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      slug: "skyline-avenue-ahmedabad",
      title: "Skyline Avenue Office",
      price: "₹ 75 Lakhs",
      city: "Ahmedabad",
      location: "SG Highway, Ahmedabad",
      property_type: "Office Space",
      developer: "Skyline Realty (Broker)",
      isFeatured: false,
      details: "Grade A Commercial Office Spaces",
      images: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      slug: "royal-palms-gandhinagar",
      title: "Royal Palms Villa",
      price: "₹ 2.80 Cr",
      city: "Gandhinagar",
      location: "Koba Circle, Gandhinagar",
      property_type: "Bungalow / Row House / Villa",
      developer: "Rajeshbhai Patel (Owner)",
      isFeatured: true,
      details: "Luxury 4 BHK Bungalows Gated Community",
      images: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects?city=${encodeURIComponent(selectedCity)}`);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          } else {
            setProjects(fallbackListings);
          }
        }
      } catch (err) {
        if (isMounted) setProjects(fallbackListings);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchListings();
    return () => { isMounted = false; };
  }, [selectedCity]);

  const filteredListings = projects.filter((item) => {
    const matchesCity = item.city?.toLowerCase() === selectedCity.toLowerCase();
    const matchesQuery = searchQuery
      ? item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesType = selectedPropertyType
      ? item.property_type?.toLowerCase().includes(selectedPropertyType.toLowerCase())
      : true;
    return matchesCity && matchesQuery && matchesType;
  });

  const featuredListings = filteredListings.filter(p => p.isFeatured || p.developer?.includes("Builder"));
  const freeAndOtherListings = filteredListings.filter(p => !p.isFeatured && !p.developer?.includes("Builder"));

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative">
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
            <Link href="/buy" className="text-emerald-600">Listings</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">Services</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">About</Link>
            <Link href="/buy" className="hover:text-emerald-600 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-800 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest px-3 py-2.5 transition">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-slate-50 border-b border-slate-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-auto flex gap-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Surat">Surat</option>
              <option value="Vadodara">Vadodara</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location or title..."
              className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 w-64"
            />
          </div>

          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Showing Results for <span className="text-emerald-600">{selectedCity}</span>
          </p>
        </div>
      </section>

      <main className="py-12 px-8 max-w-5xl mx-auto space-y-16">
        <div>
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
              Top Priority
            </span>
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">
              Featured Properties ({featuredListings.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-10 text-slate-400 font-bold text-xs uppercase">Loading Featured...</div>
          ) : featuredListings.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">No featured properties found.</div>
          ) : (
            <div className="space-y-4">
              {featuredListings.map((item) => (
                <div key={item.id} className="border border-slate-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-24 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${item.images || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=80"}')` }}
                      ></div>
                    </div>
                    <div>
                      <span className="bg-emerald-50 border border-emerald-300 text-emerald-700 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest rounded inline-block mb-1">
                        Featured
                      </span>
                      <h3 className="text-base font-bold uppercase tracking-wide text-slate-900">{item.title}</h3>
                      <p className="text-slate-500 text-xs tracking-wide flex items-center gap-1 mt-0.5">
                        📍 {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end w-full md:w-auto text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <span className="text-emerald-600 font-black text-base">{item.price || "Contact for Price"}</span>
                    {item.developer && (
                      <p className="text-slate-600 text-[11px] font-bold mt-1">
                        By: <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase">{item.developer}</span>
                      </p>
                    )}
                  </div>

                  <div className="w-full md:w-auto">
                    <Link href={`/projects/${item.slug || 'detail'}`} className="block w-full md:w-auto text-center border border-slate-900 px-6 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-slate-900 hover:text-white transition rounded">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
              All Listings
            </span>
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">
              Free & Verified Properties ({freeAndOtherListings.length})
            </h2>
          </div>

          {freeAndOtherListings.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">No additional properties found matching your search.</div>
          ) : (
            <div className="space-y-4">
              {freeAndOtherListings.map((item) => (
                <div key={item.id} className="border border-slate-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-24 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${item.images || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80"}')` }}
                      ></div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-wide text-slate-900">{item.title}</h3>
                      <p className="text-slate-500 text-xs tracking-wide flex items-center gap-1 mt-0.5">
                        📍 {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end w-full md:w-auto text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <span className="text-slate-900 font-black text-base">{item.price || "Contact for Price"}</span>
                    {item.developer && (
                      <p className="text-slate-600 text-[11px] font-bold mt-1">
                        By: <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase">{item.developer}</span>
                      </p>
                    )}
                  </div>

                  <div className="w-full md:w-auto">
                    <Link href={`/projects/${item.slug || 'detail'}`} className="block w-full md:w-auto text-center border border-slate-900 px-6 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-slate-900 hover:text-white transition rounded">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

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

export default function BuyListPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-500">Loading...</div>}>
      <BuyListContent />
    </Suspense>
  );
}