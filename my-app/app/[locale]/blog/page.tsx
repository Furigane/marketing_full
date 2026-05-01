import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { BlogAccordion } from "@/app/components/blog/blog-accordion";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import { getPublishedBlogPosts } from "@/lib/blog-store";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <div className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-3">
          <Header />
        </TeamSurfaceHeaderSection>
      </div>
      <BlogAccordion posts={posts} locale={locale} />
      <Footer />
    </>
  );
}
