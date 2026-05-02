import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

import { SITE_LOCALES, type SiteLocale } from "@/lib/site-locales";

export type TranslationValueTree =
  | string
  | TranslationValueTree[]
  | { [key: string]: TranslationValueTree };

export type TranslationOverrideStore = {
  messages: Partial<Record<SiteLocale, Record<string, TranslationValueTree>>>;
  services: Record<string, Partial<Record<SiteLocale, TranslationValueTree>>>;
  caseStudies: Record<string, Partial<Record<SiteLocale, TranslationValueTree>>>;
  teamProfiles: Record<string, Partial<Record<SiteLocale, TranslationValueTree>>>;
  teamMembers: Record<string, Partial<Record<SiteLocale, TranslationValueTree>>>;
  specialistProfiles: Record<string, Partial<Record<SiteLocale, TranslationValueTree>>>;
};

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "site-translations.json");

const EMPTY_STORE: TranslationOverrideStore = {
  messages: {},
  services: {},
  caseStudies: {},
  teamProfiles: {},
  teamMembers: {},
  specialistProfiles: {},
};

function cloneStore<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeRecord(value: unknown): Record<string, TranslationValueTree> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, TranslationValueTree>)
    : {};
}

function normalizeEntryMap(
  value: unknown
): Record<string, Partial<Record<SiteLocale, TranslationValueTree>>> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const result: Record<string, Partial<Record<SiteLocale, TranslationValueTree>>> = {};
  for (const [id, localeMap] of Object.entries(value as Record<string, unknown>)) {
    if (!localeMap || typeof localeMap !== "object" || Array.isArray(localeMap)) {
      continue;
    }

    const normalized: Partial<Record<SiteLocale, TranslationValueTree>> = {};
    for (const locale of SITE_LOCALES) {
      const nextValue = (localeMap as Record<string, unknown>)[locale];
      if (nextValue !== undefined) {
        normalized[locale] = nextValue as TranslationValueTree;
      }
    }
    result[id] = normalized;
  }

  return result;
}

function normalizeStore(raw: unknown): TranslationOverrideStore {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return cloneStore(EMPTY_STORE);
  }

  const input = raw as Record<string, unknown>;
  const messages: TranslationOverrideStore["messages"] = {};
  const rawMessages =
    input.messages && typeof input.messages === "object" && !Array.isArray(input.messages)
      ? (input.messages as Record<string, unknown>)
      : {};

  for (const locale of SITE_LOCALES) {
    messages[locale] = normalizeRecord(rawMessages[locale]);
  }

  return {
    messages,
    services: normalizeEntryMap(input.services),
    caseStudies: normalizeEntryMap(input.caseStudies),
    teamProfiles: normalizeEntryMap(input.teamProfiles),
    teamMembers: normalizeEntryMap(input.teamMembers),
    specialistProfiles: normalizeEntryMap(input.specialistProfiles),
  };
}

async function ensureStoreFile() {
  await mkdir(DATA_DIR, { recursive: true });
  if (!existsSync(STORE_PATH)) {
    await writeFile(STORE_PATH, JSON.stringify(EMPTY_STORE, null, 2), "utf8");
  }
}

export async function getTranslationOverrideStore() {
  await ensureStoreFile();
  const raw = await readFile(STORE_PATH, "utf8");
  return normalizeStore(JSON.parse(raw) as unknown);
}

export function getTranslationOverrideStoreSync() {
  if (!existsSync(STORE_PATH)) {
    return cloneStore(EMPTY_STORE);
  }

  try {
    const raw = readFileSync(STORE_PATH, "utf8");
    return normalizeStore(JSON.parse(raw) as unknown);
  } catch {
    return cloneStore(EMPTY_STORE);
  }
}

export async function saveTranslationOverrideStore(store: TranslationOverrideStore) {
  await ensureStoreFile();
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  revalidateTranslationPaths();
}

export function deepMergeTranslationValue<T>(base: T, override: unknown): T {
  if (override === undefined) {
    return base;
  }

  if (typeof base === "string") {
    return (typeof override === "string" ? override : base) as T;
  }

  if (Array.isArray(base)) {
    if (!Array.isArray(override)) {
      return base;
    }

    return base.map((item, index) =>
      deepMergeTranslationValue(item, override[index])
    ) as T;
  }

  if (base && typeof base === "object") {
    const output = { ...(base as Record<string, unknown>) };
    const source =
      override && typeof override === "object" && !Array.isArray(override)
        ? (override as Record<string, unknown>)
        : {};

    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      output[key] = deepMergeTranslationValue(value, source[key]);
    }

    return output as T;
  }

  return base;
}

function revalidateTranslationPaths() {
  revalidatePath("/");

  for (const locale of SITE_LOCALES) {
    const prefix = locale === "ru" ? "" : `/${locale}`;
    revalidatePath(`${prefix}/`);
    revalidatePath(`${prefix}/services`);
    revalidatePath(`${prefix}/projects`);
    revalidatePath(`${prefix}/team`);
    revalidatePath(`${prefix}/search`);
    revalidatePath(`${prefix}/admin/translations`);
  }
}
