// Central place for business info. Update these values once and every page,
// the sitemap, and the JSON-LD schema pick them up automatically.

export const siteConfig = {
  name: "Trisara",
  legalName: "Trisara Wedding & Events Venue",
  tagline: "Wedding & Events Venue in Bengaluru",
  description:
    "Trisara is a duplex banquet hall and open-lawn wedding & events venue in Sahakara Nagar, Bengaluru — hosting weddings, engagements, sangeet nights, receptions, corporate events and more under one address.",
  // TODO: replace with the real production domain before launch.
  url: "https://www.trisaraweddingvenue.in",
  ogImage: "/images/og-image.webp",
  phone: "+9190198 75256",
  phoneHref: "tel:+919019875256",
  // Digits only, with country code, no + or spaces — used to build the wa.me link.
  whatsappNumber: "919019875256",
  email: "info@trisaraevents.in",
  address: {
    streetAddress: "2/1A, Below Philips Light Lounge, New Airport Road",
    addressLocality: "Sahakara Nagar, Byatarayanapura, Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560092",
    addressCountry: "IN",
  },
  geo: {
    latitude: 13.0651,
    longitude: 77.5921,
  },
  // Used to build the LocalBusiness openingHoursSpecification schema
  // and can also be rendered in the footer/contact panel if needed.
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "22:30" },
  ],
  sameAs: [
    // TODO: add real social profile URLs
    "https://www.instagram.com/trisara_bypraman/?hl=en",
    "https://www.facebook.com/trisaracelebrations",
    "https://www.youtube.com/@trisarabypraman"
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#stories", label: "Stories" },
];
