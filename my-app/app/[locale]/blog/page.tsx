import type { Metadata } from "next";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { BlogAccordion } from "@/app/components/blog/blog-accordion";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import { getPublishedBlogPosts } from "@/lib/blog-store";
import { buildMetaDescription, buildMetaTitle, isRussianLocale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRussian = isRussianLocale(locale);

  return {
    title: buildMetaTitle(isRussian ? "Блог о маркетинге и SEO" : "Marketing and SEO blog"),
    description: buildMetaDescription(
      isRussian
        ? "Статьи о SEO, контенте, рекламе и услугах агентства с переходами на смежные услуги."
        : "Articles about SEO, content, ads, and agency services with links to related services."
    ),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-3">
          <Header />
        </TeamSurfaceHeaderSection>
        <BlogAccordion posts={posts} locale={locale} />
        <PageBottomSections />
      </main>
      <Footer />
    </>
  );
}
