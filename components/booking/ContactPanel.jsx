import { Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function ContactPanel() {
  return (
    <div className="relative mt-14 rounded-lg bg-maroon px-10 py-12 text-white">
      <span className="pointer-events-none absolute left-4 top-4 h-7 w-7 border-l border-t border-gold" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 border-b border-r border-gold" />

      <h3 className="font-display text-2xl font-semibold">Prefer to talk first?</h3>

      <div className="mt-7 flex gap-4">
        <Phone size={18} className="mt-0.5 shrink-0 text-gold" />
        <div>
          <div className="mb-1 text-[.7rem] uppercase tracking-[2.5px] text-gold">Call Us</div>
          <p className="text-white/85">{siteConfig.phone}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
        <div>
          <div className="mb-1 text-[.7rem] uppercase tracking-[2.5px] text-gold">Visit</div>
          <p className="text-white/85">
            {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}
          </p>
        </div>
      </div>
    </div>
  );
}
