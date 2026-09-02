import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { isValidIndianPhone } from "@/lib/validators";
import { getMetaContext, sendInitialLeadToMeta } from "@/lib/meta-capi";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
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
    const metaEventId = `lead-offer-${crypto.randomUUID()}`;

    await connectDB();
    const lead = await Lead.create({
      name,
      phone,
      email: email || "",
      fbp: meta.fbp,
      fbc: meta.fbc,
      eventSourceUrl: meta.eventSourceUrl || "",
      metaEventId,
    });

    try {
      await sendInitialLeadToMeta({
        lead: {
          id: lead._id.toString(),
          type: "offer",
          source: lead.source,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          fbp: lead.fbp,
          fbc: lead.fbc,
          metaEventId,
        },
        request,
        eventSourceUrl: meta.eventSourceUrl,
      });
    } catch (metaError) {
      console.error("Meta CAPI initial offer event failed:", metaError);
    }

    return NextResponse.json({ ok: true, id: lead._id, metaEventId }, { status: 201 });
  } catch (err) {
    console.error("POST /api/offer failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
