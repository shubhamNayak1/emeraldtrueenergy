import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://emeraldtrueenergy.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  return [
    { url: `${SITE}/`,         lastModified: today, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/services/`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/projects/`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/contact/`,  lastModified: today, changeFrequency: "yearly",  priority: 0.7 },
  ];
}
