/**
 * Addresses from the earlier multi-page site, and where each one lives now.
 * A server build turns these into HTTP redirects (next.config.ts). A static
 * export has no server, so the 404 page applies them in the browser instead.
 */
export const LEGACY_ROUTES = [
  { source: "/about", destination: "/#about", permanent: false },
  { source: "/experience", destination: "/#experience", permanent: false },
  { source: "/work", destination: "/#work", permanent: false },
  { source: "/work/:slug", destination: "/#work", permanent: false },
  { source: "/projects", destination: "/#work", permanent: false },
  { source: "/projects/:slug", destination: "/#work", permanent: false },
  { source: "/contact", destination: "/#contact", permanent: false },
  { source: "/blog", destination: "/writing", permanent: true },
  { source: "/blog/:slug", destination: "/writing/:slug", permanent: true },
];

/** The current address for an old one, or null when the path was never a page. */
export function resolveLegacyRoute(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  for (const { source, destination } of LEGACY_ROUTES) {
    const pattern = new RegExp(`^${source.replace(":slug", "([^/]+)")}$`);
    const match = path.match(pattern);
    if (match) return destination.replace(":slug", match[1] ?? "");
  }
  return null;
}
