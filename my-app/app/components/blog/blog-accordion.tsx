"use client";

import { useEffect, useMemo, useState } from "react";

import { type BlogPost, getPostTranslation } from "@/lib/blog";

const LOCALE_COPY = {
  ru: {
    title: "Блог",
    subtitle: "Публикации, которые можно раскрыть и прочитать прямо на странице.",
    readMore: "Открыть статью",
    collapse: "Свернуть",
    empty: "Пока нет опубликованных статей.",
  },
  en: {
    title: "Blog",
    subtitle: "Open any article in the list and read it on the same page.",
    readMore: "Open article",
    collapse: "Collapse",
    empty: "No published articles yet.",
  },
  fr: {
    title: "Blog",
    subtitle: "Ouvrez n’importe quel article de la liste et lisez-le sur la même page.",
    readMore: "Ouvrir l’article",
    collapse: "Réduire",
    empty: "Aucun article publié pour le moment.",
  },
  de: {
    title: "Blog",
    subtitle: "Jeden Artikel in der Liste kann man direkt auf der Seite aufklappen.",
    readMore: "Artikel öffnen",
    collapse: "Einklappen",
    empty: "Noch keine veröffentlichten Artikel.",
  },
  ar: {
    title: "المدونة",
    subtitle: "يمكن فتح أي مقالة من القائمة وقراءتها مباشرة في الصفحة نفسها.",
    readMore: "فتح المقالة",
    collapse: "طي المقالة",
    empty: "لا توجد مقالات منشورة بعد.",
  },
} as const;

export function BlogAccordion({ posts, locale }: { posts: BlogPost[]; locale: string }) {
  const copy = LOCALE_COPY[(locale in LOCALE_COPY ? locale : "ru") as keyof typeof LOCALE_COPY];
  const [openId, setOpenId] = useState<string | null>(posts[0]?.id ?? null);

  const items = useMemo(
    () =>
      posts.map((post) => ({
        post,
        translation: getPostTranslation(post, locale),
      })),
    [locale, posts]
  );

  useEffect(() => {
    const syncOpenPostWithHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#post-")) {
        return;
      }

      const slug = decodeURIComponent(hash.replace("#post-", ""));
      const matchedPost = posts.find((post) => post.slug === slug);
      if (matchedPost) {
        setOpenId(matchedPost.id);
      }
    };

    syncOpenPostWithHash();
    window.addEventListener("hashchange", syncOpenPostWithHash);
    return () => window.removeEventListener("hashchange", syncOpenPostWithHash);
  }, [posts]);

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-3 pb-12 pt-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
      <section className="rounded-[32px] bg-[var(--team-surface)] px-5 py-8 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--design-muted)]">
            Creative Group
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--design-muted)] sm:text-base">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        {items.map(({ post, translation }) => {
          const isOpen = openId === post.id;
          const paragraphs = translation.content
            .split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);

          return (
            <article
              key={post.id}
              id={`post-${post.slug}`}
              className="overflow-hidden rounded-[28px] border border-black/5 bg-[var(--header-bg)] shadow-sm dark:border-white/10"
            >
              <button
                type="button"
                onClick={() => setOpenId((current) => (current === post.id ? null : post.id))}
                className="flex w-full flex-col gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--design-muted)]">
                      {new Intl.DateTimeFormat(locale === "ar" ? "ar" : locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(post.publishedAt))}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">{translation.title}</h2>
                  </div>
                  <span className="rounded-full border border-[color:var(--foreground)]/12 px-4 py-2 text-sm font-semibold text-[var(--foreground)]">
                    {isOpen ? copy.collapse : copy.readMore}
                  </span>
                </div>
                <p className="max-w-3xl text-sm leading-6 text-[var(--design-muted)] sm:text-base">
                  {translation.excerpt}
                </p>
              </button>

              {isOpen ? (
                <div className="border-t border-black/5 px-5 py-5 dark:border-white/10 sm:px-7 sm:py-6">
                  <div className="max-w-4xl space-y-4 text-sm leading-7 text-[var(--foreground)] sm:text-base">
                    {paragraphs.map((paragraph, index) => (
                      <p key={`${post.id}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}

        {items.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[color:var(--foreground)]/15 bg-[var(--header-bg)] px-5 py-8 text-center text-sm text-[var(--design-muted)]">
            {copy.empty}
          </div>
        ) : null}
      </section>
    </div>
  );
}
