import { NextResponse } from "next/server";

import { isAdminRequestAuthorized } from "@/lib/admin-route-auth";
import {
  getSourceFieldsForLocale,
  getTranslationCatalog,
  updateTranslationEntry,
} from "@/lib/site-translation-admin";
import { normalizeSiteLocale, SITE_LOCALES } from "@/lib/site-locales";
import { translateFieldMapWithLlm } from "@/lib/translation-llm";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      domain?: string;
      id?: string;
      sourceLocale?: string;
      targetLocales?: string[];
    };

    const domain = body.domain;
    const id = body.id;
    const sourceLocale = body.sourceLocale ? normalizeSiteLocale(body.sourceLocale) : "ru";
    const targetLocales = Array.isArray(body.targetLocales)
      ? body.targetLocales.map((locale) => normalizeSiteLocale(locale))
      : [];

    if (!domain || !id || targetLocales.length === 0) {
      throw new Error("domain, id, and at least one target locale are required.");
    }

    const catalog = await getTranslationCatalog();
    const entry = catalog.find((item) => item.domain === domain && item.id === id);
    if (!entry) {
      throw new Error("Translation entry not found.");
    }

    const filteredTargets = targetLocales.filter(
      (locale, index) =>
        locale !== sourceLocale &&
        SITE_LOCALES.includes(locale) &&
        targetLocales.indexOf(locale) === index
    );
    if (filteredTargets.length === 0) {
      throw new Error("Choose at least one target locale different from the source locale.");
    }

    const sourceFields = getSourceFieldsForLocale(entry, sourceLocale);
    const translated = await translateFieldMapWithLlm({
      entryTitle: entry.title,
      entryDescription: entry.description,
      sourceLocale,
      sourceFields,
      targetLocales: filteredTargets,
    });

    for (const locale of filteredTargets) {
      await updateTranslationEntry({
        domain: entry.domain,
        id: entry.id,
        locale,
        fields: translated[locale],
      });
    }

    return NextResponse.json({ ok: true, translations: translated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to translate entry.";
    const status = message === "Translation entry not found." ? 404 : 400;
    return NextResponse.json({ detail: message }, { status });
  }
}
