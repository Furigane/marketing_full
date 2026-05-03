import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import CaseStudyPage from "@/app/components/projects/case-study-page";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getLocalizedCaseStudy,
} from "@/lib/case-studies";
import { buildMetaDescription, buildMetaTitle, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {};
  }

  const localizedCaseStudy = getLocalizedCaseStudy(caseStudy, locale);
  const t = await getTranslations({ locale, namespace: "caseStudyPage.meta" });
  const title = t("title", {
    title: localizedCaseStudy.content.card.title,
    highlight: localizedCaseStudy.content.heroHighlight,
  });
  const description = t("description", {
    title: localizedCaseStudy.content.card.title,
    heroDescription: localizedCaseStudy.content.heroDescription,
  });

  return buildPageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: buildMetaTitle(title, "Creative Group"),
    description: buildMetaDescription(description),
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPage locale={locale} caseStudy={caseStudy} />;
}
