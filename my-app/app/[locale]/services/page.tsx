import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Header from "../../components/headaer/header";
import Services from "../../components/services/services";
import Faq from "../../components2/faq/faq";
import Smm from "../../components2/smm/smm";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import { buildMetaDescription, buildMetaTitle, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  return buildPageMetadata({
    locale,
    path: "/services",
    title: buildMetaTitle(t("metaTitle"), "Creative Group"),
    description: buildMetaDescription(t("metaDescription")),
  });
}

export default function ServicesPage() {
  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-8 px-3 sm:gap-10 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-6">
          <Header />
          <Smm />
        </TeamSurfaceHeaderSection>
        <Services />
        <Card />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
