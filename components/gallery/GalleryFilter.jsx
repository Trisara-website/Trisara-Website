"use client";

import { galleryFilters } from "@/lib/data";

export default function GalleryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {galleryFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`rounded-full border px-5 py-2 font-body text-[.85rem] uppercase tracking-[1.5px] transition-colors ${
            active === f.value
              ? "border-maroon bg-maroon text-white"
              : "border-ink/20 text-ink hover:border-maroon hover:bg-maroon hover:text-white"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
