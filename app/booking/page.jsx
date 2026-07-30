import PageHero from "@/components/PageHero";
import BookingForm from "@/components/booking/BookingForm";
import ContactPanel from "@/components/booking/ContactPanel";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Book Your Wedding",
  description:
    "Reserve your date at Trisara — tell us about your event and our team will call to plan the rest.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: `Book Your Wedding — ${siteConfig.name}`,
    description: "Reserve your date at Trisara — tell us about your event and our team will call to plan the rest.",
    url: `${siteConfig.url}/booking`,
  },
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Reserve Your Date"
        title="Book Your Wedding"
        description="A few details and our team will call to plan the rest."
        image="/images/booking-hero.jpg"
        compact
      />
      <section className="py-24">
        <div className="mx-auto max-w-[900px] px-[6vw]">
          <BookingForm />
          <ContactPanel />
        </div>
      </section>
    </>
  );
}
