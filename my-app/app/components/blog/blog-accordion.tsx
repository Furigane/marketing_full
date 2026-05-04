"use client";

import { getPostTranslation, type BlogPost } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import { getDefaultContentLocale, normalizeSiteLocale } from "@/lib/site-locales";
import { getServiceById, type ServiceId } from "@/lib/services";
import { repairEncodedTree } from "@/lib/text-encoding";

type SupportedLocale = "ru" | "en" | "fr" | "de" | "ar";

type SectionCopy = {
  title: string;
  subtitle: string;
  featuredLabel: string;
  readMore: string;
  empty: string;
};

type TeaserCopy = {
  category: string;
  title: string;
  description: string;
};

type EditorialTeaser = {
  serviceId: ServiceId;
  slug: string;
  locale: Record<SupportedLocale, TeaserCopy>;
};

type BlogCard = {
  id: string;
  href: string;
  category: string;
  title: string;
  description: string;
  cta: string;
  publishedAt?: string;
};

const LOCALE_COPY: Record<SupportedLocale, SectionCopy> = {
  ru: {
    title: "Блог / Журнал",
    subtitle: "Публикации о продвижении, контенте, сайте и маркетинговой системе бизнеса.",
    featuredLabel: "Статья",
    readMore: "Читать",
    empty: "Раздел скоро пополнится новыми публикациями.",
  },
  en: {
    title: "Blog / Journal",
    subtitle: "Articles on growth, content, websites, and the marketing systems behind demand.",
    featuredLabel: "Article",
    readMore: "Read",
    empty: "New publications will appear here soon.",
  },
  fr: {
    title: "Blog / Journal",
    subtitle: "Publications sur la croissance, le contenu, le site et le système marketing de l’entreprise.",
    featuredLabel: "Article",
    readMore: "Lire",
    empty: "De nouvelles publications seront bientôt disponibles.",
  },
  de: {
    title: "Blog / Journal",
    subtitle: "Beiträge über Wachstum, Content, Website und das Marketingsystem des Unternehmens.",
    featuredLabel: "Artikel",
    readMore: "Lesen",
    empty: "Neue Veröffentlichungen erscheinen in Kürze.",
  },
  ar: {
    title: "المدونة / المجلة",
    subtitle: "منشورات عن النمو والمحتوى والموقع والنظام التسويقي الذي يدعم الطلب.",
    featuredLabel: "مقال",
    readMore: "قراءة",
    empty: "ستظهر هنا منشورات جديدة قريباً.",
  },
};

const EDITORIAL_TEASERS: EditorialTeaser[] = [
  {
    serviceId: "seoPromotion",
    slug: "seo-demand-structure",
    locale: {
      ru: {
        category: "SEO",
        title: "Как структура страниц влияет на спрос из поиска",
        description: "Разбираем, какие элементы коммерческой страницы усиливают видимость и помогают довести пользователя до заявки.",
      },
      en: {
        category: "SEO",
        title: "How page structure shapes search demand capture",
        description: "A practical look at the commercial page elements that improve visibility and move readers closer to conversion.",
      },
      fr: {
        category: "SEO",
        title: "Comment la structure d’une page capte la demande SEO",
        description: "Un aperçu des éléments de page qui renforcent la visibilité et rapprochent l’utilisateur de la conversion.",
      },
      de: {
        category: "SEO",
        title: "Wie Seitenstruktur die SEO-Nachfrage besser abholt",
        description: "Welche Bausteine einer Leistungsseite Sichtbarkeit stärken und Nutzer näher an die Anfrage führen.",
      },
      ar: {
        category: "SEO",
        title: "كيف تؤثر بنية الصفحة على جذب الطلب من البحث",
        description: "نظرة عملية على العناصر التي ترفع الظهور وتقرّب المستخدم من خطوة التواصل.",
      },
    },
  },
  {
    serviceId: "copywriting",
    slug: "offer-messaging-that-converts",
    locale: {
      ru: {
        category: "Контент",
        title: "Как упаковать предложение, чтобы текст работал на заявку",
        description: "Показываем, как связать оффер, структуру текста и следующий шаг без перегруза и общих формулировок.",
      },
      en: {
        category: "Content",
        title: "How to package an offer so the copy drives action",
        description: "How to connect messaging, page structure, and the next step without relying on vague or overloaded copy.",
      },
      fr: {
        category: "Contenu",
        title: "Comment formuler une offre pour que le texte fasse agir",
        description: "Relier le message, la structure et l’action suivante sans surcharge ni formulations floues.",
      },
      de: {
        category: "Content",
        title: "Wie ein Angebot formuliert wird, damit Texte konvertieren",
        description: "Wie Botschaft, Struktur und nächster Schritt zusammenarbeiten, ohne überladene Formulierungen.",
      },
      ar: {
        category: "المحتوى",
        title: "كيف تُصاغ الخدمة بحيث يقود النص إلى الإجراء",
        description: "ربط الرسالة وبنية الصفحة والخطوة التالية من دون حشو أو وعود عامة.",
      },
    },
  },
  {
    serviceId: "corporateWebsite",
    slug: "website-as-sales-system",
    locale: {
      ru: {
        category: "Сайт",
        title: "Когда сайт становится частью системы продаж",
        description: "О том, как архитектура сайта, аналитика и контент начинают работать вместе вместо разрозненных блоков.",
      },
      en: {
        category: "Website",
        title: "When a website starts acting like a sales system",
        description: "How site architecture, analytics, and content begin to work as one system instead of separate layers.",
      },
      fr: {
        category: "Site web",
        title: "Quand un site devient une partie du système de vente",
        description: "Comment l’architecture du site, l’analytics et le contenu fonctionnent enfin comme un seul système.",
      },
      de: {
        category: "Website",
        title: "Wann eine Website Teil des Vertriebssystems wird",
        description: "Wie Seitenarchitektur, Analytics und Content gemeinsam statt getrennt arbeiten.",
      },
      ar: {
        category: "الموقع",
        title: "متى يصبح الموقع جزءاً من نظام المبيعات",
        description: "كيف تعمل بنية الموقع والتحليلات والمحتوى كنظام واحد بدلاً من عناصر منفصلة.",
      },
    },
  },
  {
    serviceId: "analyticsSetup",
    slug: "marketing-analytics-before-scale",
    locale: {
      ru: {
        category: "Аналитика",
        title: "Что нужно измерить до масштабирования маркетинга",
        description: "Короткий ориентир по метрикам и связкам, без которых рост бюджета чаще усиливает хаос, а не результат.",
      },
      en: {
        category: "Analytics",
        title: "What to measure before scaling marketing",
        description: "A concise guide to the metrics and connections you need before higher budgets start amplifying noise.",
      },
      fr: {
        category: "Analytics",
        title: "Que mesurer avant de passer à l’échelle",
        description: "Les indicateurs et connexions à mettre en place avant qu’un budget plus élevé ne crée davantage de bruit.",
      },
      de: {
        category: "Analytics",
        title: "Was vor der Skalierung gemessen werden muss",
        description: "Die Kennzahlen und Verknüpfungen, die vor höheren Budgets stehen sollten.",
      },
      ar: {
        category: "التحليلات",
        title: "ما الذي يجب قياسه قبل توسيع التسويق",
        description: "دليل مختصر للمقاييس والروابط الأساسية قبل أن تؤدي زيادة الميزانية إلى فوضى أكبر.",
      },
    },
  },
];

