import { NextResponse } from "next/server";

const VERIFY_TOKEN = "propertyelist_secret";

// 1️⃣ GET Method: Facebook Webhook Verification
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("🟢 Facebook Webhook Verified Successfully!");
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({
    status: "Active",
    message: "PropertyElist Ad Leads Webhook API is running live!",
  });
}

// 2️⃣ POST Method: Facebook Lead Ads માંથી ડેટા કેપ્ચર કરીને Admin Inquiries માં મોકલવા માટે
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("🟢 Facebook Lead Event Received:", JSON.stringify(body, null, 2));

    // ફેસબુકમાંથી આવતી લીડ એન્ટ્રીઝ પ્રોસેસ કરો
    if (body.entry && body.entry.length > 0) {
      for (const entry of body.entry) {
        if (entry.changes && entry.changes.length > 0) {
          for (const change of entry.changes) {
            const leadgenId = change.value?.leadgen_id;
            const pageId = change.value?.page_id;
            const formId = change.value?.form_id;

            if (leadgenId) {
              const leadData = {
                id: `FB-${leadgenId}`,
                customerName: `Facebook Lead (${leadgenId.slice(-4)})`,
                phone: "+91 9876543210", // Lead retrieval access token જોડ્યા પછી રિયલ ફોન નંબર ફેચ થશે
                email: "facebook.lead@propertyelist.com",
                propertyName: "Meta Ad Campaign Lead",
                source: "Facebook Lead Ad",
                leadgenId: leadgenId,
                formId: formId,
                pageId: pageId,
                date: new Date().toLocaleString(),
                status: "New",
              };

              console.log("💾 Saving Lead to Admin Inquiries:", leadData);

              // 📥 Admin Inquiries API પર લીડ પોસ્ટ કરો (Internal Sync)
              const backendOrigin = process.env.NEXT_PUBLIC_API_URL || "https://propertyelist.com";
              await fetch(`${backendOrigin}/api/admin/inquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadData),
              }).catch((err) => console.error("Admin Sync Warning:", err));
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead received and saved to Admin Panel Inquiries!",
    });
  } catch (error) {
    console.error("❌ Error processing lead:", error);
    return NextResponse.json(
      { success: false, message: "Error processing lead", error },
      { status: 500 }
    );
  }
}