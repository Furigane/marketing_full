import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { getLocalizedService, getServiceById, getRelatedServices, type ServiceId } from "@/lib/services";

type RelatedServicesSectionProps = {
  currentServiceId?: ServiceId;
  locale: string;
  serviceIds?: ServiceId[];
  title?: string;
};

export default function RelatedServicesSection({
  currentServiceId,
  locale,
  serviceIds,
  title,
}: RelatedServicesSectionProps) {
  const isRussian = locale.toLowerCase().startsWith("ru");
  const related = serviceIds
    ? serviceIds
        .map((id) => getServiceById(id))
        .filter((item) => Boolean(item))
        .map((item) => getLocalizedService(item!, locale))
    : currentServiceId
      ? (() => {
          const current = getServiceById(currentServiceId);
          return current ? getRelatedServices(current, locale) : [];
        })()
      : [];

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 px-3 py-4 md:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
            {isRussian ? "Услуги" : "Services"}
          </p>
          <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            {title ?? (isRussian ? "Похожие услуги" : "Related services")}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {related.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group rounded-[1.75rem] border border-zinc-200/70 bg-[var(--services-text-bg)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ab5f6] hover:shadow-[0_16px_40px_rgba(23,26,34,0.14)] dark:border-zinc-700/70"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--services-bg)]">
              <Image src={service.icon} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              {service.content.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--design-text)]">
              {service.content.summary}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7c9ff7]">
              {isRussian ? "Открыть услугу" : "View service"} <span aria-hidden>{"\u2197"}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
