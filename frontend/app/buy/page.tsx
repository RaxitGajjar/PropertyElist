import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";

const BuyListClients = dynamicImport(() => import("./BuyListClients"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 uppercase tracking-widest text-xs">
      Loading Listings...
    </div>
  ),
});

export default function BuyPage() {
  return <BuyListClients />;
}