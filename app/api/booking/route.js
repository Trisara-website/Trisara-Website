import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, date, time } = body;

    if (!name || !email || !phone || !eventType || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await connectDB();
    const booking = await Booking.create({
      name,
      email,
      phone,
      eventType,
      date,
      guests: body.guests || "",
      time,
      message: body.message || "",
    });

    return NextResponse.json({ ok: true, id: booking._id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/booking failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
