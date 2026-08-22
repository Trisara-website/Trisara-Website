// Shared form-validation helpers, used by both OfferPopup and EnquireModal
// so a phone number is checked the same way everywhere on the site.

/**
 * Validates an Indian mobile number.
 * Accepts "9019875256", "+91 9019875256", "091-9019875256", with spaces/
 * dashes stripped first. Rejects anything that isn't a 10-digit number
 * starting 6-9 once the +91 / leading-0 prefix is removed — so repeated
 * digits like "1234567890" or "0000000000" are rejected.
 */
export function isValidIndianPhone(value) {
  if (!value) return false;
  const digits = String(value).replace(/\D/g, "");

  let normalized = digits;
  if (normalized.length === 12 && normalized.startsWith("91")) {
    normalized = normalized.slice(2);
  } else if (normalized.length === 11 && normalized.startsWith("0")) {
    normalized = normalized.slice(1);
  }

  return /^[6-9]\d{9}$/.test(normalized);
}

/** Returns an error string for a phone field, or "" if it's valid. */
export function phoneError(value) {
  if (!value || !String(value).trim()) return "Phone number is required.";
  if (!isValidIndianPhone(value)) return "Enter a valid 10-digit phone number.";
  return "";
}
