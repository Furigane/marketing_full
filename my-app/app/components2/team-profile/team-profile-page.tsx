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
  breadcrumbTeam: string;
  calculatorAlt: string;
  contactButtonLabel: string;
  featureIconAlt: string;
  image: string;
  imageAlt: string;
  intro: string;
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
  breadcrumbTeam,
  calculatorAlt,
  contactButtonLabel,
  featureIconAlt,
  image,
  imageAlt,
  intro,
  locale,
  name,
  otherSpecialists,
  profile,
  relatedServiceIds,
  role,
  socialLabels,
}: TeamProfilePageProps) {
  const isRussian = locale.toLowerCase().startsWith("ru");

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-8 px-3 sm:gap-10 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-6">
          <Header />

          <section className="relative pb-12 pt-6 md:pb-16">
            <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:gap-8">
              <div className="flex w-full justify-start md:w-[40%] md:flex-shrink-0">
                <OptimizedImage
                  src={image}
                  alt={imageAlt}
                  width={600}
                  height={600}
                  className="h-auto w-full max-w-[360px] rounded-[2rem] object-cover md:max-w-[500px]"
                />
              </div>

              <div className="w-full min-w-0 md:w-[46%] md:max-w-[800px]">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[var(--design-muted)]">
                  <span aria-hidden>{"\u2302"}</span>
                  <span aria-hidden>{"\u203A"}</span>
                  <span>{breadcrumbTeam}</span>
                  <span aria-hidden>{"\u203A"}</span>
                  <span className="font-semibold text-[var(--foreground)]">
                    {name}
                  </span>
                </div>

                <h1 className="mb-3 text-3xl font-extrabold leading-[1.15] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                  {name}
                  <br />
                  <span className="inline-block rounded-full bg-[var(--hero-span)] py-1 pl-3 pr-4 text-[var(--design-title)] sm:pl-4 sm:pr-4">
                    {role}
                  </span>
                </h1>

                <p className="mb-5 max-w-[620px] text-sm leading-7 text-[var(--design-text)] md:text-base">
                  {intro}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {achievementHighlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[color:var(--foreground)]/10 bg-[var(--background)] px-3 py-2 text-xs font-semibold text-[var(--foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href="/connect"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--design-btn)] px-6 py-3 text-base text-zinc-900 transition-colors duration-300 hover:bg-[var(--design-btn-hover)] dark:text-zinc-100"
                >
                  <Image
                    src="/svg/solar_calculator-broken.svg"
                    alt={calculatorAlt}
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                  {contactButtonLabel}
                </Link>
              </div>
            </div>

            <div className="mt-4 flex justify-end md:absolute md:bottom-4 md:right-0 md:mt-0">
              <div className="flex items-center gap-2">
                <Link
                  href="#"
                  aria-label={socialLabels.instagram}
                  className="grid place-items-center rounded-full text-[10px] text-white"
                >
                  <Image
                    src="/svg/Instagram_black.svg"
                    alt=""
                    width={30}
                    height={30}
                    className="dark:invert"
                  />
                </Link>
                <Link
                  href="#"
                  aria-label={socialLabels.telegram}
                  className="grid place-items-center rounded-full text-[10px] text-white"
                >
                  <Image
                    src="/svg/Telegram_black.svg"
                    alt=""
                    width={30}
                    height={30}
                    className="dark:invert"
                  />
                </Link>
                <Link
                  href="#"
                  aria-label={socialLabels.viber}
                  className="grid place-items-center rounded-full text-[10px] text-white"
                >
                  <Image
                    src="/svg/Viber_black.svg"
                    alt=""
                    width={30}
                    height={30}
                    className="dark:invert"
                  />
                </Link>
              </div>
            </div>
          </section>
        </TeamSurfaceHeaderSection>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[var(--services-bg)] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
              {isRussian ? "Кратко о роли" : "Role summary"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              {isRussian ? "Чем занимается этот специалист" : "What this specialist does"}
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--foreground)] md:text-lg">
              {activitySummary}
            </p>
          </div>
        </section>

        <section className="mt-2 p-4 [--card-radius:1.25rem] [--card-pad:1rem] [--title-size:1.5rem] [--title-lh:2rem] [--text-size:1.0625rem] [--text-lh:1.65rem] [--icon-size:1.5rem] md:p-6 md:[--card-pad:1.125rem] md:[--title-size:1.375rem] md:[--title-lh:1.85rem] md:[--text-size:0.9375rem] md:[--text-lh:1.55rem] md:[--icon-size:1.75rem]">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {profile.featureItems.map((item) => (
              <article
                key={item.title}
                className="relative rounded-[var(--card-radius)] border border-[var(--design-text)] bg-[var(--background)] p-[var(--card-pad)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              >
                <span className="absolute right-3 top-0 -translate-y-1/2 rounded-full bg-zinc-900 px-3 py-1 text-sm font-semibold text-[#f5d58d] dark:bg-zinc-100 dark:text-zinc-900">
                  {item.badge}
                </span>

                <div className="mb-4">
                  <Image
                    src="/svg/graph.svg"
                    alt={featureIconAlt}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain dark:invert"
                  />
                </div>

                <h2 className="font-['Manrope'] text-[length:var(--title-size)] font-bold leading-[var(--title-lh)] text-[var(--design-title)]">
                  {item.title}
                </h2>
                <p className="text-[length:var(--text-size)] leading-[var(--text-lh)] text-[var(--design-title)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 p-4 md:p-6">
          <h2 className="mb-6 text-center text-3xl font-bold text-[var(--design-title)] md:mb-10 md:text-4xl">
            {profile.detailTitle}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {profile.detailItems.map((item) => (
              <article key={item.title} className="border-l border-zinc-500 pl-3 md:pl-4">
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

        <section className="mt-2 p-4 md:p-6">
          <div className="rounded-[2rem] bg-[var(--services-bg)] p-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
              {isRussian ? "Навыки и услуги специалиста" : "Skills and services"}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--design-text)]">
              {isRussian
                ? "Ниже собраны направления, в которых этот специалист участвует внутри проектной команды. Это помогает поисковым системам и пользователю понять зону ответственности и экспертность."
                : "These linked services show where this specialist contributes inside the project team. They clarify expertise both for users and for search engines."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {relatedServiceIds.map((serviceId) => {
                const serviceDefinition = getServiceById(serviceId);
                if (!serviceDefinition) {
                  return null;
                }
                const service = getLocalizedService(serviceDefinition, locale);

                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#9ab5f6] hover:text-[#7c9ff7]"
                  >
                    {service.content.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {isRussian ? "Внутренняя перелинковка" : "Internal linking"}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)] md:text-3xl">
                {isRussian ? "Материалы, которые усиливают профиль" : "Links that strengthen this profile"}
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#9ab5f6]"
                >
                  {isRussian ? "Статьи и блог" : "Articles and blog"}
                </Link>
                <Link
                  href="/projects"
                  className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#9ab5f6]"
                >
                  {isRussian ? "Кейсы и портфолио" : "Case studies and portfolio"}
                </Link>
                <Link
                  href="/team"
                  className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#9ab5f6]"
                >
                  {isRussian ? "Вся команда" : "Full team"}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {isRussian ? "Другие специалисты" : "Other specialists"}
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
