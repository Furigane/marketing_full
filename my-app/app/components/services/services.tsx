import { getLocale, getTranslations } from "next-intl/server";

import { getLocalizedServices } from "@/lib/services-localized";

import { ServicesClient } from "./services-client";

export default async function Services() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("servicesSection"),
  ]);

  return (
    <ServicesClient
      labels={{
        title: t("title"),
        sections: {
          popular: t("sections.popular.title"),
          middle: t("sections.middle.title"),
          rare: t("sections.rare.title"),
        },
      }}
      services={getLocalizedServices(locale)}
    />
  );
}
