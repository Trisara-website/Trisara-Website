import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CtaBanner from "@/components/CtaBanner";
import { siteConfig } from "@/lib/site-config";
import { galleryFilters } from "@/lib/data";

export const metadata = {
  title: "Gallery",
  description:
    "Photos from the Trisara duplex banquet hall, open lawn and grand stage in Bengaluru — filter by hall, lawn, stage or décor.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery — ${siteConfig.name}`,
    description: "Photos from the Trisara duplex banquet hall, open lawn and grand stage in Bengaluru.",
    url: `${siteConfig.url}/gallery`,
  },
};

export default async function GalleryPage({ searchParams }) {
  const sp = await searchParams;
  const requested = sp?.filter;
  const validFilters = galleryFilters.map((f) => f.value);
  const initialFilter = validFilters.includes(requested) ? requested : "all";

  return (
    <>
      <PageHero
        eyebrow="Glimpses"
        title="The Gallery"
        description="Moments held at Trisara — across the hall, the lawn and the stage."
        image="/images/gallery-hero.jpg"
      />
      <section className="py-[130px]">
        <div className="mx-auto max-w-[1160px] px-[6vw]">
          <GalleryGrid initialFilter={initialFilter} />
        </div>
      </section>
      <CtaBanner
        eyebrow="Liked What You See?"
        title="Come walk the space in person."
        copy="We'll show you the hall, the lawn and the stage — and hold your date while you decide."
      />
    </>
  );
}
