import type { NextConfig } from "next";

/**
 * Static export tuned for GitHub Pages.
 *
 * - `output: "export"` produces a fully static `out/` directory at build time.
 * - GitHub's `actions/configure-pages` step (in .github/workflows/nextjs.yml)
 *   automatically injects the right basePath/assetPrefix at build time:
 *     · project page → `/emeraldtrueenergy`
 *     · custom domain → empty
 *   so we don't hardcode it here.
 * - `images.unoptimized` is required because Next's image optimizer needs a
 *   server runtime, which we don't have on Pages.
 * - `trailingSlash` makes Next emit `route/index.html` so static hosts route
 *   `/services` → `/services/index.html` correctly.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
