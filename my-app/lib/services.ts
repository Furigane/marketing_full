import { getDefaultContentLocale } from "@/lib/site-locales";
import { repairEncodedTree } from "@/lib/text-encoding";

export const SERVICE_SECTIONS = ["popular", "middle", "rare"] as const;

export type ServiceSectionId = (typeof SERVICE_SECTIONS)[number];

export type SupportedServiceLocale = "en" | "ru";

export type ServiceId =
  | "targetedMetaVkTiktok"
  | "contextGoogleYandex"
  | "seoPromotion"
  | "corporateWebsite"
  | "smmManagement"
  | "adCreatives"
  | "copywriting"
  | "analyticsSetup"
  | "emailMarketing"
  | "websiteRedesign"
  | "uxUiDesign"
  | "abTesting"
  | "marketplacePromotion"
  | "onlineStoreCreation"
  | "influencerAds"
  | "videoProduction"
  | "crmAutomation"
  | "localSeo"
  | "logoDesign"
  | "brandIdentity"
  | "prPublications"
  | "brandbook"
  | "marketingResearch"
  | "businessPhotography"
  | "presentationDesign"
  | "chatbots"
  | "quizLandingPages";

export type ServiceLocaleContent = {
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
};

export type ServiceDefinition = {
  id: ServiceId;
  slug: string;
  section: ServiceSectionId;
  icon: string;
  specialistIds: string[];
  relatedIds: ServiceId[];
  locale: Record<SupportedServiceLocale, ServiceLocaleContent>;
};

