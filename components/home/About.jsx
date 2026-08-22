import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section className="py-[130px]">
      <div className="mx-auto grid max-w-[1160px] items-center gap-16 px-[6vw] md:grid-cols-2">
        <Reveal className="arch-frame relative aspect-[4/5] overflow-hidden shadow-[0_40px_70px_-30px_rgba(107,15,26,0.35)]">
          <Image
            src="/images/about.webp"
            alt="Floral chandelier ceiling inside the Trisara banquet hall"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="text-left text-[.8rem] uppercase tracking-[4px] text-vermillion">
            The Venue
          </div>
          <h2 className="mt-2.5 text-left font-display text-[clamp(2rem,3.4vw,2.8rem)] text-ink">
            A house built for beginnings.
          </h2>
          <p className="mt-5 text-[1.1rem] leading-[1.8] text-ink/80">
            Trisara was designed around light — a duplex hall crowned in skylights, mezzanines that overlook the mandap, and a lawn left open to the Bengaluru sky, so that no two hours of your wedding day ever look the same.
          </p>
          <p className="mt-4 text-[1.1rem] leading-[1.8] text-ink/80">
            Every detail — from the floral suspensions overhead to the stage your families will stand on — is planned with one goal: that your day feels considered, not templated.
          </p>
          <Link
            href="/events"
            className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-[.85rem] uppercase tracking-[2px] text-ink"
          >
            See the events we host <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
