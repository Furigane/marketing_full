import { getPostTranslation, normalizeBlogLocale } from "@/lib/blog";
import { getPublishedBlogPosts } from "@/lib/blog-store";
import { getLocalizedCaseStudies } from "@/lib/case-studies";
import { getLocalizedServices } from "@/lib/services";

export type SearchResultType = "service" | "project" | "blog";

export type SearchResultItem = {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  matchText: string;
};

function normalizeText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function getLocalizedPath(locale: string, path: string) {
  const localeBase = locale.toLowerCase().split("-")[0];
  return localeBase === "ru" ? path : `/${localeBase}${path}`;
}

function getTypeWeight(type: SearchResultType) {
  switch (type) {
    case "service":
      return 0;
    case "project":
      return 1;
    case "blog":
      return 2;
    default:
      return 99;
  }
}

export async function searchSite(locale: string, rawQuery: string) {
  const query = normalizeText(rawQuery);

  if (!query) {
    return [];
  }

  const services = getLocalizedServices(locale).map<SearchResultItem>((service) => ({
    id: `service:${service.id}`,
    type: "service",
    title: service.content.title,
    description: service.content.summary,
    href: getLocalizedPath(locale, `/services/${service.slug}`),
    matchText: normalizeText(
      [service.content.title, service.content.summary, service.content.description].join(" ")
    ),
  }));

  const caseStudies = getLocalizedCaseStudies(locale).map<SearchResultItem>((project) => ({
    id: `project:${project.id}`,
    type: "project",
    title: project.content.card.title,
    description: project.content.card.description,
    href: getLocalizedPath(locale, `/projects/${project.slug}`),
    matchText: normalizeText(
      [
        project.content.card.title,
        project.content.card.category,
        project.content.card.description,
        project.content.heroDescription,
      ].join(" ")
    ),
  }));

  const blogLocale = normalizeBlogLocale(locale);
  const posts = await getPublishedBlogPosts();
  const blogPosts = posts.map<SearchResultItem>((post) => {
    const translation = getPostTranslation(post, blogLocale);
    return {
      id: `blog:${post.id}`,
      type: "blog",
      title: translation.title,
      description: translation.excerpt,
      href: getLocalizedPath(locale, `/blog/${post.slug}`),
      matchText: normalizeText(
        [translation.title, translation.excerpt, translation.content].join(" ")
      ),
    };
  });

  return [...services, ...caseStudies, ...blogPosts]
    .filter((item) => item.matchText.includes(query))
    .sort((left, right) => {
      const leftStarts = left.matchText.startsWith(query) ? 0 : 1;
      const rightStarts = right.matchText.startsWith(query) ? 0 : 1;

      if (leftStarts !== rightStarts) {
        return leftStarts - rightStarts;
      }

      const leftWeight = getTypeWeight(left.type);
      const rightWeight = getTypeWeight(right.type);

      if (leftWeight !== rightWeight) {
        return leftWeight - rightWeight;
      }

      return left.title.localeCompare(right.title);
    });
}
