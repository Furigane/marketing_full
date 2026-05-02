import type { Metadata } from "next";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import OptimizedImage from "@/app/components/shared/optimized-image";
import { Link } from "@/i18n/navigation";
import {
  SPECIALIST_PROFILES,
  getLocalizedSpecialistProfile,
} from "@/lib/specialist-profiles";
import { TEAM_MEMBERS, getLocalizedTeamMember } from "@/lib/team-members";
import { buildMetaDescription, buildMetaTitle, isRussianLocale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRussian = isRussianLocale(locale);

  return {
    title: buildMetaTitle(
      isRussian ? "Специалисты агентства" : "Agency specialists",
      "Creative Group"
    ),
    description: buildMetaDescription(
      isRussian
        ? "Список специалистов агентства с SEO-структурой: специализация, опыт, услуги и страницы с доказательством экспертности."
        : "Agency specialist directory with SEO-focused profiles, services, experience, and proof-driven expertise pages."
    ),
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRussian = isRussianLocale(locale);
  const specialists = [
    ...SPECIALIST_PROFILES.map((profile) => {
      const localizedProfile = getLocalizedSpecialistProfile(profile, locale) ?? profile;
      return {
        id: localizedProfile.slug,
        image: localizedProfile.image,
        imageAlt: localizedProfile.imageAlt,
        name: localizedProfile.name,
        role: localizedProfile.role,
        experience: localizedProfile.experience,
        intro: localizedProfile.intro,
        achievementHighlights: localizedProfile.achievementHighlights,
      };
    }),
    ...TEAM_MEMBERS.filter(
      (member) => !SPECIALIST_PROFILES.some((profile) => profile.slug === member.id)
    ).map((member) => getLocalizedTeamMember(member, locale)),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isRussian ? "Специалисты агентства" : "Agency specialists",
    hasPart: specialists.map((specialist) => ({
      "@type": "Person",
      name: specialist.name,
      jobTitle: specialist.role,
      url: `/team/${specialist.id}`,
    })),
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
            <div className="relative overflow-hidden rounded-[36px] border border-[color:var(--foreground)]/10 bg-[linear-gradient(135deg,rgba(245,212,140,0.14),transparent_36%),linear-gradient(220deg,rgba(172,194,253,0.18),transparent_44%),var(--workers-bg)] px-5 py-7 shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:px-7 sm:py-8 lg:px-8 lg:py-10">
              <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-[#acc2fd]/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#f2d48c]/15 blur-3xl" />

              <div className="relative max-w-5xl">
                <span className="inline-flex rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--design-muted)] backdrop-blur">
                  {isRussian ? "Экспертная команда" : "Expert team"}
                </span>

                <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[0.98] tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl md:text-6xl">
                  {isRussian
                    ? "Специалисты агентства с понятной специализацией и реальной зоной ответственности"
                    : "Agency specialists with clear expertise and real delivery ownership"}
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                  {isRussian
                    ? "На этой странице собраны профили специалистов: имя, ключевая специализация, опыт, услуги и короткое описание того, чем именно человек занимается в проектной команде."
                    : "This page lists the agency specialists with their key specialization, experience, related services, and a concise explanation of what they actually do inside delivery."}
                </p>
              </div>
            </div>
          </section>
        </TeamSurfaceHeaderSection>

        <section className="px-3 pb-2 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {specialists.map((specialist) => (
              <Link
                key={specialist.id}
                href={`/team/${specialist.id}`}
                className="group rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-1.5 hover:border-[#acc2fd]/35 hover:shadow-[0_28px_90px_rgba(15,23,42,0.16)]"
              >
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[1.6rem]">
                  <OptimizedImage
                    src={specialist.image}
                    alt={specialist.imageAlt}
                    width={900}
                    height={700}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--design-muted)]">
                  {specialist.experience}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
                  {specialist.name}
                </h2>
                <p className="mt-2 text-base font-semibold text-[#7c9ff7]">
                  {specialist.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--design-text)]">
                  {specialist.intro}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {specialist.achievementHighlights.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[var(--services-bg)] px-3 py-2 text-xs font-semibold text-[var(--foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#acc2fd] px-4 py-2 text-sm font-semibold text-zinc-900">
                  <span>{isRussian ? "Открыть профиль" : "Open profile"}</span>
                  <span aria-hidden>{"\u2197"}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <PageBottomSections />
      </main>
      <Footer />
    </>
  );
}
