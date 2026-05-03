import "server-only";

import {
  getLocalizedService as getBaseLocalizedService,
  getLocalizedServices as getBaseLocalizedServices,
  getRelatedServices as getBaseRelatedServices,
  type ServiceDefinition,
} from "@/lib/services";
import { getServiceTitleOverride } from "@/lib/service-title-overrides";
import { normalizeSiteLocale } from "@/lib/site-locales";
import { getTranslationOverrideStoreSync, deepMergeTranslationValue } from "@/lib/site-translation-runtime";
import { repairEncodedTree } from "@/lib/text-encoding";

const SERVICE_CONTENT_REPAIRS = {
  ru: {
    localSeo: {
      title: "Локальное SEO (карты, Google Business Profile)",
      summary:
        "Повышаем видимость компании в картах и локальной выдаче для спроса рядом с точкой продаж.",
      description:
        "Мы работаем с бизнес-профилями, локальными посадочными страницами, отзывами и геосигналами, чтобы компанию было проще находить в картах и локальных поисковых запросах.",
      deliverables: [
        "Оптимизация бизнес-профиля и обновление контента",
        "Рекомендации по локальным посадочным страницам",
        "Чек-лист по отзывам и росту локальной видимости",
      ],
    },
    seoPromotion: {
      summary:
        "Техническая, семантическая и контентная работа, которая даёт устойчивый органический рост.",
      description:
        "SEO включает технический аудит, распределение поискового спроса по страницам, требования к контенту и внутренней перелинковке. Мы работаем не ради формального роста позиций, а ради спроса, который влияет на продажи, и собираем понятный backlog задач для разработки и контента.",
      deliverables: [
        "Технический аудит с приоритизацией правок по влиянию",
        "Карта семантики и рекомендации по посадочным страницам",
        "On-page задачи и перелинковка с отчётностью по видимости",
      ],
    },
    influencerAds: {
      title: "Influencer-реклама (подбор блогеров)",
      summary:
        "Подбираем блогеров и выстраиваем интеграции под аудиторию, формат и задачу кампании.",
      description:
        "Мы подбираем релевантных блогеров, проверяем аудиторию, согласовываем формат размещения и готовим понятный бриф. Цель — превратить интеграции в управляемый канал дистрибуции, а не в разовую историю на доверии.",
      deliverables: [
        "Подбор блогеров по аудитории и тематике",
        "Брифинг и координация интеграций",
        "Разбор результата по охвату, отклику и качеству трафика",
      ],
    },
    smmManagement: {
      summary:
        "Ведём соцсети как систему: контент, публикации, вовлечение и рост канала под задачи бизнеса.",
    },
    copywriting: {
      summary:
        "Пишем тексты, которые понятно объясняют предложение и помогают довести пользователя до действия.",
    },
  },
} as const;

export function getLocalizedService(service: ServiceDefinition, locale: string) {
  const base = getBaseLocalizedService(service, locale);
  const overrides = getTranslationOverrideStoreSync();
  const normalizedLocale = normalizeSiteLocale(locale);
  const mergedContent = deepMergeTranslationValue(
    base.content,
    overrides.services[service.id]?.[normalizedLocale]
  );
  const repairedContent = repairEncodedTree(mergedContent);
  const rawServiceRepair =
    SERVICE_CONTENT_REPAIRS[
      normalizedLocale as keyof typeof SERVICE_CONTENT_REPAIRS
    ]?.[service.id as keyof (typeof SERVICE_CONTENT_REPAIRS)["ru"]];
  const serviceRepair = rawServiceRepair
    ? repairEncodedTree(rawServiceRepair)
    : undefined;
  const content = serviceRepair
    ? {
        ...repairedContent,
        ...serviceRepair,
      }
    : repairedContent;

  return {
    ...base,
    content: {
      ...content,
      title:
        getServiceTitleOverride(locale, service.section, service.id) ??
        content.title,
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
