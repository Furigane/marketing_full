import arMessages from "@/messages/ar.json";
import deMessages from "@/messages/de.json";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import ruMessages from "@/messages/ru.json";

import { normalizeSiteLocale, type SiteLocale } from "@/lib/site-locales";

const STATIC_MESSAGES = {
  ru: ruMessages,
  en: enMessages,
  fr: frMessages,
  de: deMessages,
  ar: arMessages,
} as const satisfies Record<SiteLocale, typeof ruMessages>;

export function getStaticMessages(locale: string) {
  return STATIC_MESSAGES[normalizeSiteLocale(locale)];
}
