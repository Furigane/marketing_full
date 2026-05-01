"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { getLocalizedServices } from "@/lib/services";

const sections = [
  { id: "popular" },
  { id: "middle" },
  { id: "rare" },
] as const;

export default function Services() {
  const t = useTranslations("servicesSection");
  const locale = useLocale();
  const services = getLocalizedServices(locale);
  const [openedSection, setOpenedSection] = useState<string>("");

  return (
    <section className="mt-6 px-3 py-6 md:px-6 md:py-8 lg:px-8" id="services">
      <h2 className="mb-8 text-center text-2xl font-bold text-[var(--services-title)] md:mb-10 md:text-3xl">
        {t("title")}
      </h2>

      <div className="space-y-4 md:space-y-8">
        {sections.map((section) => {
          const isOpenMobile = openedSection === section.id;
          const servicesInSection = services.filter((service) => service.section === section.id);

          return (
            <div key={section.id} className="rounded-2xl bg-[var(--services-bg)] p-2 md:p-3">
              <button
                type="button"
                onClick={() => setOpenedSection((prev) => (prev === section.id ? "" : section.id))}
                className="flex w-full items-center justify-between rounded-xl px-2 py-1 text-left md:pointer-events-none md:justify-center"
                aria-expanded={isOpenMobile}
              >
                <span className="mb-2 text-1xl font-semibold text-[var(--services-title)] md:text-2xl">
                  {t(`sections.${section.id}.title`)}
                </span>
                <span className="text-xl text-zinc-500 md:hidden">
                  {isOpenMobile ? "−" : "+"}
                </span>
              </button>

              <div
                className={`mt-2 grid grid-cols-2 gap-2 pb-6 md:grid md:grid-cols-3 md:gap-3 ${
                  isOpenMobile ? "block" : "hidden"
                } md:block`}
              >
                {servicesInSection.map((service) => (
                  <Link
                    href={`/services/${service.slug}`}
                    key={`${section.id}-${service.id}`}
                    className="flex min-h-[112px] min-w-0 flex-col items-start gap-3 rounded-2xl bg-[var(--services-text-bg)] px-6 py-4 text-[var(--services-title)] shadow-none transition-all duration-300 ease-out will-change-transform hover:scale-[1.03] hover:bg-[#9ab5f6] hover:shadow-[0_0_12px_rgba(172,194,253,0.3)] dark:hover:bg-[#9ab5f6] dark:hover:shadow-[0_0_12px_rgba(95,119,184,0.35)] md:min-h-16 md:flex-row md:items-center md:gap-3 md:rounded-full"
                  >
                    <Image
                      src={service.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="h-4 w-4 flex-shrink-0 object-contain md:h-5 md:w-5"
                      aria-hidden
                    />
                    <span className="min-w-0 w-full text-xs leading-5 md:text-sm">
                      {service.content.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
