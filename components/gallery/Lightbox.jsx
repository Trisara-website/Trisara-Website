"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#140808]/92 p-[6vw]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-[6vw] top-6 text-white"
      >
        <X size={26} />
      </button>
      <div className="relative max-h-[86vh] w-full max-w-3xl">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="90vw"
          className="mx-auto max-h-[86vh] w-auto rounded"
        />
      </div>
    </div>
  );
}
