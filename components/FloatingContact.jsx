import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const WHATSAPP_MESSAGE =
  "Hi! I just saw your venue and it looks amazing 😍 Can I get more details on this?";

export default function FloatingContact() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <MessageCircle size={26} fill="white" className="text-[#25D366]" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>

      <a
        href={siteConfig.phoneHref}
        aria-label="Call Trisara"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <Phone size={22} />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          Call {siteConfig.phone}
        </span>
      </a>
    </div>
  );
}
