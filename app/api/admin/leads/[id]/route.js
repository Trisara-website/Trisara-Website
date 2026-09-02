import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Enquiry from "@/models/Enquiry";
import Lead from "@/models/Lead";
import { isAdminRequest } from "@/lib/admin-auth";
import { sendLeadStatusToMeta } from "@/lib/meta-capi";

const MODELS = { booking: Booking, enquiry: Enquiry, offer: Lead };
const STATUSES = new Set(["new", "qualified", "unqualified", "spam", "booked"]);

export async function PATCH(request, { params }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { type, status } = await request.json();
    const { id } = await params;

    if (!MODELS[type]) {
      return NextResponse.json({ error: "Invalid lead type." }, { status: 400 });
    }

    if (!STATUSES.has(status)) {
      return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
    }

    await connectDB();
    const model = MODELS[type];
    const lead = await model.findByIdAndUpdate(id, { status }, { new: true }).lean();

    if (!lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    let meta = { skipped: true };

    // Only positive downstream outcomes are sent back to Meta.
    // Spam and unqualified leads are deliberately NOT sent as conversions.
    if (status === "qualified" || status === "booked") {
      const sentField = status === "qualified" ? "metaQualifiedEventSentAt" : "metaBookedEventSentAt";
      const alreadySent = Boolean(lead[sentField]);

      if (!alreadySent) {
        try {
          meta = await sendLeadStatusToMeta({
            lead: {
              id,
              type,
              source: lead.source || type,
              name: lead.name,
              phone: lead.phone,
              email: lead.email,
              fbp: lead.fbp,
              fbc: lead.fbc,
              eventSourceUrl: lead.eventSourceUrl,
            },
            status,
            request,
          });

          if (!meta?.skipped) {
            await model.findByIdAndUpdate(id, {
              [sentField]: new Date(),
            });
          }
        } catch (metaError) {
          // The admin status change must still succeed even if Meta is temporarily unavailable.
          console.error("Meta CAPI lead-status event failed:", metaError);
        }
      } else {
        meta = { skipped: true, reason: "already_sent" };
      }
    }

    return NextResponse.json({
      ok: true,
      status,
      meta: {
        sent: !meta?.skipped,
        reason: meta?.reason || null,
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/leads/:id failed:", error);
    return NextResponse.json({ error: "Could not update lead." }, { status: 500 });
  }
}
