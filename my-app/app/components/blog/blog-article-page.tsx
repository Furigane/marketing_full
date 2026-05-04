import PageBottomSections from "@/app/components/common/page-bottom-sections";
import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import RelatedServicesSection from "@/app/components/services/related-services-section";
import { Link } from "@/i18n/navigation";
import {
  getPostTranslation,
  getRelatedServiceIdsFromPost,
  parseBlogContent,
  type BlogPost,
} from "@/lib/blog";
import { buildAbsoluteUrl } from "@/lib/seo";
import { normalizeSiteLocale } from "@/lib/site-locales";

type BlogArticlePageProps = {
  locale: string;
  post: BlogPost;
  relatedPosts: BlogPost[];
};

const ARTICLE_COPY = {
  ru: {
    relatedLabel: "Статьи",
    readNext: "Читайте также",
    dateLocale: "ru-RU",
  },
  en: {
    relatedLabel: "Articles",
    readNext: "Read next",
    dateLocale: "en-US",
  },
  fr: {
    relatedLabel: "Articles",
    readNext: "Lire aussi",
    dateLocale: "fr-FR",
  },
  de: {
    relatedLabel: "Artikel",
    readNext: "Weiterlesen",
    dateLocale: "de-DE",
  },
  ar: {
    relatedLabel: "مقالات",
    readNext: "اقرأ أيضاً",
    dateLocale: "ar",
  },
} as const;

export default function BlogArticlePage({
  locale,
  post,
  relatedPosts,
}: BlogArticlePageProps) {
  const normalizedLocale = normalizeSiteLocale(locale);
  const copy = ARTICLE_COPY[normalizedLocale];
  const translation = getPostTranslation(post, locale);
  const blocks = parseBlogContent(translation.content);
  const relatedServiceIds = getRelatedServiceIdsFromPost(post, locale);
  const relatedArticles = relatedPosts.map((item) => ({
    slug: item.slug,
    translation: getPostTranslation(item, locale),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: translation.title,
    description: translation.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: buildAbsoluteUrl(locale, `/blog/${post.slug}`),
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "Creative Group",
    },
    publisher: {
      "@type": "Organization",
      name: "Creative Group",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-4">
          <Header />
          <section className="pb-10 pt-6 md:pt-8">
            <div className="mt-5 max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--design-muted)]">
                {new Intl.DateTimeFormat(copy.dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(post.publishedAt))}
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-[1.05] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                {translation.title}
              </h1>
              <p className="mt-5 text-base leading-8 text-[var(--design-text)] md:text-lg">
                {translation.excerpt}
              </p>
            </div>
          </section>
        </TeamSurfaceHeaderSection>

        <article className="w-full px-1 pb-2 md:px-2">
          <div className="rounded-[2rem] bg-[var(--header-bg)] px-5 py-6 shadow-sm sm:px-8 sm:py-8">
            <div className="space-y-5 text-base leading-8 text-[var(--foreground)] md:text-lg">
              {blocks.map((block, index) => {
                if (block.type === "heading") {
                  if (block.level === 2) {
                    return (
                      <h2
                        key={`${block.text}-${index}`}
                        className="pt-4 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
                      >
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.level === 3) {
                    return (
                      <h3
                        key={`${block.text}-${index}`}
                        className="pt-2 text-xl font-semibold leading-tight text-[var(--foreground)] md:text-2xl"
                      >
                        {block.text}
                      </h3>
                    );
                  }

                  return (
                    <h4
                      key={`${block.text}-${index}`}
                      className="text-lg font-semibold leading-tight text-[var(--foreground)]"
                    >
                      {block.text}
                    </h4>
                  );
                }

                return (
                  <p key={`${block.text}-${index}`}>
                    {block.parts.map((part, partIndex) =>
                      part.type === "text" ? (
                        <span key={`${part.text}-${partIndex}`}>{part.text}</span>
                      ) : (
                        <Link
                          key={`${part.serviceId}-${partIndex}`}
                          href={`/services/${part.slug}`}
                          className="font-semibold text-[#7c9ff7] underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                        >
                          {part.label}
                        </Link>
                      )
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 ? (
          <section className="px-3 py-4 md:px-6 lg:px-8">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {copy.relatedLabel}
              </p>
              <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                {copy.readNext}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="rounded-[1.75rem] border border-zinc-200/70 bg-[var(--header-bg)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ab5f6] hover:shadow-[0_16px_40px_rgba(23,26,34,0.14)] dark:border-zinc-700/70"
                >
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {item.translation.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--design-text)]">
                    {item.translation.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <RelatedServicesSection locale={locale} serviceIds={relatedServiceIds} />
        <PageBottomSections />
      </main>
      <Footer />
    </>
  );
}
