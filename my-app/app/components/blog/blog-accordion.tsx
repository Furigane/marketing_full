"use client";

import { getPostTranslation, type BlogPost } from "@/lib/blog";
import { Link } from "@/i18n/navigation";

const LOCALE_COPY = {
  ru: {
    title: "Блог",
    subtitle: "Статьи по услугам, контенту, SEO и маркетинговой системе бизнеса.",
    readMore: "Читать статью",
    empty: "Пока нет опубликованных статей.",
  },
  en: {
    title: "Blog",
    subtitle: "Articles about services, SEO, content systems, and performance marketing.",
    readMore: "Read article",
    empty: "No published articles yet.",
  },
  fr: {
    title: "Blog",
    subtitle: "Articles sur les services, le SEO, le contenu et le marketing de performance.",
    readMore: "Lire l’article",
    empty: "Aucun article publié pour le moment.",
  },
  de: {
    title: "Blog",
    subtitle: "Artikel über Leistungen, SEO, Content-Systeme und Performance-Marketing.",
    readMore: "Artikel lesen",
    empty: "Noch keine veröffentlichten Artikel.",
  },
  ar: {
    title: "المدونة",
    subtitle: "مقالات عن الخدمات وSEO والمحتوى ونظام التسويق الرقمي.",
    readMore: "قراءة المقال",
    empty: "لا توجد مقالات منشورة بعد.",
  },
} as const;

export function BlogAccordion({ posts, locale }: { posts: BlogPost[]; locale: string }) {
  const copy = LOCALE_COPY[(locale in LOCALE_COPY ? locale : "ru") as keyof typeof LOCALE_COPY];

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

      <section className="grid gap-4">
        {posts.map((post) => {
          const translation = getPostTranslation(post, locale);

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block overflow-hidden rounded-[28px] border border-black/5 bg-[var(--header-bg)] px-5 py-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 sm:px-7 sm:py-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {new Intl.DateTimeFormat(locale === "ar" ? "ar" : locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(post.publishedAt))}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)]">{translation.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--design-muted)] sm:text-base">
                {translation.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7c9ff7]">
                {copy.readMore} <span aria-hidden>{"\u2197"}</span>
              </span>
            </Link>
          );
        })}

        {posts.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[color:var(--foreground)]/15 bg-[var(--header-bg)] px-5 py-8 text-center text-sm text-[var(--design-muted)]">
            {copy.empty}
          </div>
        ) : null}
      </section>
    </div>
  );
}
