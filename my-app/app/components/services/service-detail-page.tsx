import Image from "next/image";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import OptimizedImage from "@/app/components/shared/optimized-image";
import RelatedServicesSection from "@/app/components/services/related-services-section";
import { Link } from "@/i18n/navigation";
import { TEAM_MEMBERS, getLocalizedTeamMember } from "@/lib/team-members";
import type { ServiceDefinition } from "@/lib/services";
import { getLocalizedService } from "@/lib/services-localized";

type ServiceDetailPageProps = {
  locale: string;
  service: ServiceDefinition;
};

export default async function ServiceDetailPage({
  locale,
  service,
}: ServiceDetailPageProps) {
  const isRussian = locale.toLowerCase().startsWith("ru");
  const localizedService = getLocalizedService(service, locale);

  const specialists = service.specialistIds
    .map((id) => TEAM_MEMBERS.find((member) => member.id === id))
    .filter((member): member is (typeof TEAM_MEMBERS)[number] => Boolean(member))
    .map((member) => getLocalizedTeamMember(member, locale));

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-8 px-3 sm:gap-10 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-6">
          <Header />

          <section className="pb-10 pt-6 md:pb-14">
            <div className="mb-4 flex items-center gap-2 text-sm text-[var(--design-muted)]">
                <span aria-hidden>{"\u2302"}</span>
                <span aria-hidden>{"\u203A"}</span>
                <span>{isRussian ? "Услуги" : "Services"}</span>
                <span aria-hidden>{"\u203A"}</span>
              <span className="font-semibold text-[var(--foreground)]">
                {localizedService.content.title}
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] md:items-start">
              <div>
                <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.1] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                  {localizedService.content.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                  {localizedService.content.description}
                </p>
              </div>

              <div className="rounded-[2rem] border border-zinc-200/70 bg-[var(--background)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:border-zinc-700/70">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--services-bg)]">
                  <Image
                    src={localizedService.icon}
                    alt={localizedService.content.title}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--design-muted)]">
                  {isRussian ? "Что входит в услугу" : "Included in the service"}
                </p>
                <ul className="mt-4 space-y-3">
                  {localizedService.content.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--design-text)] md:text-base">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#9ab5f6]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </TeamSurfaceHeaderSection>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[var(--services-bg)] p-5 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
              {isRussian ? "Обзор" : "Overview"}
            </p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--foreground)] md:text-lg">
              {localizedService.content.summary}
            </p>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {isRussian ? "Команда" : "Team"}
              </p>
              <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                {isRussian ? "Специалисты по услуге" : "Specialists for this service"}
              </h2>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {specialists.map((specialist) => (
              <Link
                key={specialist.id}
                href={`/team/${specialist.id}`}
                className="rounded-[1.75rem] border border-zinc-200/70 bg-[var(--background)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ab5f6] hover:shadow-[0_16px_40px_rgba(23,26,34,0.14)] dark:border-zinc-700/70"
              >
                <div className="relative mb-4 h-40 overflow-hidden rounded-[1.4rem]">
                  <OptimizedImage
                    src={specialist.image}
                    alt={specialist.imageAlt}
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">
                  {specialist.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--design-text)]">
                  {specialist.role}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <RelatedServicesSection currentServiceId={service.id} locale={locale} />
        <PageBottomSections />
      </main>

      <Footer />
    </>
  );
}
