import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const lead = await Lead.create({ name, phone, fbp: body.fbp || "", fbc: body.fbc || "" });

    return NextResponse.json({ ok: true, id: lead._id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/offer failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
