import arMessages from "@/messages/ar.json";
import deMessages from "@/messages/de.json";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import ruMessages from "@/messages/ru.json";

import type { ServiceId, ServiceSectionId } from "@/lib/services";
import { normalizeSiteLocale, type SiteLocale } from "@/lib/site-locales";

const SERVICE_SECTION_MESSAGES = {
  ru: ruMessages.servicesSection.sections,
  en: enMessages.servicesSection.sections,
  fr: frMessages.servicesSection.sections,
  de: deMessages.servicesSection.sections,
  ar: arMessages.servicesSection.sections,
} as const satisfies Record<SiteLocale, typeof ruMessages.servicesSection.sections>;

export function getServiceTitleOverride(
  locale: string,
  section: ServiceSectionId,
  id: ServiceId
) {
  const normalizedLocale = normalizeSiteLocale(locale);
  const sectionItems = SERVICE_SECTION_MESSAGES[normalizedLocale][section].items;
  return sectionItems[id] ?? null;
}
