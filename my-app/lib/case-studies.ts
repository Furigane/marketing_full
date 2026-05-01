import type { ServiceId } from "@/lib/services";

export type SupportedCaseStudyLocale = "en" | "ru";

export type CaseStudyId = "silpo" | "nova-bistro" | "luna-clinic" | "atelier-home";

export type CaseStudyCard = {
  title: string;
  category: string;
  description: string;
  price: string;
};

export type CaseStudyLocaleContent = {
  card: CaseStudyCard;
  heroBadge: string;
  heroHighlight: string;
  heroMetric: string;
  heroSubtitle: string;
  heroDescription: string;
  resultItems: Array<{
    badge: string;
    title: string;
    description: string;
  }>;
  detailTitle: string;
  detailItems: Array<{
    title: string;
    body: string;
  }>;
};

export type CaseStudyDefinition = {
  id: CaseStudyId;
  slug: string;
  image: string;
  galleryImages: string[];
  specialistIds: string[];
  relatedServiceIds: ServiceId[];
  locale: Record<SupportedCaseStudyLocale, CaseStudyLocaleContent>;
};

const CASE_STUDIES: CaseStudyDefinition[] = [
  {
    id: "silpo",
    slug: "silpo",
    image: "/img/beautifull-caucasian-woman-with-curly-hair-smiles-isolated 1.png",
    galleryImages: Array.from({ length: 5 }, () => "/img/beautifull-caucasian-woman-with-curly-hair-smiles-isolated 1.png"),
    specialistIds: ["alexey", "maria", "anastasia", "ivan"],
    relatedServiceIds: ["targetedMetaVkTiktok", "smmManagement", "analyticsSetup"],
    locale: {
      en: {
        card: {
          title: "Silpo",
          category: "Retail",
          description: "Integrated promotion for a supermarket chain across Instagram, paid ads, and analytics.",
          price: "300 EUR / month",
        },
        heroBadge: "Retail",
        heroHighlight: "Sales growth",
        heroMetric: "x3.4",
        heroSubtitle: "over 8 months of work",
        heroDescription: "We aligned content, paid traffic, and reporting into a single system so the brand could scale demand without losing control of lead cost and campaign priorities.",
        resultItems: [
          {
            badge: "Analytics",
            title: "Weekly KPI control",
            description: "We tracked reach, lead cost, and revenue contribution each week so budget decisions were based on a stable signal, not on isolated spikes.",
          },
          {
            badge: "Content",
            title: "Steady organic reach",
            description: "A clear content rhythm and stronger production process increased consistency and supported brand trust between ad waves.",
          },
          {
            badge: "Ads",
            title: "Budget efficiency",
            description: "Weak combinations were paused early, while audiences and offers with predictable returns received more spend.",
          },
          {
            badge: "Team",
            title: "Transparent reporting",
            description: "The client always saw what was launched, what changed, and why the next sprint priorities were chosen.",
          },
        ],
        detailTitle: "Project details",
        detailItems: [
          {
            title: "Challenge",
            body: "The company needed not just social media activity but a working system that could connect visibility, traffic, and conversion into one manageable process.",
          },
          {
            title: "Approach",
            body: "We started with audit and tracking cleanup, then rebuilt content production and performance campaigns around concrete weekly hypotheses.",
          },
          {
            title: "Execution",
            body: "Creative testing, audience refinement, and content planning were synchronized instead of running as separate streams with conflicting priorities.",
          },
          {
            title: "Result",
            body: "The business received steadier lead flow, clearer reporting, and a more predictable relationship between ad spend and commercial outcome.",
          },
        ],
      },
      ru: {
        card: {
          title: "Сильпо",
          category: "Розничная торговля",
          description: "Комплексное продвижение сети супермаркетов через Instagram, рекламу и аналитику.",
          price: "300 EUR / месяц",
        },
        heroBadge: "Розничная торговля",
        heroHighlight: "Рост продаж",
        heroMetric: "×3.4",
        heroSubtitle: "за 8 месяцев работы",
        heroDescription: "Мы связали контент, платный трафик и отчётность в одну систему, чтобы бренд мог масштабировать спрос без потери контроля над CPL и приоритетами кампаний.",
        resultItems: [
          {
            badge: "Аналитика",
            title: "Контроль KPI по неделям",
            description: "Фиксировали охват, стоимость лида и вклад рекламы в выручку, чтобы решения по бюджету принимались по устойчивому сигналу, а не по отдельным всплескам.",
          },
          {
            badge: "Контент",
            title: "Стабильный органический охват",
            description: "Понятный ритм публикаций и более сильный продакшн повысили стабильность канала и поддержали доверие к бренду между рекламными волнами.",
          },
          {
            badge: "Реклама",
            title: "Эффективность бюджета",
            description: "Слабые связки отключались рано, а аудитории и офферы с предсказуемой отдачей получали больше бюджета.",
          },
          {
            badge: "Команда",
            title: "Прозрачная отчётность",
            description: "Клиент всегда видел, что запущено, что изменилось и почему именно такие приоритеты выбраны на следующий спринт.",
          },
        ],
        detailTitle: "Подробности проекта",
        detailItems: [
          {
            title: "Задача",
            body: "Компании нужна была не просто активность в соцсетях, а рабочая система, которая связывает узнаваемость, трафик и конверсию в один управляемый процесс.",
          },
          {
            title: "Подход",
            body: "Мы начали с аудита и чистки аналитики, затем пересобрали контент-процесс и performance-кампании вокруг конкретных еженедельных гипотез.",
          },
          {
            title: "Реализация",
            body: "Тесты креативов, работа с аудиториями и контент-планирование шли синхронно, а не как отдельные несвязанные потоки.",
          },
          {
            title: "Результат",
            body: "Бизнес получил более стабильный поток заявок, понятную отчётность и предсказуемую связь между рекламным бюджетом и коммерческим результатом.",
          },
        ],
      },
    },
  },
  {
    id: "nova-bistro",
    slug: "nova-bistro",
    image: "/img/Frame 189 (1) 1.jpg",
    galleryImages: Array.from({ length: 5 }, () => "/img/Frame 189 (1) 1.jpg"),
    specialistIds: ["maria", "anastasia", "ivan"],
    relatedServiceIds: ["smmManagement", "videoProduction", "influencerAds"],
    locale: {
      en: {
        card: {
          title: "Nova Bistro",
          category: "HoReCa",
          description: "Restaurant launch support through content, creator collaborations, and local promotion.",
          price: "420 EUR / month",
        },
        heroBadge: "HoReCa",
        heroHighlight: "Audience growth",
        heroMetric: "18K",
        heroSubtitle: "local followers in 5 months",
        heroDescription: "The project combined content production, creator integrations, and local audience work so the restaurant could open with attention already built around it.",
        resultItems: [
          { badge: "SMM", title: "Launch rhythm", description: "The channel entered the market with a consistent publishing cadence instead of sporadic opening-day activity." },
          { badge: "Creators", title: "Relevant collaborations", description: "We focused on local creators whose audiences were geographically and contextually aligned with the venue." },
          { badge: "Video", title: "Visual appetite", description: "Short-form food and atmosphere videos became the main attention format during launch weeks." },
          { badge: "Local", title: "Offline impact", description: "Online content was tied to reservations, events, and foot traffic priorities instead of generic reach targets." },
        ],
        detailTitle: "Project details",
        detailItems: [
          { title: "Challenge", body: "The restaurant needed to build recognition fast in a crowded local market before word of mouth could sustain demand." },
          { title: "Approach", body: "We combined launch content, creator collaborations, and city-focused amplification around specific opening moments and offers." },
          { title: "Execution", body: "Visual content production, story mechanics, and partner publications were managed as one rollout instead of separate disconnected activities." },
          { title: "Result", body: "The brand entered the market with stronger awareness, clearer social proof, and better conversion from content attention to real visits." },
        ],
      },
      ru: {
        card: {
          title: "Nova Bistro",
          category: "HoReCa",
          description: "Запуск ресторана через контент, интеграции с блогерами и локальное продвижение.",
          price: "420 EUR / месяц",
        },
        heroBadge: "HoReCa",
        heroHighlight: "Рост аудитории",
        heroMetric: "18K",
        heroSubtitle: "локальных подписчиков за 5 месяцев",
        heroDescription: "Проект объединил контент-продакшн, интеграции с блогерами и работу с локальной аудиторией, чтобы ресторан вышел на рынок уже с накопленным вниманием.",
        resultItems: [
          { badge: "SMM", title: "Ритм запуска", description: "Канал стартовал с системной публикационной сеткой, а не с хаотичной активностью только в день открытия." },
          { badge: "Блогеры", title: "Релевантные интеграции", description: "Мы выбрали локальных авторов, чья аудитория совпадала с географией и контекстом заведения." },
          { badge: "Видео", title: "Сильный визуал", description: "Короткие food- и atmosphere-видео стали основным форматом привлечения внимания в период запуска." },
          { badge: "Локально", title: "Связь с офлайном", description: "Онлайн-контент был завязан на брони, события и трафик в заведение, а не на абстрактный охват." },
        ],
        detailTitle: "Подробности проекта",
        detailItems: [
          { title: "Задача", body: "Ресторану нужно было быстро собрать узнаваемость на локальном рынке до того, как спрос начнёт поддерживаться сарафанным эффектом." },
          { title: "Подход", body: "Мы объединили контент запуска, интеграции с блогерами и локальное усиление вокруг конкретных моментов открытия и офферов." },
          { title: "Реализация", body: "Продакшн визуала, сторис-механики и партнёрские публикации управлялись как единый rollout, а не как набор отдельных действий." },
          { title: "Результат", body: "Бренд вышел на рынок с более сильной узнаваемостью, понятным социальным доказательством и лучшей конверсией внимания в реальные визиты." },
        ],
      },
    },
  },
  {
    id: "luna-clinic",
    slug: "luna-clinic",
    image: "/img/Group 76 (1) 1.png",
    galleryImages: Array.from({ length: 5 }, () => "/img/Group 76 (1) 1.png"),
    specialistIds: ["arina", "alexey", "elizaveta"],
    relatedServiceIds: ["seoPromotion", "contextGoogleYandex", "copywriting"],
    locale: {
      en: {
        card: {
          title: "Luna Clinic",
          category: "Healthcare",
          description: "Demand generation for a clinic through search, landing page refinement, and analytics cleanup.",
          price: "560 EUR / month",
        },
        heroBadge: "Healthcare",
        heroHighlight: "Lead quality",
        heroMetric: "+62%",
        heroSubtitle: "qualified requests in 6 months",
        heroDescription: "Search demand and landing pages were restructured so the clinic could receive better-qualified patient requests with less wasted budget.",
        resultItems: [
          { badge: "SEO", title: "Relevant visibility", description: "We prioritized pages and clusters that matched high-intent patient searches instead of broad informational traffic." },
          { badge: "Search", title: "Paid demand capture", description: "Campaigns focused on commercial queries and cleaner routing to the right service pages." },
          { badge: "Content", title: "Sharper messaging", description: "Website copy was revised around trust, specializations, and what matters at the decision stage." },
          { badge: "Data", title: "Reliable reporting", description: "Tracking cleanup made it easier to distinguish low-quality form fills from actual consultation demand." },
        ],
        detailTitle: "Project details",
        detailItems: [
          { title: "Challenge", body: "The clinic was receiving traffic, but too much of it was weakly qualified and hard to attribute correctly across channels." },
          { title: "Approach", body: "We reworked search demand capture and page relevance in parallel, instead of trying to fix media performance in isolation." },
          { title: "Execution", body: "Keyword structure, ad routing, page content, and analytics were updated together so the funnel became more coherent." },
          { title: "Result", body: "The clinic received fewer empty requests, stronger search visibility for target services, and better confidence in reporting." },
        ],
      },
      ru: {
        card: {
          title: "Luna Clinic",
          category: "Healthcare",
          description: "Привлечение спроса для клиники через поиск, доработку посадочных страниц и аналитику.",
          price: "560 EUR / месяц",
        },
        heroBadge: "Healthcare",
        heroHighlight: "Качество лидов",
        heroMetric: "+62%",
        heroSubtitle: "квалифицированных обращений за 6 месяцев",
        heroDescription: "Мы пересобрали работу с поисковым спросом и посадочными страницами так, чтобы клиника получала более качественные обращения и меньше пустых затрат.",
        resultItems: [
          { badge: "SEO", title: "Релевантная видимость", description: "Приоритет получили страницы и кластеры, совпадающие с коммерческими медицинскими запросами, а не абстрактный информационный трафик." },
          { badge: "Поиск", title: "Захват платного спроса", description: "Кампании были сфокусированы на коммерческих запросах и более чистой маршрутизации пользователя на нужные услуги." },
          { badge: "Контент", title: "Точнее месседж", description: "Тексты сайта были переписаны вокруг доверия, специализаций и факторов принятия решения." },
          { badge: "Данные", title: "Надёжная отчётность", description: "Чистка аналитики позволила отличать слабые заявки от реального спроса на консультации." },
        ],
        detailTitle: "Подробности проекта",
        detailItems: [
          { title: "Задача", body: "Клиника уже получала трафик, но значительная его часть давала слабые обращения и плохо атрибутировалась между каналами." },
          { title: "Подход", body: "Мы одновременно пересобрали захват спроса в поиске и релевантность страниц, а не пытались лечить рекламу отдельно от сайта." },
          { title: "Реализация", body: "Структура запросов, маршрутизация объявлений, контент страниц и аналитика обновлялись синхронно, чтобы воронка стала цельной." },
          { title: "Результат", body: "Клиника получила меньше пустых заявок, сильнее видимость по нужным услугам и более уверенную отчётность по каналам." },
        ],
      },
    },
  },
  {
    id: "atelier-home",
    slug: "atelier-home",
    image: "/img/Frame189(1)1.png",
    galleryImages: Array.from({ length: 5 }, () => "/img/Frame189(1)1.png"),
    specialistIds: ["anastasia", "ivan", "elizaveta"],
    relatedServiceIds: ["websiteRedesign", "brandIdentity", "presentationDesign"],
    locale: {
      en: {
        card: {
          title: "Atelier Home",
          category: "Interior",
          description: "Brand and website refresh for a premium interior studio entering a new market segment.",
          price: "690 EUR / project",
        },
        heroBadge: "Interior",
        heroHighlight: "Premium repositioning",
        heroMetric: "new",
        heroSubtitle: "digital presentation system",
        heroDescription: "The studio needed a cleaner premium language across website, presentations, and brand materials before entering higher-budget conversations.",
        resultItems: [
          { badge: "Brand", title: "Clearer identity", description: "We refined typography, tone, and visual hierarchy so the brand looked more coherent and premium." },
          { badge: "Web", title: "Stronger website logic", description: "The site structure shifted from portfolio dumping to service-led storytelling with clearer conversion points." },
          { badge: "Sales", title: "Presentation support", description: "Commercial decks and brand materials were aligned with the new positioning for client meetings." },
          { badge: "Process", title: "Reusable system", description: "The business received a set of rules and assets that the team can keep applying without losing consistency." },
        ],
        detailTitle: "Project details",
        detailItems: [
          { title: "Challenge", body: "The studio's work quality was high, but the digital presentation under-sold that level and made premium positioning harder." },
          { title: "Approach", body: "We updated the identity system and site narrative together so the repositioning was visible across all first-touch materials." },
          { title: "Execution", body: "Brand rules, web blocks, and presentation templates were rebuilt around clarity, restraint, and trust-building." },
          { title: "Result", body: "The studio entered new sales conversations with stronger visual consistency and a more convincing premium presentation." },
        ],
      },
      ru: {
        card: {
          title: "Atelier Home",
          category: "Интерьеры",
          description: "Обновление бренда и сайта для интерьерной студии, выходящей в более премиальный сегмент.",
          price: "690 EUR / проект",
        },
        heroBadge: "Интерьеры",
        heroHighlight: "Премиальное позиционирование",
        heroMetric: "new",
        heroSubtitle: "цифровая система подачи",
        heroDescription: "Студии нужен был более чистый премиальный язык на сайте, в презентациях и бренд-материалах перед выходом в более высокий ценовой сегмент.",
        resultItems: [
          { badge: "Бренд", title: "Более цельная айдентика", description: "Мы уточнили типографику, тональность и визуальную иерархию, чтобы бренд выглядел собраннее и дороже." },
          { badge: "Сайт", title: "Сильнее логика сайта", description: "Структура сайта ушла от простой витрины проектов к сервисной подаче с понятными точками конверсии." },
          { badge: "Продажи", title: "Поддержка презентаций", description: "Коммерческие презентации и бренд-материалы были приведены в одну систему для клиентских встреч." },
          { badge: "Процесс", title: "Переиспользуемая система", description: "Команда получила набор правил и ассетов, которые можно использовать дальше без потери консистентности." },
        ],
        detailTitle: "Подробности проекта",
        detailItems: [
          { title: "Задача", body: "Качество работ студии было высоким, но цифровая подача занижала восприятие бренда и мешала премиальному позиционированию." },
          { title: "Подход", body: "Мы обновили айдентику и логику сайта одновременно, чтобы новое позиционирование было видно во всех материалах первого касания." },
          { title: "Реализация", body: "Правила бренда, веб-блоки и презентационные шаблоны пересобирались вокруг ясности, сдержанности и доверия." },
          { title: "Результат", body: "Студия вышла в новые продажи с более сильной визуальной цельностью и убедительной премиальной подачей." },
        ],
      },
    },
  },
];

function normalizeLocale(locale: string): SupportedCaseStudyLocale {
  return locale.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function getCaseStudies() {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((item) => item.slug === slug);
}

export function getLocalizedCaseStudy(caseStudy: CaseStudyDefinition, locale: string) {
  return {
    ...caseStudy,
    content: caseStudy.locale[normalizeLocale(locale)],
  };
}

export function getLocalizedCaseStudies(locale: string) {
  return CASE_STUDIES.map((item) => getLocalizedCaseStudy(item, locale));
}
