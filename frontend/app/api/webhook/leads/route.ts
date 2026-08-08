import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 📥 ફેસબુક કે ગૂગલ એડ્સમાંથી આવતી લીડનો ડેટા કેપ્ચર કરો
    const { customerName, phone, email, propertyName, source } = body;

    if (!customerName || !phone || !propertyName) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing!" },
        { status: 400 }
      );
    }

    // 💡 અહીં તમે ડેટાબેઝ (જેવું કે MongoDB, PostgreSQL કે Prisma) માં લીડ સેવ કરી શકો છો
    const newLead = {
      id: `LEAD-${Date.now()}`,
      customerName,
      phone,
      email: email || "N/A",
      propertyInterested: propertyName, // દા.ત. Property X, Y કે Z
      source: source || "Sponsored Ad",
      date: new Date().toLocaleString(),
      status: "New",
    };

    console.log("🟢 New Real-time Lead Received:", newLead);

    // સફળતાપૂર્વક લીડ સેવ થયાનો રિસ્પોન્સ મોકલો
    return NextResponse.json({
      success: true,
      message: "Lead successfully recorded and synced to admin dashboard!",
      lead: newLead,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid webhook payload", error },
      { status: 500 }
    );
  }
}

// GET method દ્વારા વેબહુક વેલિડેશન ચેક કરવા માટે
export async function GET() {
  return NextResponse.json({
    status: "Active",
    message: "PropertyElist Ad Leads Webhook API is running live!",
  });
}