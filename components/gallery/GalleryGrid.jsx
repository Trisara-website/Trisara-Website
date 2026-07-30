"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import GalleryFilter from "./GalleryFilter";
import Lightbox from "./Lightbox";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/lib/data";

export default function GalleryGrid({ initialFilter = "all" }) {
  const [filter, setFilter] = useState(initialFilter);
  const [selected, setSelected] = useState(null);

  const visible = useMemo(
    () => (filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter)),
    [filter]
  );

  return (
    <div>
      <Reveal>
        <GalleryFilter active={filter} onChange={setFilter} />
      </Reveal>

      {/* CSS columns auto-balance portrait & landscape images into an
          even-gutter masonry layout — no manual row-spanning needed, so it
          keeps working cleanly as more photos are added. */}
      <div className="masonry-columns mt-10 columns-2 md:columns-3 lg:columns-4">
        {visible.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelected(img)}
            className="masonry-item group block w-full overflow-hidden rounded-md"
          >
            <Reveal delay={(i % 8) * 60}>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </Reveal>
          </button>
        ))}
      </div>

      <Lightbox image={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
