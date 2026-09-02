import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function CtaBanner({
  eyebrow,
  title,
  copy,
  buttonText = "Book Your Wedding",
  href = "/booking",
}) {
  return (
    <Reveal
      as="div"
      className="relative overflow-hidden px-[6vw] py-24 text-center text-white"
      style={{
        background:
          "radial-gradient(ellipse at top, #7c1420, #6b0f1a 55%, #2c0509 100%)",
      }}
    >
      <div className="pointer-events-none absolute -right-[180px] -top-[280px] h-[560px] w-[560px] rounded-full border border-white/10" />
      <div className="relative">
        <div className="text-[.8rem] uppercase tracking-[4px] text-gold">{eyebrow}</div>
        <h2 className="mt-2.5 font-display text-[clamp(2rem,3.4vw,2.8rem)] text-white">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[1.05rem] opacity-85">{copy}</p>
        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 border border-white px-7 py-[15px] text-[.8rem] uppercase tracking-[2.5px] text-white transition-colors hover:bg-white hover:text-maroon"
        >
          {buttonText} <ArrowUpRight size={15} />
        </Link>
      </div>
    </Reveal>
  );
}
