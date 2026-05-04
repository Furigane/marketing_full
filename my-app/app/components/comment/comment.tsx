"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

import { normalizeSiteLocale } from "@/lib/site-locales";

type ReviewItem = {
  service: string;
  name: string;
  role: string;
  title: string;
  body: string;
};

const REVIEWS: ReviewItem[] = [
  {
    service: "Маркетинговая стратегия",
    name: "Елена С.",
    role: "Founder",
    title: "Появился системный подход",
    body:
      "Обращались за разработкой маркетинговой стратегии. До этого действовали скорее интуитивно, без четкого плана. Здесь помогли разложить все по полочкам: аудитория, каналы, воронка. Стало гораздо понятнее, куда двигаться, и наконец появился системный подход.",
  },
  {
    service: "Брендинг и айдентика",
    name: "Игорь П.",
    role: "Brand owner",
    title: "Стиль действительно отражает бизнес",
    body:
      "Делали полный брендинг с нуля. Очень понравилось, что не просто нарисовали логотип, а глубоко погрузились в продукт и позиционирование. В итоге получился стиль, который действительно отражает наш бизнес.",
  },
  {
    service: "UX/UI дизайн",
    name: "Мария К.",
    role: "Project lead",
    title: "Изменения сразу отразились на заявках",
    body:
      "Заказывали UX/UI для сайта. Было много проблем с удобством, пользователи терялись. После переработки интерфейса стало гораздо проще, и это сразу отразилось на заявках. Видно, что дизайн делали не на глаз, а с пониманием логики.",
  },
  {
    service: "Веб-разработка",
    name: "Антон Л.",
    role: "Operations manager",
    title: "Сайт запустили без лишних проблем",
    body:
      "Делали сайт под ключ. Понравилось, что все процессы четко выстроены: от структуры до запуска. Сайт получился быстрый, удобный и без багов. После запуска сразу начали получать заявки.",
  },
  {
    service: "Product / Software development",
    name: "Дмитрий В.",
    role: "Product owner",
    title: "Сэкономили время и деньги на разработке",
    body:
      "Обращались за разработкой продукта SaaS. Помогли не только с технической частью, но и с логикой самого продукта. Это сильно сэкономило время и деньги на этапе разработки.",
  },
  {
    service: "Mobile development",
    name: "Ольга Т.",
    role: "Startup founder",
    title: "Приложение получилось лучше ожиданий",
    body:
      "Разрабатывали мобильное приложение. Команда сразу предложила более удобные решения по функционалу, чем мы изначально планировали. В итоге приложение получилось намного лучше, чем ожидали.",
  },
  {
    service: "Контент-маркетинг",
    name: "Наталья Р.",
    role: "Marketing lead",
    title: "Контент начал реально работать",
    body:
      "Заказывали контент для сайта и блога. До этого тексты были ни о чем, сейчас же они реально работают: пошел трафик, появились заявки. Видно, что тексты пишутся не просто ради текста, а под задачу.",
  },
  {
    service: "SMM и соцсети",
    name: "Сергей М.",
    role: "Co-founder",
    title: "Появились рост и входящие заявки",
    body:
      "Вели нам соцсети и запускали рекламу. Раньше просто выкладывали посты без результата, сейчас появился рост подписчиков и заявки. Понравилось, что есть стратегия, а не хаотичные действия.",
  },
  {
    service: "SEO-продвижение",
    name: "Виктория Н.",
    role: "CEO",
    title: "Рост трафика стал стабильным",
    body:
      "Работаем по SEO уже несколько месяцев. Сначала были сомнения, но сейчас видим стабильный рост трафика. Особенно понравилось, что все объясняют и показывают результат, а не просто делают SEO.",
  },
  {
    service: "AI и автоматизация",
    name: "Роман Г.",
    role: "Operations lead",
    title: "Снизили нагрузку на команду",
    body:
      "Внедряли AI и автоматизацию процессов. Раньше много задач делали вручную, сейчас все работает намного быстрее. Это реально снизило нагрузку на команду и упростило работу.",
  },
];

const SECTION_COPY = {
  ru: {
    eyebrow: "Отзывы",
    title: "Что клиенты говорят о нашей работе",
    badge: "Проверенный отзыв",
    prev: "Предыдущий отзыв",
    next: "Следующий отзыв",
  },
  en: {
    eyebrow: "Reviews",
    title: "What clients say about our work",
    badge: "Verified review",
    prev: "Previous review",
    next: "Next review",
  },
  fr: {
    eyebrow: "Avis",
    title: "Ce que les clients disent de notre travail",
    badge: "Avis verifie",
    prev: "Avis precedent",
    next: "Avis suivant",
  },
  de: {
    eyebrow: "Bewertungen",
    title: "Was Kunden uber unsere Arbeit sagen",
    badge: "Verifizierte Bewertung",
    prev: "Vorherige Bewertung",
    next: "Nachste Bewertung",
  },
  ar: {
    eyebrow: "آراء",
    title: "ماذا يقول العملاء عن عملنا",
    badge: "مراجعة موثقة",
    prev: "المراجعة السابقة",
    next: "المراجعة التالية",
  },
} as const;

