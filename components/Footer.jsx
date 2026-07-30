import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-ink px-[6vw] pb-8 pt-14 text-white/70">
      <div className="mx-auto grid max-w-[1160px] gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="font-display text-2xl font-bold tracking-[3px] text-white">
            {siteConfig.name.toUpperCase()}
          </div>
          <p className="mt-3.5 max-w-[280px] text-[.95rem] opacity-70">
            A wedding &amp; events venue in {siteConfig.address.addressLocality} —
            one address, every chapter of the celebration.
          </p>
        </div>

        <div>
          <h4 className="mb-3.5 text-[.75rem] uppercase tracking-[2.5px] text-gold">
            Explore
          </h4>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-[.95rem] opacity-80 hover:opacity-100">
                {link.label}
              </Link>
            ))}
            <Link href="/booking" className="text-[.95rem] opacity-80 hover:opacity-100">
              Book Your Wedding
            </Link>
          </nav>
        </div>

        <div>
          <h4 className="mb-3.5 text-[.75rem] uppercase tracking-[2.5px] text-gold">
            Visit
          </h4>
          <div className="flex flex-col gap-2">
            <a href={siteConfig.phoneHref} className="text-[.95rem] opacity-80 hover:opacity-100">
              {siteConfig.phone}
            </a>
            <Link href="/booking" className="text-[.95rem] opacity-80 hover:opacity-100">
              {siteConfig.address.addressLocality}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1160px] flex-wrap justify-between gap-2 border-t border-white/10 pt-6 text-[.8rem] opacity-50">
        <span>© {new Date().getFullYear()} {siteConfig.legalName}.</span>
        <span>{siteConfig.address.addressRegion}, India</span>
      </div>
    </footer>
  );
}
