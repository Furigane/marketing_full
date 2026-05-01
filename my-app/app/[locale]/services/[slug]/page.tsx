import { notFound } from "next/navigation";

import ServiceDetailPage from "@/app/components/services/service-detail-page";
import { getServiceBySlug, getServiceDefinitions } from "@/lib/services";

export function generateStaticParams() {
  return getServiceDefinitions().map((service) => ({ slug: service.slug }));
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
