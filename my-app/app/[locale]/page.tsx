import type { Metadata } from "next";

import MainPage from "./main-page/page";
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
    path: "/",
    title: buildMetaTitle(
      isRussian ? "Маркетинговое агентство полного цикла" : "Full-service marketing agency",
      "Creative Group"
    ),
    description: buildMetaDescription(
      isRussian
        ? "Услуги маркетинга, SEO, сайты, контент, кейсы, команда и блог с внутренней перелинковкой."
        : "Marketing services, SEO, websites, content, case studies, team profiles, and a blog with internal linking."
    ),
  });
}

export default function LocaleHomePage() {
  return <MainPage />;
}
