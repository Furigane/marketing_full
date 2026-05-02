import { getServiceById, type ServiceId } from "@/lib/services";

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

type BlogContentPart =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "service-link";
      serviceId: ServiceId;
      slug: string;
      label: string;
    };

export type BlogContentBlock =
  | {
      type: "heading";
      level: 2 | 3 | 4;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
      parts: BlogContentPart[];
    };

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

export function parseBlogContent(content: string): BlogContentBlock[] {
  const blocks: BlogContentBlock[] = [];
  const lines = content.split(/\r?\n/);
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }

    const text = paragraphBuffer.join(" ").replace(/\s+/g, " ").trim();
    if (text) {
      blocks.push({
        type: "paragraph",
        text,
        parts: parseParagraphParts(text),
      });
    }
    paragraphBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    const headingMatch = /^(#{2,4})\s+(.+)$/.exec(line);
    if (headingMatch) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length as 2 | 3 | 4,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  return blocks;
}

export function getRelatedServiceIdsFromPost(post: BlogPost, locale: string) {
  const translation = getPostTranslation(post, locale);
  const matches = translation.content.matchAll(/\{\{service:([a-zA-Z0-9]+)(?:\|[^}]+)?\}\}/g);
  const ids: ServiceId[] = [];

  for (const match of matches) {
    const id = match[1] as ServiceId;
    if (!ids.includes(id)) {
      ids.push(id);
    }
  }

  return ids.slice(0, 3);
}

function parseParagraphParts(text: string): BlogContentPart[] {
  const parts: BlogContentPart[] = [];
  const regex = /\{\{service:([a-zA-Z0-9]+)(?:\|([^}]+))?\}\}/g;
  let cursor = 0;

  for (const match of text.matchAll(regex)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      parts.push({
        type: "text",
        text: text.slice(cursor, start),
      });
    }

    const serviceId = match[1] as ServiceId;
    const service = getServiceById(serviceId);
    if (service) {
      parts.push({
        type: "service-link",
        serviceId,
        slug: service.slug,
        label: match[2]?.trim() || service.locale.en.title,
      });
    } else {
      parts.push({
        type: "text",
        text: match[0],
      });
    }

    cursor = start + match[0].length;
  }

  if (cursor < text.length) {
    parts.push({
      type: "text",
      text: text.slice(cursor),
    });
  }

  return parts.length > 0 ? parts : [{ type: "text", text }];
}
