export const BLOG_LOCALES = ["ru", "en", "fr", "de", "ar"] as const;

export type BlogLocale = (typeof BLOG_LOCALES)[number];

export type BlogPostStatus = "draft" | "published";

export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  content: string;
}

export type BlogPostTranslations = Record<BlogLocale, BlogPostTranslation>;

export interface BlogPost {
  id: string;
  slug: string;
  status: BlogPostStatus;
  publishedAt: string;
  updatedAt: string;
  translations: BlogPostTranslations;
}

export interface BlogPostPayload {
  slug: string;
  status: BlogPostStatus;
  publishedAt: string;
  translations: BlogPostTranslations;
}

export function createEmptyTranslations(): BlogPostTranslations {
  return BLOG_LOCALES.reduce(
    (acc, locale) => {
      acc[locale] = { title: "", excerpt: "", content: "" };
      return acc;
    },
    {} as BlogPostTranslations
  );
}

export function getPostTranslation(post: BlogPost, locale: string): BlogPostTranslation {
  const normalized = normalizeBlogLocale(locale);
  const current = post.translations[normalized];
  if (current.title.trim() || current.excerpt.trim() || current.content.trim()) {
    return current;
  }

  for (const fallbackLocale of BLOG_LOCALES) {
    const fallback = post.translations[fallbackLocale];
    if (fallback.title.trim() || fallback.excerpt.trim() || fallback.content.trim()) {
      return fallback;
    }
  }

  return current;
}

export function normalizeBlogLocale(locale: string): BlogLocale {
  const value = locale.toLowerCase();
  return BLOG_LOCALES.find((item) => item === value) ?? "ru";
}
