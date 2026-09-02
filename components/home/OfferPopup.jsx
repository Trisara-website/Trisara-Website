"use client";

import { useEffect, useState } from "react";
import { X, PartyPopper, Check } from "lucide-react";
import { isValidIndianPhone } from "@/lib/validators";
import { getMetaTrackingData, reportMetaLead } from "@/lib/meta-browser";

// Google Ads conversion tracking
function reportGoogleConversion() {
  if (
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", "conversion", {
      send_to: "AW-11467424691/BnV5CIy22OYcELOHjNwq",
    });
  }
}

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("trisaraOfferSeen")) return;

    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("trisaraOfferSeen", "1");
    }, 4000);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isValidIndianPhone(phone)) {
      setPhoneError("Enter a valid 10-digit phone number.");
      return;
    }

    setPhoneError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          ...getMetaTrackingData(),
        }),
      });

      const responseBody = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          responseBody.error || "Something went wrong. Please try again."
        );
      }

      // Browser Pixel and server CAPI use the same event ID for deduplication.
      reportGoogleConversion();
      reportMetaLead(responseBody.metaEventId);

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-[#140808]/55 p-5"
      onClick={(e) =>
        e.target === e.currentTarget && setOpen(false)
      }
    >
      <div className="relative w-full max-w-[420px] animate-popin rounded-xl bg-white px-9 pb-9 pt-11 text-center shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)]">
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-3.5 top-3.5 p-1.5 text-ink/50 hover:text-ink"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[radial-gradient(circle,#e3b96a,#a9812f)] text-white">
              <PartyPopper size={26} />
            </div>

            <div className="text-[.8rem] uppercase tracking-[4px] text-vermillion">
              Congratulations
            </div>

            <h3 className="mt-2 font-display text-[1.7rem] text-ink">
              You&apos;ve unlocked 10% off!
            </h3>

            <p className="mt-2.5 text-[.98rem] text-ink/65">
              Just leave your name &amp; number — our team will call you
              to lock in the offer before dates fill up.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-4"
            >
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-ink/20 bg-paper px-3.5 py-3 font-body text-base outline-none focus:border-maroon"
              />

              <div>
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);

                    if (phoneError) {
                      setPhoneError("");
                    }
                  }}
                  className="w-full rounded-md border border-ink/20 bg-paper px-3.5 py-3 font-body text-base outline-none focus:border-maroon"
                />

                {phoneError && (
                  <p className="mt-1.5 text-left text-[.8rem] text-vermillion">
                    {phoneError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 w-full bg-maroon px-9 py-4 text-[.8rem] uppercase tracking-[2.5px] text-white transition-colors hover:bg-maroonDeep disabled:opacity-60"
              >
                {submitting
                  ? "Submitting…"
                  : "Claim My 10% Off"}
              </button>
            </form>

            {error && (
              <p className="mt-3 text-[.85rem] text-vermillion">
                {error}
              </p>
            )}

            <p className="mt-3.5 text-[.72rem] opacity-50">
              Valid for bookings confirmed this month.
            </p>
          </>
        ) : (
          <div className="py-2.5">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10 text-maroon">
              <Check size={28} />
            </div>

            <h3 className="font-display text-[1.7rem] text-ink">
              Thank you!
            </h3>

            <p className="mt-2.5 text-[.98rem] text-ink/65">
              Our team will call you shortly to help you claim your offer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

