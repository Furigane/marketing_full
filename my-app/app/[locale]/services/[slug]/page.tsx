import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/app/components/services/service-detail-page";
import { getServiceBySlug, getServiceDefinitions } from "@/lib/services";
import { getLocalizedService } from "@/lib/services-localized";
import { buildMetaDescription, buildMetaTitle } from "@/lib/seo";

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

  const content = getLocalizedService(service, locale).content;
  return {
    title: buildMetaTitle(content.title, locale.toLowerCase().startsWith("ru") ? "Услуги" : "Services"),
    description: buildMetaDescription(content.summary),
  };
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
