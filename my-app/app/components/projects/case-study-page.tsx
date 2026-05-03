import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/headaer/header";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import PageBottomSections from "@/app/components/common/page-bottom-sections";
import OptimizedImage from "@/app/components/shared/optimized-image";
import RelatedServicesSection from "@/app/components/services/related-services-section";
import { Link } from "@/i18n/navigation";
import { getLocalizedCaseStudy, type CaseStudyDefinition } from "@/lib/case-studies";
import { TEAM_MEMBERS } from "@/lib/team-members";
import { getLocalizedTeamMember } from "@/lib/team-members-localized";

type CaseStudyPageProps = {
  caseStudy: CaseStudyDefinition;
  locale: string;
};

const CASE_STUDY_PROOF = {
  silpo: {
    analytics: {
      en: [
        "Weekly dashboard with CPL, traffic quality, and revenue contribution by campaign group.",
        "Creative performance snapshots used to stop weak combinations early.",
        "Growth checkpoints comparing baseline demand with current lead flow and repeat sales dynamics.",
      ],
      ru: [
        "Еженедельный дашборд с CPL, качеством трафика и вкладом кампаний в выручку.",
        "Срезы по креативам, которые помогали быстро отключать слабые связки.",
        "Контрольные точки роста: база спроса, текущий поток лидов и динамика повторных продаж.",
      ],
    },
    review: {
      author: "Retail marketing lead",
      quote: {
        en: "The team did not just launch ads. They built a reporting rhythm where we could see what changed, why it changed, and which actions moved sales.",
        ru: "Команда не просто запустила рекламу. Они выстроили ритм отчетности, где было видно, что изменилось, почему и какие действия реально повлияли на продажи.",
      },
    },
  },
  "nova-bistro": {
    analytics: {
      en: [
        "Launch report with audience growth, creator performance, and reservation-related traffic.",
        "Short-form video view and retention breakdown by concept and publishing window.",
        "Weekly local reach snapshots tied to opening events and offline demand peaks.",
      ],
      ru: [
        "Стартовый отчет с ростом аудитории, результатами интеграций и трафиком на бронирования.",
        "Разбивка просмотров и удержания short-form видео по концептам и времени публикаций.",
        "Еженедельные срезы локального охвата, привязанные к открытиям и пикам офлайн-спроса.",
      ],
    },
    review: {
      author: "Restaurant co-founder",
      quote: {
        en: "We needed attention before the opening, but also real guests after the hype. The campaign mix helped us get both.",
        ru: "Нам нужно было внимание до открытия, но и реальные гости после хайпа. Комбинация каналов помогла получить и то, и другое.",
      },
    },
  },
  "luna-clinic": {
    analytics: {
      en: [
        "Qualified lead split by service category before and after search restructuring.",
        "Landing page conversion snapshots after content and routing updates.",
        "Search query and call-tracking reports used to separate weak demand from real consultations.",
      ],
      ru: [
        "Разделение квалифицированных лидов по услугам до и после пересборки поискового спроса.",
        "Снимки конверсии посадочных страниц после обновления контента и маршрутизации.",
        "Отчеты по поисковым запросам и call-tracking, которые отделяли слабый спрос от реальных консультаций.",
      ],
    },
    review: {
      author: "Clinic growth manager",
      quote: {
        en: "The biggest win was not traffic volume. It was getting fewer empty requests and more patients who already understood the service.",
        ru: "Главная победа была не в объеме трафика. Мы получили меньше пустых заявок и больше пациентов, которые уже понимали услугу.",
      },
    },
  },
  "atelier-home": {
    analytics: {
      en: [
        "Commercial presentation audit showing where premium positioning was being lost online.",
        "Website structure comparison before and after service-led repositioning.",
        "Client feedback snapshots from proposal and presentation use in new sales conversations.",
      ],
      ru: [
        "Аудит коммерческой подачи, показывающий, где онлайн терялось премиальное позиционирование.",
        "Сравнение структуры сайта до и после перехода к сервисной подаче.",
        "Снимки клиентской обратной связи по презентациям и коммерческим материалам в новых продажах.",
      ],
    },
    review: {
      author: "Studio founder",
      quote: {
        en: "After the update, the brand finally looked as expensive as the work itself. That changed how the first conversation started.",
        ru: "После обновления бренд наконец стал выглядеть так же дорого, как и сами проекты. Это изменило качество первого разговора с клиентом.",
      },
    },
  },
} as const;

