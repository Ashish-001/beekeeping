import type { NextConfig } from "next";

// Set by .github/workflows/deploy.yml. Produces a fully static site in out/ for GitHub Pages:
// no admin panel, and enquiries go through Web3Forms instead of a server action.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
    ...(isGithubPages && {
      resolveAlias: { "@/app/actions": "./src/lib/enquiry-static.ts" },
    }),
  },
  ...(isGithubPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
