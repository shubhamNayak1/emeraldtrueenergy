"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getSiteSettings, whatsAppLink } from "@/lib/data";
import { DEFAULT_SETTINGS } from "@/lib/data";

export function WhatsAppFab() {
  const [phone, setPhone] = useState(DEFAULT_SETTINGS.ownerWhatsApp);

  useEffect(() => {
    let cancelled = false;
    getSiteSettings()
      .then((s) => {
        if (!cancelled) setPhone(s.ownerWhatsApp);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!phone || phone.includes("XXXX")) {
    // Avoid rendering a broken link when no real number is configured yet.
    return null;
  }

  return (
    <a
      href={whatsAppLink(phone, "Hi! I'd like to know more about your solar solutions.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
