import { MessageCircle } from "lucide-react";
import { SETTINGS } from "@/content/settings";

function whatsAppLink(phone: string, message?: string): string {
  const clean = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function WhatsAppFab() {
  if (!SETTINGS.ownerWhatsApp || SETTINGS.ownerWhatsApp.includes("XXXX")) return null;

  return (
    <a
      href={whatsAppLink(
        SETTINGS.ownerWhatsApp,
        "Hi! I'd like to know more about your solar solutions.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
