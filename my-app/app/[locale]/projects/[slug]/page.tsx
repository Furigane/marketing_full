import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyPage from "@/app/components/projects/case-study-page";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getLocalizedCaseStudy,
} from "@/lib/case-studies";
import { buildMetaDescription, buildMetaTitle, buildPageMetadata, isRussianLocale } from "@/lib/seo";

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
  const isRussian = isRussianLocale(locale);
  const title = isRussian
    ? `${localizedCaseStudy.content.card.title} - кейс по росту ${localizedCaseStudy.content.heroHighlight.toLowerCase()}`
    : `${localizedCaseStudy.content.card.title} case study - ${localizedCaseStudy.content.heroHighlight}`;

  return buildPageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: buildMetaTitle(title, "Creative Group"),
    description: buildMetaDescription(
      isRussian
        ? `${localizedCaseStudy.content.card.title}: было, что сделали и что получили в цифрах. ${localizedCaseStudy.content.heroDescription}`
        : `${localizedCaseStudy.content.card.title}: before, what we did, and the measurable result. ${localizedCaseStudy.content.heroDescription}`
    ),
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
