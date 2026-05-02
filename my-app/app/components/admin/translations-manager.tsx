"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Globe2,
  Languages,
  RefreshCcw,
  Save,
  Search,
  Sparkles,
} from "lucide-react";

import { ADMIN_ACCESS_TOKEN_KEY } from "@/lib/admin-auth";
import {
  SITE_LOCALE_LABELS,
  SITE_LOCALES,
  type SiteLocale,
} from "@/lib/site-locales";
import {
  TRANSLATION_DOMAINS,
  type TranslationCatalogEntry,
  type TranslationCatalogResponse,
  type TranslationDomain,
  type TranslationFieldMap,
} from "@/lib/site-translation-types";

const DOMAIN_LABELS: Record<TranslationDomain, string> = {
  messages: "UI / messages",
  services: "Услуги",
  caseStudies: "Кейсы",
  teamProfiles: "Профили команды",
  teamMembers: "Карточки специалистов",
  specialistProfiles: "Развернутые профили",
};

function authHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? sessionStorage.getItem(ADMIN_ACCESS_TOKEN_KEY) : null;
  return {
    "Content-Type": "application/json",
    ...(token?.trim() ? { Authorization: `Bearer ${token.trim()}` } : {}),
  };
}

async function fetchCatalog() {
  const response = await fetch("/api/admin/translations", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Не удалось загрузить каталог переводов.");
  }

  return (await response.json()) as TranslationCatalogResponse;
}

