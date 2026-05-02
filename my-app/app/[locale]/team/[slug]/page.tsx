import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import TeamProfilePage from "@/app/components2/team-profile/team-profile-page";
import { getTeamProfileContent } from "@/lib/team-profiles";
import {
  TEAM_MEMBERS,
  getLocalizedTeamMember,
  getTeamMember,
} from "@/lib/team-members";
import { buildMetaDescription, buildMetaTitle, isRussianLocale } from "@/lib/seo";
import type { ServiceId } from "@/lib/services";

const RELATED_SERVICES_BY_ROLE: Record<string, ServiceId[]> = {
  designer: ["adCreatives", "uxUiDesign", "brandIdentity"],
  targeting: ["targetedMetaVkTiktok", "contextGoogleYandex", "analyticsSetup"],
  smm: ["smmManagement", "influencerAds", "videoProduction"],
  seo: ["seoPromotion", "localSeo", "copywriting"],
  manager: ["corporateWebsite", "crmAutomation", "analyticsSetup"],
  content: ["copywriting", "emailMarketing", "smmManagement"],
};

export function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({ slug: member.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    return {};
  }

  const localizedMember = getLocalizedTeamMember(member, locale);
  const isRussian = isRussianLocale(locale);

  return {
    title: buildMetaTitle(
      isRussian
        ? `${localizedMember.name} — ${localizedMember.role}`
        : `${localizedMember.name} — ${localizedMember.role}`,
      "Creative Group"
    ),
    description: buildMetaDescription(localizedMember.metaDescription),
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    notFound();
  }

  const [tDesign, tFeatures] = await Promise.all([
    getTranslations({ locale, namespace: "design" }),
    getTranslations({ locale, namespace: "features" }),
  ]);

  const localizedMember = getLocalizedTeamMember(member, locale);
  const relatedServiceIds =
    RELATED_SERVICES_BY_ROLE[member.roleType] ?? RELATED_SERVICES_BY_ROLE.manager;
  const otherSpecialists = TEAM_MEMBERS.filter((item) => item.id !== member.id)
    .slice(0, 4)
    .map((item) => getLocalizedTeamMember(item, locale));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: localizedMember.name,
    jobTitle: localizedMember.role,
    description: localizedMember.metaDescription,
    image: localizedMember.image,
    worksFor: {
      "@type": "Organization",
      name: "Creative Group",
    },
    knowsAbout: relatedServiceIds,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TeamProfilePage
        activitySummary={localizedMember.activitySummary}
        achievementHighlights={localizedMember.achievementHighlights}
        breadcrumbTeam={tDesign("breadcrumbTeam")}
        calculatorAlt={tDesign("calculatorAlt")}
        contactButtonLabel={tDesign("contactButton")}
        featureIconAlt={tFeatures("iconAlt")}
        image={member.image}
        imageAlt={localizedMember.imageAlt}
        intro={localizedMember.intro}
        locale={locale}
        name={localizedMember.name}
        otherSpecialists={otherSpecialists}
        profile={getTeamProfileContent(locale, member.roleType)}
        relatedServiceIds={relatedServiceIds}
        role={localizedMember.role}
        socialLabels={{
          instagram: tDesign("socialInstagram"),
          telegram: tDesign("socialTelegram"),
          viber: tDesign("socialViber"),
        }}
      />
    </>
  );
}
