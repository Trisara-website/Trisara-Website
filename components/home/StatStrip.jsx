import Reveal from "@/components/Reveal";
import { Icon } from "@/lib/icon-map";
import { stats } from "@/lib/data";

export default function StatStrip() {
  return (
    <div className="bg-ink px-[6vw] py-8 text-white">
      <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-8 text-center sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="flex flex-col items-center gap-2">
            <Icon name={stat.icon} className="h-5 w-5 text-gold" />
            <div className="font-display text-2xl font-semibold">{stat.value}</div>
            <div className="text-[.72rem] uppercase tracking-[2px] opacity-65">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
