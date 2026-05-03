import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/app/components/services/service-detail-page";
import { buildMetaDescription, buildMetaTitle, buildPageMetadata } from "@/lib/seo";
import { buildServiceSeoContent } from "@/lib/service-seo";
import { getServiceBySlug, getServiceDefinitions } from "@/lib/services";

export function generateStaticParams() {
  return getServiceDefinitions().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const [seoContent, t] = await Promise.all([
    Promise.resolve(buildServiceSeoContent(service, locale)),
    getTranslations({ locale, namespace: "serviceDetailPage" }),
  ]);

  return buildPageMetadata({
    locale,
    path: `/services/${slug}`,
    title: buildMetaTitle(seoContent.metaTitle, t("metaBrandSuffix")),
    description: buildMetaDescription(seoContent.metaDescription),
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage locale={locale} service={service} />;
}
