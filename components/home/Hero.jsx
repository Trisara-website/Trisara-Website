"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import EnquireModal from "@/components/events/EnquireModal";

export default function Hero() {
  const bgRef = useRef(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.32}px)`;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="relative h-screen min-h-[640px] overflow-hidden">
      <div
        ref={bgRef}
        className="absolute -inset-16 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('/images/hero.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#26060a]/55 via-[#26060a]/35 to-[#26060a]/85" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <Reveal className="text-[.85rem] uppercase tracking-[5px] text-gold">
          Sahakara Nagar · Bengaluru
        </Reveal>
        <Reveal delay={80} as="h1" className="mt-4 max-w-[900px] font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-bold leading-[1.05]">
          Every love story deserves <em className="font-medium not-italic text-gold">a grand opening.</em>
        </Reveal>
        <Reveal delay={160} as="p" className="mt-5 max-w-[520px] text-[1.15rem] opacity-90">
          A skylit banquet hall and open lawn, held as one address — where your ceremony, sangeet and reception unfold under a single roof of light.
        </Reveal>
        <Reveal delay={240} className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className="bg-maroon px-9 py-4 text-[.8rem] uppercase tracking-[2.5px] text-white transition-colors hover:bg-maroonDeep"
          >
            Check Available Dates
          </button>
          <Link href="/events" className="inline-flex items-center gap-2 border border-white px-7 py-[15px] text-[.8rem] uppercase tracking-[2.5px] text-white transition-colors hover:bg-white hover:text-maroon">
            See What We Host
          </Link>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bob text-white/80">
        <ChevronDown size={22} />
      </div>

      <EnquireModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </header>
  );
}
