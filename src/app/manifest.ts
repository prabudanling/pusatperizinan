import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

/**
 * Web App Manifest — sinyal PWA untuk mesin pencari mobile-first.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    lang: "id",
    categories: ["business", "government", "productivity"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/og-image.png",
        sizes: "1440x720",
        type: "image/png",
      },
    ],
  };
}
