import React, { Suspense } from "react";
import BuyListClient from "./BuyListClients";

export const dynamic = "force-dynamic";

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-slate-500 uppercase tracking-widest text-xs">Loading Listings...</div>}>
      <BuyListClient />
    </Suspense>
  );
}