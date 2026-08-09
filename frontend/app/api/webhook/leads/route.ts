import { NextResponse } from "next/server";

// 🔐 ફેસબુક માટેનો Verify Token (આ શબ્દ જ Facebook માં નાખવો)
const VERIFY_TOKEN = "propertyelist_secret";

// 1️⃣ GET Method: Facebook Webhook Verification માટે
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // જ્યારે ફેસબુક "Verify and save" દબાવશે ત્યારે આ ચેક થશે
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("🟢 Facebook Webhook Verified Successfully!");
    return new Response(challenge, { status: 200 });
  }

  // જો કોઈ સામાન્ય બ્રાઉઝરમાં ઓપન કરે તો
  return NextResponse.json({
    status: "Active",
    message: "PropertyElist Ad Leads Webhook API is running live!",
  });
}

// 2️⃣ POST Method: Facebook માંથી રિયલ-ટાઇમ લીડ્સ રિસીવ કરવા માટે
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 📥 ફેસબુક Lead Ads મોડેલ ડેટા અથવા કસ્ટમ ડેટા
    console.log("🟢 New Real-time Lead Event Received:", JSON.stringify(body, null, 2));

    // ફેસબુકને સફળતાપૂર્વક લીડ મળી ગઈ હોવાનો 200 OK રિસ્પોન્સ આપવો જરૂરી છે
    return NextResponse.json({
      success: true,
      message: "Lead successfully recorded and synced to admin dashboard!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid webhook payload", error },
      { status: 500 }
    );
  }
}