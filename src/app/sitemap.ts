import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://emeraldtrueenergy.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
