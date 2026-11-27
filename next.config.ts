import type { NextConfig } from "next";
import { LEGACY_ROUTES } from "./lib/legacy-routes";

/**
 * Two build targets:
 *  - default: a Node server build (Vercel, `next start`) with the contact API route
 *    and HTTP redirects for old URLs.
 *  - STATIC_EXPORT=true: plain files in `out/` for GitHub Pages.
 */
const isExport = process.env.STATIC_EXPORT === "true";

// "" for a user site or custom domain, "/repo" for a project site.
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const basePath = rawBasePath && !rawBasePath.startsWith("/") ? `/${rawBasePath}` : rawBasePath;

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_SITE: String(isExport),
  },
  // Files named `*.server.ts` (the contact API route) need a server, so only the
  // server build treats them as routes.
  pageExtensions: isExport ? ["tsx", "ts"] : ["server.ts", "tsx", "ts"],

  ...(isExport
    ? {
        output: "export" as const,
        // Emit `writing/index.html` rather than `writing.html`, which is what Pages serves cleanly.
        trailingSlash: true,
        // No image optimizer without a server; images are served as they are.
        images: { unoptimized: true },
      }
    : {
        async redirects() {
          return LEGACY_ROUTES;
        },
      }),
};

export default nextConfig;
