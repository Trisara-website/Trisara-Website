import { siteConfig } from "./site-config";

const dayMap = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

/**
 * Builds a schema.org LocalBusiness (EventVenue) JSON-LD object from the
 * single site-config source of truth. Rendered once in the root layout.
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EventVenue", "LocalBusiness"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => dayMap[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: siteConfig.sameAs,
  };
}
