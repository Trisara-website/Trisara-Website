"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import BookingSidebar from "./BookingSidebar";
import BookingStepDetails from "./BookingStepDetails";
import BookingStepEvent from "./BookingStepEvent";
import BookingStepMessage from "./BookingStepMessage";
import BookingStepReview from "./BookingStepReview";
import BookingSuccess from "./BookingSuccess";

const TOTAL_STEPS = 4;

const initialData = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  date: "",
  guests: "",
  time: "",
  message: "",
};

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");

  function update(patch) {
    setData((d) => ({ ...d, ...patch }));
  }

  function validate() {
    if (step === 1) {
      if (!data.name.trim() || !data.email.trim() || !data.phone.trim()) {
        return "Please fill in your name, email and phone number.";
      }
    }
    if (step === 2) {
      if (!data.eventType) return "Please select an event type.";
      if (!data.date) return "Please select a date.";
      if (!data.time) return "Please select a preferred time.";
    }
    return "";
  }

  async function handleNext() {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    if (step === TOTAL_STEPS) {
      setSubmitting(true);
      try {
        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, fbp: document.cookie.match(/(?:^|; )_fbp=([^;]*)/)?.[1] || "", fbc: document.cookie.match(/(?:^|; )_fbc=([^;]*)/)?.[1] || "" }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Something went wrong. Please try again.");
        }
        // Booking succeeded
window.gtag?.("event", "conversion", {
  send_to: "AW-11467424691/xCyNCLib8N0cELOHjNwq",
});

        setSubmitted(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmitting(false);
        window.gtag('event', 'conversion', {
  send_to: 'AW-11467424691/xCyNCLib8N0cELOHjNwq'
});
      }
      return;
    }
    setStep((s) => s + 1);
  }

  function handleBack() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  if (submitted) {
    return (
      <div className="overflow-hidden rounded-xl bg-paper md:flex">
        <div className="hidden md:block">
          <BookingSidebar current={5} />
        </div>
        <div className="flex-1 bg-white px-8 py-12 md:px-12">
          <BookingSuccess />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-white md:flex">
      <BookingSidebar current={step} />

      <div className="flex-1 px-8 py-10 md:px-12 md:py-12">
        {step === 1 && <BookingStepDetails data={data} onChange={update} />}
        {step === 2 && <BookingStepEvent data={data} onChange={update} />}
        {step === 3 && <BookingStepMessage data={data} onChange={update} />}
        {step === 4 && <BookingStepReview data={data} />}

        {error && <p className="mt-5 text-[.9rem] text-vermillion">{error}</p>}

        <div className="mt-11 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-5 py-2.5 font-body text-[.85rem] uppercase tracking-[1.5px] text-ink/60 transition-colors hover:text-ink disabled:opacity-0"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-maroon px-8 py-3 font-body text-[.85rem] uppercase tracking-[2px] text-white transition-colors hover:bg-maroonDeep disabled:opacity-60"
          >
            {step === TOTAL_STEPS ? (
              <>
                {submitting ? "Submitting…" : "Submit Request"} <Send size={15} />
              </>
            ) : (
              <>
                Continue <ChevronRight size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
