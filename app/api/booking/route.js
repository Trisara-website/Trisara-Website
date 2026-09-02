import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getMetaContext, sendInitialLeadToMeta } from "@/lib/meta-capi";

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

    const meta = getMetaContext(request, body);
    const metaEventId = `lead-booking-${crypto.randomUUID()}`;

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
      fbp: meta.fbp,
      fbc: meta.fbc,
      eventSourceUrl: meta.eventSourceUrl || "",
      metaEventId,
    });

    try {
      await sendInitialLeadToMeta({
        lead: {
          id: booking._id.toString(),
          type: "booking",
          source: booking.source,
          name: booking.name,
          phone: booking.phone,
          email: booking.email,
          fbp: booking.fbp,
          fbc: booking.fbc,
          metaEventId,
        },
        request,
        eventSourceUrl: meta.eventSourceUrl,
      });
    } catch (metaError) {
      console.error("Meta CAPI initial booking event failed:", metaError);
    }

    return NextResponse.json({ ok: true, id: booking._id, metaEventId }, { status: 201 });
  } catch (err) {
    console.error("POST /api/booking failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
