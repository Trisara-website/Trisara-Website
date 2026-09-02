import Reveal from "@/components/Reveal";

export default function PageHero({ eyebrow, title, description, image, compact = false }) {
  return (
    <header
      className={`relative flex items-center justify-center overflow-hidden text-center text-white ${
        compact ? "h-[38vh] min-h-[260px]" : "h-[52vh] min-h-[340px]"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#26060a]/60 via-[#26060a]/55 to-[#26060a]/90" />
      <div className="relative px-6">
        <Reveal className="text-[.85rem] uppercase tracking-[5px] text-gold">
          {eyebrow}
        </Reveal>
        <Reveal delay={80} as="h1" className="mt-3.5 font-display text-[clamp(2.2rem,5vw,3.6rem)]">
          {title}
        </Reveal>
        {description && (
          <Reveal delay={160} as="p" className="mx-auto mt-4 max-w-[560px] text-[1.05rem] opacity-90">
            {description}
          </Reveal>
        )}
      </div>
    </header>
  );
}
