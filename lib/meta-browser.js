function getCookie(name) {
  if (typeof document === "undefined") return "";
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`))?.[1] || "";
}

export function getMetaTrackingData() {
  if (typeof window === "undefined") {
    return { fbp: "", fbc: "", eventSourceUrl: "" };
  }

  let fbp = getCookie("_fbp");
  let fbc = getCookie("_fbc");
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");

  if (!fbc && fbclid) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
    document.cookie = `_fbc=${encodeURIComponent(fbc)}; Max-Age=7776000; Path=/; SameSite=Lax`;
  }

  return {
    fbp,
    fbc,
    eventSourceUrl: window.location.href,
  };
}

export function reportMetaLead(eventId) {
  if (
    typeof window !== "undefined" &&
    typeof window.fbq === "function" &&
    eventId
  ) {
    window.fbq("track", "Lead", {}, { eventID: eventId });
  }
}
