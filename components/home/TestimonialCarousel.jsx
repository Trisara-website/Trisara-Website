"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6500);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[index];

  return (
    <Reveal className="mx-auto max-w-[720px] text-center">
      <Quote className="mx-auto h-11 w-11 text-vermillion/25" />
      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className="fill-gold text-gold" />
        ))}
      </div>
      <p className="mt-5 min-h-[110px] font-display text-[clamp(1.25rem,2.2vw,1.7rem)] leading-[1.55] text-ink">
        {current.quote}
      </p>
      <div className="mt-5 text-[.85rem] uppercase tracking-[2px] text-maroon">{current.name}</div>
      <div className="mt-1 text-[.8rem] text-ink/55">{current.date}</div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          aria-label="Previous story"
          onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
          className="text-maroon"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to story ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full border border-maroon ${i === index ? "bg-maroon" : "bg-transparent"}`}
            />
          ))}
        </div>
        <button
          aria-label="Next story"
          onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
          className="text-maroon"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </Reveal>
  );
}
