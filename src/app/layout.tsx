import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emeraldtrueenergy.in"),
  title: {
    default: "Emerald True Energy | Premium Solar Solutions in Madhya Pradesh",
    template: "%s | Emerald True Energy",
  },
  description:
    "Rooftop solar installations across Madhya Pradesh. Residential, commercial and industrial systems engineered for long-term savings.",
  openGraph: {
    title: "Emerald True Energy | Premium Solar Solutions",
    description:
      "Rooftop solar installations across Madhya Pradesh — residential, commercial & industrial.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