function getWrappedIndex(index: number, length: number) {
  return (index + length) % length;
}

function ReviewCard({
  review,
  badge,
  side = false,
}: {
  review: ReviewItem;
  badge: string;
  side?: boolean;
}) {
  return (
    <article
      className={
        side
          ? "flex h-full w-[24vw] min-w-[280px] max-w-[340px] shrink-0 flex-col rounded-[2rem] bg-[#2b2b2b] p-6 text-white opacity-88 shadow lg:p-7"
          : "flex h-full w-full min-w-0 flex-col rounded-[2rem] bg-[#2b2b2b] p-6 text-white shadow lg:p-8"
      }
    >
      <div className="relative flex-1">
        <span className="absolute right-0 top-0 rounded-full bg-[#191919] px-4 py-1.5 text-sm font-semibold text-[#f2d48c]">
          {badge}
        </span>

        <div className="mb-6 flex items-center gap-4 pr-24">
          <div className="h-14 w-14 rounded-full bg-[#d9d9df]" />
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold leading-tight text-white">
              {review.name}
            </p>
            <p className="mt-1 truncate text-base leading-tight text-white/75">
              {review.role}
            </p>
          </div>
        </div>

        <p className="mb-4 inline-flex max-w-full rounded-full bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/80">
          <span className="truncate">{review.service}</span>
        </p>

        <h3
          className={
            side
              ? "line-clamp-3 text-[1.1rem] font-extrabold leading-tight text-white"
              : "max-w-4xl text-[2rem] font-extrabold leading-tight text-white lg:text-[2.25rem]"
          }
        >
          {review.title}
        </h3>
        <p
          className={
            side
              ? "mt-4 line-clamp-4 text-base font-medium leading-7 text-white/85"
              : "mt-4 max-w-5xl text-lg font-medium leading-[1.7] text-white/85 lg:text-[1.15rem]"
          }
        >
          {review.body}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <span className={side ? "text-[3.2rem] font-extrabold text-white" : "text-4xl font-extrabold text-white lg:text-5xl"}>
          5.0
        </span>
        <span className={side ? "text-[1.85rem] tracking-[0.12em] text-[#f2d48c]" : "text-3xl tracking-[0.15em] text-[#f2d48c] lg:text-4xl"}>
          {"★★★★★"}
        </span>
      </div>
    </article>
  );
}

export default function Comment() {
  const locale = normalizeSiteLocale(useLocale());
  const copy = SECTION_COPY[locale];
  const [activeIndex, setActiveIndex] = useState(0);

  const indices = useMemo(() => {
    const prevIndex = getWrappedIndex(activeIndex - 1, REVIEWS.length);
    const nextIndex = getWrappedIndex(activeIndex + 1, REVIEWS.length);

    return {
      prev: prevIndex,
      current: activeIndex,
      next: nextIndex,
    };
  }, [activeIndex]);

  const showPrev = () => {
    setActiveIndex((current) => getWrappedIndex(current - 1, REVIEWS.length));
  };

  const showNext = () => {
    setActiveIndex((current) => getWrappedIndex(current + 1, REVIEWS.length));
  };

  return (
    <section className="mt-8 px-2 py-6 lg:px-6 lg:py-8">
      <div className="mb-5 px-2 lg:px-0">
        <span className="inline-flex rounded-full bg-[var(--hero-span)] px-3 py-1 text-sm font-semibold text-[var(--design-title)]">
          {copy.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[var(--foreground)] lg:text-4xl">
          {copy.title}
        </h2>
      </div>

      <div className="relative">
        <div className="lg:hidden">
          <ReviewCard review={REVIEWS[indices.current]} badge={copy.badge} />
        </div>

        <div className="hidden overflow-hidden lg:block">
          <div className="flex justify-center">
            <div className="flex w-max items-stretch gap-4">
              <ReviewCard review={REVIEWS[indices.prev]} badge={copy.badge} side />
              <div className="w-[74vw] min-w-[860px] max-w-[1100px] shrink-0">
                <ReviewCard review={REVIEWS[indices.current]} badge={copy.badge} />
              </div>
              <ReviewCard review={REVIEWS[indices.next]} badge={copy.badge} side />
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={copy.prev}
          onClick={showPrev}
          className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-zinc-900 shadow-lg transition-transform hover:scale-105 lg:grid"
        >
          {"\u2190"}
        </button>
        <button
          type="button"
          aria-label={copy.next}
          onClick={showNext}
          className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-zinc-900 shadow-lg transition-transform hover:scale-105 lg:grid"
        >
          {"\u2192"}
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {REVIEWS.map((review, index) => (
          <button
            key={`${review.name}-${index}`}
            type="button"
            aria-label={`${copy.eyebrow} ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={
              index === activeIndex
                ? "h-3 w-8 rounded-full bg-zinc-900 dark:bg-white"
                : "h-3 w-3 rounded-full border-2 border-zinc-900 dark:border-white"
            }
          />
        ))}
      </div>
    </section>
  );
}
