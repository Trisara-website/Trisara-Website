"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, CalendarHeart, Check } from "lucide-react";
import DatePicker from "@/components/booking/DatePicker";
import { eventTypeOptions } from "@/lib/data";
import { isValidIndianPhone } from "@/lib/validators";

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

export default function EnquireModal({
  open,
  onClose,
  defaultEventType = "",
}) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState(defaultEventType);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Portals need a browser document, so only render after mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset the form each time the modal is opened.
  useEffect(() => {
    if (!open) return;

    setName("");
    setPhone("");
    setDate("");
    setEventType(defaultEventType);
    setErrors({});
    setError("");
    setSubmitted(false);
  }, [open, defaultEventType]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock page scroll while modal is open.
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !mounted) return null;

  function validate() {
    const next = {};

    if (!name.trim()) {
      next.name = "Please enter your name.";
    }

    if (!phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!isValidIndianPhone(phone)) {
      next.phone = "Enter a valid 10-digit phone number.";
    }

    if (!date) {
      next.date = "Please pick a date.";
    }

    if (!eventType) {
      next.eventType = "Please select an event type.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          eventDate: date,
          eventType,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));

        throw new Error(
          body.error || "Something went wrong. Please try again."
        );
      }

      // Fire Google Ads conversion ONLY after successful submission.
      reportGoogleConversion();

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center overflow-y-auto bg-[#140808]/70 p-5"
      onClick={(e) =>
        e.target === e.currentTarget && onClose()
      }
    >
      <div className="relative my-8 w-full max-w-[460px] max-h-[85vh] overflow-y-auto animate-popin rounded-xl bg-white px-9 pb-9 pt-11 text-center shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)]">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-1.5 text-ink/50 hover:text-ink"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[radial-gradient(circle,#e3b96a,#a9812f)] text-white">
              <CalendarHeart size={26} />
            </div>

            <div className="text-[.8rem] uppercase tracking-[4px] text-vermillion">
              Enquire Now
            </div>

            <h3 className="mt-2 font-display text-[1.7rem] text-ink">
              Let&apos;s plan your event
            </h3>

            <p className="mt-2.5 text-[.98rem] text-ink/65">
              Share a few details and our team will call you to help you
              plan the day.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-4 text-left"
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-ink/20 bg-paper px-3.5 py-3 font-body text-base outline-none focus:border-maroon"
                />

                {errors.name && (
                  <p className="mt-1.5 text-[.8rem] text-vermillion">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-ink/20 bg-paper px-3.5 py-3 font-body text-base outline-none focus:border-maroon"
                />

                {errors.phone && (
                  <p className="mt-1.5 text-[.8rem] text-vermillion">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <DatePicker
                  label="Date of Event"
                  value={date}
                  onChange={setDate}
                />

                {errors.date && (
                  <p className="mt-1.5 text-[.8rem] text-vermillion">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-[.72rem] uppercase tracking-[2px] text-ink/55">
                  Type of Event
                </label>

                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full rounded-md border border-ink/20 bg-paper px-3.5 py-3 font-body text-base outline-none focus:border-maroon"
                >
                  <option value="">Select event type</option>

                  {eventTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {errors.eventType && (
                  <p className="mt-1.5 text-[.8rem] text-vermillion">
                    {errors.eventType}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 w-full bg-maroon px-9 py-4 text-[.8rem] uppercase tracking-[2.5px] text-white transition-colors hover:bg-maroonDeep disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Send Enquiry"}
              </button>
            </form>

            {error && (
              <p className="mt-3 text-[.85rem] text-vermillion">
                {error}
              </p>
            )}
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
              Our team will call you shortly to help you plan your event.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

