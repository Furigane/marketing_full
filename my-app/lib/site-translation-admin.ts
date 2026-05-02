import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { getCaseStudies } from "@/lib/case-studies";
import { SITE_LOCALES, type SiteLocale } from "@/lib/site-locales";
import { getServiceDefinitions } from "@/lib/services";
import {
  deepMergeTranslationValue,
  getTranslationOverrideStore,
  saveTranslationOverrideStore,
  type TranslationValueTree,
} from "@/lib/site-translation-runtime";
import {
  type TranslationCatalogEntry,
  type TranslationDomain,
  type TranslationFieldMap,
} from "@/lib/site-translation-types";
import { TEAM_ROLE_CONTENT } from "@/lib/team-profiles";

const MESSAGES_DIR = path.join(process.cwd(), "messages");

function flattenTree(
  value: TranslationValueTree | Record<string, unknown>,
  prefix = ""
): TranslationFieldMap {
  if (typeof value === "string") {
    return prefix ? { [prefix]: value } : {};
  }

  if (Array.isArray(value)) {
    return value.reduce<TranslationFieldMap>((acc, item, index) => {
      return { ...acc, ...flattenTree(item, prefix ? `${prefix}.${index}` : String(index)) };
    }, {});
  }

  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.entries(value).reduce<TranslationFieldMap>((acc, [key, nested]) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    return { ...acc, ...flattenTree(nested as TranslationValueTree, nextPrefix) };
  }, {});
}

