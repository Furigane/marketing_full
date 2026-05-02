import "server-only";

import {
  getLocalizedService as getBaseLocalizedService,
  getLocalizedServices as getBaseLocalizedServices,
  getRelatedServices as getBaseRelatedServices,
  type ServiceDefinition,
} from "@/lib/services";
import { normalizeSiteLocale } from "@/lib/site-locales";
import {
  deepMergeTranslationValue,
  getTranslationOverrideStoreSync,
} from "@/lib/site-translation-runtime";
import { getServiceTitleOverride } from "@/lib/service-title-overrides";
import { repairEncodedTree } from "@/lib/text-encoding";

export function getLocalizedService(service: ServiceDefinition, locale: string) {
  const base = getBaseLocalizedService(service, locale);
  const overrides = getTranslationOverrideStoreSync();
  const normalizedLocale = normalizeSiteLocale(locale);

  return {
    ...base,
    content: {
      ...repairEncodedTree(
        deepMergeTranslationValue(
          base.content,
          overrides.services[service.id]?.[normalizedLocale]
        )
      ),
      title:
        getServiceTitleOverride(locale, service.section, service.id) ??
        base.content.title,
    },
  };
}

export function getLocalizedServices(locale: string) {
  return getBaseLocalizedServices(locale).map((service) =>
    getLocalizedService(service, locale)
  );
}

export function getRelatedServices(service: ServiceDefinition, locale: string) {
  return getBaseRelatedServices(service, locale).map((item) =>
    getLocalizedService(item, locale)
  );
}
