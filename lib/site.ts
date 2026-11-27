export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-streakly.vercel.app"
).replace(/\/+$/, "");

/** Sub-path the site is served from: "" at a domain root, "/repo" on a GitHub Pages project site. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** True in a static export (GitHub Pages), where there is no server to call. */
export const IS_STATIC_SITE = process.env.NEXT_PUBLIC_STATIC_SITE === "true";

/** Path to a file in /public. Next adds the base path to links and scripts, but not to these. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
