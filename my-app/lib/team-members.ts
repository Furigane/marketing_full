import { getDefaultContentLocale } from "@/lib/site-locales";
import { repairEncodedTree } from "@/lib/text-encoding";

export type TeamMemberLocale = "en" | "ru";

export const DEFAULT_TEAM_MEMBER_ID = "leo-carter-performance-marketing" as const;

export const TEAM_MEMBERS = [
  {
    id: "leo-carter-performance-marketing",
    image: "/img/workers/specialist1m.webp",
    roleType: "targeting",
    locale: {
      en: {
        name: "Leo Carter",
        role: "Performance marketing specialist",
        experience: "8 years of experience",
        intro:
          "Leo Carter is a performance marketing specialist who builds paid acquisition systems for service businesses, e-commerce projects, and growth-stage brands. He focuses on lead quality, conversion economics, and scaling campaigns without losing margin.",
        metaDescription:
          "Leo Carter is a performance marketing specialist. Paid acquisition, funnel optimization, analytics, and measurable lead growth for business websites.",
        imageAlt:
          "Leo Carter, performance marketing specialist, portrait for the agency team page",
        activitySummary:
          "Builds and optimizes paid acquisition systems, tests offers, and keeps growth tied to CPL, CAC, and revenue quality rather than traffic volume alone.",
        achievementHighlights: [
          "Reduced CPL by 18-34% after creative and audience restructuring",
          "Builds reporting around qualified leads instead of vanity reach",
          "Coordinates ad testing with designers, copywriters, and analytics",
        ],
      },
      ru: {
        name: "Leo Carter",
        role: "Специалист по performance-маркетингу",
        experience: "8 лет опыта",
        intro:
          "Leo Carter — специалист по performance-маркетингу, который строит системы платного привлечения для сервисного бизнеса, e-commerce и растущих брендов. Его фокус — качество лидов, экономика воронки и масштабирование без потери маржи.",
        metaDescription:
          "Leo Carter — специалист по performance-маркетингу. Платный трафик, оптимизация воронки, аналитика и рост заявок по понятным метрикам.",
        imageAlt:
          "Leo Carter, специалист по performance-маркетингу, портрет для страницы команды агентства",
        activitySummary:
          "Строит и оптимизирует системы платного привлечения, тестирует офферы и держит рост в рамках CPL, CAC и качества выручки, а не только объема трафика.",
        achievementHighlights: [
          "Снижает CPL на 18-34% после пересборки креативов и аудиторий",
          "Строит отчетность вокруг квалифицированных лидов, а не охватов",
          "Связывает рекламные тесты с дизайном, копирайтингом и аналитикой",
        ],
      },
    },
  },
  {
    id: "mia-nolan-social-media",
    image: "/img/workers/specialist2g.webp",
    roleType: "smm",
    locale: {
      en: {
        name: "Mia Nolan",
        role: "Social media marketing specialist",
        experience: "6 years of experience",
        intro:
          "Mia Nolan is a social media marketing specialist focused on editorial planning, audience engagement, and channel growth for brands that need social media to support demand generation. She connects content production with measurable business goals.",
        metaDescription:
          "Mia Nolan is a social media marketing specialist. Content planning, engagement strategy, and channel growth tied to real business goals.",
        imageAlt:
          "Mia Nolan, social media marketing specialist, portrait for the agency team page",
        activitySummary:
          "Plans social media systems, launches recurring content formats, and keeps audience engagement aligned with brand positioning and lead generation.",
        achievementHighlights: [
          "Builds content calendars around funnel stages and launch priorities",
          "Improves engagement through recurring formats and DM workflows",
          "Turns social channels into a predictable support layer for sales",
        ],
      },
      ru: {
        name: "Мия Нолан",
        role: "SMM-специалист",
        experience: "6 лет опыта",
        intro:
          "Мия Нолан — SMM-специалист, которая отвечает за редакционный план, вовлечение аудитории и рост каналов для брендов, где соцсети должны поддерживать спрос. Она связывает продакшн контента с понятными бизнес-целями.",
        metaDescription:
          "Мия Нолан — SMM-специалист. Контент-план, вовлечение аудитории и рост соцсетей, связанные с реальными задачами бизнеса.",
        imageAlt:
          "Мия Нолан, SMM-специалист, портрет для страницы команды агентства",
        activitySummary:
          "Планирует SMM как систему, запускает повторяющиеся форматы контента и держит вовлечение аудитории в связке с позиционированием бренда и генерацией заявок.",
        achievementHighlights: [
          "Собирает контент-планы под этапы воронки и приоритеты запусков",
          "Усиливает вовлечение через рубрики, сторис-механики и DM-процессы",
          "Делает соцсети предсказуемым каналом поддержки продаж",
        ],
      },
    },
  },
  {
    id: "evan-brooks-seo-strategist",
    image: "/img/workers/specialist3m.webp",
    roleType: "seo",
    locale: {
      en: {
        name: "Evan Brooks",
        role: "SEO strategist",
        experience: "9 years of experience",
        intro:
          "Evan Brooks is an SEO strategist who works with technical audits, semantic clustering, and page architecture for companies that need organic visibility to support lead generation. He prioritizes commercial search intent and long-term search growth.",
        metaDescription:
          "Evan Brooks is an SEO strategist. Technical SEO, page architecture, keyword mapping, and organic traffic growth for commercial websites.",
        imageAlt:
          "Evan Brooks, SEO strategist, portrait for the agency team page",
        activitySummary:
          "Improves crawlability, page relevance, and content structure so service pages rank for the searches that actually influence pipeline and revenue.",
        achievementHighlights: [
          "Builds SEO backlogs around search intent and business value",
          "Improves metadata, internal linking, and landing page quality",
          "Focuses on qualified organic traffic instead of raw visit volume",
        ],
      },
      ru: {
        name: "Эван Брукс",
        role: "SEO-стратег",
        experience: "9 лет опыта",
        intro:
          "Эван Брукс — SEO-стратег, который работает с техническим аудитом, кластеризацией семантики и архитектурой страниц для компаний, где органический трафик должен поддерживать продажи. Он фокусируется на коммерческом интенте и долгосрочном росте из поиска.",
        metaDescription:
          "Эван Брукс — SEO-стратег. Техническое SEO, архитектура страниц, семантика и рост органического трафика для коммерческих сайтов.",
        imageAlt:
          "Эван Брукс, SEO-стратег, портрет для страницы команды агентства",
        activitySummary:
          "Улучшает индексируемость, релевантность страниц и структуру контента так, чтобы страницы услуг росли по запросам, которые реально влияют на воронку и выручку.",
        achievementHighlights: [
          "Собирает SEO-backlog по интенту и бизнес-ценности",
          "Усиливает метаданные, перелинковку и качество посадочных страниц",
          "Смотрит на квалифицированный органический трафик, а не на общий объем визитов",
        ],
      },
    },
  },
  {
    id: "lina-hayes-visual-designer",
    image: "/img/workers/specialist4g.webp",
    roleType: "designer",
    locale: {
      en: {
        name: "Lina Hayes",
        role: "Visual designer",
        experience: "7 years of experience",
        intro:
          "Lina Hayes is a visual designer who creates brand systems, ad creatives, and landing page visuals for teams that need a stronger commercial presentation. She connects design decisions to positioning, clarity, and conversion behavior.",
        metaDescription:
          "Lina Hayes is a visual designer. Brand systems, ad creatives, and landing page visuals that improve clarity and conversion.",
        imageAlt:
          "Lina Hayes, visual designer, portrait for the agency team page",
        activitySummary:
          "Designs visual systems for websites, campaigns, and content so every channel looks consistent and communicates the offer more clearly.",
        achievementHighlights: [
          "Builds reusable creative systems for campaigns and websites",
          "Improves visual hierarchy on commercial pages and ads",
          "Works closely with media and content teams on conversion-focused assets",
        ],
      },
      ru: {
        name: "Лина Хейз",
        role: "Визуальный дизайнер",
        experience: "7 лет опыта",
        intro:
          "Лина Хейз — визуальный дизайнер, которая создаёт бренд-системы, рекламные креативы и визуал лендингов для команд, которым нужна более сильная коммерческая подача. Она связывает дизайн с позиционированием, ясностью оффера и поведением пользователя.",
        metaDescription:
          "Лина Хейз — визуальный дизайнер. Бренд-системы, рекламные креативы и визуал лендингов, которые усиливают ясность и конверсию.",
        imageAlt:
          "Лина Хейз, визуальный дизайнер, портрет для страницы команды агентства",
        activitySummary:
          "Проектирует визуальные системы для сайтов, рекламных кампаний и контента так, чтобы каждый канал выглядел цельно и понятнее объяснял предложение.",
        achievementHighlights: [
          "Собирает переиспользуемые креативные системы для сайтов и кампаний",
          "Усиливает визуальную иерархию коммерческих страниц и рекламы",
          "Работает в связке с медиабаингом и контентом над конверсионными материалами",
        ],
      },
    },
  },
  {
    id: "noah-reed-project-manager",
    image: "/img/workers/specialist5m.webp",
    roleType: "manager",
    locale: {
      en: {
        name: "Noah Reed",
        role: "Project manager",
        experience: "10 years of experience",
        intro:
          "Noah Reed is a project manager who keeps marketing delivery structured across channels, deadlines, and stakeholder communication. He translates business priorities into concrete tasks, owners, and release sequences for the full team.",
        metaDescription:
          "Noah Reed is a project manager. Delivery coordination, stakeholder communication, and marketing execution management across channels.",
        imageAlt:
          "Noah Reed, project manager, portrait for the agency team page",
        activitySummary:
          "Coordinates specialists, manages priorities, and maintains transparent communication so execution stays on schedule and tied to business goals.",
        achievementHighlights: [
          "Keeps projects visible through clear statuses and next-step planning",
          "Aligns specialists, client inputs, and deadlines inside one workflow",
          "Removes blockers before they slow launch or optimization cycles",
        ],
      },
      ru: {
        name: "Ноа Рид",
        role: "Проектный менеджер",
        experience: "10 лет опыта",
        intro:
          "Ноа Рид — проектный менеджер, который держит маркетинговое исполнение в структуре: по каналам, срокам и коммуникации со стейкхолдерами. Он переводит бизнес-приоритеты в конкретные задачи, ответственных и этапы запуска для всей команды.",
        metaDescription:
          "Ноа Рид — проектный менеджер. Координация реализации, коммуникация со стейкхолдерами и управление маркетинговым производством.",
        imageAlt:
          "Ноа Рид, проектный менеджер, портрет для страницы команды агентства",
        activitySummary:
          "Координирует специалистов, управляет приоритетами и держит прозрачную коммуникацию, чтобы выполнение не выпадало из сроков и целей бизнеса.",
        achievementHighlights: [
          "Держит проекты прозрачными через статусы и планирование следующих шагов",
          "Собирает специалистов, вводные клиента и сроки в единый workflow",
          "Снимает блокеры до того, как они тормозят запуск и оптимизацию",
        ],
      },
    },
  },
  {
    id: "ella-stone-content-strategist",
    image: "/img/workers/specialist6g.webp",
    roleType: "content",
    locale: {
      en: {
        name: "Ella Stone",
        role: "Content strategist",
        experience: "7 years of experience",
        intro:
          "Ella Stone is a content strategist focused on commercial messaging, editorial planning, and SEO-aware content systems. She helps businesses explain services more clearly and support conversion across websites, ads, and email sequences.",
        metaDescription:
          "Ella Stone is a content strategist. Commercial messaging, editorial planning, and SEO-aware content systems for websites and campaigns.",
        imageAlt:
          "Ella Stone, content strategist, portrait for the agency team page",
        activitySummary:
          "Builds content systems for service pages, campaigns, and email flows so the same message stays clear from first click to lead conversion.",
        achievementHighlights: [
          "Creates content maps for websites, ads, and lifecycle messaging",
          "Brings SEO structure into commercial copy without keyword spam",
          "Keeps tone of voice and offer logic aligned across channels",
        ],
      },
      ru: {
        name: "Элла Стоун",
        role: "Контент-стратег",
        experience: "7 лет опыта",
        intro:
          "Элла Стоун — контент-стратег, которая отвечает за коммерческие смыслы, редакционное планирование и SEO-aware контент-системы. Она помогает бизнесу понятнее объяснять услуги и поддерживать конверсию на сайте, в рекламе и email-цепочках.",
        metaDescription:
          "Элла Стоун — контент-стратег. Коммерческие смыслы, редакционное планирование и SEO-структура для сайта и маркетинговых кампаний.",
        imageAlt:
          "Элла Стоун, контент-стратег, портрет для страницы команды агентства",
        activitySummary:
          "Собирает контент-системы для страниц услуг, рекламных кампаний и email-цепочек так, чтобы смысл оффера оставался ясным от первого касания до заявки.",
        achievementHighlights: [
          "Строит контент-карты для сайтов, рекламы и lifecycle-коммуникации",
          "Встраивает SEO-структуру в коммерческий текст без переспама",
          "Держит tone of voice и логику оффера едиными во всех каналах",
        ],
      },
    },
  },
  {
    id: "max-turner-paid-media",
    image: "/img/workers/specialist7m.webp",
    roleType: "targeting",
    locale: {
      en: {
        name: "Max Turner",
        role: "Paid media specialist",
        experience: "5 years of experience",
        intro:
          "Max Turner is a paid media specialist working on audience segmentation, creative testing, and campaign stabilization across social ad platforms. He helps businesses find scalable combinations of message, placement, and budget.",
        metaDescription:
          "Max Turner is a paid media specialist. Audience segmentation, creative testing, and campaign stabilization across social ad platforms.",
        imageAlt:
          "Max Turner, paid media specialist, portrait for the agency team page",
        activitySummary:
          "Runs social advertising tests, validates new hypotheses quickly, and expands winning audiences after lead quality checks.",
        achievementHighlights: [
          "Launches hypothesis-based tests with disciplined budget control",
          "Finds stable audience and offer combinations for paid growth",
          "Scales campaigns only after conversion quality is confirmed",
        ],
      },
      ru: {
        name: "Макс Тёрнер",
        role: "Специалист по paid media",
        experience: "5 лет опыта",
        intro:
          "Макс Тёрнер — специалист по paid media, который работает с сегментацией аудиторий, тестированием креативов и стабилизацией рекламных кампаний в соцсетях. Он помогает бизнесу находить масштабируемые связки сообщения, плейсмента и бюджета.",
        metaDescription:
          "Макс Тёрнер — специалист по paid media. Сегментация аудиторий, тесты креативов и стабилизация кампаний в соцсетях.",
        imageAlt:
          "Макс Тёрнер, специалист по paid media, портрет для страницы команды агентства",
        activitySummary:
          "Проводит тесты в paid social, быстро валидирует новые гипотезы и расширяет рабочие аудитории только после проверки качества лидов.",
        achievementHighlights: [
          "Запускает гипотезы с дисциплиной по бюджету и метрикам",
          "Находит устойчивые связки аудитории и оффера для роста",
          "Масштабирует кампании только после подтверждения качества конверсии",
        ],
      },
    },
  },
  {
    id: "nina-cole-ux-ui-designer",
    image: "/img/workers/specialist8g.webp",
    roleType: "designer",
    locale: {
      en: {
        name: "Nina Cole",
        role: "UX/UI designer",
        experience: "6 years of experience",
        intro:
          "Nina Cole is a UX/UI designer who structures commercial websites, landing pages, and digital interfaces around clarity and conversion. She works where design needs to reduce friction and move users toward the next action.",
        metaDescription:
          "Nina Cole is a UX/UI designer. Conversion-focused website structure, landing page UX, and clear digital interfaces for business growth.",
        imageAlt:
          "Nina Cole, UX/UI designer, portrait for the agency team page",
        activitySummary:
          "Designs user journeys, page hierarchy, and interface patterns that make offers easier to understand and forms easier to complete.",
        achievementHighlights: [
          "Improves page structure around user intent and next-step clarity",
          "Designs landing pages with lower friction and stronger conversion flow",
          "Supports development with design systems and reusable interface logic",
        ],
      },
      ru: {
        name: "Нина Коул",
        role: "UX/UI-дизайнер",
        experience: "6 лет опыта",
        intro:
          "Нина Коул — UX/UI-дизайнер, которая выстраивает коммерческие сайты, лендинги и цифровые интерфейсы вокруг ясности и конверсии. Она работает там, где дизайн должен снимать трение и вести пользователя к следующему действию.",
        metaDescription:
          "Нина Коул — UX/UI-дизайнер. Конверсионная структура сайта, UX лендингов и понятные цифровые интерфейсы для роста бизнеса.",
        imageAlt:
          "Нина Коул, UX/UI-дизайнер, портрет для страницы команды агентства",
        activitySummary:
          "Проектирует пользовательские сценарии, иерархию страниц и интерфейсные паттерны, которые делают оффер понятнее, а формы — проще для заполнения.",
        achievementHighlights: [
          "Усиливает структуру страниц вокруг интента и ясности следующего шага",
          "Проектирует лендинги с меньшим трением и более сильной логикой конверсии",
          "Поддерживает разработку дизайн-системами и переиспользуемой логикой интерфейса",
        ],
      },
    },
  },
  {
    id: "ryan-blake-local-seo-expert",
    image: "/img/workers/specialist9m.webp",
    roleType: "seo",
    locale: {
      en: {
        name: "Ryan Blake",
        role: "Local SEO expert",
        experience: "6 years of experience",
        intro:
          "Ryan Blake is a local SEO expert who improves map visibility, local landing pages, and profile optimization for businesses that depend on regional demand. He focuses on discoverability, trust signals, and location-based conversion paths.",
        metaDescription:
          "Ryan Blake is a local SEO expert. Local rankings, map visibility, and search optimization for businesses that rely on regional demand.",
        imageAlt:
          "Ryan Blake, local SEO expert, portrait for the agency team page",
        activitySummary:
          "Strengthens local rankings through Google Business Profile optimization, local page relevance, reviews, and structured on-page improvements.",
        achievementHighlights: [
          "Improves local visibility for service pages and map profiles",
          "Works with review signals, local content, and page architecture",
          "Connects local search intent with conversion-ready landing pages",
        ],
      },
      ru: {
        name: "Райан Блейк",
        role: "Эксперт по локальному SEO",
        experience: "6 лет опыта",
        intro:
          "Райан Блейк — эксперт по локальному SEO, который усиливает видимость в картах, локальные посадочные страницы и оптимизацию профилей для бизнеса, зависящего от регионального спроса. Его фокус — видимость, доверительные сигналы и конверсионный путь по геозапросам.",
        metaDescription:
          "Райан Блейк — эксперт по локальному SEO. Локальная выдача, видимость в картах и поисковая оптимизация для бизнеса с региональным спросом.",
        imageAlt:
          "Райан Блейк, эксперт по локальному SEO, портрет для страницы команды агентства",
        activitySummary:
          "Усиливает локальные позиции через оптимизацию Google Business Profile, релевантность локальных страниц, отзывы и on-page улучшения.",
        achievementHighlights: [
          "Улучшает локальную видимость страниц услуг и профилей в картах",
          "Работает с отзывами, локальным контентом и архитектурой страниц",
          "Связывает локальный спрос с посадочными страницами, готовыми к конверсии",
        ],
      },
    },
  },
  {
    id: "sara-quinn-brand-content-lead",
    image: "/img/workers/specialist10g.webp",
    roleType: "content",
    locale: {
      en: {
        name: "Sara Quinn",
        role: "Brand content lead",
        experience: "8 years of experience",
        intro:
          "Sara Quinn is a brand content lead who manages editorial consistency across websites, campaigns, and growth content. She helps companies turn expertise into proof-driven materials that support trust and sales conversations.",
        metaDescription:
          "Sara Quinn is a brand content lead. Editorial consistency, proof-driven messaging, and branded content systems for business growth.",
        imageAlt:
          "Sara Quinn, brand content lead, portrait for the agency team page",
        activitySummary:
          "Transforms expert knowledge into case studies, service copy, and supporting content that strengthens authority, trust, and internal linking across the site.",
        achievementHighlights: [
          "Builds proof-driven content assets for SEO and sales pages",
          "Connects service pages, portfolio, and blog content into one system",
          "Strengthens E-E-A-T signals through structured expert content",
        ],
      },
      ru: {
        name: "Сара Куинн",
        role: "Руководитель бренд-контента",
        experience: "8 лет опыта",
        intro:
          "Сара Куинн — руководитель бренд-контента, которая держит редакционную целостность сайта, кампаний и growth-контента. Она помогает компаниям превращать экспертизу в материалы с доказательной базой, которые усиливают доверие и продажи.",
        metaDescription:
          "Сара Куинн — руководитель бренд-контента. Редакционная целостность, proof-driven тексты и контент-системы для роста бизнеса.",
        imageAlt:
          "Сара Куинн, руководитель бренд-контента, портрет для страницы команды агентства",
        activitySummary:
          "Преобразует экспертные знания в кейсы, тексты услуг и поддерживающий контент, который усиливает авторитет, доверие и внутреннюю перелинковку сайта.",
        achievementHighlights: [
          "Собирает proof-driven контент для SEO- и sales-страниц",
          "Связывает услуги, портфолио и блог в одну контент-систему",
          "Усиливает сигналы E-E-A-T через структурированный экспертный контент",
        ],
      },
    },
  },
] as const;

export type TeamRoleType = (typeof TEAM_MEMBERS)[number]["roleType"];
export type TeamMemberId = (typeof TEAM_MEMBERS)[number]["id"];
export type TeamMember = (typeof TEAM_MEMBERS)[number];
export type TeamMemberContent = (typeof TEAM_MEMBERS)[number]["locale"][TeamMemberLocale];
export type LocalizedTeamMember = TeamMember & TeamMemberContent;

export function getTeamMember(id: string) {
  return TEAM_MEMBERS.find((member) => member.id === id);
}

export function getTeamMemberBaseContent(
  input: string | TeamMember,
  locale: string
): TeamMemberContent | undefined {
  const member = typeof input === "string" ? getTeamMember(input) : input;
  if (!member) {
    return undefined;
  }

  const baseLocale = getDefaultContentLocale(locale) as TeamMemberLocale;
  return repairEncodedTree(member.locale[baseLocale]);
}

export function getLocalizedTeamMember(
  member: TeamMember,
  locale: string
): LocalizedTeamMember {
  const baseContent = getTeamMemberBaseContent(member, locale);

  if (!baseContent) {
    return member as LocalizedTeamMember;
  }

  return {
    ...member,
    ...baseContent,
  } as LocalizedTeamMember;
}
