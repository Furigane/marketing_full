import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import TeamProfilePage from "@/app/components2/team-profile/team-profile-page";
import SpecialistProfilePage from "@/app/components/team/specialist-profile-page";
import { getTeamProfileContent } from "@/lib/team-profiles";
import {
  SPECIALIST_PROFILES,
  getLocalizedSpecialistProfile,
} from "@/lib/specialist-profiles";
import {
  TEAM_MEMBERS,
  getTeamMember,
} from "@/lib/team-members";
import { getLocalizedTeamMember } from "@/lib/team-members-localized";
import { buildMetaDescription, buildMetaTitle } from "@/lib/seo";
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
  const slugs = new Set([
    ...TEAM_MEMBERS.map((member) => member.id),
    ...SPECIALIST_PROFILES.map((profile) => profile.slug),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const specialistProfile = getLocalizedSpecialistProfile(slug, locale);

  if (specialistProfile) {
    return {
      title: specialistProfile.metaTitle,
      description: buildMetaDescription(specialistProfile.metaDescription),
    };
  }

  const member = getTeamMember(slug);

  if (!member) {
    return {};
  }

  const localizedMember = getLocalizedTeamMember(member, locale);

  return {
    title: buildMetaTitle(
      `${localizedMember.name} - ${localizedMember.role}`,
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
  const specialistProfile = getLocalizedSpecialistProfile(slug, locale);
  const member = getTeamMember(slug);

  if (!member && !specialistProfile) {
    notFound();
  }

  const [tDesign, tFeatures, tMemberPage, tSpecialistPage] = await Promise.all([
    getTranslations({ locale, namespace: "design" }),
    getTranslations({ locale, namespace: "features" }),
    getTranslations({ locale, namespace: "teamPages.memberProfile" }),
    getTranslations({ locale, namespace: "teamPages.specialistProfile" }),
  ]);

  if (specialistProfile) {
    const mergedSpecialists = [
      ...SPECIALIST_PROFILES.map((profile) => ({
        ...(getLocalizedSpecialistProfile(profile, locale) ?? profile),
        id: profile.slug,
      })),
      ...TEAM_MEMBERS.filter(
        (item) => !SPECIALIST_PROFILES.some((profile) => profile.slug === item.id)
      ).map((item) => {
        const localized = getLocalizedTeamMember(item, locale);
        return {
          id: item.id,
          image: item.image,
          imageAlt: localized.imageAlt,
          name: localized.name,
          role: localized.role,
        };
      }),
    ];

    const otherSpecialists = mergedSpecialists
      .filter((item) => item.id !== slug)
      .slice(0, 4);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: specialistProfile.name,
      jobTitle: specialistProfile.role,
      description: specialistProfile.metaDescription,
      image: specialistProfile.image,
      worksFor: {
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

        <SpecialistProfilePage
          contactButtonLabel={tDesign("contactButton")}
          labels={{
            ctaDescription: tSpecialistPage("ctaDescription"),
            ctaTitle: tSpecialistPage("ctaTitle"),
            expertise: tSpecialistPage("expertise"),
            keyHighlights: tSpecialistPage("keyHighlights"),
            otherSpecialists: tSpecialistPage("otherSpecialists"),
            profileBadge: tSpecialistPage("profileBadge"),
            servicesDescription: tSpecialistPage("servicesDescription"),
            servicesTitle: tSpecialistPage("servicesTitle"),
            skillsTitle: tSpecialistPage("skillsTitle"),
            viewServices: tSpecialistPage("viewServices"),
          }}
          locale={locale}
          otherSpecialists={otherSpecialists}
          profile={specialistProfile}
        />
      </>
    );
  }

  if (!member) {
    notFound();
  }

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
        labels={{
          approach: tMemberPage("approach"),
          articlesAndBlog: tMemberPage("articlesAndBlog"),
          casesAndPortfolio: tMemberPage("casesAndPortfolio"),
          ctaDescription: tMemberPage("ctaDescription"),
          ctaTitle: tMemberPage("ctaTitle"),
          expertise: tMemberPage("expertise"),
          focus: tMemberPage("focus"),
          fullTeam: tMemberPage("fullTeam"),
          internalLinking: tMemberPage("internalLinking"),
          nextStep: tMemberPage("nextStep"),
          otherSpecialists: tMemberPage("otherSpecialists"),
          relatedSiteSections: tMemberPage("relatedSiteSections"),
          servicesDescription: tMemberPage("servicesDescription"),
          servicesLabel: tMemberPage("servicesLabel"),
          servicesTitle: tMemberPage("servicesTitle"),
          track: tMemberPage("track"),
          viewServices: tMemberPage("viewServices"),
        }}
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
