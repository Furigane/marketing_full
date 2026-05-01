import { notFound } from "next/navigation";

import CaseStudyPage from "@/app/components/projects/case-study-page";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";

export function generateStaticParams() {
  return getCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
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
