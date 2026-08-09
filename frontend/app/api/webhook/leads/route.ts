import { NextResponse } from "next/server";

const VERIFY_TOKEN = "propertyelist_secret";

// 1️⃣ GET: Facebook Verification
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ status: "Active", message: "Webhook is live" });
}

// 2️⃣ POST: Real-Time Lead Ingestion
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.entry && body.entry.length > 0) {
      for (const entry of body.entry) {
        if (entry.changes && entry.changes.length > 0) {
          for (const change of entry.changes) {
            const leadgenId = change.value?.leadgen_id;

            if (leadgenId) {
              // 📥 ટેસ્ટ/રિયલ લીડ ઓબ્જેક્ટ
              const leadEntry = {
                id: `FB-${leadgenId}`,
                customerName: `Meta Test Lead (${leadgenId.slice(-4)})`,
                phone: "+91 9876543210",
                email: "testlead@propertyelist.com",
                propertyName: "Facebook Lead Ad Campaign",
                source: "Facebook Ads",
                date: new Date().toLocaleString(),
                status: "New",
              };

              console.log("💾 Incoming Lead Detected:", leadEntry);

              // Backend / Admin API Endpoint Call
              const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://propertyelist.com";
              await fetch(`${baseUrl}/api/admin/inquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadEntry),
              }).catch((e) => console.log("Internal Post Warning:", e));
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: "Lead Processed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}