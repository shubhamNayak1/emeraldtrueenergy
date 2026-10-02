import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { WhyUs } from "@/components/sections/WhyUs";
import { Reviews } from "@/components/sections/Reviews";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Projects />
      <WhyUs />
      <Reviews />
      <CTA />
      <Contact />
    </>
  );
}
