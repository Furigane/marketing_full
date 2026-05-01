"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { ADMIN_ACCESS_TOKEN_KEY } from "@/lib/admin-auth";
import {
  BLOG_LOCALES,
  type BlogLocale,
  type BlogPost,
  type BlogPostPayload,
  type BlogPostStatus,
  createEmptyTranslations,
} from "@/lib/blog";

type FormState = BlogPostPayload;

const LOCALE_LABELS: Record<BlogLocale, string> = {
  ru: "Русский",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  ar: "العربية",
};

function createEmptyForm(): FormState {
  return {
    slug: "",
    status: "draft",
    publishedAt: new Date().toISOString().slice(0, 10),
    translations: createEmptyTranslations(),
  };
}

async function fetchPosts() {
  const response = await fetch("/api/admin/blog", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Не удалось загрузить статьи.");
  }

  const data = (await response.json()) as { posts?: BlogPost[] };
  return data.posts ?? [];
}

function authHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? sessionStorage.getItem(ADMIN_ACCESS_TOKEN_KEY) : null;
  return {
    "Content-Type": "application/json",
    ...(token?.trim() ? { Authorization: `Bearer ${token.trim()}` } : {}),
  };
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeLocale, setActiveLocale] = useState<BlogLocale>("ru");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(createEmptyForm());

  async function loadPosts() {
    setIsLoading(true);
    setError("");
    try {
      const nextPosts = await fetchPosts();
      setPosts(nextPosts);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Ошибка загрузки.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadPosts();
  }, []);

  const selectedTranslation = form.translations[activeLocale];
  const publishedCount = useMemo(
    () => posts.filter((post) => post.status === "published").length,
    [posts]
  );

  function resetForm() {
    setEditingId(null);
    setForm(createEmptyForm());
    setActiveLocale("ru");
  }

  function startEdit(post: BlogPost) {
    setEditingId(post.id);
    setForm({
      slug: post.slug,
      status: post.status,
      publishedAt: post.publishedAt,
      translations: structuredClone(post.translations),
    });
    setSuccess("");
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/blog/${editingId}` : "/api/admin/blog";
      const response = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => ({}))) as {
        detail?: string;
      };

      if (!response.ok) {
        throw new Error(data.detail || "Не удалось сохранить статью.");
      }

      await loadPosts();
      setSuccess(editingId ? "Статья обновлена." : "Статья создана.");
      resetForm();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Ошибка сохранения.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const shouldDelete = window.confirm("Удалить статью без возможности восстановления?");
    if (!shouldDelete) return;

    setError("");
    setSuccess("");
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = (await response.json().catch(() => ({}))) as {
        detail?: string;
      };
      if (!response.ok) {
        throw new Error(data.detail || "Не удалось удалить статью.");
      }

      if (editingId === id) {
        resetForm();
      }
      await loadPosts();
      setSuccess("Статья удалена.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Ошибка удаления.");
    }
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[28px] bg-[var(--team-surface)] p-4 shadow-sm md:rounded-[36px] md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--foreground)]">Блог</h2>
            <p className="mt-1 text-sm text-[var(--design-muted)]">
              Отдельная лента статей для сайта с управлением из админки.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--design-muted)]">
              Всего: {posts.length}
            </span>
            <span className="rounded-full bg-[var(--design-btn)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
              Опубликовано: {publishedCount}
            </span>
          </div>
        </div>

        {error ? <p className="mb-3 text-sm text-red-500">{error}</p> : null}
        {success ? <p className="mb-3 text-sm text-emerald-600 dark:text-emerald-400">{success}</p> : null}
        {isLoading ? <p className="text-sm text-[var(--design-muted)]">Загрузка статей...</p> : null}

        <div className="space-y-3">
          {posts.map((post) => {
            const preview = post.translations.ru.title || post.translations.en.title || "Без названия";
            return (
              <article
                key={post.id}
                className="rounded-2xl border border-black/5 bg-[var(--background)] p-4 dark:border-white/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{preview}</h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          post.status === "published"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {post.status === "published" ? "Опубликовано" : "Черновик"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--design-muted)]">Slug: /blog/{post.slug}</p>
                    <p className="mt-2 text-sm text-[var(--design-muted)]">
                      Дата публикации: {post.publishedAt} • Обновлено:{" "}
                      {new Date(post.updatedAt).toLocaleString("ru-RU")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(post)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--foreground)]/12 px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--team-surface)]"
                    >
                      <Pencil size={16} />
                      Редактировать
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(post.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500/10 dark:text-red-400"
                    >
                      <Trash2 size={16} />
                      Удалить
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {!isLoading && posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[color:var(--foreground)]/18 bg-[var(--background)] p-6 text-sm text-[var(--design-muted)]">
              Статей пока нет. Создайте первую публикацию справа.
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-[28px] bg-[var(--team-surface)] p-4 shadow-sm md:rounded-[36px] md:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--foreground)]">
              {editingId ? "Редактирование статьи" : "Новая статья"}
            </h2>
            <p className="mt-1 text-sm text-[var(--design-muted)]">
              Заполняйте контент по языкам. Для показа на сайте достаточно хотя бы одного заголовка.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--foreground)]/12 px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--background)]"
          >
            <Plus size={16} />
            Сбросить
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Slug
              <input
                value={form.slug}
                onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value.toLowerCase() }))}
                placeholder="marketing-case"
                className="mt-1 w-full rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--design-btn)]"
              />
            </label>

            <label className="block text-sm font-medium text-[var(--foreground)]">
              Дата публикации
              <input
                type="date"
                value={form.publishedAt}
                onChange={(event) => setForm((prev) => ({ ...prev, publishedAt: event.target.value }))}
                className="mt-1 w-full rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--design-btn)]"
              />
            </label>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[var(--foreground)]">Статус</p>
            <div className="flex gap-2">
              {(["draft", "published"] as BlogPostStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, status }))}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    form.status === status
                      ? "bg-[var(--design-btn)] text-[var(--foreground)]"
                      : "bg-[var(--background)] text-[var(--design-muted)]"
                  }`}
                >
                  {status === "draft" ? "Черновик" : "Опубликовано"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[var(--foreground)]">Язык контента</p>
            <div className="flex flex-wrap gap-2">
              {BLOG_LOCALES.map((locale) => (
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
                  {LOCALE_LABELS[locale]}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--foreground)]/10 bg-[var(--background)] p-4">
            <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
              {LOCALE_LABELS[activeLocale]}
            </p>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Заголовок
                <input
                  value={selectedTranslation.title}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        [activeLocale]: {
                          ...prev.translations[activeLocale],
                          title: event.target.value,
                        },
                      },
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--team-surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--design-btn)]"
                />
              </label>

              <label className="block text-sm font-medium text-[var(--foreground)]">
                Краткое описание
                <textarea
                  rows={3}
                  value={selectedTranslation.excerpt}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        [activeLocale]: {
                          ...prev.translations[activeLocale],
                          excerpt: event.target.value,
                        },
                      },
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--team-surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--design-btn)]"
                />
              </label>

              <label className="block text-sm font-medium text-[var(--foreground)]">
                Полный текст статьи
                <textarea
                  rows={12}
                  value={selectedTranslation.content}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        [activeLocale]: {
                          ...prev.translations[activeLocale],
                          content: event.target.value,
                        },
                      },
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-[color:var(--foreground)]/12 bg-[var(--team-surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--design-btn)]"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-2xl bg-[var(--design-btn)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--design-btn-hover)] disabled:opacity-60"
          >
            {isSaving ? "Сохранение..." : editingId ? "Сохранить изменения" : "Создать статью"}
          </button>
        </form>
      </div>
    </section>
  );
}
