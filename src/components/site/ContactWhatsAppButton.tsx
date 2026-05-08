import { MessageCircle } from "lucide-react";
import { whatsAppLink } from "@/lib/data";

export function ContactWhatsAppButton({ phone }: { phone: string }) {
  const configured = phone && !phone.includes("XXXX");

  const inner = (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
        <MessageCircle className="h-6 w-6" fill="currentColor" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold uppercase tracking-wider opacity-90">
          Chat on WhatsApp
        </div>
        <div className="text-base font-bold">
          {configured ? phone : "Owner number not yet set"}
        </div>
      </div>
    </>
  );

  const cls = `flex items-center gap-4 rounded-2xl border border-emerald-100 bg-gradient-to-br from-[#25D366] to-[#128C7E] p-5 text-white shadow-sm transition ${
    configured ? "hover:shadow-md" : "opacity-70 cursor-not-allowed"
  }`;

  if (!configured) {
    return <div className={cls} aria-disabled="true">{inner}</div>;
  }

  return (
    <a
      href={whatsAppLink(phone, "Hi! I'd like to discuss a solar installation.")}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
    >
      {inner}
    </a>
  );
}
