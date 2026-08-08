import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Google SEO Meta Data (Google Search Mate)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [rows]: any = await db.execute("SELECT * FROM rera_projects WHERE slug = ?", [slug]);

  if (!rows || rows.length === 0) {
    return { title: "Project Not Found - PropertyELIST" };
  }

  const project = rows[0];
  return {
    title: `${project.title} ${project.location} ${project.city} | RERA Details & Specs`,
    description: `Check full GujRERA verified details for ${project.title} located at ${project.location}, ${project.city}. RERA Registration: ${project.rera_no}. Developer: ${project.developer}.`,
    openGraph: {
      title: `${project.title} - RERA Approved Scheme in ${project.city}`,
      description: `${project.details} by ${project.developer}. RERA No: ${project.rera_no}`,
      images: [project.images],
    },
  };
}

// 2. Dynamic Project Details Page Component
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [rows]: any = await db.execute("SELECT * FROM rera_projects WHERE slug = ?", [slug]);

  if (!rows || rows.length === 0) {
    notFound();
  }

  const project = rows[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <Link href="/">
            <img src="/logo.png" alt="PropertyELIST" className="h-28 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:underline">
            ← Back to All Projects
          </Link>
        </div>
      </header>

      {/* Main Project Details */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Banner Image */}
          <div className="h-96 w-full relative bg-slate-900">
            <img 
              src={project.images || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"} 
              alt={project.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute top-6 left-6 bg-emerald-600 text-white text-xs font-black px-4 py-1.5 uppercase tracking-wider rounded-md shadow">
              ✓ GujRERA Registered
            </div>
          </div>

          {/* Details Content */}
          <div className="p-8 md:p-12">
            <div className="border-b border-slate-100 pb-8">
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest block mb-2">
                {project.city} • {project.location}
              </span>
              <h1 className="text-3xl md:text-5xl font-light tracking-wide text-slate-900 uppercase">
                {project.title}
              </h1>
              <p className="text-slate-500 font-semibold text-sm mt-3">
                Developed by: <span className="text-slate-800">{project.developer || "Verified Builder"}</span>
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Property Configuration</span>
                <span className="text-slate-800 font-bold text-base mt-1 block">{project.property_type}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Project Scope & Units</span>
                <span className="text-slate-800 font-bold text-base mt-1 block">{project.details}</span>
              </div>
              <div className="md:col-span-2 border-t border-slate-200 pt-4">
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Official GujRERA Registration No</span>
                <span className="text-emerald-700 font-mono font-bold text-sm mt-1 block tracking-wider">
                  {project.rera_no}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="flex-1 bg-slate-900 hover:bg-emerald-600 text-white py-4 text-xs font-bold uppercase tracking-widest transition rounded-lg text-center shadow">
                Inquire For Floor Plan & Pricing
              </button>
              <button className="flex-1 border border-slate-300 hover:border-slate-900 text-slate-800 py-4 text-xs font-bold uppercase tracking-widest transition rounded-lg text-center">
                Download RERA Certificate
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}