import Image from "next/image";

import PageBottomSections from "@/app/components/common/page-bottom-sections";
import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import OptimizedImage from "@/app/components/shared/optimized-image";
import RelatedServicesSection from "@/app/components/services/related-services-section";
import { Link } from "@/i18n/navigation";
import { buildAbsoluteUrl } from "@/lib/seo";
import { buildServiceFaqSchema, buildServiceSeoContent } from "@/lib/service-seo";
import type { ServiceDefinition } from "@/lib/services";
import { TEAM_MEMBERS } from "@/lib/team-members";
import { getLocalizedTeamMember } from "@/lib/team-members-localized";
import { getLocalizedService } from "@/lib/services-localized";
import { repairMojibakeText } from "@/lib/text-encoding";

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
  const title = repairMojibakeText(localizedService.content.title);
  const description = repairMojibakeText(localizedService.content.description);
  const summary = repairMojibakeText(localizedService.content.summary);
  const deliverables = localizedService.content.deliverables.map((item) =>
    repairMojibakeText(item)
  );
  const seoContent = buildServiceSeoContent(service, locale);

  const specialists = service.specialistIds
    .map((id) => TEAM_MEMBERS.find((member) => member.id === id))
    .filter((member): member is (typeof TEAM_MEMBERS)[number] => Boolean(member))
    .map((member) => getLocalizedTeamMember(member, locale));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: summary,
    provider: {
      "@type": "Organization",
      name: "Creative Group",
    },
    url: buildAbsoluteUrl(locale, `/services/${service.slug}`),
  };
  const faqJsonLd = buildServiceFaqSchema(service, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-8 px-3 sm:gap-10 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-6">
          <Header />

          <section className="pb-10 pt-6 md:pb-14">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] md:items-start">
              <div>
                <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.1] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                  {description}
                </p>
              </div>

              <div className="rounded-[2rem] border border-zinc-200/70 bg-[var(--background)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:border-zinc-700/70">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--services-bg)]">
                  <Image
                    src={localizedService.icon}
                    alt={seoContent.imageAlt}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--design-muted)]">
                  {isRussian ? "Р§С‚Рѕ РІС…РѕРґРёС‚ РІ СѓСЃР»СѓРіСѓ" : "Included in the service"}
                </p>
                <ul className="mt-4 space-y-3">
                  {deliverables.map((item) => (
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
              {isRussian ? "РћР±Р·РѕСЂ" : "Overview"}
            </p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--foreground)] md:text-lg">
              {summary}
            </p>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-zinc-200/70 bg-[var(--background)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] dark:border-zinc-700/70 md:p-8">
            <div className="max-w-5xl space-y-5 text-base leading-8 text-[var(--foreground)] md:text-lg">
              {seoContent.blocks.map((block, index) => {
                if (block.type === "heading") {
                  if (block.level === 2) {
                    return (
                      <h2
                        key={`${block.text}-${index}`}
                        className="pt-3 text-3xl font-bold leading-tight text-[var(--foreground)] md:text-4xl"
                      >
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.level === 3) {
                    return (
                      <h3
                        key={`${block.text}-${index}`}
                        className="pt-2 text-2xl font-semibold leading-tight text-[var(--foreground)] md:text-3xl"
                      >
                        {block.text}
                      </h3>
                    );
                  }

                  return (
                    <h4
                      key={`${block.text}-${index}`}
                      className="text-xl font-semibold leading-tight text-[var(--foreground)]"
                    >
                      {block.text}
                    </h4>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={`list-${index}`} className="space-y-3">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3 text-base leading-7 text-[var(--design-text)]">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#9ab5f6]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={`${block.text}-${index}`} className="text-[var(--design-text)]">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {isRussian ? "РљРѕРјР°РЅРґР°" : "Team"}
              </p>
              <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                {isRussian ? "РЎРїРµС†РёР°Р»РёСЃС‚С‹ РїРѕ СѓСЃР»СѓРіРµ" : "Specialists for this service"}
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

        <section className="px-3 md:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[var(--services-bg)] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              {seoContent.faqHeading}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {seoContent.faq.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[1.5rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-5"
                >
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--design-text)] md:text-base">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <RelatedServicesSection
          currentServiceId={service.id}
          locale={locale}
          title={seoContent.similarHeading}
        />
        <PageBottomSections />
      </main>

      <Footer />
    </>
  );
}
