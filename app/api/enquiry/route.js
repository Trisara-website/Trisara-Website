import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { isValidIndianPhone } from "@/lib/validators";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, eventDate, eventType } = body;

    if (!name || !phone || !eventDate || !eventType) {
      return NextResponse.json(
        { error: "Name, phone, event date and event type are required." },
        { status: 400 }
      );
    }

    if (!isValidIndianPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    await connectDB();
    const enquiry = await Enquiry.create({ name, phone, eventDate, eventType, fbp: body.fbp || "", fbc: body.fbc || "" });

    return NextResponse.json({ ok: true, id: enquiry._id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/enquiry failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
