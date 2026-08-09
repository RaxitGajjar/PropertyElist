import { NextResponse } from "next/server";

const VERIFY_TOKEN = "propertyelist_secret";

// 1️⃣ GET Method: Facebook Verification
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

// 2️⃣ POST Method: Facebook માંથી લીડ આવતા જ Admin Inquiry માં સેવ કરશે
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("🟢 Facebook Webhook Payload:", JSON.stringify(body, null, 2));

    if (body.entry && body.entry.length > 0) {
      for (const entry of body.entry) {
        if (entry.changes && entry.changes.length > 0) {
          for (const change of entry.changes) {
            const leadgenId = change.value?.leadgen_id;

            if (leadgenId) {
              // Admin Panel ના Format મુજબ ડાયરેક્ટ ડેટા ઓબ્જેક્ટ
              const leadData = {
                name: `Meta Ad Lead (${leadgenId.slice(-4)})`,
                phone: "+91 9876543210",
                email: "lead@propertyelist.com",
                property_name: "Facebook Lead Ad Campaign",
                source: "Facebook Ads",
                message: `Lead Generated via Facebook Test Tool (ID: ${leadgenId})`,
                status: "New",
                created_at: new Date().toISOString(),
              };

              // Admin Inquiries API પર ડેટા પોસ્ટ કરો
              const host = request.headers.get("host");
              const protocol = host?.includes("localhost") ? "http" : "https";
              const apiUrl = `${protocol}://${host}/api/admin/inquiries`;

              await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadData),
              }).catch((err) => console.log("Admin Sync Error:", err));
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}