import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfkit reads its standard fonts from disk; keep it as a real Node module
  // instead of letting the bundler trace and rewrite its requires.
  serverExternalPackages: ["pdfkit"],
};

export default nextConfig;
