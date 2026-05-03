import type { Metadata } from "next";

import Header from "../../components/headaer/header";
import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Faq from "../../components2/faq/faq";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import { buildMetaDescription, buildMetaTitle, buildPageMetadata, isRussianLocale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRussian = isRussianLocale(locale);

  return buildPageMetadata({
    locale,
    path: "/connect",
    title: buildMetaTitle(isRussian ? "Карта сайта и разделы" : "Site map and sections", "Creative Group"),
    description: buildMetaDescription(
      isRussian
        ? "Навигация по основным разделам сайта, услугам и вспомогательным страницам."
        : "Navigation across the main site sections, services, and supporting pages."
    ),
  });
}

export default function SiteMapPage() {
  return (
    <>  
    <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
      <TeamSurfaceHeaderSection
        className="mt-4"
        innerClassName="flex flex-col gap-14 !pb-6 md:!pb-8"
      >
        <Header matchTeamSurface />
        <Card embedded />
      </TeamSurfaceHeaderSection>
      <Faq />
    </main>
      <Footer />
    </>

  );
}
