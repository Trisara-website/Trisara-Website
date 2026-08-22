import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink px-[6vw] pb-8 pt-14 text-white/70">
      <div className="mx-auto grid max-w-[1160px] gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="font-display text-2xl font-bold tracking-[3px] text-white">
            {siteConfig.name.toUpperCase()}
          </div>
          <p className="mt-3.5 max-w-[280px] text-[.95rem] opacity-70">
            A wedding &amp; events venue in {siteConfig.address.addressLocality} <br />
            one address, every chapter of the celebration.
          </p>
          <div className="flex gap-2 mt-2">
          <a href="https://www.instagram.com/trisara_bypraman" target="_blank" className="hover:text-pink-800 transition-all ease-in hover:scale-[1.05]"><Instagram/></a>
          <a href="https://www.facebook.com/trisaracelebrations" target="_blank" className="hover:text-blue-800 transition-all ease-in hover:scale-[1.05]"><Facebook/></a>
          <a href="https://www.youtube.com/@trisarabypraman" target="_blank" className="hover:text-red-800 transition-all ease-in hover:scale-[1.05]"><Youtube/></a>
          </div>
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
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.515926770077!2d77.59348899999999!3d13.066455299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1824e2984f69%3A0xd43134f27c2a76de!2sTRISARA%20%7C%20Wedding%20Venue%20%7C%20Events%20venue!5e0!3m2!1sen!2sin!4v1787379472427!5m2!1sen!2sin" width="320" height="150" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
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
