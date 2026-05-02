import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import TeamProfilePage from "@/app/components2/team-profile/team-profile-page";
import { getTeamProfileContent } from "@/lib/team-profiles";
import { DEFAULT_TEAM_MEMBER_ID, getTeamMember } from "@/lib/team-members";
import type { ServiceId } from "@/lib/services";
import { buildMetaDescription, buildMetaTitle, isRussianLocale } from "@/lib/seo";

const RELATED_SERVICES_BY_ROLE: Record<string, ServiceId[]> = {
  designer: ["adCreatives", "uxUiDesign", "brandIdentity"],
  targeting: ["targetedMetaVkTiktok", "contextGoogleYandex", "analyticsSetup"],
  smm: ["smmManagement", "influencerAds", "videoProduction"],
  seo: ["seoPromotion", "localSeo", "copywriting"],
  manager: ["corporateWebsite", "crmAutomation", "analyticsSetup"],
  content: ["copywriting", "emailMarketing", "smmManagement"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRussian = isRussianLocale(locale);

  return {
    title: buildMetaTitle(isRussian ? "Специалисты агентства" : "Agency specialists"),
    description: buildMetaDescription(
      isRussian
        ? "Профили специалистов агентства с услугами, которые они оказывают, и ссылками на смежные решения."
        : "Agency specialist profiles with the services they provide and links to related solutions."
    ),
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const member = getTeamMember(DEFAULT_TEAM_MEMBER_ID);

  if (!member) {
    throw new Error("Default team member is missing.");
  }

  const [tWorkers, tDesign, tFeatures] = await Promise.all([
    getTranslations({ locale, namespace: "workers" }),
    getTranslations({ locale, namespace: "design" }),
    getTranslations({ locale, namespace: "features" }),
  ]);

  const name = tWorkers(`items.${member.id}.name`);

  return (
    <TeamProfilePage
      breadcrumbTeam={tDesign("breadcrumbTeam")}
      calculatorAlt={tDesign("calculatorAlt")}
      contactButtonLabel={tDesign("contactButton")}
      featureIconAlt={tFeatures("iconAlt")}
      image={member.image}
      imageAlt={name}
      locale={locale}
      name={name}
      profile={getTeamProfileContent(locale, member.roleType)}
      relatedServiceIds={RELATED_SERVICES_BY_ROLE[member.roleType] ?? RELATED_SERVICES_BY_ROLE.manager}
      role={tWorkers(`items.${member.id}.role`)}
      socialLabels={{
        instagram: tDesign("socialInstagram"),
        telegram: tDesign("socialTelegram"),
        viber: tDesign("socialViber"),
      }}
    />
  );
}
