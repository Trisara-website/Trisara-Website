import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Enquiry from "@/models/Enquiry";
import Lead from "@/models/Lead";
import { isAdminRequest } from "@/lib/admin-auth";

const TYPE_MAP = { booking: Booking, enquiry: Enquiry, offer: Lead };

function normalize(doc, type) {
  const raw = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(raw._id),
    type,
    name: raw.name || "",
    phone: raw.phone || "",
    email: raw.email || "",
    eventType: raw.eventType || "",
    eventDate: raw.date || raw.eventDate || "",
    guests: raw.guests || "",
    time: raw.time || "",
    message: raw.message || "",
    offer: raw.offer || "",
    status: raw.status || "new",
    source: raw.source || type,
    fbp: raw.fbp || "",
    fbc: raw.fbc || "",
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function buildQuery(search, from, to) {
  const query = {};
  if (search) {
    const safe = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.$or = [{ name: { $regex: safe, $options: "i" } }, { phone: { $regex: safe, $options: "i" } }];
  }
  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(`${from}T00:00:00.000+05:30`);
    if (to) query.createdAt.$lte = new Date(`${to}T23:59:59.999+05:30`);
  }
  return query;
}

export async function GET(request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search")?.trim() || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || 100), 1), 500);
  const query = buildQuery(search, from, to);
  if (status !== "all") query.status = status;

  try {
    await connectDB();
    const types = type === "all" ? Object.keys(TYPE_MAP) : [type].filter((x) => TYPE_MAP[x]);
    const rows = (await Promise.all(types.map(async (key) => {
      const docs = await TYPE_MAP[key].find(query).sort({ createdAt: -1 }).limit(limit).lean();
      return docs.map((doc) => normalize(doc, key));
    }))).flat().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);

    const counts = { all: 0, booking: 0, enquiry: 0, offer: 0, new: 0, qualified: 0, unqualified: 0, spam: 0, booked: 0 };
    for (const row of rows) {
      counts[row.type] += 1;
      counts.all += 1;
      if (counts[row.status] !== undefined) counts[row.status] += 1;
    }

    return NextResponse.json({ leads: rows, counts });
  } catch (error) {
    console.error("GET /api/admin/leads failed:", error);
    return NextResponse.json({ error: "Could not load leads." }, { status: 500 });
  }
}
