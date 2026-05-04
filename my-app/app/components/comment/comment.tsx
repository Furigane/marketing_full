"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";

import { normalizeSiteLocale } from "@/lib/site-locales";

type ReviewItem = {
  service: string;
  name: string;
  role: string;
  title: string;
  body: string;
};

type CarouselItem = {
  key: string;
  realIndex: number;
  review: ReviewItem;
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

const DESKTOP_GAP_PX = 16;
const MOBILE_GAP_PX = 12;
const SLIDE_DURATION_MS = 560;

function getWrappedIndex(index: number, length: number) {
  return (index + length) % length;
}

function ReviewCard({
  review,
  badge,
  active,
}: {
  review: ReviewItem;
  badge: string;
  active: boolean;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-[2rem] bg-[#2b2b2b] p-6 text-white shadow transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:p-8 ${
        active ? "scale-100 opacity-100 blur-0" : "scale-[0.965] opacity-70 blur-[0.2px]"
      }`}
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

        <h3 className="max-w-4xl text-[2rem] font-extrabold leading-tight text-white lg:text-[2.25rem]">
          {review.title}
        </h3>
        <p className="mt-4 max-w-5xl text-lg font-medium leading-[1.7] text-white/85 lg:text-[1.15rem]">
          {review.body}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <span className="text-4xl font-extrabold text-white lg:text-5xl">5.0</span>
        <span className="text-3xl tracking-[0.15em] text-[#f2d48c] lg:text-4xl">
          {"★★★★★"}
        </span>
      </div>
    </article>
  );
}

export default function Comment() {
  const locale = normalizeSiteLocale(useLocale());
  const copy = SECTION_COPY[locale];
  const viewportRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const resetFrameRef = useRef<number | null>(null);

  const carouselItems = useMemo<CarouselItem[]>(() => {
    const first = REVIEWS[0];
    const last = REVIEWS[REVIEWS.length - 1];

    return [
      { key: `clone-start-${REVIEWS.length - 1}`, realIndex: REVIEWS.length - 1, review: last },
      ...REVIEWS.map((review, index) => ({
        key: `review-${index}`,
        realIndex: index,
        review,
      })),
      { key: "clone-end-0", realIndex: 0, review: first },
    ];
  }, []);

  const [position, setPosition] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [measurements, setMeasurements] = useState({
    viewportWidth: 0,
    desktopCardWidth: 0,
    mobileCardWidth: 0,
  });

  const activeIndex = getWrappedIndex(position - 1, REVIEWS.length);

  const updateMeasurements = useCallback(() => {
    const viewport = viewportRef.current;
    const desktopTrack = desktopTrackRef.current;
    const mobileTrack = mobileTrackRef.current;

    if (!viewport || !desktopTrack || !mobileTrack) return;

    const desktopCard = desktopTrack.querySelector<HTMLElement>("[data-desktop-card='true']");
    const mobileCard = mobileTrack.querySelector<HTMLElement>("[data-mobile-card='true']");

    if (!desktopCard || !mobileCard) return;

    setMeasurements({
      viewportWidth: viewport.clientWidth,
      desktopCardWidth: desktopCard.getBoundingClientRect().width,
      mobileCardWidth: mobileCard.getBoundingClientRect().width,
    });
    setIsReady(true);
  }, []);

  useEffect(() => {
    updateMeasurements();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      updateMeasurements();
    });

    observer.observe(viewport);
    window.addEventListener("resize", updateMeasurements);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [updateMeasurements]);

  useEffect(() => {
    if (!isReady) return;

    const id = window.requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => window.cancelAnimationFrame(id);
  }, [isReady]);

  useEffect(() => {
    return () => {
      if (resetFrameRef.current !== null) {
        window.cancelAnimationFrame(resetFrameRef.current);
      }
    };
  }, []);

  const goToPosition = (nextPosition: number) => {
    setPosition(nextPosition);
  };

  const showPrev = () => {
    goToPosition(position - 1);
  };

  const showNext = () => {
    goToPosition(position + 1);
  };

  const showByDot = (targetIndex: number) => {
    goToPosition(targetIndex + 1);
  };

  const handleTrackTransitionEnd = () => {
    if (position !== 0 && position !== REVIEWS.length + 1) return;

    setTransitionEnabled(false);
    setPosition(position === 0 ? REVIEWS.length : 1);

    resetFrameRef.current = window.requestAnimationFrame(() => {
      setTransitionEnabled(true);
      resetFrameRef.current = null;
    });
  };

  const desktopOffset =
    measurements.viewportWidth > 0 && measurements.desktopCardWidth > 0
      ? measurements.viewportWidth / 2 -
        measurements.desktopCardWidth / 2 -
        position * (measurements.desktopCardWidth + DESKTOP_GAP_PX)
      : 0;

  const mobileOffset =
    measurements.viewportWidth > 0 && measurements.mobileCardWidth > 0
      ? measurements.viewportWidth / 2 -
        measurements.mobileCardWidth / 2 -
        position * (measurements.mobileCardWidth + MOBILE_GAP_PX)
      : 0;

  const desktopTrackStyle = {
    transform: `translate3d(${desktopOffset}px, 0, 0)`,
    transitionProperty: "transform",
    transitionDuration: transitionEnabled ? `${SLIDE_DURATION_MS}ms` : "0ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  } as const;

  const mobileTrackStyle = {
    transform: `translate3d(${mobileOffset}px, 0, 0)`,
    transitionProperty: "transform",
    transitionDuration: transitionEnabled ? `${SLIDE_DURATION_MS}ms` : "0ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  } as const;

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

      <div ref={viewportRef} className="relative overflow-hidden">
        <div className="lg:hidden">
          <div
            ref={mobileTrackRef}
            className="flex items-stretch gap-3 will-change-transform"
            style={{
              ...mobileTrackStyle,
              opacity: isReady ? 1 : 0,
            }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {carouselItems.map((item, index) => (
              <div
                key={`mobile-${item.key}`}
                data-mobile-card="true"
                className="w-[92vw] min-w-[92vw] max-w-[92vw] shrink-0"
              >
                <ReviewCard
                  review={item.review}
                  badge={copy.badge}
                  active={index === position}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div
            ref={desktopTrackRef}
            className="flex items-stretch gap-4 will-change-transform"
            style={{
              ...desktopTrackStyle,
              opacity: isReady ? 1 : 0,
            }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {carouselItems.map((item, index) => (
              <div
                key={`desktop-${item.key}`}
                data-desktop-card="true"
                className="w-[80vw] min-w-[820px] max-w-[1060px] shrink-0"
              >
                <ReviewCard
                  review={item.review}
                  badge={copy.badge}
                  active={index === position}
                />
              </div>
            ))}
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
            onClick={() => showByDot(index)}
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