export default async function CaseStudyPage({
  caseStudy,
  locale,
}: CaseStudyPageProps) {
  const isRussian = locale.toLowerCase().startsWith("ru");
  const localizedCaseStudy = getLocalizedCaseStudy(caseStudy, locale);
  const proof = CASE_STUDY_PROOF[caseStudy.id];

  const specialists = caseStudy.specialistIds
    .map((id) => TEAM_MEMBERS.find((member) => member.id === id))
    .filter((member): member is (typeof TEAM_MEMBERS)[number] => Boolean(member))
    .map((member) => getLocalizedTeamMember(member, locale));

  const storyBlocks = [
    {
      badge: isRussian ? "Было" : "Before",
      title:
        localizedCaseStudy.content.detailItems[0]?.title ??
        (isRussian ? "Исходная ситуация" : "Initial state"),
      body:
        localizedCaseStudy.content.detailItems[0]?.body ??
        localizedCaseStudy.content.heroDescription,
    },
    {
      badge: isRussian ? "Что сделали" : "What we did",
      title:
        localizedCaseStudy.content.detailItems[1]?.title ??
        (isRussian ? "Подход" : "Approach"),
      body: [
        localizedCaseStudy.content.detailItems[1]?.body,
        localizedCaseStudy.content.detailItems[2]?.body,
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      badge: isRussian ? "Стало" : "After",
      title:
        localizedCaseStudy.content.detailItems[3]?.title ??
        (isRussian ? "Результат" : "Result"),
      body:
        localizedCaseStudy.content.detailItems[3]?.body ??
        localizedCaseStudy.content.heroDescription,
    },
  ];

  const eeatItems = [
    {
      title: "Experience",
      body: isRussian
        ? "Показываем реальный контекст проекта: задача, ограничения, этапы запуска и конкретные изменения в воронке."
        : "Shows the real delivery context: business goal, launch constraints, execution stages, and concrete funnel changes.",
    },
    {
      title: "Expertise",
      body: isRussian
        ? "Результат разбит на решения по аналитике, контенту, рекламе и структуре, а не описан общими словами."
        : "Breaks the result into analytics, content, media, and structure decisions instead of generic marketing claims.",
    },
    {
      title: "Authoritativeness",
      body: isRussian
        ? "Страница связана с профильными услугами и специалистами, которые отвечали за результат."
        : "Connects the case study to the relevant services and specialists who were responsible for the outcome.",
    },
    {
      title: "Trust",
      body: isRussian
        ? "Есть измеримые цифры, описание отчетности и клиентская обратная связь без расплывчатых обещаний."
        : "Adds measurable numbers, reporting evidence, and client feedback instead of vague promises.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${localizedCaseStudy.content.card.title} — ${localizedCaseStudy.content.heroHighlight} ${localizedCaseStudy.content.heroMetric}`,
    description: localizedCaseStudy.content.heroDescription,
    author: {
      "@type": "Organization",
      name: "Creative Group",
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: proof.review.author,
      },
      reviewBody: proof.review.quote[isRussian ? "ru" : "en"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-8 px-3 sm:gap-10 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-6">
          <Header />

          <section className="relative pb-10 pt-6 md:pb-14">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="hidden items-center gap-2 text-sm text-[var(--design-muted)]">
                <span aria-hidden>{"\u2302"}</span>
                <span aria-hidden>{"\u203A"}</span>
                <span>{isRussian ? "Проекты" : "Projects"}</span>
                <span aria-hidden>{"\u203A"}</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {localizedCaseStudy.content.card.title}
                </span>
              </div>

              <span className="rounded-full bg-zinc-900 px-4 py-1 text-sm font-semibold text-[#f5d58d]">
                {localizedCaseStudy.content.heroBadge}
              </span>
            </div>

            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.9fr)] md:items-center">
              <div>
                <h1 className="text-3xl font-extrabold leading-[1.1] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                  {localizedCaseStudy.content.card.title}
                  <br />
                  <span className="inline-block rounded-full bg-[var(--hero-span)] px-4 py-1 text-[var(--design-title)]">
                    {localizedCaseStudy.content.heroHighlight}
                  </span>{" "}
                  {localizedCaseStudy.content.heroMetric}
                </h1>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--design-muted)]">
                  {localizedCaseStudy.content.heroSubtitle}
                </p>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                  {localizedCaseStudy.content.heroDescription}
                </p>
                <div className="mt-6 rounded-[1.5rem] bg-[var(--background)] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <span className="text-sm text-[var(--design-muted)]">
                    {isRussian ? "Бюджет" : "Budget"}
                  </span>
                  <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                    {localizedCaseStudy.content.card.price}
                  </p>
                </div>
              </div>

              <div className="relative h-[320px] overflow-hidden rounded-[2rem] md:h-[420px]">
                <OptimizedImage
                  src={caseStudy.image}
                  alt={localizedCaseStudy.content.card.title}
                  width={1200}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        </TeamSurfaceHeaderSection>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
              {isRussian ? "Структура кейса" : "Case structure"}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              {isRussian ? "Было → Что сделали → Стало" : "Before -> What we did -> After"}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {storyBlocks.map((item) => (
              <article
                key={item.badge}
                className="rounded-[1.75rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              >
                <span className="inline-flex rounded-full bg-[#f2d48c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-900">
                  {item.badge}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--design-text)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-2 p-4 [--card-radius:1.25rem] [--card-pad:1rem] md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {localizedCaseStudy.content.resultItems.map((item) => (
              <article
                key={item.title}
                className="relative rounded-[var(--card-radius)] border border-[var(--design-text)] bg-[var(--background)] p-[var(--card-pad)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              >
                <span className="absolute right-3 top-0 -translate-y-1/2 rounded-full bg-zinc-900 px-3 py-1 text-sm font-semibold text-[#f5d58d] dark:bg-zinc-100 dark:text-zinc-900">
                  {item.badge}
                </span>
                <h2 className="mt-4 text-xl font-bold text-[var(--design-title)]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--design-title)] md:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] px-3 py-2 md:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            {localizedCaseStudy.content.detailTitle}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {localizedCaseStudy.content.detailItems.map((item) => (
              <article key={item.title} className="border-l border-zinc-500 pl-4">
                <h3 className="mb-3 text-xl font-bold text-[var(--design-title)] md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-base leading-7 text-[var(--design-title)] md:text-lg md:leading-8">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-[2rem] bg-[var(--services-bg)] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {isRussian ? "Доказательства результата" : "Proof of result"}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                {isRussian ? "Аналитика, рост и клиентская обратная связь" : "Analytics, growth, and client feedback"}
              </h2>
              <ul className="mt-5 space-y-3">
                {proof.analytics[isRussian ? "ru" : "en"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[var(--design-text)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#9ab5f6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-[var(--design-muted)]">
                {isRussian
                  ? "Видео-отзыв можно добавить отдельным блоком, когда у клиента будет готовый материал."
                  : "A video testimonial can be added as a dedicated block once the client provides the final asset."}
              </p>
            </div>

            <aside className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {isRussian ? "Отзыв клиента" : "Client review"}
              </p>
              <blockquote className="mt-4 text-lg leading-8 text-[var(--foreground)]">
                “{proof.review.quote[isRussian ? "ru" : "en"]}”
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-[var(--design-text)]">
                {proof.review.author}
              </p>
            </aside>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[var(--background)] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
              E-E-A-T
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              {isRussian ? "Почему этот кейс выглядит достоверно для поисковых систем" : "Why this case study is credible for search engines"}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {eeatItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] bg-[var(--services-bg)] p-5"
                >
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--design-text)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            {isRussian ? "Специалисты проекта" : "Specialists on this project"}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {specialists.map((specialist) => (
              <Link
                key={specialist.id}
                href={`/team/${specialist.id}`}
                className="rounded-[1.75rem] border border-zinc-200/70 bg-[var(--background)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ab5f6] hover:shadow-[0_16px_40px_rgba(23,26,34,0.14)] dark:border-zinc-700/70"
              >
                <div className="relative mb-4 h-36 overflow-hidden rounded-[1.4rem]">
                  <OptimizedImage
                    src={specialist.image}
                    alt={specialist.imageAlt}
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {specialist.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--design-text)]">
                  {specialist.role}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-3 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            {isRussian ? "Скриншоты аналитики и графики роста" : "Analytics snapshots and growth visuals"}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {caseStudy.galleryImages.map((src, index) => (
              <article
                key={`${src}-${index}`}
                className={`relative overflow-hidden rounded-[1.75rem] bg-zinc-200 ${
                  index === 0 ? "col-span-2 row-span-2 min-h-[280px] md:min-h-[420px]" : "min-h-[180px] md:min-h-[200px]"
                }`}
              >
                <OptimizedImage
                  src={src}
                  alt={`${localizedCaseStudy.content.card.title} ${isRussian ? "график" : "growth visual"} ${index + 1}`}
                  width={1200}
                  height={900}
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  className="h-full w-full object-cover"
                />
              </article>
            ))}
          </div>
        </section>

        <RelatedServicesSection
          locale={locale}
          serviceIds={caseStudy.relatedServiceIds}
          title={isRussian ? "Похожие услуги" : "Related services"}
        />
        <PageBottomSections />
      </main>

      <Footer />
    </>
  );
}
