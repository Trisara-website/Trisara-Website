// All editable site copy + media references live here, so content updates
// don't require touching component code.

export const spaces = [
  {
    id: "hall",
    tag: "Indoors",
    title: "Duplex Banquet Hall",
    copy: "Skylights, mezzanines & suspended floral chandeliers across 14,000 sq. ft.",
    image: "/images/spaces/hall.jpeg",
    icon: "Sparkles",
  },
  {
    id: "lawn",
    tag: "Outdoors",
    title: "The Open Lawn",
    copy: "An air-lit ceremony ground beneath the sky, seating up to 350 guests.",
    image: "/images/spaces/lawn.jpeg",
    icon: "Sun",
  },
  {
    id: "stage",
    tag: "Centre Stage",
    title: "The Grand Stage",
    copy: "A statement stage built for sangeet nights and the moment you're announced.",
    image: "/images/spaces/stage.jpeg",
    icon: "Music",
  },
];

export const events = [
  {
    num: "01",
    category: "Weddings",
    title: "Wedding Ceremonies",
    copy: "From the mandap to the pheras, the duplex hall's skylights turn the ceremony into golden-hour light no matter the time of day. Full décor, priest coordination and family hospitality handled end to end.",
    tags: ["Up to 1,000 guests", "Indoor + Lawn", "Full décor support"],
    image: "/images/events/wedding.webp",
  },
  {
    num: "02",
    category: "Engagements",
    title: "Engagements & Ring Ceremonies",
    copy: "An intimate, air-lit lawn setting for the moment two families come together — styled with gazebo seating and soft florals, sized right for a warmer, closer gathering.",
    tags: ["Up to 350 guests", "Open Lawn", "Evening & day slots"],
    image: "/images/events/engagement.webp",
  },
  {
    num: "03",
    category: "Sangeet & Reception",
    title: "Sangeet & Reception Nights",
    copy: "The Grand Stage is built for exactly this — choreography rehearsals, dramatic lighting cues and a dance floor that keeps the night going long after the entry song ends.",
    tags: ["In-house sound & light", "Stage & dance floor", "Late-night slots"],
    image: "/images/events/sangeet.jpg",
  },
  {
    num: "04",
    category: "Corporate",
    title: "Corporate & Social Gatherings",
    copy: "Product launches, annual days and milestone parties, hosted under the same skylit ceiling — reconfigured with conference-style seating, AV support and a private mezzanine for hosts.",
    tags: ["AV & conferencing", "Mezzanine seating", "Day & evening slots"],
    image: "/images/events/corporate.jpg",
  },
  {
    num: "05",
    category: "Birthdays",
    title: "Birthdays & Anniversaries",
    copy: "Milestone birthdays and anniversaries styled to feel personal, not generic — themed entrances, custom cake tables and a scale of celebration that goes from close family to 500 guests.",
    tags: ["Themed décor", "Kid-friendly options", "Flexible guest count"],
    image: "/images/events/birthday.jpeg",
  },
  {
    num: "06",
    category: "Baby Showers",
    title: "Baby Showers & Naming Ceremonies",
    copy: "Softer, daytime celebrations set with pastel table styling and gentle florals — a calm, family-first setting for the traditions that welcome a new arrival.",
    tags: ["Daytime slots", "Traditional rituals", "Family-scale seating"],
    image: "/images/events/babyshower.jpeg",
  },
];

// Event type options shown as selectable cards on the booking form.
export const eventTypeOptions = [
  { value: "Wedding Ceremony", label: "Wedding", icon: "Heart" },
  { value: "Engagement", label: "Engagement", icon: "CircleDot" },
  { value: "Sangeet & Reception", label: "Sangeet", icon: "Music" },
  { value: "Birthday / Anniversary", label: "Birthday", icon: "PartyPopper" },
  { value: "Corporate Event", label: "Corporate", icon: "Building2" },
  { value: "Baby Shower / Naming", label: "Baby Shower", icon: "Baby" },
];

