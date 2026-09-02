import Hero from "@/components/home/Hero";
import StatStrip from "@/components/home/StatStrip";
import About from "@/components/home/About";
import SpacesGrid from "@/components/home/SpacesGrid";
import StoryGrid from "@/components/home/StoryGrid";
import OfferPopup from "@/components/home/OfferPopup";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatStrip />
      <About />
      <SpacesGrid />

      <section id="stories" className="scroll-mt-24 py-[130px]">
        <div className="mx-auto max-w-[1160px] px-[6vw]">

          <Reveal delay={100} className="mt-24 text-center">
            <div className="text-[.8rem] uppercase tracking-[4px] text-vermillion">Our Happy Couples</div>
            <h2 className="mt-2.5 font-display text-[clamp(2rem,3.4vw,2.8rem)] text-ink">
              Every wedding, it's own story.
            </h2>
          </Reveal>

          <div className="mt-16">
            <StoryGrid />
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Limited Dates"
        title="This wedding season has a few evenings left."
        copy="Reserve a walkthrough and we'll hold your date while you decide."
      />

      <OfferPopup />
    </>
  );
}
