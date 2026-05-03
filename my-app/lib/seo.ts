import type { Metadata } from "next";

import { getTextDirection } from "@/lib/text-direction";
import { normalizeSiteLocale, SITE_LOCALES, type SiteLocale } from "@/lib/site-locales";

export const SITE_NAME = "Creative Group";
export const DEFAULT_SITE_ORIGIN = "http://localhost:4000";

export function isRussianLocale(locale: string) {
  return normalizeSiteLocale(locale) === "ru";
}

export function getSiteOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? DEFAULT_SITE_ORIGIN;
}

export function getLocalizedPath(locale: string, path = "/") {
  const normalizedLocale = normalizeSiteLocale(locale);
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  return `/${normalizedLocale}${normalizedPath}`;
}

export function buildAbsoluteUrl(locale: string, path = "/") {
  return `${getSiteOrigin()}${getLocalizedPath(locale, path)}`;
}

export function getLocaleAlternates(path = "/") {
  const languages = Object.fromEntries(
    SITE_LOCALES.map((locale) => [locale, buildAbsoluteUrl(locale, path)])
  ) as Record<SiteLocale, string>;

  return {
    canonical: buildAbsoluteUrl("ru", path),
    languages: {
      ...languages,
      "x-default": buildAbsoluteUrl("ru", path),
    } satisfies Record<string, string>,
  };
}

export function buildPageMetadata({
  locale,
  path = "/",
  title,
  description,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: buildAbsoluteUrl(locale, path),
      languages: {
        ...Object.fromEntries(
          SITE_LOCALES.map((siteLocale) => [siteLocale, buildAbsoluteUrl(siteLocale, path)])
        ),
        "x-default": buildAbsoluteUrl("ru", path),
      },
    },
    openGraph: {
      title,
      description,
      locale: normalizeSiteLocale(locale),
      type: "website",
      url: buildAbsoluteUrl(locale, path),
      siteName: SITE_NAME,
    },
  };
}

export function clampMeta(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const sliced = normalized.slice(0, maxLength).trim();
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 30 ? sliced.slice(0, lastSpace) : sliced).trim();
}

export function buildMetaTitle(title: string, suffix?: string) {
  return clampMeta(suffix ? `${title} | ${suffix}` : title, 60);
}

export function buildMetaDescription(description: string) {
  return clampMeta(description, 155);
}

export function getDocumentLocale(localeHeader: string | null | undefined) {
  return normalizeSiteLocale(localeHeader ?? "ru");
}

export function getDocumentDirection(localeHeader: string | null | undefined) {
  return getTextDirection(getDocumentLocale(localeHeader));
}
