import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import TeamProfilePage from "@/app/components2/team-profile/team-profile-page";
import { TEAM_MEMBERS, getTeamMember, getTeamProfileContent } from "@/lib/team-profiles";
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

  const [tWorkers] = await Promise.all([
    getTranslations({ locale, namespace: "workers" }),
  ]);
  const profile = getTeamProfileContent(locale, member.roleType);
  const name = tWorkers(`items.${member.id}.name`);
  const role = tWorkers(`items.${member.id}.role`);

  return {
    title: buildMetaTitle(`${name} — ${role}`),
    description: buildMetaDescription(
      isRussianLocale(locale)
        ? `${name} оказывает услуги по направлению «${role}». ${profile.description}`
        : `${name} provides ${role} services. ${profile.description}`
    ),
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