const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  {
    id: "targetedMetaVkTiktok",
    slug: "targeted-ads-meta-vk-tiktok",
    section: "popular",
    icon: "/often/trend-up.svg",
    specialistIds: ["leo-carter-performance-marketing", "max-turner-paid-media", "lina-hayes-visual-designer"],
    relatedIds: ["adCreatives", "analyticsSetup", "contextGoogleYandex"],
    locale: {
      en: {
        title: "Targeted ads for Meta, VK, and TikTok",
        summary: "Paid social campaigns built around clear offers, qualified audiences, and stable lead economics.",
        description: "We launch and optimize paid campaigns across Meta, VK, and TikTok with a focus on lead quality, not vanity clicks. The work starts with audience segmentation, offer testing, tracking validation, and creative rotation. Then we scale only the combinations that hold target CPL and conversion quality.",
        deliverables: [
          "Campaign structure by funnel stage and audience temperature",
          "Creative testing matrix with audience and offer hypotheses",
          "Weekly optimization of budgets, placements, and lead quality",
        ],
      },
      ru: {
        title: "Таргетированная реклама Meta, VK и TikTok",
        summary: "Платные соцсети с упором на заявки, понятные гипотезы и контролируемую стоимость лида.",
        description: "Мы запускаем и ведём рекламные кампании в Meta, VK и TikTok так, чтобы реклама давала не просто охват, а качественные заявки. Работа начинается с сегментации аудиторий, проверки офферов, настройки аналитики и тестирования креативов. Масштабируем только те связки, которые удерживают нужный CPL и качество лидов.",
        deliverables: [
          "Структура кампаний по этапам воронки и типам аудиторий",
          "Матрица тестов по офферам, аудиториям и креативам",
          "Еженедельная оптимизация бюджета, плейсментов и качества заявок",
        ],
      },
    },
  },
  {
    id: "contextGoogleYandex",
    slug: "google-ads-yandex-direct",
    section: "popular",
    icon: "/often/search-normal.svg",
    specialistIds: ["leo-carter-performance-marketing", "evan-brooks-seo-strategist"],
    relatedIds: ["analyticsSetup", "corporateWebsite", "seoPromotion"],
    locale: {
      en: {
        title: "Google Ads and Yandex Direct",
        summary: "Search demand capture for users who already need your product or service.",
        description: "We build paid search campaigns around commercial intent, query clustering, and landing page relevance. The goal is to capture active demand efficiently, keep wasted spend low, and continuously improve the path from search query to conversion.",
        deliverables: [
          "Keyword structure split by intent, brand, and service cluster",
          "Ad copy, extensions, and negatives tuned for conversion quality",
          "Bid, budget, and search term optimization with reporting",
        ],
      },
      ru: {
        title: "Контекстная реклама Google Ads и Яндекс Директ",
        summary: "Забираем горячий спрос из поиска и ведём его на релевантные посадочные страницы.",
        description: "Мы выстраиваем поисковые кампании вокруг коммерческого спроса, кластеризации запросов и релевантных посадочных страниц. Цель работы — получать заявки из уже сформированного спроса, сокращать нецелевые расходы и постепенно улучшать путь пользователя от запроса до конверсии.",
        deliverables: [
          "Семантическая структура по намерению, бренду и группе услуг",
          "Объявления, расширения и минус-слова под конверсию, а не клики",
          "Оптимизация ставок, бюджета и поисковых запросов с отчётностью",
        ],
      },
    },
  },
  {
    id: "seoPromotion",
    slug: "seo-promotion",
    section: "popular",
    icon: "/often/gps.svg",
    specialistIds: ["evan-brooks-seo-strategist", "ella-stone-content-strategist"],
    relatedIds: ["localSeo", "copywriting", "analyticsSetup"],
    locale: {
      en: {
        title: "SEO promotion",
        summary: "Technical, semantic, and content work that compounds into long-term search traffic.",
        description: "SEO work covers technical audits, keyword mapping, content requirements, and internal linking priorities. We focus on demand that matters to revenue, improve the quality of pages that capture that demand, and build a growth backlog that development and content can execute in order.",
        deliverables: [
          "Technical audit with fixes prioritized by impact",
          "Keyword map and landing page recommendations",
          "On-page and internal linking tasks with visibility reporting",
        ],
      },
      ru: {
        title: "SEO-продвижение сайта",
        summary: "Техническая, семантическая и контентная работа, которая даёт устойчивый органический рост.",
        description: "SEO включает технический аудит, распределение поискового спроса по страницам, требования к контенту и внутренней перелинковке. Мы работаем не ради формального роста позиций, а ради спроса, который влияет на продажи, и собираем понятный backlog задач для разработки и контента.",
        deliverables: [
          "Технический аудит с приоритизацией правок по влиянию",
          "Карта семантики и рекомендации по посадочным страницам",
          "On-page задачи и перелинковка с отчётностью по видимости",
        ],
      },
    },
  },
  {
    id: "corporateWebsite",
    slug: "corporate-website-development",
    section: "popular",
    icon: "/often/monitor-mobbile.svg",
    specialistIds: ["lina-hayes-visual-designer", "noah-reed-project-manager", "ella-stone-content-strategist"],
    relatedIds: ["copywriting", "uxUiDesign", "analyticsSetup"],
    locale: {
      en: {
        title: "Corporate website development",
        summary: "A structured company website that explains the offer clearly and supports lead generation.",
        description: "We design and build corporate websites with clear service architecture, conversion-focused blocks, and a content structure that sales teams can actually use. The site becomes a working commercial asset rather than a placeholder brochure.",
        deliverables: [
          "Site map, wireframes, and content structure",
          "Responsive design and front-end implementation",
          "Analytics, forms, and lead-routing setup",
        ],
      },
      ru: {
        title: "Создание корпоративного сайта",
        summary: "Корпоративный сайт с понятной структурой, сильной подачей услуг и фокусом на заявки.",
        description: "Мы проектируем и собираем корпоративные сайты так, чтобы они ясно объясняли предложение компании и поддерживали продажи. Это не витрина ради присутствия, а рабочий коммерческий инструмент с продуманной структурой, формами и аналитикой.",
        deliverables: [
          "Карта сайта, прототипы и структура контента",
          "Адаптивный дизайн и фронтенд-реализация",
          "Подключение аналитики, форм и логики сбора заявок",
        ],
      },
    },
  },
  {
    id: "smmManagement",
    slug: "smm-management",
    section: "popular",
    icon: "/often/mobile.svg",
    specialistIds: ["mia-nolan-social-media", "lina-hayes-visual-designer", "ella-stone-content-strategist"],
    relatedIds: ["adCreatives", "copywriting", "influencerAds"],
    locale: {
      en: {
        title: "SMM management",
        summary: "Content, publishing, and community work that keeps social channels active and purposeful.",
        description: "We manage social channels as a system: content planning, production briefs, publishing rhythm, community interaction, and format analysis. The account supports business goals instead of posting for the sake of posting.",
        deliverables: [
          "Monthly content plan with formats and topics",
          "Editorial coordination of copy, visuals, and publishing",
          "Channel analytics with next-step recommendations",
        ],
      },
      ru: {
        title: "SMM — ведение социальных сетей",
        summary: "Ведём соцсети как систему: контент, публикации, вовлечение и рост канала под задачи бизнеса.",
        description: "Мы выстраиваем SMM не как хаотичный поток постов, а как рабочую систему: контент-план, продакшн, публикации, коммуникация с аудиторией и анализ форматов. Канал начинает поддерживать продажи и доверие к бренду, а не просто заполнять ленту.",
        deliverables: [
          "Ежемесячный контент-план по форматам и рубрикам",
          "Координация текстов, визуала и публикаций",
          "Аналитика канала и рекомендации по следующим шагам",
        ],
      },
    },
  },
  {
    id: "adCreatives",
    slug: "ad-creative-development",
    section: "popular",
    icon: "/often/colors-square.svg",
    specialistIds: ["lina-hayes-visual-designer", "leo-carter-performance-marketing", "mia-nolan-social-media"],
    relatedIds: ["targetedMetaVkTiktok", "videoProduction", "copywriting"],
    locale: {
      en: {
        title: "Ad creative development",
        summary: "Static and motion creatives built to test messages fast and improve campaign efficiency.",
        description: "Creative production covers visual concepts, copy hooks, motion variants, and adaptation to placements. We treat creatives as test assets tied to performance hypotheses, not isolated design tasks.",
        deliverables: [
          "Concepts for static, story, and short-video placements",
          "Creative adaptation by platform and audience segment",
          "Iteration based on click-through, CPL, and lead quality",
        ],
      },
      ru: {
        title: "Разработка рекламных креативов",
        summary: "Делаем статичные и motion-креативы, которые помогают быстро тестировать гипотезы и снижать стоимость лида.",
        description: "Продакшн креативов включает визуальные концепции, рекламные заходы, motion-варианты и адаптацию под плейсменты. Мы рассматриваем креативы как часть системы тестов и оптимизации, а не как отдельную дизайнерскую задачу.",
        deliverables: [
          "Концепции для статики, сторис и коротких видео",
          "Адаптация креативов под площадки и сегменты аудиторий",
          "Итерации по CTR, CPL и качеству заявок",
        ],
      },
    },
  },
  {
    id: "copywriting",
    slug: "copywriting",
    section: "popular",
    icon: "/often/edit.svg",
    specialistIds: ["ella-stone-content-strategist", "mia-nolan-social-media", "noah-reed-project-manager"],
    relatedIds: ["corporateWebsite", "seoPromotion", "emailMarketing"],
    locale: {
      en: {
        title: "Copywriting for websites and ads",
        summary: "Clear commercial writing that explains the offer, reduces friction, and supports conversion.",
        description: "We prepare texts for websites, ads, landing pages, and campaign materials with a focus on clarity and intent. Messaging is aligned with audience pains, offer logic, and the action we want from the user.",
        deliverables: [
          "Website and landing page copy structures",
          "Ad texts, hooks, and CTA variants",
          "Tone-of-voice alignment across core materials",
        ],
      },
      ru: {
        title: "Копирайтинг для сайта и рекламы",
        summary: "Пишем тексты, которые понятно объясняют предложение и помогают довести пользователя до действия.",
        description: "Мы готовим тексты для сайтов, рекламы, лендингов и сопроводительных материалов так, чтобы они были ясными, коммерчески сильными и соответствовали реальным болям аудитории. Текст работает на задачу, а не просто заполняет блок.",
        deliverables: [
          "Структуры и тексты для сайта и лендингов",
          "Рекламные тексты, заходы и CTA-варианты",
          "Единая тональность и смысл во всех ключевых материалах",
        ],
      },
    },
  },
  {
    id: "analyticsSetup",
    slug: "analytics-setup",
    section: "popular",
    icon: "/often/chart-2.svg",
    specialistIds: ["leo-carter-performance-marketing", "evan-brooks-seo-strategist", "noah-reed-project-manager"],
    relatedIds: ["targetedMetaVkTiktok", "contextGoogleYandex", "crmAutomation"],
    locale: {
      en: {
        title: "Analytics setup",
        summary: "Tracking and attribution configured so marketing decisions rely on real conversion data.",
        description: "We configure event tracking, goals, tags, and reporting views in Google Analytics and Yandex Metrica. The objective is to make campaign evaluation and funnel diagnosis reliable before scaling budgets.",
        deliverables: [
          "Event map and goal setup for core user actions",
          "Tag manager configuration and validation",
          "Reporting views for traffic, leads, and conversion paths",
        ],
      },
      ru: {
        title: "Настройка аналитики",
        summary: "Настраиваем события, цели и отчеты так, чтобы маркетинг опирался на реальные данные о конверсиях.",
        description: "Мы настраиваем события, цели, теги и отчётные представления в Google Analytics и Яндекс Метрике, чтобы вы могли корректно оценивать каналы и рекламные кампании. Без этого масштабирование бюджета строится на догадках, а не на фактах.",
        deliverables: [
          "Карта событий и настройка целей под ключевые действия",
          "Конфигурация tag manager и проверка корректности данных",
          "Отчёты по трафику, лидам и конверсионным путям",
        ],
      },
    },
  },
  {
    id: "emailMarketing",
    slug: "email-marketing",
    section: "popular",
    icon: "/often/mobile.svg",
    specialistIds: ["ella-stone-content-strategist", "noah-reed-project-manager"],
    relatedIds: ["copywriting", "crmAutomation", "analyticsSetup"],
    locale: {
      en: {
        title: "Email marketing",
        summary: "Retention and nurture flows that keep leads and customers warm between conversions.",
        description: "We set up email sequences, newsletters, and automation logic for nurturing, retention, and repeat sales. The work includes segmentation, content logic, timing, and performance measurement.",
        deliverables: [
          "Lifecycle or promotional email sequences",
          "Audience segmentation and content logic",
          "Performance tracking for opens, clicks, and downstream actions",
        ],
      },
      ru: {
        title: "Email-маркетинг",
        summary: "Выстраиваем цепочки писем и рассылки для прогрева, удержания и повторных продаж.",
        description: "Мы настраиваем email-цепочки, регулярные рассылки и автоматизации для прогрева лидов, удержания клиентов и возврата к повторной покупке. Работа включает сегментацию, логику контента, тайминг и оценку эффективности.",
        deliverables: [
          "Welcome-, nurture- и промо-цепочки писем",
          "Сегментация базы и логика контента под сценарии",
          "Отслеживание открытий, кликов и целевых действий",
        ],
      },
    },
  },
  {
    id: "websiteRedesign",
    slug: "website-redesign",
    section: "middle",
    icon: "/middle/designtools.svg",
    specialistIds: ["lina-hayes-visual-designer", "noah-reed-project-manager"],
    relatedIds: ["uxUiDesign", "corporateWebsite", "abTesting"],
    locale: {
      en: {
        title: "Website redesign",
        summary: "A redesign that improves structure, trust, and conversion rather than only appearance.",
        description: "We rethink layout, hierarchy, and visual presentation based on business goals and user scenarios. The redesign addresses weak communication blocks, friction points, and inconsistent visual patterns.",
        deliverables: [
          "Audit of current pages and problem zones",
          "New page structures and updated visual system",
          "Responsive implementation guidance or handoff",
        ],
      },
      ru: {
        title: "Редизайн сайта",
        summary: "Обновляем сайт так, чтобы он лучше продавал, а не просто выглядел современнее.",
        description: "Мы пересобираем структуру, визуальную подачу и иерархию сайта на основе задач бизнеса и сценариев пользователя. Редизайн убирает слабые блоки, снижает трение и делает коммуникацию понятнее и убедительнее.",
        deliverables: [
          "Аудит текущих страниц и проблемных зон",
          "Новые структуры экранов и обновлённая визуальная система",
          "Спецификация для внедрения или готовая реализация",
        ],
      },
    },
  },
  {
    id: "uxUiDesign",
    slug: "ux-ui-design",
    section: "middle",
    icon: "/middle/magicpen.svg",
    specialistIds: ["lina-hayes-visual-designer", "noah-reed-project-manager"],
    relatedIds: ["websiteRedesign", "corporateWebsite", "onlineStoreCreation"],
    locale: {
      en: {
        title: "UX/UI design",
        summary: "Interfaces designed around user tasks, clear hierarchy, and conversion flow.",
        description: "UX/UI work includes information architecture, user flow mapping, wireframes, and polished interface design. We align interface decisions with business priorities so the product is easier to navigate and more effective commercially.",
        deliverables: [
          "User flows, wireframes, and content hierarchy",
          "UI kit and page layouts for key scenarios",
          "Responsive design files ready for development",
        ],
      },
      ru: {
        title: "UX/UI-дизайн",
        summary: "Проектируем интерфейсы вокруг задач пользователя, понятной структуры и сценариев конверсии.",
        description: "UX/UI-дизайн включает архитектуру информации, пользовательские сценарии, прототипы и финальную визуальную систему. Мы принимаем дизайнерские решения не в отрыве от бизнеса, а исходя из того, что должно стать проще, понятнее и конверсионнее.",
        deliverables: [
          "Пользовательские сценарии, wireframes и структура контента",
          "UI kit и макеты ключевых экранов",
          "Адаптивные дизайн-файлы, готовые к разработке",
        ],
      },
    },
  },
  {
    id: "abTesting",
    slug: "ab-testing",
    section: "middle",
    icon: "/middle/note-2.svg",
    specialistIds: ["leo-carter-performance-marketing", "lina-hayes-visual-designer", "noah-reed-project-manager"],
    relatedIds: ["analyticsSetup", "websiteRedesign", "targetedMetaVkTiktok"],
    locale: {
      en: {
        title: "A/B testing",
        summary: "Controlled tests for ads and landing pages to improve conversion with evidence.",
        description: "We prioritize hypotheses, define the success metric, and run structured tests for landing pages, offers, creatives, or call-to-action blocks. This reduces opinion-driven changes and helps the team learn what actually improves conversion.",
        deliverables: [
          "Hypothesis backlog with expected impact",
          "Test setup and measurement criteria",
          "Results summary with recommended rollouts",
        ],
      },
      ru: {
        title: "A/B-тестирование рекламы и посадочных страниц",
        summary: "Проводим A/B-тесты рекламы и посадочных страниц, чтобы улучшать конверсию на основе фактов.",
        description: "Мы собираем backlog гипотез, определяем метрику успеха и запускаем структурированные тесты для посадочных страниц, офферов, рекламных креативов и CTA-блоков. Это помогает быстрее понимать, что действительно улучшает результат.",
        deliverables: [
          "Список гипотез с приоритетом и ожидаемым эффектом",
          "Настройка теста и критерии оценки результата",
          "Выводы по тестам и рекомендации к масштабированию",
        ],
      },
    },
  },
  {
    id: "marketplacePromotion",
    slug: "marketplace-promotion",
    section: "middle",
    icon: "/middle/bag-happy.svg",
    specialistIds: ["noah-reed-project-manager", "ella-stone-content-strategist"],
    relatedIds: ["copywriting", "analyticsSetup", "adCreatives"],
    locale: {
      en: {
        title: "Marketplace promotion",
        summary: "Better visibility and conversion inside marketplaces through listing and content optimization.",
        description: "We work on card structure, product content, positioning, ratings support materials, and marketplace traffic levers. The task is to improve visibility in search and category listings while increasing conversion from card view to purchase.",
        deliverables: [
          "Marketplace card audit and optimization plan",
          "Improved titles, visuals, and product content",
          "Operational recommendations for traffic and conversion growth",
        ],
      },
      ru: {
        title: "Продвижение на маркетплейсах",
        summary: "Улучшаем видимость карточек и конверсию внутри маркетплейсов за счёт контента и структуры.",
        description: "Мы работаем с карточками товара, визуалом, текстами, позиционированием и операционными точками роста внутри маркетплейсов. Задача — поднять видимость в выдаче и увеличить конверсию от просмотра карточки до покупки.",
        deliverables: [
          "Аудит карточек и план оптимизации",
          "Доработка названий, визуала и продуктового контента",
          "Рекомендации по росту трафика и конверсии",
        ],
      },
    },
  },
  {
    id: "onlineStoreCreation",
    slug: "online-store-development",
    section: "middle",
    icon: "/middle/shopping-cart.svg",
    specialistIds: ["lina-hayes-visual-designer", "noah-reed-project-manager", "ella-stone-content-strategist"],
    relatedIds: ["uxUiDesign", "copywriting", "crmAutomation"],
    locale: {
      en: {
        title: "Online store development",
        summary: "E-commerce sites with clear product presentation, checkout logic, and analytics from day one.",
        description: "We develop online stores with a focus on category structure, product cards, checkout flow, and operational integrations. The store should be manageable for the team and convincing for the buyer.",
        deliverables: [
          "Catalog and checkout architecture",
          "Responsive storefront and product page design",
          "Core integrations for orders, payments, and analytics",
        ],
      },
      ru: {
        title: "Создание интернет-магазина",
        summary: "Разрабатываем интернет-магазины с сильной подачей товара, удобной покупкой и встроенной аналитикой.",
        description: "Мы создаём e-commerce сайты, где важны и структура каталога, и карточки товара, и логика оформления заказа. Магазин должен быть удобен покупателю, прозрачен для команды и готов к продвижению с первого дня.",
        deliverables: [
          "Архитектура каталога и сценарий оформления заказа",
          "Адаптивный storefront и дизайн карточек товара",
          "Базовые интеграции для заказов, оплаты и аналитики",
        ],
      },
    },
  },
  {
    id: "influencerAds",
    slug: "influencer-marketing",
    section: "middle",
    icon: "/middle/user-search.svg",
    specialistIds: ["mia-nolan-social-media", "noah-reed-project-manager"],
    relatedIds: ["smmManagement", "adCreatives", "copywriting"],
    locale: {
      en: {
        title: "Influencer marketing",
        summary: "Creator selection and collaboration structure tied to audience fit and campaign goals.",
        description: "We shortlist creators, validate audience fit, coordinate briefs, and define the collaboration format. The goal is to turn blogger integrations into measurable distribution rather than random awareness activity.",
        deliverables: [
          "Creator shortlist based on audience and niche relevance",
          "Briefing and content coordination for integrations",
          "Post-campaign review with reach and response assessment",
        ],
      },
      ru: {
        title: "Influencer-реклама",
        summary: "Подбираем блогеров и выстраиваем интеграции под аудиторию, формат и задачу кампании.",
        description: "Мы подбираем релевантных блогеров, проверяем аудиторию, согласовываем формат размещения и готовим понятный бриф. Цель — превратить интеграции в управляемый канал дистрибуции, а не в разовую историю на доверии.",
        deliverables: [
          "Подбор блогеров по аудитории и тематике",
          "Брифинг и координация интеграций",
          "Разбор результата по охвату, отклику и качеству трафика",
        ],
      },
    },
  },
  {
    id: "videoProduction",
    slug: "video-production",
    section: "middle",
    icon: "/middle/video-play.svg",
    specialistIds: ["lina-hayes-visual-designer", "ella-stone-content-strategist", "mia-nolan-social-media"],
    relatedIds: ["adCreatives", "smmManagement", "businessPhotography"],
    locale: {
      en: {
        title: "Video production",
        summary: "Short-form and commercial video content for ads, product presentation, and social channels.",
        description: "We prepare scripts, shot logic, references, and production requirements for promo videos, reels, and ad assets. The focus is on message clarity, pacing, and adaptability to channel formats.",
        deliverables: [
          "Concept and script for the required video format",
          "Production coordination and content pack requirements",
          "Edited assets adapted for ad and social placements",
        ],
      },
      ru: {
        title: "Видеореклама и видеопродакшн",
        summary: "Готовим видео для рекламы, соцсетей и презентации продукта с учётом формата площадки.",
        description: "Мы продумываем сценарий, подачу, ритм и требования к продакшну для рекламных роликов, reels и других видеоформатов. В центре внимания — понятный месседж, аккуратная упаковка и адаптация под площадки.",
        deliverables: [
          "Концепция и сценарий под нужный видеоформат",
          "Координация продакшна и требования к материалам",
          "Готовые видео, адаптированные под рекламу и соцсети",
        ],
      },
    },
  },
  {
    id: "crmAutomation",
    slug: "crm-automation",
    section: "middle",
    icon: "/middle/setting-2.svg",
    specialistIds: ["noah-reed-project-manager", "leo-carter-performance-marketing"],
    relatedIds: ["emailMarketing", "analyticsSetup", "onlineStoreCreation"],
    locale: {
      en: {
        title: "CRM setup and automation",
        summary: "Sales processes, lead routing, and recurring actions structured inside CRM.",
        description: "We configure CRM stages, lead distribution, reminders, and automations so the team loses fewer leads and sees the sales funnel more clearly. The setup is tied to how managers actually work, not to generic templates.",
        deliverables: [
          "Pipeline structure and status logic",
          "Automation for routing, reminders, and follow-ups",
          "Reporting setup for lead handling and team performance",
        ],
      },
      ru: {
        title: "Настройка CRM и автоматизации",
        summary: "Настраиваем воронку, маршрутизацию лидов и автоматические действия, чтобы продажи не теряли скорость.",
        description: "Мы настраиваем этапы CRM, распределение лидов, напоминания и автоматизации так, чтобы менеджеры не теряли заявки и видели реальную картину по воронке. Конфигурация строится под фактический процесс команды, а не под абстрактный шаблон.",
        deliverables: [
          "Структура воронки и логика статусов",
          "Автоматизация распределения, напоминаний и follow-up",
          "Отчётность по обработке лидов и работе команды",
        ],
      },
    },
  },
  {
    id: "localSeo",
    slug: "local-seo",
    section: "middle",
    icon: "/middle/location.svg",
    specialistIds: ["evan-brooks-seo-strategist", "ella-stone-content-strategist"],
    relatedIds: ["seoPromotion", "analyticsSetup", "copywriting"],
    locale: {
      en: {
        title: "Local SEO",
        summary: "Visibility in local maps and business listings for location-based demand capture.",
        description: "We optimize business profiles, local landing pages, reviews support materials, and location signals so the company is easier to find in map and near-me searches.",
        deliverables: [
          "Business profile optimization and content updates",
          "Local landing page recommendations",
          "Review and local visibility growth checklist",
        ],
      },
      ru: {
        title: "Локальное SEO",
        summary: "Повышаем видимость компании в картах и локальной выдаче для спроса рядом с точкой продаж.",
        description: "Мы работаем с бизнес-профилями, локальными посадочными страницами, отзывами и геосигналами, чтобы компанию было проще находить в картах и локальных поисковых запросах.",
        deliverables: [
          "Оптимизация бизнес-профиля и обновление контента",
          "Рекомендации по локальным посадочным страницам",
          "Чек-лист по росту отзывов и локальной видимости",
        ],
      },
    },
  },
  {
    id: "logoDesign",
    slug: "logo-design",
    section: "rare",
    icon: "/rare/brush-4.svg",
    specialistIds: ["lina-hayes-visual-designer"],
    relatedIds: ["brandIdentity", "brandbook", "presentationDesign"],
    locale: {
      en: {
        title: "Logo design",
        summary: "Logo concepts aligned with positioning, application context, and future brand system needs.",
        description: "We design logos with attention to recognition, readability, and how the mark will behave across digital and print touchpoints. The logo is treated as part of a broader identity system, not a separate graphic exercise.",
        deliverables: [
          "Concept directions and rationale",
          "Final logo versions for key use cases",
          "Basic usage guidance and export package",
        ],
      },
      ru: {
        title: "Разработка логотипа",
        summary: "Создаём логотип, который работает на позиционирование и нормально живёт в реальных носителях.",
        description: "Мы разрабатываем логотип с учётом узнаваемости, читаемости и того, как знак будет использоваться в digital и офлайн-среде. Это не просто красивая форма, а часть будущей визуальной системы бренда.",
        deliverables: [
          "Несколько концептуальных направлений с аргументацией",
          "Финальные версии логотипа под ключевые сценарии",
          "Базовые правила использования и пакет исходников",
        ],
      },
    },
  },
  {
    id: "brandIdentity",
    slug: "brand-identity",
    section: "rare",
    icon: "/rare/lamp-on.svg",
    specialistIds: ["lina-hayes-visual-designer", "ella-stone-content-strategist"],
    relatedIds: ["logoDesign", "brandbook", "presentationDesign"],
    locale: {
      en: {
        title: "Brand identity",
        summary: "A visual identity system that keeps communication recognizable across channels.",
        description: "Identity work covers typography, color principles, composition rules, graphic elements, and examples of brand application. The outcome is a usable system that teams can scale consistently.",
        deliverables: [
          "Visual direction and brand mood exploration",
          "Typography, color, and graphic rules",
          "Application examples for core brand materials",
        ],
      },
      ru: {
        title: "Разработка фирменного стиля",
        summary: "Собираем визуальную систему бренда, чтобы коммуникация была целостной и узнаваемой во всех каналах.",
        description: "Фирменный стиль включает типографику, цветовые принципы, композиционные правила, графические элементы и примеры применения. На выходе команда получает не набор картинок, а рабочую систему, которую можно масштабировать.",
        deliverables: [
          "Визуальное направление и подбор moodboard",
          "Правила типографики, цвета и графики",
          "Примеры применения на ключевых носителях",
        ],
      },
    },
  },
  {
    id: "prPublications",
    slug: "pr-publications",
    section: "rare",
    icon: "/rare/clipboard.svg",
    specialistIds: ["noah-reed-project-manager", "ella-stone-content-strategist"],
    relatedIds: ["brandIdentity", "copywriting", "presentationDesign"],
    locale: {
      en: {
        title: "PR publications",
        summary: "Story packaging and publication planning for media visibility and trust building.",
        description: "We shape topics, prepare publication materials, and adapt narratives for media or partner placements. The emphasis is on relevance, message control, and the practical goal of each publication.",
        deliverables: [
          "Publication angles and editorial packaging",
          "Texts and supporting materials for placements",
          "Placement plan by audience and communication goal",
        ],
      },
      ru: {
        title: "PR-размещение в СМИ",
        summary: "Упаковываем инфоповоды и материалы для публикаций, которые работают на доверие и узнаваемость.",
        description: "Мы формируем темы, готовим тексты и адаптируем истории под размещение в медиа или партнёрских каналах. Важно не просто выйти с публикацией, а связать её с реальной коммуникационной задачей бренда.",
        deliverables: [
          "Темы и подача материалов для публикаций",
          "Тексты и сопроводительные материалы",
          "План размещений под аудиторию и цель коммуникации",
        ],
      },
    },
  },
  {
    id: "brandbook",
    slug: "brandbook",
    section: "rare",
    icon: "/rare/menu-board.svg",
    specialistIds: ["lina-hayes-visual-designer"],
    relatedIds: ["brandIdentity", "logoDesign", "presentationDesign"],
    locale: {
      en: {
        title: "Brandbook",
        summary: "A documented rule set that helps teams apply the brand consistently.",
        description: "We assemble the brandbook as a working guide for internal teams and contractors: usage rules, visual logic, tone alignment, and common application cases.",
        deliverables: [
          "Usage rules for logo, color, and typography",
          "Examples of correct and incorrect applications",
          "Structured document for team and contractor use",
        ],
      },
      ru: {
        title: "Брендбук",
        summary: "Документируем правила бренда так, чтобы ими реально могла пользоваться команда и подрядчики.",
        description: "Мы собираем брендбук как рабочее руководство: правила использования логотипа, цвета, типографики, композиции и типовых носителей. Это помогает удерживать целостность бренда в ежедневной работе.",
        deliverables: [
          "Правила использования логотипа, цвета и шрифтов",
          "Примеры корректного и некорректного применения",
          "Структурированный документ для команды и подрядчиков",
        ],
      },
    },
  },
  {
    id: "marketingResearch",
    slug: "marketing-research",
    section: "rare",
    icon: "/rare/message-question.svg",
    specialistIds: ["noah-reed-project-manager", "evan-brooks-seo-strategist"],
    relatedIds: ["seoPromotion", "brandIdentity", "abTesting"],
    locale: {
      en: {
        title: "Marketing research",
        summary: "Audience, market, and competitor analysis used to make sharper strategic decisions.",
        description: "We conduct focused research into customer segments, market offers, messaging patterns, and competitor behaviour. The result is a practical decision base for positioning, campaigns, or product communication.",
        deliverables: [
          "Research framework tied to the business question",
          "Competitor and audience insight summary",
          "Strategic recommendations based on findings",
        ],
      },
      ru: {
        title: "Маркетинговые исследования",
        summary: "Исследуем аудиторию, рынок и конкурентов, чтобы стратегия опиралась на факты, а не на предположения.",
        description: "Мы проводим прикладные исследования по сегментам клиентов, предложениям на рынке, паттернам коммуникации и поведению конкурентов. Результат — база для более точных решений по позиционированию, рекламе и продуктовой подаче.",
        deliverables: [
          "Исследовательская рамка под конкретный бизнес-вопрос",
          "Выжимка по конкурентам и аудитории",
          "Стратегические рекомендации по итогам анализа",
        ],
      },
    },
  },
  {
    id: "businessPhotography",
    slug: "business-photography",
    section: "rare",
    icon: "/rare/camera.svg",
    specialistIds: ["lina-hayes-visual-designer", "mia-nolan-social-media"],
    relatedIds: ["videoProduction", "brandIdentity", "adCreatives"],
    locale: {
      en: {
        title: "Business photography",
        summary: "Photo content for brand materials, product presentation, and commercial communication.",
        description: "We prepare photography concepts and requirements for team, product, or brand shoots so visual assets match the communication style and channel requirements.",
        deliverables: [
          "Shot list and reference preparation",
          "Guidance on scenes, style, and content use cases",
          "Asset set structured for website, ads, or social media",
        ],
      },
      ru: {
        title: "Фотосъёмка для бизнеса",
        summary: "Готовим фото-контент для сайта, рекламы и бренд-материалов с учётом задач коммуникации.",
        description: "Мы продумываем концепцию, референсы и требования к бизнес-съёмке для команды, продукта или бренда. Важно, чтобы визуал совпадал со стилем коммуникации и был пригоден для реальных каналов использования.",
        deliverables: [
          "Shot list и набор референсов к съёмке",
          "Рекомендации по сценам, стилю и использованию кадров",
          "Пакет материалов для сайта, рекламы и соцсетей",
        ],
      },
    },
  },
  {
    id: "presentationDesign",
    slug: "presentation-design",
    section: "rare",
    icon: "/rare/ruler%26pen.svg",
    specialistIds: ["lina-hayes-visual-designer", "ella-stone-content-strategist"],
    relatedIds: ["brandIdentity", "copywriting", "brandbook"],
    locale: {
      en: {
        title: "Presentation design",
        summary: "Presentations that structure the story clearly and make complex information easier to absorb.",
        description: "We design presentations for sales, strategy, investor, and internal communication use cases. The emphasis is on narrative clarity, visual hierarchy, and keeping the deck aligned with the brand.",
        deliverables: [
          "Slide structure and narrative logic",
          "Visual design of templates and final deck",
          "Refinement of charts, highlights, and key messages",
        ],
      },
      ru: {
        title: "Разработка презентаций",
        summary: "Собираем презентации, которые понятно ведут по смыслу и аккуратно упаковывают сложную информацию.",
        description: "Мы делаем презентации для продаж, стратегии, инвесторов и внутренней коммуникации. Фокус — на логике повествования, визуальной иерархии и соответствии фирменному стилю бренда.",
        deliverables: [
          "Структура слайдов и логика рассказа",
          "Визуальный дизайн шаблона и финальной презентации",
          "Доработка графиков, акцентов и ключевых сообщений",
        ],
      },
    },
  },
  {
    id: "chatbots",
    slug: "chatbot-development",
    section: "rare",
    icon: "/rare/device-message.svg",
    specialistIds: ["noah-reed-project-manager", "leo-carter-performance-marketing"],
    relatedIds: ["crmAutomation", "quizLandingPages", "emailMarketing"],
    locale: {
      en: {
        title: "Chatbot development",
        summary: "Conversation flows for websites and messengers that qualify requests and reduce manual load.",
        description: "We define the chatbot logic, qualification questions, routing, and handoff points to managers. Bots help pre-process requests, capture structured inputs, and speed up first contact.",
        deliverables: [
          "Conversation flow and qualification сценарios",
          "Routing logic to CRM or manager touchpoints",
          "Launch support and iteration from real user behaviour",
        ],
      },
      ru: {
        title: "Чат-боты для сайта и мессенджеров",
        summary: "Проектируем диалоговые сценарии, которые собирают вводные, квалифицируют обращения и разгружают команду.",
        description: "Мы продумываем логику чат-бота, вопросы квалификации, маршрутизацию и точки передачи менеджеру. Бот помогает быстрее собирать структуру запроса и ускоряет первый контакт с клиентом.",
        deliverables: [
          "Сценарий диалога и логика квалификации обращения",
          "Маршрутизация данных в CRM или к менеджеру",
          "Поддержка запуска и доработки по поведению пользователей",
        ],
      },
    },
  },
  {
    id: "quizLandingPages",
    slug: "quiz-landing-pages",
    section: "rare",
    icon: "/rare/notification-status.svg",
    specialistIds: ["noah-reed-project-manager", "lina-hayes-visual-designer", "ella-stone-content-strategist"],
    relatedIds: ["chatbots", "corporateWebsite", "copywriting"],
    locale: {
      en: {
        title: "Quiz landing pages",
        summary: "Interactive landing pages that collect structured lead data before the form submit.",
        description: "We create quiz funnels that guide the user through a sequence of questions, segment intent, and produce a warmer lead by the time contact details are submitted.",
        deliverables: [
          "Quiz logic and screen sequence",
          "Copy and visual structure for each step",
          "Lead form integration and answer tracking",
        ],
      },
      ru: {
        title: "Разработка квиз-лендингов",
        summary: "Создаём интерактивные лендинги, которые собирают вводные о клиенте ещё до отправки заявки.",
        description: "Мы проектируем квиз-воронки, где пользователь проходит через серию вопросов, а бизнес получает сегментированный, более тёплый лид к моменту отправки контактов.",
        deliverables: [
          "Логика квиза и последовательность экранов",
          "Тексты и визуальная структура для каждого шага",
          "Интеграция формы и отслеживание ответов",
        ],
      },
    },
  },
];

export function getServiceDefinitions() {
  return SERVICE_DEFINITIONS;
}

export function getServiceById(id: ServiceId) {
  return SERVICE_DEFINITIONS.find((service) => service.id === id);
}

export function getServiceBySlug(slug: string) {
  return SERVICE_DEFINITIONS.find((service) => service.slug === slug);
}

export function getLocalizedService(service: ServiceDefinition, locale: string) {
  const baseLocale = getDefaultContentLocale(locale);

  return {
    ...service,
    content: repairEncodedTree(service.locale[baseLocale]),
  };
}

export function getLocalizedServices(locale: string) {
  return SERVICE_DEFINITIONS.map((service) => getLocalizedService(service, locale));
}

export function getRelatedServices(service: ServiceDefinition, locale: string) {
  return service.relatedIds
    .map((id) => getServiceById(id))
    .filter((item): item is ServiceDefinition => Boolean(item))
    .map((item) => getLocalizedService(item, locale));
}
