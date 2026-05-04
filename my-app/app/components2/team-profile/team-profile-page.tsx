import Image from "next/image";
import { Link } from "@/i18n/navigation";

import Header from "@/app/components/headaer/header";
import Footer from "@/app/components/footer/footer";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import OptimizedImage from "@/app/components/shared/optimized-image";
import RelatedServicesSection from "@/app/components/services/related-services-section";
import { getServiceById, type ServiceId } from "@/lib/services";
import { getLocalizedService } from "@/lib/services-localized";
import type { TeamProfileContent } from "@/lib/team-profiles";

type PeerSpecialist = {
  id: string;
  image: string;
  imageAlt: string;
  name: string;
  role: string;
};

type TeamProfilePageProps = {
  activitySummary: string;
  achievementHighlights: readonly string[];
  calculatorAlt: string;
  contactButtonLabel: string;
  featureIconAlt: string;
  image: string;
  imageAlt: string;
  intro: string;
  labels: {
    approach: string;
    articlesAndBlog: string;
    casesAndPortfolio: string;
    ctaBadge: string;
    ctaDescription: string;
    ctaTitle: string;
    expertise: string;
    focus: string;
    fullTeam: string;
    internalLinking: string;
    nextStep: string;
    otherSpecialists: string;
    relatedSiteSections: string;
    servicesDescription: string;
    servicesLabel: string;
    servicesTitle: string;
    track: string;
    viewServices: string;
  };
  locale: string;
  name: string;
  otherSpecialists: PeerSpecialist[];
  profile: TeamProfileContent;
  relatedServiceIds: ServiceId[];
  role: string;
  socialLabels: {
    instagram: string;
    telegram: string;
    viber: string;
  };
};

