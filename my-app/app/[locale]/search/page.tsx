import type { Metadata } from "next";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import { Link } from "@/i18n/navigation";
import { buildMetaDescription, buildMetaTitle, buildPageMetadata, isRussianLocale } from "@/lib/seo";
import { searchSite, type SearchResultType } from "@/lib/site-search";

const SEARCH_COPY = {
  ru: {
    title: "Поиск по сайту",
    subtitle: "Найдите услугу, кейс или публикацию по ключевым словам.",
    emptyQuery: "Введите запрос в поле поиска в шапке.",
    noResults: "По вашему запросу ничего не найдено.",
    resultCount: (count: number) => `Найдено результатов: ${count}`,
    types: {
      service: "Услуга",
      project: "Проект",
      blog: "Блог",
    },
  },
  en: {
    title: "Site search",
    subtitle: "Find a service, case study, or article by keyword.",
    emptyQuery: "Enter a query in the header search field.",
    noResults: "No results found for this query.",
    resultCount: (count: number) => `Results found: ${count}`,
    types: {
      service: "Service",
      project: "Project",
      blog: "Blog",
    },
  },
  fr: {
    title: "Recherche sur le site",
    subtitle: "Trouvez un service, une étude de cas ou un article par mot-clé.",
    emptyQuery: "Saisissez une requête dans le champ de recherche du header.",
    noResults: "Aucun résultat pour cette requête.",
    resultCount: (count: number) => `Résultats trouvés : ${count}`,
    types: {
      service: "Service",
      project: "Projet",
      blog: "Blog",
    },
  },
  de: {
    title: "Seitensuche",
    subtitle: "Finden Sie Leistungen, Cases oder Artikel per Suchbegriff.",
    emptyQuery: "Geben Sie oben im Header einen Suchbegriff ein.",
    noResults: "Keine Ergebnisse für diese Anfrage gefunden.",
    resultCount: (count: number) => `Gefundene Ergebnisse: ${count}`,
    types: {
      service: "Leistung",
      project: "Projekt",
      blog: "Blog",
    },
  },
  ar: {
    title: "البحث في الموقع",
    subtitle: "ابحث عن خدمة أو دراسة حالة أو مقال باستخدام الكلمات المفتاحية.",
    emptyQuery: "أدخل عبارة البحث في حقل البحث داخل الهيدر.",
    noResults: "لم يتم العثور على نتائج لهذا الطلب.",
    resultCount: (count: number) => `عدد النتائج: ${count}`,
    types: {
      service: "خدمة",
      project: "مشروع",
      blog: "مدونة",
    },
  },
} as const;

function getCopy(locale: string) {
  const localeBase = locale.toLowerCase().split("-")[0] as keyof typeof SEARCH_COPY;
  return SEARCH_COPY[localeBase] ?? SEARCH_COPY.ru;
}

function getTypeLabel(
  types: (typeof SEARCH_COPY)[keyof typeof SEARCH_COPY]["types"],
  type: SearchResultType
) {
  return types[type];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRussian = isRussianLocale(locale);

  return buildPageMetadata({
    locale,
    path: "/search",
    title: buildMetaTitle(isRussian ? "Поиск по сайту" : "Site search", "Creative Group"),
    description: buildMetaDescription(
      isRussian
        ? "Поиск услуг, кейсов и статей по сайту."
        : "Search services, case studies, and articles across the site."
    ),
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ locale }, { q }] = await Promise.all([params, searchParams]);
  const query = typeof q === "string" ? q.trim() : "";
  const results = await searchSite(locale, query);
  const copy = getCopy(locale);

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-4">
          <Header />
          <section className="px-1 pb-10 pt-6 md:px-2 md:pt-8">
            <h1 className="text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
              {copy.subtitle}
            </p>
            {query ? (
              <p className="mt-4 text-sm font-medium text-[var(--foreground)]/70">
                {copy.resultCount(results.length)}
              </p>
            ) : null}
          </section>
        </TeamSurfaceHeaderSection>

        <section className="pb-8">
          {!query ? (
            <div className="rounded-[28px] border border-dashed border-[color:var(--foreground)]/15 bg-[var(--header-bg)] px-5 py-8 text-center text-sm text-[var(--design-muted)]">
              {copy.emptyQuery}
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[color:var(--foreground)]/15 bg-[var(--header-bg)] px-5 py-8 text-center text-sm text-[var(--design-muted)]">
              {copy.noResults}
            </div>
          ) : (
            <div className="grid gap-4">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block rounded-[28px] border border-black/5 bg-[var(--header-bg)] px-5 py-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--design-muted)]">
                    {getTypeLabel(copy.types, item.type)}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)]">{item.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--design-muted)] sm:text-base">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <PageBottomSections />
      </main>
      <Footer />
    </>
  );
}
