import type { NextConfig } from "next";

/**
 * Static export tuned for GitHub Pages.
 *
 * - `output: "export"` produces a fully static `out/` directory at build time.
 * - `basePath` / `assetPrefix` add the repo-name prefix because Pages serves
 *   the site at `https://<user>.github.io/<repo>/` unless a custom domain is
 *   used. Set `BASE_PATH=""` (empty) once a CNAME is in place.
 * - `images.unoptimized` is required because the Next.js image optimizer needs
 *   a server runtime, which we don't have on Pages.
 * - `trailingSlash` makes Next emit `route/index.html` so static hosts route
 *   `/services` → `/services/index.html` correctly.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/emeraldtrueenergy";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
