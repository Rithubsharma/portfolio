import type { MetadataRoute } from "next";
import { personal } from "@/lib/data/personal";
import { asset } from "@/lib/site";

// Generated at build time, so it also works in a static export.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personal.name} — ${personal.role}`,
    short_name: personal.name,
    description: personal.shortBio,
    start_url: asset("/"),
    display: "standalone",
    background_color: "#eceeea",
    theme_color: "#08262a",
    icons: [{ src: asset("/favicon.ico"), sizes: "any", type: "image/x-icon" }],
  };
}
