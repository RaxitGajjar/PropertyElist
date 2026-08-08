import dynamic from 'next/dynamic';

// બિલ્ડ વખતે સર્વર સાઇડ રેન્ડરિંગ (SSR) સંપૂર્ણપણે બંધ કરવા માટેનો જાદુઈ કોડ
const BuyListClients = dynamic(() => import('./BuyListClients'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 uppercase tracking-widest text-xs">
      Loading Listings...
    </div>
  )
});

export default function BuyPage() {
  return <BuyListClients />;
}