export const SITE_LOCALES = ["ru", "en", "fr", "de", "ar"] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];

export const SITE_LOCALE_LABELS: Record<SiteLocale, string> = {
  ru: "Русский",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  ar: "العربية",
};

export function normalizeSiteLocale(locale: string): SiteLocale {
  const value = locale.toLowerCase().split("-")[0];
  return SITE_LOCALES.find((item) => item === value) ?? "ru";
}

export function getDefaultContentLocale(locale: string): "ru" | "en" {
  return normalizeSiteLocale(locale) === "ru" ? "ru" : "en";
}
