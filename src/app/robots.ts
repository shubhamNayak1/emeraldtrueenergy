import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://emeraldtrueenergy.in/sitemap.xml",
    host: "https://emeraldtrueenergy.in",
  };
}
