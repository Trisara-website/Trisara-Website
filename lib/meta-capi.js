import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1332486825534463";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const API_VERSION = process.env.META_API_VERSION || "v21.0";

function hash(value) {
  if (value === undefined || value === null || value === "") return undefined;
  return crypto
    .createHash("sha256")
    .update(String(value).trim().toLowerCase())
    .digest("hex");
}

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function splitName(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  return {
    first: parts[0] || "",
    last: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function getClientIp(request) {
  return (
    request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request?.headers.get("x-real-ip") ||
    undefined
  );
}

function getMetaContext(request, body = {}) {
  const cookieFbp = request?.cookies?.get("_fbp")?.value || "";
  const cookieFbc = request?.cookies?.get("_fbc")?.value || "";
  const url = request?.url ? new URL(request.url) : null;
  const fbclid = url?.searchParams.get("fbclid") || "";

  // If Meta has not created _fbc yet, preserve the ad click ID in Meta's
  // expected format so it can be passed server-side.
  const derivedFbc = fbclid ? `fb.1.${Date.now()}.${fbclid}` : "";

  return {
    fbp: cookieFbp || body.fbp || "",
    fbc: cookieFbc || body.fbc || derivedFbc || "",
    eventSourceUrl:
      body.eventSourceUrl ||
      request?.headers.get("referer") ||
      request?.headers.get("origin") ||
      undefined,
  };
}

async function sendMetaEvent({
  eventName,
  eventId,
  lead,
  request,
  customData = {},
  eventSourceUrl,
}) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.warn("Meta CAPI skipped: META_ACCESS_TOKEN or META_PIXEL_ID is not configured.");
    return { skipped: true };
  }

  const { first, last } = splitName(lead.name);
  const clientIp = getClientIp(request);
  const userAgent = request?.headers.get("user-agent") || undefined;

  const userData = {
    ph: hash(normalizePhone(lead.phone)),
    fn: hash(first),
    ln: hash(last),
    em: hash(lead.email),
    external_id: hash(`${lead.type || "lead"}:${lead.id}`),
    client_ip_address: clientIp,
    client_user_agent: userAgent,
    fbp: lead.fbp || undefined,
    fbc: lead.fbc || undefined,
  };

  Object.keys(userData).forEach((key) => {
    if (userData[key] === undefined || userData[key] === "") delete userData[key];
  });

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: customData,
      },
    ],
  };

  const response = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result?.error?.message || `Meta CAPI request failed (${response.status}).`
    );
  }

  return result;
}

export async function sendInitialLeadToMeta({ lead, request, eventSourceUrl }) {
  return sendMetaEvent({
    eventName: "Lead",
    eventId: lead.metaEventId,
    lead,
    request,
    eventSourceUrl,
    customData: {
      lead_source: lead.source,
      lead_type: lead.type,
    },
  });
}

export async function sendLeadStatusToMeta({ lead, status, request }) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.warn("Meta CAPI skipped: META_ACCESS_TOKEN or META_PIXEL_ID is not configured.");
    return { skipped: true };
  }

  // Do NOT send Spam/Unqualified as a conversion. We only want positive
  // downstream business outcomes to teach Meta what a valuable lead is.
  if (status !== "qualified" && status !== "booked") {
    return { skipped: true, reason: "non_positive_status" };
  }

  const eventName = status === "qualified" ? "QualifiedLead" : "BookedLead";
  const eventId = `${eventName.toLowerCase()}-${lead.type}-${lead.id}`;

  return sendMetaEvent({
    eventName,
    eventId,
    lead,
    request,
    eventSourceUrl: lead.eventSourceUrl,
    customData: {
      lead_source: lead.source,
      lead_type: lead.type,
      lead_status: status,
    },
  });
}

export { getMetaContext };
