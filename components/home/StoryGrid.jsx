import Image from "next/image";
import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import { testimonials } from "@/lib/data";

export default function StoryGrid() {
  return (
    <div>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((story, i) => (
          <Reveal key={story.name} delay={i * 100} className="overflow-hidden rounded-lg bg-white shadow-[0_20px_50px_-30px_rgba(36,21,18,0.3)] transition-transform hover:-translate-y-1.5">
            <div className="relative aspect-[4/3]">
              <Image
                src={story.image}
                alt={`${story.name} on their wedding day`}
                fill
                sizes="(min-width: 768px) 33vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="px-7 pb-7 pt-6">
              <div className="flex gap-1.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={13} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-3.5 font-display text-[1.05rem] leading-[1.55] text-ink">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="mt-4.5 text-[.8rem] uppercase tracking-[1.5px] text-maroon">{story.name}</div>
              <div className="mt-0.5 text-[.78rem] opacity-55">{story.date} · {story.event}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
