import Image from "next/image";
import type { ReactNode } from "react";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import OptimizedImage from "@/app/components/shared/optimized-image";
import RelatedServicesSection from "@/app/components/services/related-services-section";
import { Link } from "@/i18n/navigation";
import type { ServiceId } from "@/lib/services";
import {
  getSpecialistServiceHref,
  type SpecialistProfile,
} from "@/lib/specialist-profiles";

type PeerSpecialist = {
  id: string;
  image: string;
  imageAlt: string;
  name: string;
  role: string;
};

type SpecialistProfilePageProps = {
  contactButtonLabel: string;
  labels: {
    ctaBadge: string;
    ctaDescription: string;
    ctaTitle: string;
    expertise: string;
    keyHighlights: string;
    otherSpecialists: string;
    profileBadge: string;
    servicesDescription: string;
    servicesTitle: string;
    skillsTitle: string;
    viewServices: string;
  };
  locale: string;
  otherSpecialists: PeerSpecialist[];
  profile: SpecialistProfile;
};

function renderLinkedText(text: string) {
  const nodes: ReactNode[] = [];
  const pattern = /<u>(.*?)<\/u>/g;
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const label = match[1];
    nodes.push(
      <Link
        key={`${label}-${match.index}`}
        href={getSpecialistServiceHref(label)}
        className="font-semibold text-[#7c9ff7] underline decoration-[#7c9ff7]/45 underline-offset-4 transition hover:text-[#5f84ea]"
      >
        {label}
      </Link>
    );

    lastIndex = match.index + match[0].length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function SpecialistProfilePage({
  contactButtonLabel,
  labels,
  locale,
  otherSpecialists,
  profile,
}: SpecialistProfilePageProps) {
  const hasOddSeoSections = profile.seoSections.length % 2 === 1;

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
                  <span className="inline-flex rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--design-muted)] backdrop-blur">
                    {labels.profileBadge}
                  </span>

                  <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                    {profile.h1}
                  </h1>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                    {profile.intro}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {profile.focusChips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/90 px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
                      >
                        {chip}
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
                        alt=""
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
                </div>

                <div className="relative">
                  <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)]/92 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur">
                    <div className="aspect-[4/4.15] overflow-hidden rounded-[1.5rem]">
                      <OptimizedImage
                        src={profile.image}
                        alt={profile.imageAlt}
                        width={840}
                        height={980}
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>

                    <div className="mt-3.5 grid grid-cols-3 gap-2 sm:gap-2.5">
                      {profile.highlightStats.map((item) => (
                        <div
                          key={item.label}
                          className="flex min-h-[84px] flex-col justify-between rounded-[1rem] border border-[color:var(--foreground)]/6 bg-[linear-gradient(180deg,var(--services-bg),color-mix(in_srgb,var(--services-bg)_88%,var(--background)))] px-2.5 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:min-h-[92px] sm:px-3 sm:py-3"
                        >
                          <p
                            className={`text-balance text-[8px] uppercase leading-[1.2] text-[var(--design-muted)] sm:text-[9px] ${
                              item.label.length > 12
                                ? "tracking-[0.08em]"
                                : "tracking-[0.15em]"
                            }`}
                          >
                            {item.label}
                          </p>
                          <p
                            className={`text-balance text-[0.88rem] font-bold leading-[1.05] text-[var(--foreground)] sm:text-[1.02rem] ${
                              locale === "ar" ? "text-[0.84rem] sm:text-[0.96rem]" : ""
                            }`}
                          >
                            {item.value}
                          </p>
                        </div>
                      ))}
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
                <p className="mt-4 text-base leading-8 text-[var(--foreground)] md:text-lg">
                  {profile.activitySummary}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                  {labels.keyHighlights}
                </p>
                <ul className="mt-4 space-y-3">
                  {profile.achievementHighlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-[var(--foreground)]">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#7c9ff7]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-2">
            {profile.seoSections.map((section, index) => (
              <article
                key={section.heading}
                className={`rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${
                  hasOddSeoSections && index === profile.seoSections.length - 1
                    ? "xl:col-span-2"
                    : ""
                }`}
              >
                <h2 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--design-text)] md:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
              <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
                {labels.skillsTitle}
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {profile.skills.map((skill) => (
                  <div
                    key={skill}
                    className="rounded-[1.25rem] bg-[var(--services-bg)] px-4 py-4 text-sm leading-7 text-[var(--foreground)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
              <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
                {labels.servicesTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--design-text)] md:text-base">
                {labels.servicesDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {profile.services.map((service) => (
                  <Link
                    key={service}
                    href={getSpecialistServiceHref(service)}
                    className="rounded-full border border-[color:var(--foreground)]/12 bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#7c9ff7] hover:text-[#5f84ea]"
                  >
                    {service}
                  </Link>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(124,159,247,0.14),rgba(245,212,140,0.16))] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                  {labels.ctaBadge}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                  {labels.ctaTitle}
                </h2>
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
          <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
              {labels.otherSpecialists}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        </section>

        <RelatedServicesSection
          locale={locale}
          serviceIds={profile.relatedServiceIds as ServiceId[]}
        />
        <PageBottomSections />
      </main>

      <Footer />
    </>
  );
}
