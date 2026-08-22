"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import GalleryFilter from "./GalleryFilter";
import Lightbox from "./Lightbox";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/lib/data";

export default function GalleryGrid({ initialFilter = "all" }) {
  const [filter, setFilter] = useState(initialFilter);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((img) => img.category === filter),
    [filter]
  );

  const selected =
    selectedIndex !== null ? visible[selectedIndex] : null;

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? visible.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === visible.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      <Reveal>
        <GalleryFilter active={filter} onChange={setFilter} />
      </Reveal>

      {/* Masonry Grid */}
      <div className="masonry-columns mt-10 columns-2 md:columns-3 lg:columns-4">
        {visible.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelectedIndex(i)}
            className="masonry-item group block w-full overflow-hidden rounded-md"
          >
            <Reveal delay={(i % 8) * 60}>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </Reveal>
          </button>
        ))}
      </div>

      <Lightbox
        image={selected}
        images={visible}
        onClose={() => setSelectedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}