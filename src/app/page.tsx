import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/motion/Marquee";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { WhyUs } from "@/components/sections/WhyUs";
import { Reviews } from "@/components/sections/Reviews";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

const TRUST_STRIP = [
  "Tier-1 Mono-PERC & TopCon Panels",
  "GI Hot-Dip Mounting",
  "Branded Inverters + WiFi Monitoring",
  "25-Year Panel Performance",
  "DISCOM Net-Meter Paperwork",
  "PM Surya Ghar Guidance",
  "In-House Install Team",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee items={TRUST_STRIP} />
      <Services />
      <Projects />
      <WhyUs />
      <Reviews />
      <CTA />
      <Contact />
    </>
  );
}
