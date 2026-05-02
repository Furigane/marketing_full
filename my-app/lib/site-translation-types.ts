import type { SiteLocale } from "@/lib/site-locales";

export const TRANSLATION_DOMAINS = [
  "messages",
  "services",
  "caseStudies",
  "teamProfiles",
] as const;

export type TranslationDomain = (typeof TRANSLATION_DOMAINS)[number];

export type TranslationFieldMap = Record<string, string>;

export interface TranslationCatalogEntry {
  domain: TranslationDomain;
  id: string;
  title: string;
  description: string;
  sourceLocale: SiteLocale;
  fields: string[];
  values: Record<SiteLocale, TranslationFieldMap>;
}

export interface TranslationCatalogResponse {
  entries: TranslationCatalogEntry[];
}
