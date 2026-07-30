import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function EventRow({ event, reversed = false }) {
  return (
    <Reveal className={`grid items-center gap-10 border-b border-ink/10 py-12 last:border-b-0 md:grid-cols-2 md:gap-14 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div className="relative aspect-[5/4] overflow-hidden rounded-md">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div>
        <div className="font-display text-[.85rem] tracking-[3px] text-goldDeep">
          {event.num} — {event.category}
        </div>
        <h3 className="mt-2.5 font-display text-[1.9rem] text-ink">{event.title}</h3>
        <p className="mt-4 text-[1.05rem] text-ink/75">{event.copy}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-ink px-3.5 py-1.5 text-[.72rem] uppercase tracking-[1.5px] text-gold"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href="/booking" className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-[.85rem] uppercase tracking-[2px] text-ink">
          Book this event <ArrowRight size={15} />
        </Link>
      </div>
    </Reveal>
  );
}
