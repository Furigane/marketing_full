import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import RelatedServicesSection from "@/app/components/services/related-services-section";
import { Link } from "@/i18n/navigation";
import {
  getPostTranslation,
  getRelatedServiceIdsFromPost,
  parseBlogContent,
  type BlogPost,
} from "@/lib/blog";
import { isRussianLocale } from "@/lib/seo";

type BlogArticlePageProps = {
  locale: string;
  post: BlogPost;
};

export default function BlogArticlePage({ locale, post }: BlogArticlePageProps) {
  const isRussian = isRussianLocale(locale);
  const translation = getPostTranslation(post, locale);
  const blocks = parseBlogContent(translation.content);
  const relatedServiceIds = getRelatedServiceIdsFromPost(post, locale);

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-4">
          <Header />
          <section className="pb-10 pt-6 md:pt-8">
            <div className="flex items-center gap-2 text-sm text-[var(--design-muted)]">
              <span aria-hidden>{"\u2302"}</span>
              <span aria-hidden>{"\u203A"}</span>
              <Link href="/blog" className="transition-colors hover:text-[var(--foreground)]">
                {isRussian ? "Блог" : "Blog"}
              </Link>
              <span aria-hidden>{"\u203A"}</span>
              <span className="font-semibold text-[var(--foreground)]">{translation.title}</span>
            </div>

            <div className="mt-5 max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--design-muted)]">
                {new Intl.DateTimeFormat(isRussian ? "ru-RU" : "en-US", {
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

        <article className="px-1 pb-2 md:px-2">
          <div className="rounded-[2rem] bg-[var(--header-bg)] px-5 py-6 shadow-sm sm:px-8 sm:py-8">
            <div className="max-w-4xl space-y-5 text-base leading-8 text-[var(--foreground)] md:text-lg">
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

        <RelatedServicesSection locale={locale} serviceIds={relatedServiceIds} />
        <PageBottomSections />
      </main>
      <Footer />
    </>
  );
}
