import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { packageName, amount, builderName, email } = body;

    if (!packageName || !amount || !builderName) {
      return NextResponse.json(
        { success: false, message: "Missing required payment parameters!" },
        { status: 400 }
      );
    }

    // 💳 અહીં Razorpay અથવા Stripe API સાથે કનેક્ટ કરીને ઓર્ડર ID જનરેટ થાય છે
    const orderId = `order_${Math.random().toString(36).substring(2, 12)}`;

    const paymentDetails = {
      orderId,
      packageName,
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      status: "Created",
      builderName,
      email: email || "builder@gmail.com",
      createdAt: new Date().toISOString(),
    };

    console.log("🟢 Payment Order Created:", paymentDetails);

    return NextResponse.json({
      success: true,
      message: "Payment order successfully created!",
      order: paymentDetails,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Payment processing failed", error },
      { status: 500 }
    );
  }
}