export const timeOptions = [
  { value: "Morning (9 AM – 1 PM)", label: "Morning", sub: "9 AM – 1 PM" },
  { value: "Afternoon (1 PM – 6 PM)", label: "Afternoon", sub: "1 PM – 6 PM" },
  { value: "Evening (7 PM – 10:30 PM)", label: "Evening", sub: "7 PM – 10:30 PM" },
];

// category must match one of: hall, lawn, stage, decor
export const galleryImages = [
  { id: "g1", src: "/images/gallery/g1.jpg", alt: "Banquet hall chairs and floral aisle", category: "hall", width: 900, height: 1200 },
  { id: "g2", src: "/images/gallery/g2.jpg", alt: "Open lawn gazebo seating", category: "lawn", width: 1200, height: 800 },
  { id: "g3", src: "/images/gallery/g3.jpg", alt: "Wedding stage close up", category: "stage", width: 900, height: 900 },
  { id: "g4", src: "/images/gallery/g4.jpg", alt: "Duplex hall skylight view", category: "hall", width: 1200, height: 1500 },
  { id: "g5", src: "/images/gallery/g5.jpg", alt: "Gold table setting decor", category: "decor", width: 1200, height: 800 },
  { id: "g6", src: "/images/gallery/g6.jpg", alt: "Lawn seating rows at dusk", category: "lawn", width: 900, height: 1350 },
  { id: "g7", src: "/images/gallery/g7.jpg", alt: "Stage lighting during sangeet", category: "stage", width: 1200, height: 750 },
  { id: "g8", src: "/images/gallery/g8.jpg", alt: "Floral entrance installation", category: "decor", width: 950, height: 1180 },
  { id: "g9", src: "/images/gallery/g9.jpg", alt: "Banquet hall wide view", category: "hall", width: 1200, height: 900 },
  { id: "g10", src: "/images/gallery/g10.jpg", alt: "Stage backdrop with florals", category: "stage", width: 900, height: 1400 },
  { id: "g11", src: "/images/gallery/g11.jpg", alt: "Open lawn ceremony setup", category: "lawn", width: 1200, height: 800 },
  { id: "g12", src: "/images/gallery/g12.jpg", alt: "Table centerpiece decor", category: "decor", width: 950, height: 1250 },
];

export const galleryFilters = [
  { value: "all", label: "All" },
  { value: "hall", label: "Banquet Hall" },
  { value: "lawn", label: "Lawn" },
  { value: "stage", label: "Stage" },
  { value: "decor", label: "Décor" },
];

// Stories / testimonials — now embedded on the home page instead of a
// standalone route.
export const testimonials = [
  {
    quote:
      "The décor, the lighting, the food — our guests are still talking about how effortless the whole evening felt.",
    name: "Arun & Shivani",
    date: "Married January 2026",
    image: "/images/stories/couple1.jpg",
    event: "Wedding & Reception",
  },
  {
    quote:
      "From the first walkthrough to the last dance, every detail was handled with so much care. It felt extraordinary, not staged.",
    name: "Mr and Mrs.Aditya",
    date: "Married January 2026",
    image: "/images/stories/couple2.jpg",
    event: "Sangeet & Wedding",
  },
  {
    quote:
      "The skylights and the floral chandeliers made every photograph look like it belonged somewhere far grander than a venue.",
    name: "Mr. & Mrs.Maheshwari",
    date: "Married February 2026",
    image: "/images/stories/couple3.jpg",
    event: "Reception",
  },
];

export const stats = [
  { icon: "Sparkles", value: "14,000", label: "Sq. Ft. Duplex Hall" },
  { icon: "Sun", value: "350+", label: "Open Lawn Seating" },
  { icon: "Users", value: "1,000", label: "Guests at Capacity" },
  { icon: "MapPin", value: "1", label: "Address, Every Chapter" },
];
