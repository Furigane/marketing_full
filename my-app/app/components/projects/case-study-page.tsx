import { getTranslations } from "next-intl/server";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import OptimizedImage from "@/app/components/shared/optimized-image";
import RelatedServicesSection from "@/app/components/services/related-services-section";
import { Link } from "@/i18n/navigation";
import { getLocalizedCaseStudy, type CaseStudyDefinition } from "@/lib/case-studies";
import { TEAM_MEMBERS } from "@/lib/team-members";
import { getLocalizedTeamMember } from "@/lib/team-members-localized";

type CaseStudyPageProps = {
  caseStudy: CaseStudyDefinition;
  locale: string;
};

export default async function CaseStudyPage({
  caseStudy,
  locale,
}: CaseStudyPageProps) {
  const t = await getTranslations({ locale, namespace: "caseStudyPage" });
  const localizedCaseStudy = getLocalizedCaseStudy(caseStudy, locale);

  const proofAnalytics = t.raw(`proof.${caseStudy.id}.analytics`);
  const proofItems = Array.isArray(proofAnalytics) ? proofAnalytics.map(String) : [];
  const reviewAuthor = t(`proof.${caseStudy.id}.author`);
  const reviewQuote = t(`proof.${caseStudy.id}.quote`);

  const specialists = caseStudy.specialistIds
    .map((id) => TEAM_MEMBERS.find((member) => member.id === id))
    .filter((member): member is (typeof TEAM_MEMBERS)[number] => Boolean(member))
    .map((member) => getLocalizedTeamMember(member, locale));

  const storyBlocks = [
    {
      badge: t("story.before"),
      title:
        localizedCaseStudy.content.detailItems[0]?.title ??
        t("fallbacks.initialState"),
      body:
        localizedCaseStudy.content.detailItems[0]?.body ??
        localizedCaseStudy.content.heroDescription,
    },
    {
      badge: t("story.whatWeDid"),
      title:
        localizedCaseStudy.content.detailItems[1]?.title ??
        t("fallbacks.approach"),
      body: [
        localizedCaseStudy.content.detailItems[1]?.body,
        localizedCaseStudy.content.detailItems[2]?.body,
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      badge: t("story.after"),
      title:
        localizedCaseStudy.content.detailItems[3]?.title ??
        t("fallbacks.result"),
      body:
        localizedCaseStudy.content.detailItems[3]?.body ??
        localizedCaseStudy.content.heroDescription,
    },
  ];

  const eeatItems = [
    {
      title: t("eeat.experience.title"),
      body: t("eeat.experience.body"),
    },
    {
      title: t("eeat.expertise.title"),
      body: t("eeat.expertise.body"),
    },
    {
      title: t("eeat.authoritativeness.title"),
      body: t("eeat.authoritativeness.body"),
    },
    {
      title: t("eeat.trust.title"),
      body: t("eeat.trust.body"),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${localizedCaseStudy.content.card.title} - ${localizedCaseStudy.content.heroHighlight} ${localizedCaseStudy.content.heroMetric}`,
    description: localizedCaseStudy.content.heroDescription,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "Creative Group",
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: reviewAuthor,
      },
      reviewBody: reviewQuote,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-8 px-3 sm:gap-10 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-6">
          <Header />

          <section className="relative pb-10 pt-6 md:pb-14">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="hidden items-center gap-2 text-sm text-[var(--design-muted)]">
                <span aria-hidden>{"\u2302"}</span>
                <span aria-hidden>{"\u203A"}</span>
                <span>{t("breadcrumbProjects")}</span>
                <span aria-hidden>{"\u203A"}</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {localizedCaseStudy.content.card.title}
                </span>
              </div>

              <span className="rounded-full bg-zinc-900 px-4 py-1 text-sm font-semibold text-[#f5d58d]">
                {localizedCaseStudy.content.heroBadge}
              </span>
            </div>

            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.9fr)] md:items-center">
              <div>
                <h1 className="text-3xl font-extrabold leading-[1.1] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                  {localizedCaseStudy.content.card.title}
                  <br />
                  <span className="inline-block rounded-full bg-[var(--hero-span)] px-4 py-1 text-[var(--design-title)]">
                    {localizedCaseStudy.content.heroHighlight}
                  </span>{" "}
                  {localizedCaseStudy.content.heroMetric}
                </h1>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--design-muted)]">
                  {localizedCaseStudy.content.heroSubtitle}
                </p>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                  {localizedCaseStudy.content.heroDescription}
                </p>
                <div className="mt-6 rounded-[1.5rem] bg-[var(--background)] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <span className="text-sm text-[var(--design-muted)]">
                    {t("budget")}
                  </span>
                  <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                    {localizedCaseStudy.content.card.price}
                  </p>
                </div>
              </div>

              <div className="relative h-[320px] overflow-hidden rounded-[2rem] md:h-[420px]">
                <OptimizedImage
                  src={caseStudy.image}
                  alt={t("imageAlt", { title: localizedCaseStudy.content.card.title })}
                  width={1200}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        </TeamSurfaceHeaderSection>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
              {t("structureLabel")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              {t("structureTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {storyBlocks.map((item) => (
              <article
                key={item.badge}
                className="rounded-[1.75rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              >
                <span className="inline-flex rounded-full bg-[#f2d48c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-900">
                  {item.badge}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--design-text)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-2 px-3 py-4 [--card-radius:1.25rem] [--card-pad:1rem] md:px-6 md:py-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {localizedCaseStudy.content.resultItems.map((item) => (
              <article
                key={item.title}
                className="relative rounded-[var(--card-radius)] border border-[var(--design-text)] bg-[var(--background)] p-[var(--card-pad)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              >
                <span className="absolute right-3 top-0 -translate-y-1/2 rounded-full bg-zinc-900 px-3 py-1 text-sm font-semibold text-[#f5d58d] dark:bg-zinc-100 dark:text-zinc-900">
                  {item.badge}
                </span>
                <h2 className="mt-4 text-xl font-bold text-[var(--design-title)]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--design-title)] md:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] px-3 py-2 md:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            {localizedCaseStudy.content.detailTitle}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {localizedCaseStudy.content.detailItems.map((item) => (
              <article key={item.title} className="border-l border-zinc-500 pl-4">
                <h3 className="mb-3 text-xl font-bold text-[var(--design-title)] md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-base leading-7 text-[var(--design-title)] md:text-lg md:leading-8">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-[2rem] bg-[var(--services-bg)] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {t("proofLabel")}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                {t("proofTitle")}
              </h2>
              <ul className="mt-5 space-y-3">
                {proofItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[var(--design-text)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#9ab5f6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-[var(--design-muted)]">
                {t("proofNote")}
              </p>
            </div>

            <aside className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {t("clientReview")}
              </p>
              <blockquote className="mt-4 text-lg leading-8 text-[var(--foreground)]">
                {"\u201c"}
                {reviewQuote}
                {"\u201d"}
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-[var(--design-text)]">
                {reviewAuthor}
              </p>
            </aside>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
              E-E-A-T
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              {t("eeatTitle")}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {eeatItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] bg-[var(--services-bg)] p-5"
                >
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--design-text)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            {t("specialistsTitle")}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {specialists.map((specialist) => (
              <Link
                key={specialist.id}
                href={`/team/${specialist.id}`}
                className="rounded-[1.75rem] border border-zinc-200/70 bg-[var(--background)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ab5f6] hover:shadow-[0_16px_40px_rgba(23,26,34,0.14)] dark:border-zinc-700/70"
              >
                <div className="relative mb-4 h-48 overflow-hidden rounded-[1.4rem] md:h-52">
                  <OptimizedImage
                    src={specialist.image}
                    alt={specialist.imageAlt}
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {specialist.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--design-text)]">
                  {specialist.role}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            {t("analyticsTitle")}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {caseStudy.galleryImages.map((src, index) => (
              <article
                key={`${src}-${index}`}
                className={`relative overflow-hidden rounded-[1.75rem] bg-zinc-200 ${
                  index === 0 ? "col-span-2 row-span-2 min-h-[280px] md:min-h-[420px]" : "min-h-[180px] md:min-h-[200px]"
                }`}
              >
                <OptimizedImage
                  src={src}
                  alt={t("growthVisualAlt", {
                    title: localizedCaseStudy.content.card.title,
                    index: index + 1,
                  })}
                  width={1200}
                  height={900}
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  className="h-full w-full object-cover"
                />
              </article>
            ))}
          </div>
        </section>

        <RelatedServicesSection
          locale={locale}
          serviceIds={caseStudy.relatedServiceIds}
          title={t("relatedServicesTitle")}
        />
        <PageBottomSections />
      </main>

      <Footer />
    </>
  );
}
