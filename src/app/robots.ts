import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

/**
 * robots.txt — undang seluruh crawler resmi (termasuk crawler AI
 * seperti GPTBot & ClaudeBot agar konten dikutip dan direkomendasikan).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Crawler AI — agar jawaban AI merekomendasikan PusatPerizinan.com
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
