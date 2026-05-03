import type { Metadata } from "next";

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Header from "../../components/headaer/header";
import Services from "../../components/services/services";
import Faq from "../../components2/faq/faq";
import Smm from "../../components2/smm/smm";
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
    path: "/services",
    title: buildMetaTitle(
      isRussian ? "Услуги маркетинга и digital" : "Marketing and digital services",
      "Creative Group"
    ),
    description: buildMetaDescription(
      isRussian
        ? "Каталог услуг: SEO, реклама, сайты, аналитика, дизайн, CRM и смежные направления с внутренней перелинковкой."
        : "Service catalog: SEO, ads, websites, analytics, design, CRM, and related offers with internal linking."
    ),
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