function getValueAtPath(value: unknown, fieldPath: string) {
  return fieldPath.split(".").reduce<unknown>((current, segment) => {
    if (current === undefined || current === null) {
      return undefined;
    }

    if (Array.isArray(current)) {
      const index = Number(segment);
      return Number.isInteger(index) ? current[index] : undefined;
    }

    if (typeof current === "object") {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, value);
}

function setValueAtPath(target: unknown, fieldPath: string, nextValue: string) {
  const segments = fieldPath.split(".");
  let current = target as Record<string, unknown> | unknown[];

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    const isLast = index === segments.length - 1;

    if (Array.isArray(current)) {
      const key = Number(segment);
      if (!Number.isInteger(key)) {
        throw new Error(`Invalid array path: ${fieldPath}`);
      }

      if (isLast) {
        current[key] = nextValue;
        return;
      }

      current = current[key] as Record<string, unknown> | unknown[];
      continue;
    }

    if (isLast) {
      current[segment] = nextValue;
      return;
    }

    current = current[segment] as Record<string, unknown> | unknown[];
  }
}

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

async function readMessagesLocale(locale: SiteLocale) {
  const raw = await readFile(path.join(MESSAGES_DIR, `${locale}.json`), "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
}

async function readAllMessages() {
  const items = await Promise.all(
    SITE_LOCALES.map(async (locale) => [locale, await readMessagesLocale(locale)] as const)
  );
  return Object.fromEntries(items) as Record<SiteLocale, Record<string, unknown>>;
}

function buildFieldsFromValues(values: Record<SiteLocale, TranslationFieldMap>) {
  const fieldSet = new Set<string>();
  for (const locale of SITE_LOCALES) {
    Object.keys(values[locale]).forEach((field) => fieldSet.add(field));
  }
  return [...fieldSet].sort((left, right) => left.localeCompare(right));
}

function createEmptyLocaleFieldMap(): Record<SiteLocale, TranslationFieldMap> {
  return SITE_LOCALES.reduce(
    (acc, locale) => {
      acc[locale] = {};
      return acc;
    },
    {} as Record<SiteLocale, TranslationFieldMap>
  );
}

export async function getTranslationCatalog() {
  const [messages, overrides] = await Promise.all([
    readAllMessages(),
    getTranslationOverrideStore(),
  ]);

  const entries: TranslationCatalogEntry[] = [];

  for (const namespace of Object.keys(messages.ru)) {
    const values = createEmptyLocaleFieldMap();
    for (const locale of SITE_LOCALES) {
      const baseTree = messages[locale][namespace] as Record<string, unknown>;
      const mergedTree = deepMergeTranslationValue(
        baseTree,
        overrides.messages[locale]?.[namespace]
      );
      values[locale] = flattenTree(mergedTree);
    }

    entries.push({
      domain: "messages",
      id: namespace,
      title: namespace,
      description: "Тексты интерфейса next-intl",
      sourceLocale: "ru",
      fields: buildFieldsFromValues(values),
      values,
    });
  }

  for (const service of getServiceDefinitions()) {
    const values = createEmptyLocaleFieldMap();
    for (const locale of SITE_LOCALES) {
      const baseLocale = locale === "ru" ? "ru" : "en";
      const mergedTree = deepMergeTranslationValue(
        service.locale[baseLocale],
        overrides.services[service.id]?.[locale]
      );
      values[locale] = flattenTree(mergedTree);
    }

    entries.push({
      domain: "services",
      id: service.id,
      title: service.locale.ru.title || service.locale.en.title,
      description: `Услуга: ${service.slug}`,
      sourceLocale: "ru",
      fields: buildFieldsFromValues(values),
      values,
    });
  }

  for (const caseStudy of getCaseStudies()) {
    const values = createEmptyLocaleFieldMap();
    for (const locale of SITE_LOCALES) {
      const baseLocale = locale === "ru" ? "ru" : "en";
      const mergedTree = deepMergeTranslationValue(
        caseStudy.locale[baseLocale],
        overrides.caseStudies[caseStudy.id]?.[locale]
      );
      values[locale] = flattenTree(mergedTree);
    }

    entries.push({
      domain: "caseStudies",
      id: caseStudy.id,
      title: caseStudy.locale.ru.card.title || caseStudy.locale.en.card.title,
      description: `Кейс: ${caseStudy.slug}`,
      sourceLocale: "ru",
      fields: buildFieldsFromValues(values),
      values,
    });
  }

  for (const [roleType, content] of Object.entries(TEAM_ROLE_CONTENT.ru)) {
    const values = createEmptyLocaleFieldMap();
    for (const locale of SITE_LOCALES) {
      const baseLocale = locale === "ru" ? "ru" : "en";
      const mergedTree = deepMergeTranslationValue(
        TEAM_ROLE_CONTENT[baseLocale][roleType as keyof typeof TEAM_ROLE_CONTENT.en],
        overrides.teamProfiles[roleType]?.[locale]
      );
      values[locale] = flattenTree(mergedTree);
    }

    entries.push({
      domain: "teamProfiles",
      id: roleType,
      title: content.titleHighlight,
      description: "Профиль роли команды",
      sourceLocale: "ru",
      fields: buildFieldsFromValues(values),
      values,
    });
  }

  return entries.sort((left, right) => {
    const byDomain = left.domain.localeCompare(right.domain);
    return byDomain === 0 ? left.title.localeCompare(right.title) : byDomain;
  });
}

function getDomainBucket(
  store: Awaited<ReturnType<typeof getTranslationOverrideStore>>,
  domain: Exclude<TranslationDomain, "messages">
) {
  return store[domain];
}

export async function updateTranslationEntry(params: {
  domain: TranslationDomain;
  id: string;
  locale: SiteLocale;
  fields: TranslationFieldMap;
}) {
  const { domain, id, locale, fields } = params;
  const catalog = await getTranslationCatalog();
  const entry = catalog.find((item) => item.domain === domain && item.id === id);
  if (!entry) {
    throw new Error("Translation entry not found.");
  }

  const store = await getTranslationOverrideStore();
  const baseTree =
    domain === "messages"
      ? await readMessagesLocale(locale).then((messages) => {
          const source = deepMergeTranslationValue(
            (messages[id] ?? {}) as Record<string, unknown>,
            store.messages[locale]?.[id]
          );
          return cloneValue(source);
        })
      : cloneValue(
          deepMergeTranslationValue(
            resolveDomainBaseValue(domain, id, locale),
            getDomainBucket(store, domain)[id]?.[locale]
          )
        );

  for (const field of entry.fields) {
    const nextValue = fields[field] ?? "";
    setValueAtPath(baseTree, field, nextValue);
  }

  if (domain === "messages") {
    const localeMessages = store.messages[locale] ?? {};
    store.messages[locale] = {
      ...localeMessages,
      [id]: baseTree as Record<string, TranslationValueTree>,
    };
  } else {
    const bucket = getDomainBucket(store, domain);
    bucket[id] = {
      ...(bucket[id] ?? {}),
      [locale]: baseTree as TranslationValueTree,
    };
  }

  await saveTranslationOverrideStore(store);
}

function resolveDomainBaseValue(
  domain: Exclude<TranslationDomain, "messages">,
  id: string,
  locale: SiteLocale
) {
  const baseLocale = locale === "ru" ? "ru" : "en";

  if (domain === "services") {
    const item = getServiceDefinitions().find((service) => service.id === id);
    if (!item) {
      throw new Error("Service translation source not found.");
    }
    return item.locale[baseLocale];
  }

  if (domain === "caseStudies") {
    const item = getCaseStudies().find((caseStudy) => caseStudy.id === id);
    if (!item) {
      throw new Error("Case study translation source not found.");
    }
    return item.locale[baseLocale];
  }

  const item = TEAM_ROLE_CONTENT[baseLocale][id as keyof typeof TEAM_ROLE_CONTENT.en];
  if (!item) {
    throw new Error("Team profile translation source not found.");
  }

  return item;
}

export function getSourceFieldsForLocale(
  entry: TranslationCatalogEntry,
  locale: SiteLocale
) {
  return entry.fields.reduce<TranslationFieldMap>((acc, field) => {
    acc[field] = entry.values[locale][field] ?? "";
    return acc;
  }, {});
}

export function buildUpdatedFieldMap(
  baseFields: TranslationFieldMap,
  updates: TranslationFieldMap
) {
  const output = { ...baseFields };
  for (const [key, value] of Object.entries(updates)) {
    output[key] = value;
  }
  return output;
}

export function extractFieldMapFromTree(
  tree: Record<string, unknown>,
  fields: string[]
) {
  return fields.reduce<TranslationFieldMap>((acc, field) => {
    const value = getValueAtPath(tree, field);
    acc[field] = typeof value === "string" ? value : "";
    return acc;
  }, {});
}
