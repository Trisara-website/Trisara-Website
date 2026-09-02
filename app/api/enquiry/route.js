import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { isValidIndianPhone } from "@/lib/validators";
import { getMetaContext, sendInitialLeadToMeta } from "@/lib/meta-capi";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, eventDate, eventType } = body;

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

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const meta = getMetaContext(request, body);
    const metaEventId = `lead-enquiry-${crypto.randomUUID()}`;

    await connectDB();
    const enquiry = await Enquiry.create({
      name,
      phone,
      email: email || "",
      eventDate,
      eventType,
      fbp: meta.fbp,
      fbc: meta.fbc,
      eventSourceUrl: meta.eventSourceUrl || "",
      metaEventId,
    });

    // Send the server-side Lead event. If Meta is temporarily unavailable,
    // do not fail the user's enquiry submission.
    try {
      await sendInitialLeadToMeta({
        lead: {
          id: enquiry._id.toString(),
          type: "enquiry",
          source: enquiry.source,
          name: enquiry.name,
          phone: enquiry.phone,
          email: enquiry.email,
          fbp: enquiry.fbp,
          fbc: enquiry.fbc,
          metaEventId,
        },
        request,
        eventSourceUrl: meta.eventSourceUrl,
      });
    } catch (metaError) {
      console.error("Meta CAPI initial enquiry event failed:", metaError);
    }

    return NextResponse.json(
      { ok: true, id: enquiry._id, metaEventId },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/enquiry failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
