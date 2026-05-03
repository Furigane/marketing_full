import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogArticlePage from "@/app/components/blog/blog-article-page";
import { getPostTranslation } from "@/lib/blog";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog-store";
import { buildMetaDescription, buildMetaTitle, buildPageMetadata, isRussianLocale } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const translation = getPostTranslation(post, locale);
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: buildMetaTitle(translation.title, isRussianLocale(locale) ? "Блог" : "Blog"),
    description: buildMetaDescription(translation.excerpt),
  });
}

export default async function BlogArticleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getPublishedBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <BlogArticlePage
      locale={locale}
      post={post}
      relatedPosts={allPosts.filter((item) => item.slug !== slug).slice(0, 3)}
    />
  );
}
