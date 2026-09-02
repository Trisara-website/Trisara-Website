import PageHero from "@/components/PageHero";
import EventsList from "@/components/events/EventsList";
import CtaBanner from "@/components/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Events We Host",
  description:
    "Weddings, engagements, sangeet nights, receptions, corporate events, birthdays and baby showers — see every event Trisara hosts in Bengaluru.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: `Events We Host — ${siteConfig.name}`,
    description:
      "Weddings, engagements, sangeet nights, receptions, corporate events, birthdays and baby showers — see every event Trisara hosts in Bengaluru.",
    url: `${siteConfig.url}/events`,
  },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Host"
        title="The Events We Do"
        description="One address, built to hold every chapter of your celebration — from the first ring to the grandest reception."
        image="/images/events-hero.jpg"
      />
      <EventsList />
      <CtaBanner
        eyebrow="Ready When You Are"
        title="Tell us which chapter you're celebrating."
        copy="Share a few details and our team will help you plan the rest."
      />
    </>
  );
}
