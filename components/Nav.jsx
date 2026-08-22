"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site-config";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // On sub-pages the nav is always solid; on the home page it's transparent
  // until the hero is scrolled past.
  const solid = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300 ${
        solid
          ? "border-ink/10 bg-white/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-[6vw] transition-all duration-300 ${
          solid ? "py-3.5" : "py-6"
        }`}
      >
        <Link
          href="/"
          className={`font-display text-xl font-bold tracking-[3px] transition-colors ${
            solid ? "text-maroon" : "text-white drop-shadow"
          }`}
        >
          TRISARA
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = link.href === pathname;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative pb-1 text-[.8rem] uppercase tracking-[2px] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-vermillion after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    active ? "after:scale-x-100" : ""
                  } ${solid ? "text-ink" : "text-white drop-shadow"}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/booking"
          className={`hidden whitespace-nowrap border px-6 py-2.5 text-[.78rem] uppercase tracking-[2px] transition-colors md:inline-block ${
            solid
              ? "border-maroon text-maroon hover:bg-maroon hover:text-white"
              : "border-white text-white hover:bg-white hover:text-maroon"
          }`}
        >
          Book Your Wedding
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className={`md:hidden ${solid ? "text-ink" : "text-white"}`}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 bg-white px-[6vw] pb-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base uppercase tracking-wide text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setMenuOpen(false)}
            className="text-base uppercase tracking-wide text-maroon"
          >
            Book Your Wedding
          </Link>
        </div>
      )}
    </nav>
  );
}