export default function TeamProfilePage({
  activitySummary,
  achievementHighlights,
  calculatorAlt,
  contactButtonLabel,
  featureIconAlt,
  image,
  imageAlt,
  intro,
  labels,
  locale,
  name,
  otherSpecialists,
  profile,
  relatedServiceIds,
  role,
  socialLabels,
}: TeamProfilePageProps) {
  const relatedServices = relatedServiceIds
    .map((serviceId) => getServiceById(serviceId))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .map((service) => getLocalizedService(service, locale));

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-8 px-3 sm:gap-10 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-6">
          <Header />

          <section className="pb-12 pt-6 md:pb-16">
            <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[linear-gradient(135deg,rgba(245,212,140,0.18),transparent_35%),linear-gradient(220deg,rgba(124,159,247,0.18),transparent_48%),var(--workers-bg)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.14)] md:p-8 lg:p-10">
              <div className="absolute -right-16 top-0 h-52 w-52 rounded-full bg-[#acc2fd]/20 blur-3xl" />
              <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-[#f5d48c]/20 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_420px] lg:items-center">
                <div>
                  <span className="mt-4 inline-flex rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--design-muted)] backdrop-blur">
                    {profile.titleHighlight}
                  </span>

                  <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                    {name}
                    <span className="mt-2 block text-[#7c9ff7]">{role}</span>
                  </h1>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                    {intro}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {achievementHighlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/90 px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--design-btn)] px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-[var(--design-btn-hover)] dark:text-zinc-100"
                    >
                      <Image
                        src="/svg/solar_calculator-broken.svg"
                        alt={calculatorAlt}
                        width={18}
                        height={18}
                        className="dark:invert"
                      />
                      {contactButtonLabel}
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/85 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#7c9ff7]"
                    >
                      {labels.viewServices}
                    </Link>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      href="#"
                      aria-label={socialLabels.instagram}
                      className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/85 transition hover:border-[#7c9ff7]"
                    >
                      <Image
                        src="/svg/Instagram_black.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="dark:invert"
                      />
                    </Link>
                    <Link
                      href="#"
                      aria-label={socialLabels.telegram}
                      className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/85 transition hover:border-[#7c9ff7]"
                    >
                      <Image
                        src="/svg/Telegram_black.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="dark:invert"
                      />
                    </Link>
                    <Link
                      href="#"
                      aria-label={socialLabels.viber}
                      className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/85 transition hover:border-[#7c9ff7]"
                    >
                      <Image
                        src="/svg/Viber_black.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="dark:invert"
                      />
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)]/92 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur">
                    <div className="aspect-[4/4.65] overflow-hidden rounded-[1.5rem]">
                      <OptimizedImage
                        src={image}
                        alt={imageAlt}
                        width={840}
                        height={980}
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="rounded-[1.2rem] bg-[var(--services-bg)] px-3 py-4 text-center">
                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--design-muted)]">
                          {labels.track}
                        </p>
                        <p className="mt-2 text-sm font-bold text-[var(--foreground)]">
                          {profile.titleHighlight}
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] bg-[var(--services-bg)] px-3 py-4 text-center">
                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--design-muted)]">
                          {labels.focus}
                        </p>
                        <p className="mt-2 text-sm font-bold text-[var(--foreground)]">
                          {profile.titleSecondLine}
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] bg-[var(--services-bg)] px-3 py-4 text-center">
                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--design-muted)]">
                          {labels.servicesLabel}
                        </p>
                        <p className="mt-2 text-lg font-bold text-[var(--foreground)]">
                          {relatedServices.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TeamSurfaceHeaderSection>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[var(--services-bg)] p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                  {labels.expertise}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                  {profile.detailTitle}
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--foreground)] md:text-lg">
                  {activitySummary}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                  {labels.approach}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground)] md:text-base">
                  {profile.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {profile.featureItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
              >
                <span className="inline-flex rounded-full bg-[var(--services-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#7c9ff7]">
                  {item.badge}
                </span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--services-bg)]">
                  <Image
                    src="/svg/graph.svg"
                    alt={featureIconAlt}
                    width={24}
                    height={24}
                    className="dark:invert"
                  />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-[var(--foreground)]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--design-text)] md:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-2">
            {profile.detailItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
              >
                <h2 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-8 text-[var(--design-text)] md:text-base">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
              <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
                {labels.servicesTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--design-text)] md:text-base">
                {labels.servicesDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {relatedServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#7c9ff7] hover:text-[#5f84ea]"
                  >
                    {service.content.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
              <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
                {labels.nextStep}
              </h2>
              <div className="mt-5 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(124,159,247,0.14),rgba(245,212,140,0.16))] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                  {labels.ctaBadge}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                  {labels.ctaTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)] md:text-base">
                  {labels.ctaDescription}
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:opacity-90"
                >
                  {contactButtonLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {labels.internalLinking}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)] md:text-3xl">
                {labels.relatedSiteSections}
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#7c9ff7]"
                >
                  {labels.articlesAndBlog}
                </Link>
                <Link
                  href="/projects"
                  className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#7c9ff7]"
                >
                  {labels.casesAndPortfolio}
                </Link>
                <Link
                  href="/team"
                  className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#7c9ff7]"
                >
                  {labels.fullTeam}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {labels.otherSpecialists}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {otherSpecialists.map((specialist) => (
                  <Link
                    key={specialist.id}
                    href={`/team/${specialist.id}`}
                    className="flex items-center gap-3 rounded-[1.25rem] bg-[var(--services-bg)] p-3 transition hover:-translate-y-0.5"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                      <OptimizedImage
                        src={specialist.image}
                        alt={specialist.imageAlt}
                        width={200}
                        height={200}
                        sizes="56px"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                        {specialist.name}
                      </p>
                      <p className="truncate text-xs text-[var(--design-text)]">
                        {specialist.role}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <RelatedServicesSection locale={locale} serviceIds={relatedServiceIds} />
        <PageBottomSections />
      </main>

      <Footer />
    </>
  );
}
