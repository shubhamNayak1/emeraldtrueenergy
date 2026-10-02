import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "../Logo";
import { SETTINGS } from "@/content/settings";

export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:gap-x-10 sm:gap-y-10 sm:px-6 md:grid-cols-4">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/65">
            Premium rooftop solar installations across Madhya Pradesh.
            Designed, installed and supported by our own engineers.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li><Link href="/#services" className="transition-colors hover:text-emerald-700">Services</Link></li>
            <li><Link href="/#projects" className="transition-colors hover:text-emerald-700">Projects</Link></li>
            <li><Link href="/#contact" className="transition-colors hover:text-emerald-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
            Reach us
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-ink/70">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="min-w-0 break-all">{SETTINGS.publicPhone}</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="min-w-0 break-all">{SETTINGS.publicEmail}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="min-w-0 break-words">{SETTINGS.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-emerald-100">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-ink/50 sm:px-6">
          © {new Date().getFullYear()} {SETTINGS.companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
