import type { Metadata } from "next";

import Footer from "../../components/footer/footer";
import Header from "../../components/headaer/header";
import PrivacyContent from "../../components/privacy/privacy-content";
import Confidentel from "../../components2/confidental/confidental";
import PageBottomSections from "../../components/common/page-bottom-sections";
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
    path: "/privacy",
    title: buildMetaTitle(isRussian ? "Политика конфиденциальности" : "Privacy policy", "Creative Group"),
    description: buildMetaDescription(
      isRussian
        ? "Политика конфиденциальности, обработка данных и правила использования сайта."
        : "Privacy policy, data processing, and website usage rules."
    ),
  });
}

export default function Privacy() {
  return (
    <>
    
    <div className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
      <TeamSurfaceHeaderSection className="mt-3">
        <Header />
        <Confidentel />
      </TeamSurfaceHeaderSection>
      <PrivacyContent />
      <PageBottomSections />
    </div>
      <Footer />
    </>

  );
}
