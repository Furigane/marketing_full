"use client";

import { getPostTranslation, type BlogPost } from "@/lib/blog";
import { getAnnualContentPlan, getBlogSeoCopy, getTopicClusters } from "@/lib/blog-seo";
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
  const seoCopy = getBlogSeoCopy(locale);
  const clusters = getTopicClusters(locale);
  const annualPlan = getAnnualContentPlan(locale);

  return (
    <div className="flex w-full flex-col gap-6 px-3 pb-12 pt-3 sm:gap-8 sm:px-4 md:px-6">
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

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
        <div className="rounded-[28px] bg-[var(--header-bg)] px-5 py-6 shadow-sm sm:px-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--design-muted)]">
            {seoCopy.section}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            {seoCopy.section}
          </h2>
          <div className="mt-5 grid gap-4">
            {clusters.map((cluster) => (
              <article
                key={cluster.title}
                className="rounded-[24px] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-5 sm:px-7 sm:py-6"
              >
                <h3 className="text-xl font-semibold text-[var(--foreground)]">
                  {cluster.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--design-muted)] sm:text-base">
                  {cluster.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--foreground)]">
                  {cluster.articleIdeas.map((idea) => (
                    <li key={idea} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#7c9ff7]" />
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-[var(--team-surface)] px-5 py-6 shadow-sm sm:px-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--design-muted)]">
            {seoCopy.plan}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            {seoCopy.plan}
          </h2>
          <div className="mt-5 space-y-3">
            {annualPlan.map((item) => (
              <article
                key={`${item.month}-${item.title}`}
                className="rounded-[20px] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--design-muted)]">
                  {item.quarter} • {item.month} • {item.intent}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)] sm:text-base">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
