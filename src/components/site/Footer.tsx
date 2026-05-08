import Link from "next/link";
import { Logo } from "../Logo";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
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
            <li><Link href="/services" className="hover:text-emerald-700">Services</Link></li>
            <li><Link href="/projects" className="hover:text-emerald-700">Projects</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
            Reach us
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-ink/70">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span>+91 XXXXX XXXXX</span></li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span>info@emeraldtrueenergy.in</span></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span>Madhya Pradesh, India</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-emerald-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-ink/50 sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} Emerald True Energy. All rights reserved.</span>
          <Link href="/admin" className="hover:text-emerald-700">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
