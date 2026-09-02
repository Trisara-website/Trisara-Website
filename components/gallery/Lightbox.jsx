"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({
  image,
  images = [],
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!image) return;

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [image, onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-6 right-6 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/70"
      >
        <X size={28} />
      </button>

      {/* Previous */}
      {images.length > 1 && (
        <button
          aria-label="Previous image"
          onClick={onPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/70"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Image */}
      <div className="relative flex max-h-[90vh] max-w-5xl items-center justify-center">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="90vw"
          className="max-h-[90vh] w-auto rounded-lg object-contain shadow-2xl"
          priority
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          aria-label="Next image"
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/70"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
}