import { NextResponse } from "next/server";

import { isAdminRequestAuthorized } from "@/lib/admin-route-auth";
import { getTranslationCatalog, updateTranslationEntry } from "@/lib/site-translation-admin";
import { normalizeSiteLocale } from "@/lib/site-locales";
import type {
  TranslationCatalogResponse,
  TranslationDomain,
  TranslationFieldMap,
} from "@/lib/site-translation-types";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getTranslationCatalog();
  return NextResponse.json({ entries } satisfies TranslationCatalogResponse);
}

export async function PUT(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      domain?: string;
      id?: string;
      locale?: string;
      fields?: TranslationFieldMap;
    };

    if (!body.domain || !body.id || !body.locale || !body.fields) {
      throw new Error("domain, id, locale, and fields are required.");
    }

    await updateTranslationEntry({
      domain: body.domain as TranslationDomain,
      id: body.id,
      locale: normalizeSiteLocale(body.locale),
      fields: body.fields,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save translation.";
    const status = message === "Translation entry not found." ? 404 : 400;
    return NextResponse.json({ detail: message }, { status });
  }
}
