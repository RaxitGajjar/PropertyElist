"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  // 1. Featured Pro Brokers Directory State (Phone numbers kept internal)
  const [brokersList] = useState([
    {
      id: 1,
      name: "Rajesh Shah",
      agency: "Shah Realty Associates",
      area: "Science City, SG Highway, Ahmedabad",
      brokerage: "1% Brokerage (On Success)",
      packageTier: "Gold Pro Partner",
      phone: "+919825012345",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Amit Patel",
      agency: "Elite Space Consultants",
      area: "Bopal, South Bopal, Ahmedabad",
      brokerage: "2% Brokerage (Split)",
      packageTier: "Platinum Elite Broker",
      phone: "+919879054321",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    }
  ]);

  // 2. EMI Calculator States
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const monthlyInterestRate = interestRate / 12 / 100;
  const totalMonths = loanTenure * 12;
  const emi =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // 3. Instagram Influencer / Creator State (Phone numbers kept internal)
  const [influencersList] = useState([
    {
      id: 1,
      name: "Ahmedabad Luxury Homes",
      instaHandle: "@ahmedabad_luxury_homes",
      instaLink: "https://instagram.com",
      followers: "125K Followers",
      packageDetails: "1 Dedicated Reel + 3 Stories + Property Visit",
      price: "₹ 15,000",
      phone: "+919900011223",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Gujarat Spaces & Interiors",
      instaHandle: "@gujarat_spaces",
      instaLink: "https://instagram.com",
      followers: "240K Followers",
      packageDetails: "Mega Video Shoot, Cinematic Tour & Feed Post",
      price: "₹ 35,000",
      phone: "+919911122334",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
    }
  ]);

  // Lead capture states for Modal / Direct Action
  const [activeInquiryTarget, setActiveInquiryTarget] = useState<any>(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);

    const newLead = {
      targetName: activeInquiryTarget.name,
      targetType: activeInquiryTarget.agency ? "Broker" : "Instagram Creator",
      clientName,
      clientPhone,
      clientMessage,
      date: new Date().toLocaleString()
    };
    
    const existingLeads = JSON.parse(localStorage.getItem("admin_service_leads") || "[]");
    localStorage.setItem("admin_service_leads", JSON.stringify([newLead, ...existingLeads]));

    const whatsappText = `Hello ${activeInquiryTarget.name}, New Lead from PropertyElist!%0AName: ${clientName}%0APhone: ${clientPhone}%0AMessage: ${clientMessage}`;
    setTimeout(() => {
      window.open(`https://wa.me/${activeInquiryTarget.phone.replace(/[^0-9]/g, "")}?text=${whatsappText}`, "_blank");
    }, 1500);
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
            <Link href="/services" className="text-emerald-600">Services</Link>
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

      {/* Main Container */}
      <main className="py-12 px-8 max-w-6xl mx-auto space-y-20">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">
            Value Added Services & Partner Directory
          </span>
          <h1 className="text-3xl font-light tracking-[0.15em] uppercase text-slate-900">
            Professional Real Estate Hub
          </h1>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-wider">
            Explore verified top brokers, calculate home loan EMI, and hire real estate Instagram influencers securely
          </p>
        </div>


        {/* SECTION 1: TOP BROKERS DIRECTORY */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full inline-block mb-2">
              ⭐ Featured Pro Brokers
            </span>
            <h2 className="text-2xl font-light uppercase tracking-wide text-slate-900">
              Top Verified Brokers & Their Brokerage Rates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brokersList.map((broker) => (
              <div key={broker.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={broker.photo} 
                      alt={broker.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900 uppercase">{broker.name}</h3>
                      <p className="text-xs text-emerald-700 font-bold">{broker.agency}</p>
                      <span className="bg-slate-900 text-emerald-400 text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded inline-block mt-1">
                        {broker.packageTier}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-3">📍 Operating Area: <strong className="text-slate-800">{broker.area}</strong></p>
                  
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase">Brokerage Fee:</span>
                    <span className="font-black text-slate-900">{broker.brokerage}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => {
                      setActiveInquiryTarget(broker);
                      setInquirySubmitted(false);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider px-6 py-2.5 rounded transition cursor-pointer shadow"
                  >
                    Contact Broker
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* SECTION 2: HOME LOAN & EMI CALCULATOR */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <span className="bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full inline-block mb-3">
              📊 Financial Tool
            </span>
            <h2 className="text-2xl font-light uppercase tracking-wide text-slate-900 mb-2">
              Home Loan EMI Calculator
            </h2>
            <p className="text-slate-500 text-xs mb-8">
              Plan your home purchase by calculating your monthly mortgage payments instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase text-slate-600">Loan Amount</label>
                    <span className="text-sm font-black text-emerald-600">₹ {loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500000" 
                    max="50000000" 
                    step="500000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase text-slate-600">Interest Rate (% P.A.)</label>
                    <span className="text-sm font-black text-emerald-600">{interestRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="6" 
                    max="18" 
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase text-slate-600">Loan Tenure (Years)</label>
                    <span className="text-sm font-black text-emerald-600">{loanTenure} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* EMI Output Card */}
              <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Monthly EMI</p>
                  <h3 className="text-3xl font-light text-emerald-400 tracking-wider">
                    ₹ {Math.round(emi).toLocaleString('en-IN')}
                  </h3>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Principal Amount:</span>
                    <span className="font-bold">₹ {loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Interest:</span>
                    <span className="font-bold">₹ {Math.round(totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-3 text-sm">
                    <span className="text-slate-300 font-bold">Total Payment:</span>
                    <span className="font-black text-emerald-400">₹ {Math.round(totalPayment).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 3: INSTAGRAM INFLUENCER PROMOTION & CREATORS DIRECTORY */}
        <section className="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950 text-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="border-b border-slate-800 pb-6 mb-8">
            <span className="bg-pink-500/20 border border-pink-500/40 text-pink-400 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full inline-block mb-2">
              🔥 Real Estate Creator Buzz
            </span>
            <h2 className="text-2xl font-light uppercase tracking-wide text-white">
              Instagram Influencer Reel Shoot & Paid Promotions
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              Click on creator Instagram handles to view profiles or click contact creator to connect securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {influencersList.map((inf) => (
              <div key={inf.id} className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={inf.photo} 
                        alt={inf.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-pink-500 shadow"
                      />
                      <div>
                        <h3 className="text-base font-bold text-white">{inf.name}</h3>
                        <a 
                          href={inf.instaLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-pink-400 text-xs font-semibold hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          📸 {inf.instaHandle} ↗
                        </a>
                      </div>
                    </div>
                    <span className="bg-pink-600 text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-wider rounded-full">
                      {inf.followers}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3">✨ Package: <strong className="text-white">{inf.packageDetails}</strong></p>
                  
                  <div className="bg-slate-900/60 p-3 rounded-lg flex justify-between items-center text-xs border border-slate-700 mb-4">
                    <span className="text-slate-400 font-bold uppercase">Promotion Price:</span>
                    <span className="font-black text-pink-400 text-sm">{inf.price}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700 flex justify-end">
                  <button 
                    onClick={() => {
                      setActiveInquiryTarget(inf);
                      setInquirySubmitted(false);
                    }}
                    className="bg-pink-600 hover:bg-pink-500 text-white font-bold text-[11px] uppercase tracking-wider px-6 py-2.5 rounded transition shadow cursor-pointer"
                  >
                    Contact Creator
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* LEAD INQUIRY MODAL */}
      {activeInquiryTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white border border-slate-200 p-8 max-w-md w-full rounded-2xl shadow-2xl text-slate-900 relative">
            <button 
              onClick={() => setActiveInquiryTarget(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-base cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full inline-block mb-2">
                Instant Inquiry
              </span>
              <h3 className="text-xl font-bold uppercase text-slate-900">
                Contact {activeInquiryTarget.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your details will be shared directly with them via WhatsApp and saved in admin records.
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-900 text-xs font-bold text-center space-y-2">
                <p>🚀 Inquiry sent successfully & saved in admin records!</p>
                <p className="text-slate-600 font-normal">Redirecting to WhatsApp chat...</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Your Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ramesh Bhai"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Your Phone / WhatsApp *</label>
                  <input 
                    type="text" 
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Message / Requirements *</label>
                  <textarea 
                    required
                    rows={3}
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="I want to discuss property listing / reel promotion..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition shadow-md cursor-pointer"
                >
                  Send Inquiry & Open WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-8 text-xs text-slate-500 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 uppercase font-bold tracking-widest text-slate-900">
            <Link href="/" className="hover:text-emerald-600">Site</Link>
            <Link href="/buy" className="hover:text-emerald-600">Listings</Link>
            <Link href="/services" className="hover:text-emerald-600">Services</Link>
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