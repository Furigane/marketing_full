import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/seo";
import { SITE_LOCALES } from "@/lib/site-locales";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();
  const blockedPaths = [
    "/admin/",
    "/api/",
    ...SITE_LOCALES.flatMap((locale) => [`/${locale}/admin/`, `/${locale}/search`]),
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: blockedPaths,
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
