import { NextResponse } from "next/server";

// ગ્લોબલ ઇન-મેમરી એરે (Temporary Store for Live Webhook Leads)
let globalInquiries: any[] = [
  {
    id: "1",
    source: "Facebook Sponsored Ad",
    clientName: "Rahul Sharma (Test Lead)",
    phone: "+91 99887 76655",
    targetProperty: "Property X (Aniket Elite - 4 BHK)",
    requirement: "Requirement: 4 BHK",
    location: "Science City, Ahmedabad",
    surrounding: ["Property X (Aniket Elite)", "Property Y (Luxuria Sky)"],
    status: "Not assigned yet"
  },
  {
    id: "2",
    source: "Instagram Sponsored Ad",
    clientName: "Suresh Mehta",
    phone: "+91 98765 43210",
    targetProperty: "Property Y (Luxuria Sky - 3 BHK)",
    requirement: "Requirement: 3 BHK",
    location: "Science City, Ahmedabad",
    surrounding: ["Property X (Aniket Elite)", "Property Y (Luxuria Sky)"],
    status: "Not assigned yet"
  }
];

// GET: એડમિન પેનલ આ API માંથી લાઇવ ડેટા મેળવશે
export async function GET() {
  return NextResponse.json(globalInquiries, { status: 200 });
}

// POST: ફેસબુક વેબહુક આ API પર નવી લીડ મોકલશે
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newLead = {
      id: body.id || `FB-${Date.now()}`,
      source: body.source || "Facebook Sponsored Ad",
      clientName: body.name || body.customerName || "Meta Test Lead",
      phone: body.phone || "+91 9876543210",
      targetProperty: body.property_name || body.propertyName || "Aniket Elite",
      requirement: "New Facebook Lead",
      location: "Science City, Ahmedabad",
      surrounding: ["Property X (Aniket Elite)", "Property Y (Luxuria Sky)"],
      status: "Not assigned yet"
    };

    // નવી લીડને લિસ્ટમાં સૌથી ઉપર ઉમેરો
    globalInquiries.unshift(newLead);
    console.log("✅ New Lead Pushed to Inquiries Array:", newLead);

    return NextResponse.json({ success: true, lead: newLead }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}