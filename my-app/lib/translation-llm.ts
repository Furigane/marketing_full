import "server-only";

import { SITE_LOCALE_LABELS, type SiteLocale } from "@/lib/site-locales";
import type { TranslationFieldMap } from "@/lib/site-translation-types";

type TranslationResult = Record<SiteLocale, TranslationFieldMap>;

function extractJsonObject(input: string) {
  const fencedMatch = input.match(/```json\s*([\s\S]*?)```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return input.slice(start, end + 1);
  }

  throw new Error("LLM response did not contain a JSON object.");
}

function assertFieldMap(
  payload: unknown,
  targetLocales: SiteLocale[],
  sourceFields: TranslationFieldMap
) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Invalid translation payload.");
  }

  const result = {} as TranslationResult;
  for (const locale of targetLocales) {
    const localePayload = (payload as Record<string, unknown>)[locale];
    if (!localePayload || typeof localePayload !== "object" || Array.isArray(localePayload)) {
      throw new Error(`Missing translation object for locale ${locale}.`);
    }

    const nextMap: TranslationFieldMap = {};
    for (const field of Object.keys(sourceFields)) {
      const value = (localePayload as Record<string, unknown>)[field];
      if (typeof value !== "string") {
        throw new Error(`Missing field "${field}" for locale ${locale}.`);
      }
      nextMap[field] = value;
    }

    result[locale] = nextMap;
  }

  return result;
}

export async function translateFieldMapWithLlm(params: {
  entryTitle: string;
  entryDescription: string;
  sourceLocale: SiteLocale;
  sourceFields: TranslationFieldMap;
  targetLocales: SiteLocale[];
}) {
  const apiKey = process.env.TRANSLATION_LLM_API_KEY?.trim();
  const model = process.env.TRANSLATION_LLM_MODEL?.trim();
  const apiUrl =
    process.env.TRANSLATION_LLM_API_URL?.trim() ||
    "https://api.openai.com/v1/chat/completions";

  if (!apiKey || !model) {
    throw new Error(
      "Set TRANSLATION_LLM_API_KEY and TRANSLATION_LLM_MODEL to use automatic translations."
    );
  }

  const { entryTitle, entryDescription, sourceLocale, sourceFields, targetLocales } = params;
  const targetLanguageList = targetLocales
    .map((locale) => `${locale} (${SITE_LOCALE_LABELS[locale]})`)
    .join(", ");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a senior localization editor. Translate accurately, preserve formatting, keep field keys unchanged, and return JSON only.",
        },
        {
          role: "user",
          content: [
            `Translate the following website content.`,
            `Section title: ${entryTitle}`,
            `Section description: ${entryDescription}`,
            `Source locale: ${sourceLocale} (${SITE_LOCALE_LABELS[sourceLocale]})`,
            `Target locales: ${targetLanguageList}`,
            `Rules: preserve markdown, placeholders, URLs, emojis, punctuation style, and line breaks where meaningful. Return a JSON object shaped as { "<locale>": { "<field>": "translated text" } }.`,
            JSON.stringify({ source: sourceFields }, null, 2),
          ].join("\n\n"),
        },
      ],
    }),
    cache: "no-store",
  });

  const raw = (await response.json().catch(() => null)) as
    | {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string };
      }
    | null;

  if (!response.ok) {
    throw new Error(raw?.error?.message || "Translation API request failed.");
  }

  const content = raw?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Translation API returned an empty response.");
  }

  const parsed = JSON.parse(extractJsonObject(content)) as unknown;
  return assertFieldMap(parsed, targetLocales, sourceFields);
}
