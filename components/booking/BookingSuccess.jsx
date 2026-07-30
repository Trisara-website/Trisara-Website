import Link from "next/link";
import { Check } from "lucide-react";

export default function BookingSuccess() {
  return (
    <div className="animate-fadein py-3 text-center">
      <div className="mx-auto mb-6 flex h-[74px] w-[74px] items-center justify-center rounded-full bg-maroon/10 text-maroon">
        <Check size={34} />
      </div>
      <h3 className="font-display text-[1.9rem] text-ink">Request received!</h3>
      <p className="mx-auto mt-3.5 max-w-[420px] text-[.98rem] text-ink/65">
        Thank you — our team will call you within 24 hours to confirm your date and walk you through the next steps.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-maroon px-9 py-4 text-[.8rem] uppercase tracking-[2.5px] text-white transition-colors hover:bg-maroonDeep"
      >
        Back to Home
      </Link>
    </div>
  );
}
