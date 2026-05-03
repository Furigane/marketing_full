import type { MetadataRoute } from "next";

import { getPublishedBlogPosts } from "@/lib/blog-store";
import { getCaseStudies } from "@/lib/case-studies";
import { getSiteOrigin, getLocalizedPath } from "@/lib/seo";
import { getServiceDefinitions } from "@/lib/services";
import { SITE_LOCALES } from "@/lib/site-locales";
import { SPECIALIST_PROFILES } from "@/lib/specialist-profiles";
import { TEAM_MEMBERS } from "@/lib/team-members";

const STATIC_PATHS = [
  "/",
  "/blog",
  "/services",
  "/projects",
  "/team",
  "/contact",
  "/connect",
  "/privacy",
  "/search",
  "/thank-you",
] as const;

function buildAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      SITE_LOCALES.map((locale) => [locale, `${getSiteOrigin()}${getLocalizedPath(locale, path)}`])
    ),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts] = await Promise.all([getPublishedBlogPosts()]);
  const origin = getSiteOrigin();
  const peopleSlugs = new Set([
    ...TEAM_MEMBERS.map((member) => member.id),
    ...SPECIALIST_PROFILES.map((profile) => profile.slug),
  ]);

  const localizedPaths = [
    ...STATIC_PATHS,
    ...getServiceDefinitions().map((service) => `/services/${service.slug}`),
    ...getCaseStudies().map((project) => `/projects/${project.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
    ...Array.from(peopleSlugs).map((slug) => `/team/${slug}`),
  ];

  return localizedPaths.flatMap((path) =>
    SITE_LOCALES.map((locale) => ({
      url: `${origin}${getLocalizedPath(locale, path)}`,
      lastModified: new Date(),
      alternates: buildAlternates(path),
    }))
  );
}
