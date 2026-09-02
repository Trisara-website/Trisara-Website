import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Icon } from "@/lib/icon-map";
import { spaces } from "@/lib/data";

export default function SpacesGrid() {
  return (
    <section className="bg-paper py-[130px]">
      <div className="mx-auto max-w-[1160px] px-[6vw]">
        <Reveal className="text-center">
          <div className="text-[.8rem] uppercase tracking-[4px] text-vermillion">The Spaces</div>
          <h2 className="mt-2.5 font-display text-[clamp(2rem,3.4vw,2.8rem)] text-ink">
            Three settings, one address.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {spaces.map((space, i) => (
            <Reveal key={space.id} delay={i * 90}>
              <Link
                href={`/gallery?filter=${space.id}`}
                className="group arch-frame relative block aspect-[3/4] overflow-hidden transition-transform duration-500 hover:-translate-y-2"
              >
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#26060a]/90" />
                <div className="absolute inset-x-6 bottom-6 text-white">
                  <Icon name={space.icon} className="h-[18px] w-[18px] text-gold" />
                  <div className="mt-2.5 text-[.7rem] uppercase tracking-[2.5px] opacity-85">
                    {space.tag}
                  </div>
                  <div className="mt-1.5 font-display text-[1.4rem] font-semibold">
                    {space.title}
                  </div>
                  <p className="mt-2 text-[.95rem] opacity-90">{space.copy}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[.75rem] uppercase tracking-[1.5px] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    View in gallery <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <Link href="/events" className="inline-flex items-center gap-2 border-b border-ink pb-1 text-[.85rem] uppercase tracking-[2px] text-ink">
            See every event we host <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
