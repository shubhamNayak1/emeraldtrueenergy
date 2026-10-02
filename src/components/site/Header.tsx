"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "../Logo";
import { QuoteWizard } from "./QuoteWizard";
import { SETTINGS } from "@/content/settings";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact",  label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-emerald-100 bg-cream/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Emerald True Energy home" className="transition-transform hover:scale-105">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-ink/70 transition-colors hover:text-emerald-700"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${SETTINGS.publicPhone.replace(/\s+/g, "")}`}
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-2 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-white hover:shadow-md sm:px-4 sm:py-2.5"
            aria-label={`Call ${SETTINGS.publicPhone}`}
          >
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <Phone className="h-3.5 w-3.5" />
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-30 group-hover:opacity-0" />
            </span>
            <span>{SETTINGS.publicPhone}</span>
          </a>

          <button
            type="button"
            onClick={() => setQuoteOpen(true)}
            className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/40 md:inline-flex"
          >
            <span className="relative z-10">Get Quotation</span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-white/70 text-emerald-700 backdrop-blur md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-emerald-100 bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-ink/80 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => { setOpen(false); setQuoteOpen(true); }}
              className="mt-2 w-full rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Get Quotation
            </button>
          </nav>
        </div>
      )}

      <QuoteWizard open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </header>
  );
}