function getSectionCopy(locale: string) {
  const key = normalizeSiteLocale(locale) as SupportedLocale;
  return LOCALE_COPY[key] ?? LOCALE_COPY.ru;
}

function getEditorialCards(locale: string, limit: number): BlogCard[] {
  const key = normalizeSiteLocale(locale) as SupportedLocale;
  const baseLocale = getDefaultContentLocale(locale);

  return EDITORIAL_TEASERS.slice(0, limit)
    .map((teaser) => {
      const service = getServiceById(teaser.serviceId);
      if (!service) {
        return null;
      }

      const serviceContent = repairEncodedTree(service.locale[baseLocale]);
      const teaserCopy = teaser.locale[key] ?? teaser.locale.en;
      const copy = getSectionCopy(locale);

      return {
        id: teaser.slug,
        href: `/services/${service.slug}`,
        category: teaserCopy.category,
        title: teaserCopy.title,
        description: teaserCopy.description || serviceContent.summary,
        cta: copy.readMore,
      };
    })
    .filter((item): item is BlogCard => Boolean(item));
}

function getBlogCards(posts: BlogPost[], locale: string): BlogCard[] {
  const copy = getSectionCopy(locale);
  const postCards = posts.map((post) => {
    const translation = getPostTranslation(post, locale);

    return {
      id: post.id,
      href: `/blog/${post.slug}`,
      category: copy.featuredLabel,
      title: translation.title,
      description: translation.excerpt,
      cta: copy.readMore,
      publishedAt: post.publishedAt,
    };
  });

  if (postCards.length >= 3) {
    return postCards;
  }

  const teaserCards = getEditorialCards(locale, Math.min(6 - postCards.length, 4));
  return [...postCards, ...teaserCards];
}

export function BlogAccordion({ posts, locale }: { posts: BlogPost[]; locale: string }) {
  const copy = getSectionCopy(locale);
  const cards = getBlogCards(posts, locale);
  const dateLocale = locale === "ar" ? "ar" : locale;

  return (
    <div className="flex w-full flex-col gap-6 px-3 pb-12 pt-3 sm:gap-8 sm:px-4 md:px-6">
      <section className="rounded-[32px] bg-[var(--team-surface)] px-5 py-8 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--design-muted)]">
            Creative Group
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--design-muted)] sm:text-base">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="block overflow-hidden rounded-[28px] border border-black/5 bg-[var(--header-bg)] px-5 py-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 sm:px-7 sm:py-6"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {card.category}
              </p>
              {card.publishedAt ? (
                <p className="text-xs text-[var(--design-muted)]">
                  {new Intl.DateTimeFormat(dateLocale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(card.publishedAt))}
                </p>
              ) : null}
            </div>
            <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)]">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--design-muted)] sm:text-base">
              {card.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7c9ff7]">
              {card.cta} <span aria-hidden>{"\u2197"}</span>
            </span>
          </Link>
        ))}

        {cards.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[color:var(--foreground)]/15 bg-[var(--header-bg)] px-5 py-8 text-center text-sm text-[var(--design-muted)] md:col-span-2 xl:col-span-3">
            {copy.empty}
          </div>
        ) : null}
      </section>
    </div>
  );
}