export function TranslationsManager() {
  const [entries, setEntries] = useState<TranslationCatalogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isBulkTranslating, setIsBulkTranslating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<TranslationDomain>("messages");
  const [activeLocale, setActiveLocale] = useState<SiteLocale>("ru");
  const [sourceLocale, setSourceLocale] = useState<SiteLocale>("ru");
  const [selectedKey, setSelectedKey] = useState("");
  const [draft, setDraft] = useState<TranslationFieldMap>({});

  const loadCatalog = useCallback(async (preserveSelection = true) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await fetchCatalog();
      setEntries(data.entries);

      const firstEntry = data.entries.find((entry) => entry.domain === domain) ?? data.entries[0];
      const fallbackKey = firstEntry ? `${firstEntry.domain}:${firstEntry.id}` : "";
      setSelectedKey((currentKey) => {
        if (!preserveSelection) {
          return fallbackKey;
        }

        return data.entries.some((entry) => `${entry.domain}:${entry.id}` === currentKey)
          ? currentKey
          : fallbackKey;
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Ошибка загрузки переводов.");
    } finally {
      setIsLoading(false);
    }
  }, [domain]);

  useEffect(() => {
    void loadCatalog(false);
  }, [loadCatalog]);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (entry.domain !== domain) return false;
      if (!normalizedQuery) return true;
      return (
        entry.title.toLowerCase().includes(normalizedQuery) ||
        entry.id.toLowerCase().includes(normalizedQuery) ||
        entry.description.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [domain, entries, query]);

  const selectedEntry = useMemo(() => {
    return entries.find((entry) => `${entry.domain}:${entry.id}` === selectedKey) ?? null;
  }, [entries, selectedKey]);

  useEffect(() => {
    const candidate = filteredEntries[0];
    if (!selectedEntry || selectedEntry.domain !== domain) {
      setSelectedKey(candidate ? `${candidate.domain}:${candidate.id}` : "");
    }
  }, [domain, filteredEntries, selectedEntry]);

  useEffect(() => {
    if (!selectedEntry) {
      setDraft({});
      return;
    }

    setDraft({ ...selectedEntry.values[activeLocale] });
  }, [activeLocale, selectedEntry]);

  async function handleSave() {
    if (!selectedEntry) return;

    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/admin/translations", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({
          domain: selectedEntry.domain,
          id: selectedEntry.id,
          locale: activeLocale,
          fields: draft,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { detail?: string };
      if (!response.ok) {
        throw new Error(data.detail || "Не удалось сохранить перевод.");
      }

      await loadCatalog();
      setSuccess(`Сохранено: ${selectedEntry.title} [${activeLocale}]`);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Ошибка сохранения.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAutoTranslateForEntry(locales?: SiteLocale[]) {
    if (!selectedEntry) return;

    const targetLocales =
      locales?.length
        ? locales
        : SITE_LOCALES.filter((locale) => locale !== sourceLocale);
    if (targetLocales.length === 0) return;

    setIsTranslating(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/admin/translations/translate", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          domain: selectedEntry.domain,
          id: selectedEntry.id,
          sourceLocale,
          targetLocales,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { detail?: string };
      if (!response.ok) {
        throw new Error(data.detail || "Не удалось выполнить автоперевод.");
      }

      await loadCatalog();
      setSuccess(`Автоперевод выполнен для ${targetLocales.join(", ")}.`);
    } catch (translateError) {
      setError(translateError instanceof Error ? translateError.message : "Ошибка автоперевода.");
    } finally {
      setIsTranslating(false);
    }
  }

  async function handleBulkTranslateMissing() {
    setIsBulkTranslating(true);
    setError("");
    setSuccess("");

    try {
      let processed = 0;
      for (const entry of filteredEntries) {
        const missingLocales = SITE_LOCALES.filter((locale) => {
          if (locale === sourceLocale) return false;
          return entry.fields.some((field) => !(entry.values[locale][field] ?? "").trim());
        });

        if (missingLocales.length === 0) {
          continue;
        }

        const response = await fetch("/api/admin/translations/translate", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({
            domain: entry.domain,
            id: entry.id,
            sourceLocale,
            targetLocales: missingLocales,
          }),
        });
        const data = (await response.json().catch(() => ({}))) as { detail?: string };
        if (!response.ok) {
          throw new Error(`${entry.title}: ${data.detail || "Не удалось перевести блок."}`);
        }
        processed += 1;
      }

      await loadCatalog();
      setSuccess(
        processed > 0
          ? `Автоперевод завершён для ${processed} блоков.`
          : "Пустых переводов для выбранного раздела не найдено."
      );
    } catch (bulkError) {
      setError(bulkError instanceof Error ? bulkError.message : "Ошибка пакетного автоперевода.");
    } finally {
      setIsBulkTranslating(false);
    }
  }

  const completion = selectedEntry
    ? selectedEntry.fields.filter((field) => (selectedEntry.values[activeLocale][field] ?? "").trim()).length
    : 0;

  return (
    <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[28px] bg-[var(--team-surface)] p-4 shadow-sm md:rounded-[36px] md:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--foreground)]">Переводы сайта</h2>
            <p className="mt-1 text-sm text-[var(--design-muted)]">
              Управление текстами сайта и автоперевод через LLM.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadCatalog()}
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--foreground)]/12 px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background)]"
          >
            <RefreshCcw size={16} />
            Обновить
          </button>
        </div>

        {error ? <p className="mb-3 text-sm text-red-500">{error}</p> : null}
        {success ? <p className="mb-3 text-sm text-emerald-600 dark:text-emerald-400">{success}</p> : null}

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--background)] px-4 py-3">
            <Search size={16} className="text-[var(--design-muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по названию или ключу"
              className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none"
            />
          </label>

          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value as TranslationDomain)}
            className="rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none"
          >
            {TRANSLATION_DOMAINS.map((item) => (
              <option key={item} value={item}>
                {DOMAIN_LABELS[item]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <label className="block text-sm font-medium text-[var(--foreground)]">
            Язык-источник для LLM
            <select
              value={sourceLocale}
              onChange={(event) => setSourceLocale(event.target.value as SiteLocale)}
              className="mt-1 w-full rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none"
            >
              {SITE_LOCALES.map((locale) => (
                <option key={locale} value={locale}>
                  {SITE_LOCALE_LABELS[locale]}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => void handleBulkTranslateMissing()}
            disabled={isBulkTranslating || filteredEntries.length === 0}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--design-btn)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--design-btn-hover)] disabled:opacity-60"
          >
            <Sparkles size={16} />
            {isBulkTranslating ? "Переводим раздел..." : "Перевести пустые блоки раздела"}
          </button>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-[color:var(--foreground)]/18 bg-[var(--background)] p-6 text-sm text-[var(--design-muted)]">
              Загрузка каталога переводов...
            </div>
          ) : null}

          {!isLoading && filteredEntries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[color:var(--foreground)]/18 bg-[var(--background)] p-6 text-sm text-[var(--design-muted)]">
              По текущему фильтру блоков не найдено.
            </div>
          ) : null}

          {filteredEntries.map((entry) => {
            const key = `${entry.domain}:${entry.id}`;
            const isActive = key === selectedKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? "border-[var(--design-btn)] bg-[var(--background)]"
                    : "border-black/5 bg-[var(--background)] hover:border-[color:var(--foreground)]/16 dark:border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{entry.title}</p>
                    <p className="mt-1 text-xs text-[var(--design-muted)]">{entry.description}</p>
                  </div>
                  <span className="rounded-full bg-[var(--team-surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--design-muted)]">
                    {entry.fields.length} полей
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[28px] bg-[var(--team-surface)] p-4 shadow-sm md:rounded-[36px] md:p-6">
        {!selectedEntry ? (
          <div className="rounded-3xl border border-dashed border-[color:var(--foreground)]/18 bg-[var(--background)] p-8 text-sm text-[var(--design-muted)]">
            Выберите блок слева, чтобы редактировать переводы.
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--design-muted)]">
                  <Languages size={14} />
                  {DOMAIN_LABELS[selectedEntry.domain]}
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-[var(--foreground)]">
                  {selectedEntry.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--design-muted)]">{selectedEntry.description}</p>
              </div>

              <div className="rounded-2xl bg-[var(--background)] px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--design-muted)]">Заполнено</p>
                <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
                  {completion}/{selectedEntry.fields.length}
                </p>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {SITE_LOCALES.map((locale) => {
                const filled = selectedEntry.fields.filter(
                  (field) => (selectedEntry.values[locale][field] ?? "").trim()
                ).length;
                return (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => setActiveLocale(locale)}
                    className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                      activeLocale === locale
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "bg-[var(--background)] text-[var(--design-muted)]"
                    }`}
                  >
                    {SITE_LOCALE_LABELS[locale]} · {filled}/{selectedEntry.fields.length}
                  </button>
                );
              })}
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-3xl border border-[color:var(--foreground)]/10 bg-[var(--background)] p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Редактирование языка: {SITE_LOCALE_LABELS[activeLocale]}
                </p>
                <p className="mt-1 text-sm text-[var(--design-muted)]">
                  Источник для LLM: {SITE_LOCALE_LABELS[sourceLocale]}
                </p>
              </div>

              <button
                type="button"
                onClick={() => void handleAutoTranslateForEntry()}
                disabled={isTranslating}
                className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--foreground)]/12 px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--team-surface)] disabled:opacity-60"
              >
                <Globe2 size={16} />
                {isTranslating ? "Переводим..." : "Автоперевести все языки"}
              </button>

              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-2xl bg-[var(--design-btn)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--design-btn-hover)] disabled:opacity-60"
              >
                <Save size={16} />
                {isSaving ? "Сохраняем..." : "Сохранить"}
              </button>
            </div>

            <div className="space-y-4">
              {selectedEntry.fields.map((field) => (
                <label key={field} className="block text-sm font-medium text-[var(--foreground)]">
                  <span className="mb-1 block text-[13px] text-[var(--design-muted)]">{field}</span>
                  <textarea
                    rows={Math.max(3, Math.min(8, (draft[field] ?? "").split("\n").length + 1))}
                    value={draft[field] ?? ""}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        [field]: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--design-btn)]"
                  />
                </label>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
