import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

import {
  BLOG_LOCALES,
  type BlogLocale,
  type BlogPost,
  type BlogPostPayload,
  type BlogPostStatus,
  type BlogPostTranslation,
  type BlogPostTranslations,
  createEmptyTranslations,
} from "@/lib/blog";

const BLOG_DATA_DIR = path.join(process.cwd(), "data");
const BLOG_DATA_PATH = path.join(BLOG_DATA_DIR, "blog-posts.json");

const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: "launch-content-system",
    slug: "content-system-launch",
    status: "published",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01T00:00:00.000Z",
    translations: {
      ru: {
        title: "Как мы выстраиваем контент-систему для бизнеса",
        excerpt: "Коротко о том, как статьи, реклама и соцсети собираются в одну воронку.",
        content:
          "Мы начинаем не с публикаций, а с бизнес-цели: какие заявки нужны, какие возражения есть у клиента и что должно привести читателя к следующему шагу.\n\nЗатем строим контент-карту: экспертные статьи закрывают вопросы, кейсы показывают доказательства, а короткие форматы подогревают интерес между рекламными касаниями.\n\nВ результате блог работает не как архив текстов, а как часть маркетинговой системы: усиливает SEO, прогревает аудиторию и даёт менеджерам понятные материалы для коммуникации.",
      },
      en: {
        title: "How we build a content system for a business",
        excerpt: "A brief look at how articles, ads, and social content are assembled into one funnel.",
        content:
          "We do not start with publishing. We start with the business goal: what kind of leads are needed, what objections exist, and what should move the reader to the next step.\n\nThen we build a content map: expert articles answer questions, case studies provide proof, and short-form content keeps attention warm between paid touchpoints.\n\nThat turns a blog from a passive archive into an active marketing asset that supports SEO, educates the audience, and helps the sales team communicate more clearly.",
      },
      fr: {
        title: "Comment nous construisons un système de contenu pour une entreprise",
        excerpt: "Un aperçu de la façon dont articles, publicité et réseaux sociaux forment un seul tunnel.",
        content:
          "Nous ne commençons pas par publier. Nous commençons par l’objectif business : quelles demandes sont attendues, quelles objections existent et quelle action doit suivre la lecture.\n\nEnsuite, nous créons une carte de contenu : les articles experts répondent aux questions, les études de cas apportent la preuve et les formats courts entretiennent l’attention entre les campagnes payantes.\n\nAinsi, le blog ne devient pas une simple archive, mais un actif marketing qui soutient le SEO, prépare l’audience et aide l’équipe commerciale.",
      },
      de: {
        title: "Wie wir ein Content-System für ein Unternehmen aufbauen",
        excerpt: "Kurz erklärt, wie Artikel, Werbung und Social Content zu einem Funnel werden.",
        content:
          "Wir beginnen nicht mit dem Veröffentlichen, sondern mit dem Geschäftsziel: Welche Leads werden gebraucht, welche Einwände gibt es und was soll den Leser zum nächsten Schritt führen.\n\nDanach bauen wir eine Content-Map auf: Fachartikel beantworten Fragen, Cases liefern Belege und kurze Formate halten das Interesse zwischen bezahlten Kontakten warm.\n\nSo wird der Blog kein statisches Archiv, sondern ein Marketing-Instrument für SEO, Vertrauen und bessere Kommunikation im Vertrieb.",
      },
      ar: {
        title: "كيف نبني نظام محتوى متكاملًا للأعمال",
        excerpt: "نظرة سريعة على ربط المقالات والإعلانات والمحتوى الاجتماعي في مسار واحد.",
        content:
          "نحن لا نبدأ بالنشر نفسه، بل نبدأ بهدف العمل: ما نوع العملاء المحتملين المطلوب، وما الاعتراضات الموجودة، وما الخطوة التالية التي يجب أن يصل إليها القارئ.\n\nبعد ذلك نبني خريطة محتوى: المقالات المتخصصة تجيب عن الأسئلة، ودراسات الحالة تقدم الدليل، والمحتوى القصير يحافظ على الاهتمام بين نقاط الاتصال الإعلانية.\n\nبهذا الشكل يصبح المدونة أصلًا تسويقيًا فعليًا يدعم تحسين الظهور في البحث، ويهيئ الجمهور، ويساعد فريق المبيعات في التواصل بوضوح أكبر.",
      },
    },
  },
];

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const left = new Date(a.publishedAt).getTime();
    const right = new Date(b.publishedAt).getTime();
    return right - left;
  });
}

async function ensureStorageFile() {
  await mkdir(BLOG_DATA_DIR, { recursive: true });
  try {
    await readFile(BLOG_DATA_PATH, "utf8");
  } catch {
    await writeFile(BLOG_DATA_PATH, JSON.stringify(DEFAULT_BLOG_POSTS, null, 2), "utf8");
  }
}

