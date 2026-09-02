import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1332486825534463";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

function hash(value) {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

export async function sendLeadStatusToMeta({ lead, status, request }) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.warn("Meta CAPI skipped: META_ACCESS_TOKEN or META_PIXEL_ID is not configured.");
    return { skipped: true };
  }

  const eventName = "Lead";
  const eventTime = Math.floor(Date.now() / 1000);
  const eventId = `lead-${lead.source}-${lead.id}-${status}-${eventTime}`;
  const forwardedFor = request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = forwardedFor || request?.headers.get("x-real-ip") || undefined;
  const userAgent = request?.headers.get("user-agent") || undefined;

  const userData = {
    ph: hash(normalizePhone(lead.phone)),
    fn: hash(lead.name),
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };

  if (lead.fbp) userData.fbp = lead.fbp;
  if (lead.fbc) userData.fbc = lead.fbc;
  if (lead.email) userData.em = hash(lead.email);

  Object.keys(userData).forEach((key) => userData[key] === undefined && delete userData[key]);

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        event_id: eventId,
        action_source: "website",
        user_data: userData,
        custom_data: {
          lead_status: status,
          lead_source: lead.source,
          lead_type: lead.type,
        },
      },
    ],
  };

  const response = await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result?.error?.message || `Meta CAPI request failed (${response.status}).`);
  }
  return result;
}