function normalizeTranslation(value: Partial<BlogPostTranslation> | undefined): BlogPostTranslation {
  return {
    title: typeof value?.title === "string" ? value.title.trim() : "",
    excerpt: typeof value?.excerpt === "string" ? value.excerpt.trim() : "",
    content: typeof value?.content === "string" ? value.content.trim() : "",
  };
}

function normalizeTranslations(raw: unknown): BlogPostTranslations {
  const input = raw && typeof raw === "object" ? (raw as Partial<Record<BlogLocale, Partial<BlogPostTranslation>>>) : {};
  const translations = createEmptyTranslations();

  for (const locale of BLOG_LOCALES) {
    translations[locale] = normalizeTranslation(input[locale]);
  }

  return translations;
}

function normalizePost(raw: unknown): BlogPost | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Partial<BlogPost>;
  const id = typeof input.id === "string" ? input.id.trim() : "";
  const slug = typeof input.slug === "string" ? input.slug.trim() : "";
  const status: BlogPostStatus = input.status === "draft" ? "draft" : "published";
  const publishedAt = typeof input.publishedAt === "string" && input.publishedAt.trim() ? input.publishedAt : new Date().toISOString().slice(0, 10);
  const updatedAt = typeof input.updatedAt === "string" && input.updatedAt.trim() ? input.updatedAt : new Date().toISOString();

  if (!id || !slug) return null;

  return {
    id,
    slug,
    status,
    publishedAt,
    updatedAt,
    translations: normalizeTranslations(input.translations),
  };
}

async function writePosts(posts: BlogPost[]) {
  await writeFile(BLOG_DATA_PATH, JSON.stringify(sortPosts(posts), null, 2), "utf8");
  revalidateBlogPaths();
}

function revalidateBlogPaths() {
  revalidatePath("/blog");
  revalidatePath("/admin/blog");

  for (const locale of BLOG_LOCALES) {
    if (locale === "ru") continue;
    revalidatePath(`/${locale}/blog`);
    revalidatePath(`/${locale}/admin/blog`);
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  await ensureStorageFile();
  const raw = await readFile(BLOG_DATA_PATH, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  const posts = Array.isArray(parsed) ? parsed.map(normalizePost).filter(Boolean) as BlogPost[] : [];
  return sortPosts(posts);
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.status === "published");
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getPublishedBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

function validatePayload(payload: BlogPostPayload) {
  if (!payload.slug.trim()) {
    throw new Error("Slug is required.");
  }

  if (!/^[a-z0-9-]+$/.test(payload.slug.trim())) {
    throw new Error("Slug may contain only lowercase latin letters, numbers, and hyphens.");
  }

  if (!payload.publishedAt.trim()) {
    throw new Error("Publish date is required.");
  }

  const hasAtLeastOneTitle = BLOG_LOCALES.some((locale) => payload.translations[locale].title.trim());
  if (!hasAtLeastOneTitle) {
    throw new Error("Add a title for at least one language.");
  }
}

export async function createBlogPost(payload: BlogPostPayload) {
  validatePayload(payload);
  const posts = await getAllBlogPosts();
  const slug = payload.slug.trim();
  if (posts.some((post) => post.slug === slug)) {
    throw new Error("A post with this slug already exists.");
  }

  const post: BlogPost = {
    id: crypto.randomUUID(),
    slug,
    status: payload.status,
    publishedAt: payload.publishedAt,
    updatedAt: new Date().toISOString(),
    translations: normalizeTranslations(payload.translations),
  };

  await writePosts([post, ...posts]);
  return post;
}

export async function updateBlogPost(id: string, payload: BlogPostPayload) {
  validatePayload(payload);
  const posts = await getAllBlogPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    throw new Error("Post not found.");
  }

  const slug = payload.slug.trim();
  if (posts.some((post) => post.id !== id && post.slug === slug)) {
    throw new Error("A post with this slug already exists.");
  }

  const updated: BlogPost = {
    ...posts[index],
    slug,
    status: payload.status,
    publishedAt: payload.publishedAt,
    updatedAt: new Date().toISOString(),
    translations: normalizeTranslations(payload.translations),
  };

  const nextPosts = [...posts];
  nextPosts[index] = updated;
  await writePosts(nextPosts);
  return updated;
}

export async function deleteBlogPost(id: string) {
  const posts = await getAllBlogPosts();
  const nextPosts = posts.filter((post) => post.id !== id);
  if (nextPosts.length === posts.length) {
    throw new Error("Post not found.");
  }

  await writePosts(nextPosts);
}
