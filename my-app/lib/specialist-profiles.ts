import { getDefaultContentLocale, normalizeSiteLocale } from "@/lib/site-locales";
import type { ServiceId } from "@/lib/services";
import {
  deepMergeTranslationValue,
  getTranslationOverrideStoreSync,
} from "@/lib/site-translation-runtime";
import { repairEncodedTree } from "@/lib/text-encoding";

export type SpecialistSeoSection = {
  heading: string;
  paragraphs: string[];
};

export type SpecialistProfile = {
  slug: string;
  name: string;
  role: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  experience: string;
  focusChips: string[];
  highlightStats: {
    label: string;
    value: string;
  }[];
  activitySummary: string;
  achievementHighlights: string[];
  skills: string[];
  services: string[];
  seoSections: SpecialistSeoSection[];
  relatedServiceIds: ServiceId[];
};

type SupportedSpecialistLocale = "en" | "ru";

const SPECIALIST_SERVICE_LINKS: Record<string, string> = {
  "product discovery": "/services/marketing-research",
  "ux research, качественные и количественные исследования": "/services/ux-ui-design",
  "product strategy и feature definition": "/services/marketing-research",
  "разработка маркетинговой стратегии": "/services/marketing-research",
  "анализ конкурентов и конкурентной среды": "/services/marketing-research",
  "сегментация целевой аудитории и создание портретов клиентов":
    "/services/marketing-research",
  "разработка маркетинговых воронок": "/services/crm-automation",
  "mvp development": "/services/corporate-website-development",
  "saas product development": "/services/corporate-website-development",
  "a/b тестирование": "/services/ab-testing",
  "conversion optimization, cro": "/services/ab-testing",
  "seo-оптимизация сайтов": "/services/seo-promotion",
  "анализ конверсий и cro": "/services/ab-testing",
  "настройка веб-аналитики (google analytics 4)": "/services/analytics-setup",
  "дашборды и автоматическая отчетность": "/services/analytics-setup",
  "маркетинговый аудит и анализ текущей ситуации": "/services/marketing-research",
  "контекстная реклама (google ads)": "/services/google-ads-yandex-direct",
  "google ads": "/services/google-ads-yandex-direct",
  "таргетированная реклама в социальных сетях":
    "/services/targeted-ads-meta-vk-tiktok",
  "ретаргетинг и ремаркетинг": "/services/targeted-ads-meta-vk-tiktok",
  "контент-маркетинг": "/services/copywriting",
  "email-маркетинг и автоматизация": "/services/email-marketing",
  "лидогенерация и b2b-маркетинг": "/services/quiz-landing-pages",
  "user personas и journey mapping": "/services/ux-ui-design",
  "information architecture": "/services/ux-ui-design",
  "ux wireframes": "/services/ux-ui-design",
  "user flows и сценарии": "/services/ux-ui-design",
  "clickable prototypes": "/services/ux-ui-design",
  "ui design для web и mobile": "/services/ux-ui-design",
  "design systems": "/services/ux-ui-design",
  "usability optimization": "/services/ux-ui-design",
  "brand strategy and positioning": "/services/brand-identity",
  "visual direction и art direction": "/services/brand-identity",
  "ux research and user studies": "/services/ux-ui-design",
  "product strategy and feature definition": "/services/marketing-research",
  "marketing strategy development": "/services/marketing-research",
  "competitor research and market analysis": "/services/marketing-research",
  "audience segmentation and customer personas": "/services/marketing-research",
  "marketing funnel development": "/services/crm-automation",
  "technical seo and on-page optimization": "/services/seo-promotion",
  "a/b testing": "/services/ab-testing",
  "conversion optimization and cro": "/services/ab-testing",
  "conversion analysis and cro": "/services/ab-testing",
  "web analytics setup (ga4)": "/services/analytics-setup",
  "dashboards and automated reporting": "/services/analytics-setup",
  "paid social advertising": "/services/targeted-ads-meta-vk-tiktok",
  "remarketing and retargeting": "/services/targeted-ads-meta-vk-tiktok",
  "content marketing": "/services/copywriting",
  "email marketing and automation": "/services/email-marketing",
  "lead generation and b2b marketing": "/services/quiz-landing-pages",
  "user personas and journey mapping": "/services/ux-ui-design",
  "user flows and interaction scenarios": "/services/ux-ui-design",
  "ui design for web and mobile": "/services/ux-ui-design",
  "visual direction and art direction": "/services/brand-identity",
};

export const SPECIALIST_PROFILES: SpecialistProfile[] = [
  {
    slug: "leo-carter-performance-marketing",
    name: "Leo Carter",
    role: "Product Manager",
    h1: "Leo Carter — Product Manager | SaaS и Digital Product Manager",
    intro:
      "Leo Carter — опытный Product Manager с фокусом на развитие цифровых продуктов и рост пользовательских метрик. Как Product Manager, он специализируется на управлении продуктом, запуске MVP и оптимизации пользовательского опыта (UX). Его подход к product management помогает компаниям увеличивать конверсию, масштабировать продукты и достигать устойчивого роста бизнеса.",
    image: "/img/workers/man-with-curly-hair-smiles-isolated 1.jpg",
    imageAlt:
      "Product Manager Leo Carter — управление цифровыми продуктами, MVP и UX-оптимизация",
    metaTitle: "Product Manager Leo Carter — MVP, SaaS, UX, CRO",
    metaDescription:
      "Нанять Product Manager для запуска и роста продукта. MVP development, UX research, A/B тестирование, оптимизация конверсии.",
    experience: "8+ лет опыта",
    focusChips: ["SaaS и e-commerce", "MVP и growth", "UX, CRO, analytics"],
    highlightStats: [
      { label: "Опыт", value: "8+ лет" },
      { label: "Рост SaaS-аудитории", value: "+180%" },
      { label: "Фокус", value: "MVP, UX, CRO" },
    ],
    activitySummary:
      "Product Manager для запуска, развития и масштабирования digital-продуктов: сочетает продуктовую стратегию, исследования, аналитику и работу с конверсией.",
    achievementHighlights: [
      "Полный цикл product management от discovery до масштабирования",
      "Опыт в SaaS, e-commerce и международных digital-продуктах",
      "Сильная связка продукта, маркетинга, UX и аналитики",
    ],
    skills: [
      "Product management и управление жизненным циклом продукта",
      "Product discovery и формирование продуктовых гипотез",
      "Аналитика данных и работа с метриками (CAC, LTV, retention, conversion)",
      "UX-ориентированное мышление и работа с пользовательским опытом",
      "Проведение глубинных интервью и пользовательских исследований",
      "Agile / Scrum / Kanban методологии",
      "Управление кросс-функциональными командами",
      "Приоритизация backlog и построение product roadmap",
      "Запуск и масштабирование цифровых продуктов",
      "A/B тестирование и data-driven принятие решений",
      "Работа с SaaS и e-commerce продуктами",
      "Оптимизация конверсии (CRO)",
      "Базовая экспертиза в маркетинге и growth-стратегиях",
      "Коммуникация со стейкхолдерами и презентация решений",
      "Работа с международными рынками",
    ],
    services: [
      "Product discovery",
      "UX research, качественные и количественные исследования",
      "Product strategy и feature definition",
      "Разработка маркетинговой стратегии",
      "Анализ конкурентов и конкурентной среды",
      "Сегментация целевой аудитории и создание портретов клиентов",
      "Разработка маркетинговых воронок",
      "MVP development",
      "SaaS product development",
      "A/B тестирование",
      "Conversion optimization, CRO",
      "SEO-оптимизация сайтов",
      "Анализ конверсий и CRO",
      "Настройка веб-аналитики (Google Analytics 4)",
      "Дашборды и автоматическая отчетность",
    ],
    seoSections: [
      {
        heading: "Product Manager для запуска MVP и развития цифровых продуктов",
        paragraphs: [
          "Leo Carter — Product Manager с более чем 8-летним опытом работы в digital-продуктах, SaaS и e-commerce. За это время он прошёл путь от младшего аналитика до ведущего Product Manager, глубоко погрузившись во все этапы жизненного цикла продукта — от исследования идеи до масштабирования на международные рынки.",
          "Свою карьеру Leo начал в роли продуктового аналитика, где занимался сбором и интерпретацией пользовательских данных, работал с метриками и помогал команде принимать решения на основе реальных инсайтов. Уже тогда он активно участвовал в процессах <u>UX research, качественные и количественные исследования</u> и помогал формировать гипотезы для развития продукта. Этот фундамент позволил ему быстро вырасти до позиции Product Manager и взять на себя ответственность за развитие ключевых продуктовых направлений.",
          "В роли Product Manager Leo отвечал за полный цикл разработки продукта — от этапа <u>Product discovery</u> и формирования стратегии до запуска и масштабирования. Он активно участвовал в <u>разработке маркетинговой стратегии</u>, тесно работая с маркетинговыми и продуктовым командами для достижения синергии между продуктом и каналами привлечения. Его опыт включает управление кросс-функциональными командами (разработка, дизайн, маркетинг), выстраивание прозрачных процессов и внедрение Agile-подходов.",
        ],
      },
      {
        heading: "SaaS Product Manager с опытом масштабирования продуктов",
        paragraphs: [
          "Одним из ключевых навыков Leo является запуск продуктов с нуля. Он неоднократно руководил процессами <u>MVP development</u>, помогая компаниям быстро проверять гипотезы и находить product-market fit. В одном из проектов — SaaS-платформе для автоматизации маркетинга — под его руководством удалось увеличить активную аудиторию на 180% в течение первого года, а также значительно повысить показатели удержания пользователей.",
          "Leo уделяет особое внимание пользовательскому опыту и эффективности продукта. Он регулярно работает с такими направлениями, как <u>Conversion optimization, CRO</u> и <u>A/B тестирование</u>, что позволяет ему находить точки роста и повышать ключевые бизнес-метрики. Его решения всегда основаны на данных — он глубоко погружён в аналитику, понимает поведение пользователей и умеет трансформировать эти знания в конкретные продуктовые улучшения.",
        ],
      },
      {
        heading: "Product Manager для стартапов и технологических компаний",
        paragraphs: [
          "Также Leo активно вовлечён в процессы <u>SEO-оптимизация сайтов</u> и развитие органического трафика, работая на стыке продукта и маркетинга. Он понимает, как структура продукта, контент и пользовательский путь влияют на поисковую видимость и конверсию, и учитывает это при разработке новых функций и интерфейсов.",
          "Помимо этого, Leo имеет опыт работы с международными рынками, включая Европу и США, что позволяет ему учитывать культурные особенности пользователей и адаптировать продукт под разные сегменты. Он уверенно работает в распределённых командах, эффективно выстраивает коммуникацию и умеет доносить ценность продукта как до технических специалистов, так и до бизнес-стейкхолдеров.",
          "Сегодня Leo Carter — это Product Manager, который сочетает стратегическое мышление с практическим подходом к реализации. Его ключевая задача — создавать продукты, которые не только решают реальные проблемы пользователей, но и приносят измеримую бизнес-ценность, обеспечивая устойчивый рост компании.",
        ],
      },
    ],
    relatedServiceIds: ["marketingResearch", "analyticsSetup", "abTesting", "uxUiDesign"],
  },
  {
    slug: "alex-morgan-digital-marketing-specialist",
    name: "Alex Morgan",
    role: "Digital Marketing Specialist",
    h1: "Alex Morgan — Digital Marketing Specialist | Performance Marketing and Growth Marketing",
    intro:
      "Alex Morgan — опытный digital-маркетолог с фокусом на рост бизнеса, лидогенерацию и масштабирование онлайн-проектов. Как marketing specialist, он специализируется на разработке маркетинговой стратегии, performance marketing, SEO-продвижении и оптимизации конверсии (CRO). Его подход к digital marketing помогает компаниям системно увеличивать трафик, повышать конверсию и выстраивать устойчивый поток клиентов.",
    image: "/img/workers/dawda.jpg",
    imageAlt:
      "Digital marketing specialist Alex Morgan — performance marketing и SEO эксперт",
    metaTitle:
      "Digital Marketing Specialist Alex Morgan — SEO, Ads, CRO | Company X",
    metaDescription:
      "Нанять маркетолога для роста бизнеса. SEO, реклама, лидогенерация, CRO, аналитика и масштабирование digital-проектов. Реальные кейсы и результаты.",
    experience: "9+ лет опыта",
    focusChips: ["SEO, Ads, CRO", "B2B, B2C, SaaS", "Analytics и growth"],
    highlightStats: [
      { label: "Опыт", value: "9+ лет" },
      { label: "Фокус", value: "Traffic to revenue" },
      { label: "Экспертиза", value: "SEO + Ads + CRO" },
    ],
    activitySummary:
      "Digital marketing specialist для роста бизнеса: объединяет стратегию, performance marketing, SEO, аналитику и лидогенерацию в одну систему.",
    achievementHighlights: [
      "Строит комплексные маркетинговые системы, а не отдельные каналы",
      "Работает с ROI, CAC, LTV, воронками и качеством лидов",
      "Связывает рекламу, контент, SEO и аналитику в один контур роста",
    ],
    skills: [
      "Digital marketing и performance marketing",
      "Разработка маркетинговой стратегии и growth-стратегий",
      "Лидогенерация и построение воронок продаж",
      "Аналитика данных и работа с метриками (CAC, LTV, ROI, conversion)",
      "SEO и органический рост",
      "Контекстная и таргетированная реклама",
      "Оптимизация конверсии (CRO)",
      "A/B тестирование",
      "Контент-маркетинг и SMM",
      "Email-маркетинг и автоматизация",
      "Работа с Google Analytics 4 и аналитикой",
      "Управление рекламными бюджетами",
      "Работа с B2B и B2C сегментами",
      "Маркетинговая автоматизация и martech",
      "Коммуникация и работа с бизнес-целями",
    ],
    services: [
      "Разработка маркетинговой стратегии",
      "Маркетинговый аудит и анализ текущей ситуации",
      "Анализ конкурентов и конкурентной среды",
      "Сегментация целевой аудитории и создание портретов клиентов",
      "Разработка маркетинговых воронок",
      "Контекстная реклама (Google Ads)",
      "Таргетированная реклама в социальных сетях",
      "Ретаргетинг и ремаркетинг",
      "SEO-оптимизация сайтов",
      "Контент-маркетинг",
      "Email-маркетинг и автоматизация",
      "A/B тестирование",
      "Conversion optimization, CRO",
      "Настройка веб-аналитики (Google Analytics 4)",
      "Дашборды и автоматическая отчетность",
      "Лидогенерация и B2B-маркетинг",
    ],
    seoSections: [
      {
        heading: "Digital marketing specialist для роста бизнеса и лидогенерации",
        paragraphs: [
          "Alex Morgan — digital marketing specialist с более чем 9-летним опытом в интернет-маркетинге, performance marketing, B2B и B2C проектах, SaaS и e-commerce. За это время он работал с компаниями на разных стадиях развития — от стартапов до масштабируемых бизнесов, помогая выстраивать эффективные маркетинговые системы и увеличивать выручку.",
          "Свою карьеру Alex начал с аналитики и настройки рекламных кампаний, где глубоко погрузился в <u>маркетинговый аудит и анализ текущей ситуации</u> и работу с данными. Он занимался исследованием каналов привлечения, оптимизацией рекламных бюджетов и выстраиванием системы измерения эффективности маркетинга. Уже на этом этапе он активно применял <u>анализ конкурентов и конкурентной среды</u>, чтобы находить точки роста и усиливать позиции брендов.",
          "Со временем Alex расширил свою экспертизу и начал заниматься стратегическим маркетингом. Он разрабатывал комплексные <u>разработка маркетинговой стратегии</u>, включая позиционирование, выбор каналов и построение воронок продаж. Его сильная сторона — системный подход к маркетингу, где каждый инструмент работает на достижение конкретных бизнес-метрик.",
        ],
      },
      {
        heading: "Performance marketing и управление рекламными каналами",
        paragraphs: [
          "В рамках проектов Alex активно работает с <u>сегментация целевой аудитории и создание портретов клиентов</u>, что позволяет более точно настраивать коммуникацию и повышать эффективность рекламных кампаний. Он глубоко понимает поведение пользователей и умеет выстраивать <u>разработка маркетинговых воронок</u>, которые превращают трафик в клиентов.",
          "Одним из ключевых направлений его работы является performance marketing. Alex управляет рекламными каналами, включая <u>Google Ads</u>, таргетированную рекламу и ретаргетинг, постоянно оптимизируя кампании для достижения максимального ROI. Он также активно применяет <u>A/B тестирование</u> и <u>Conversion optimization, CRO</u>, чтобы находить наиболее эффективные решения и увеличивать конверсию на всех этапах воронки.",
        ],
      },
      {
        heading: "SEO-специалист и оптимизация конверсии (CRO)",
        paragraphs: [
          "Отдельное внимание Alex уделяет органическому росту. Он занимается <u>SEO-оптимизация сайтов</u>, выстраивает структуру сайтов, работает с контентом и внутренней перелинковкой, что позволяет компаниям получать стабильный поток трафика из поисковых систем. Его подход сочетает техническое SEO, контентную стратегию и анализ пользовательского поведения.",
          "Кроме того, Alex имеет опыт работы с контент-маркетингом и social media. Он участвовал в проектах по <u>контент-маркетинг</u>, созданию стратегий присутствия в социальных сетях и развитию бренда через digital-каналы. Это позволяет ему выстраивать комплексные маркетинговые системы, где реклама, контент и продукт работают в синергии.",
        ],
      },
      {
        heading: "Маркетолог для B2B, SaaS и e-commerce проектов",
        paragraphs: [
          "Также Alex активно работает с аналитикой: он настраивает <u>настройка веб-аналитики (Google Analytics 4)</u>, строит <u>дашборды и автоматическая отчетность</u> и анализирует ключевые метрики. Это позволяет принимать решения на основе данных и постоянно улучшать результаты.",
          "Сегодня Alex Morgan — это маркетолог, который сочетает стратегическое мышление, глубокую экспертизу в digital marketing и практический опыт работы с каналами привлечения. Его основная задача — не просто привлекать трафик, а выстраивать устойчивую систему роста бизнеса и увеличения прибыли.",
        ],
      },
    ],
    relatedServiceIds: [
      "marketingResearch",
      "contextGoogleYandex",
      "targetedMetaVkTiktok",
      "seoPromotion",
      "analyticsSetup",
      "emailMarketing",
    ],
  },
  {
    slug: "emma-collins-ux-ui-designer",
    name: "Emma Collins",
    role: "UX/UI Designer",
    h1: "Emma Collins — UX/UI Designer | Product Design и Digital Design",
    intro:
      "Emma Collins — опытный UX/UI дизайнер с фокусом на создании удобных, конверсионных и визуально сильных digital-продуктов. Как UX/UI designer, она специализируется на проектировании пользовательского опыта, интерфейсов и оптимизации конверсии (CRO). Ее подход к product design помогает компаниям улучшать пользовательский путь, повышать вовлеченность и увеличивать бизнес-результаты.",
    image: "/img/workers/beautifull-caucasian-woman-with-curly-hair-smiles-isolated 1.jpg",
    imageAlt:
      "UX/UI designer Emma Collins — product design и интерфейсы для web и mobile",
    metaTitle: "UX/UI Designer Emma Collins — Product Design, UX, UI, CRO | Company X",
    metaDescription:
      "Нанять UX/UI дизайнера для создания интерфейсов и роста конверсии. UX research, UI design, прототипирование, CRO и product design. Реальные кейсы.",
    experience: "8+ лет опыта",
    focusChips: ["Product design", "Web и mobile", "UX, UI, CRO"],
    highlightStats: [
      { label: "Опыт", value: "8+ лет" },
      { label: "Фокус", value: "UX + UI + CRO" },
      { label: "Форматы", value: "Web / Mobile" },
    ],
    activitySummary:
      "UX/UI Designer для цифровых продуктов, лендингов и интерфейсов: соединяет пользовательский опыт, визуальную систему и конверсионную логику.",
    achievementHighlights: [
      "Работает на стыке product design, UX research и conversion design",
      "Проектирует интерфейсы для SaaS, e-commerce и корпоративных продуктов",
      "Усиливает пользовательский путь, usability и бизнес-результат",
    ],
    skills: [
      "UX/UI дизайн и product design",
      "Проектирование пользовательского опыта (UX)",
      "UX research и анализ поведения пользователей",
      "Разработка user flows и customer journey",
      "Прототипирование (low, mid, high fidelity)",
      "UI дизайн для web и mobile",
      "Design systems и визуальные концепции",
      "Usability optimization",
      "Conversion optimization (CRO)",
      "A/B тестирование",
      "Работа с SaaS и e-commerce продуктами",
      "Interaction design",
      "Brand design и визуальная коммуникация",
      "Работа в кросс-функциональных командах",
      "Data-driven подход в дизайне",
    ],
    services: [
      "Product discovery",
      "UX research, качественные и количественные исследования",
      "Product strategy и feature definition",
      "User personas и journey mapping",
      "Information architecture",
      "UX wireframes",
      "User flows и сценарии",
      "Clickable prototypes",
      "UI design для web и mobile",
      "Design systems",
      "Usability optimization",
      "Conversion optimization, CRO",
      "A/B тестирование",
      "Brand strategy and positioning",
      "Visual direction и art direction",
    ],
    seoSections: [
      {
        heading: "UX/UI дизайнер для создания digital-продуктов и интерфейсов",
        paragraphs: [
          "Emma Collins — UX/UI designer с более чем 8-летним опытом в product design, web-дизайне и разработке цифровых интерфейсов для SaaS, e-commerce и корпоративных продуктов. За это время она реализовала десятки проектов, помогая компаниям создавать удобные, понятные и эффективные пользовательские интерфейсы.",
          "Свою карьеру Emma начала с графического дизайна и постепенно перешла в продуктовый дизайн, где сосредоточилась на пользовательском опыте. Она глубоко погрузилась в процессы <u>UX research, качественные и количественные исследования</u>, изучала поведение пользователей и формировала решения, основанные на данных и реальных инсайтах.",
        ],
      },
      {
        heading: "Product designer для SaaS, стартапов и e-commerce",
        paragraphs: [
          "Одним из ключевых этапов ее работы является <u>Product discovery</u>, в рамках которого Emma помогает командам определить цели продукта, выявить потребности пользователей и сформировать стратегию развития интерфейса. Она активно участвует в <u>Product strategy и feature definition</u>, обеспечивая баланс между бизнес-целями и пользовательским опытом.",
          "Emma также имеет сильную экспертизу в проектировании пользовательских сценариев и архитектуры продукта. Она разрабатывает user flows, структуру интерфейсов и прототипы, применяя такие направления, как <u>UX wireframes</u> и <u>Clickable prototypes</u>. Это позволяет командам быстро тестировать идеи и находить оптимальные решения еще до этапа разработки.",
        ],
      },
      {
        heading: "UX дизайнер для улучшения пользовательского опыта и конверсии",
        paragraphs: [
          "Визуальная составляющая — еще одна сильная сторона Emma. Она занимается <u>UI design для web и mobile</u>, создает современные интерфейсы, дизайн-системы и визуальные концепции. Ее дизайн не только эстетически привлекателен, но и решает бизнес-задачи, улучшая взаимодействие пользователей с продуктом.",
          "Отдельное внимание Emma уделяет эффективности интерфейсов. Она активно работает с <u>Usability optimization</u>, <u>Conversion optimization, CRO</u> и <u>A/B тестирование</u>, что позволяет повышать конверсию и улучшать пользовательский опыт на основе данных.",
        ],
      },
      {
        heading: "UI дизайнер для web и mobile интерфейсов",
        paragraphs: [
          "Кроме того, Emma взаимодействует с маркетинговыми командами и понимает, как дизайн влияет на привлечение и удержание пользователей. Она учитывает принципы <u>Brand strategy and positioning</u>, помогает выстраивать визуальную коммуникацию бренда и усиливать его узнаваемость.",
          "Также Emma имеет опыт работы с международными проектами и распределенными командами, что позволяет ей эффективно адаптировать дизайн под разные рынки и аудитории.",
          "Сегодня Emma Collins — это UX/UI дизайнер, который сочетает глубокое понимание пользователей, сильную визуальную экспертизу и системный подход к продукту. Ее задача — создавать дизайн, который не только красиво выглядит, но и приносит measurable бизнес-результаты.",
        ],
      },
    ],
    relatedServiceIds: ["uxUiDesign", "websiteRedesign", "abTesting", "brandIdentity"],
  },
];

const EN_SPECIALIST_PROFILE_OVERRIDES: Record<string, Partial<SpecialistProfile>> = {
  "leo-carter-performance-marketing": {
    role: "Product Manager",
    h1: "Leo Carter - Product Manager | SaaS & Digital Product Manager",
    intro:
      "Leo Carter is a product manager focused on digital product growth, MVP launches, and measurable user experience improvements. He works across SaaS and e-commerce products, connecting product strategy, research, and conversion thinking to business growth.",
    imageAlt:
      "Leo Carter, product manager focused on SaaS growth, MVP launches, and UX improvement",
    metaTitle: "Leo Carter - Product Manager | SaaS, MVP, UX, CRO",
    metaDescription:
      "Leo Carter is a product manager working on MVP launches, product discovery, UX improvement, and conversion growth for SaaS and digital products.",
    experience: "8+ years",
    focusChips: ["SaaS & e-commerce", "MVP & growth", "UX, CRO, analytics"],
    highlightStats: [
      { label: "Experience", value: "8+ years" },
      { label: "SaaS audience growth", value: "+180%" },
      { label: "Focus", value: "MVP, UX, CRO" },
    ],
    activitySummary:
      "Helps launch, structure, and scale digital products by combining product discovery, roadmap thinking, user research, and conversion analysis.",
    achievementHighlights: [
      "Owns the full product cycle from discovery to launch and iteration",
      "Works across SaaS, e-commerce, and growth-stage digital products",
      "Connects product, UX, analytics, and growth priorities into one system",
    ],
    skills: [
      "Product management and lifecycle ownership",
      "Product discovery and hypothesis development",
      "Data analysis across CAC, LTV, retention, and conversion metrics",
      "UX-oriented product thinking",
      "User interviews and research synthesis",
      "Agile, Scrum, and Kanban workflows",
      "Cross-functional team coordination",
      "Backlog prioritization and roadmap planning",
      "MVP launch and product scaling",
      "A/B testing and data-driven decision making",
      "SaaS and e-commerce product delivery",
      "Conversion rate optimization (CRO)",
      "Growth and marketing collaboration",
      "Stakeholder communication and alignment",
      "International product work",
    ],
    services: [
      "Product discovery",
      "UX research and user studies",
      "Product strategy and feature definition",
      "Marketing strategy development",
      "Competitor research and market analysis",
      "Audience segmentation and customer personas",
      "Marketing funnel development",
      "MVP development",
      "SaaS product development",
      "A/B testing",
      "Conversion optimization and CRO",
      "Technical SEO and on-page optimization",
      "Conversion analysis and CRO",
      "Web analytics setup (GA4)",
      "Dashboards and automated reporting",
    ],
    seoSections: [
      {
        heading: "Product manager for MVP launches and digital product growth",
        paragraphs: [
          "Leo Carter works on digital products that need clear structure, fast validation, and a path from idea to repeatable growth. His role usually starts where product assumptions are still vague and the team needs stronger decisions around audience, value, and priorities.",
          "He combines <u>Product discovery</u>, research, and product strategy to help teams define what should be built first, what should be tested, and which user problems matter most. That shortens the distance between planning and measurable product progress.",
        ],
      },
      {
        heading: "SaaS product manager with conversion and retention focus",
        paragraphs: [
          "In SaaS and subscription products, Leo pays close attention to activation, retention, and conversion points across the customer journey. He works with <u>Conversion optimization, CRO</u>, <u>A/B testing</u>, and behavioral analytics to improve product decisions with real evidence.",
          "This makes him valuable not only at launch stage, but also when an existing product needs better onboarding, clearer priorities, or a stronger growth model tied to actual user behavior.",
        ],
      },
      {
        heading: "Product strategy connected to research, analytics, and growth",
        paragraphs: [
          "Leo often works across product, design, analytics, and marketing functions. That includes <u>UX research and user studies</u>, roadmap planning, and <u>Web analytics setup (GA4)</u> so product decisions stay connected to both user insight and business targets.",
          "The result is a more disciplined product process: fewer assumptions, clearer ownership, and a stronger link between features, user experience, and growth outcomes.",
        ],
      },
    ],
  },
  "alex-morgan-digital-marketing-specialist": {
    role: "Digital Marketing Specialist",
    h1: "Alex Morgan - Digital Marketing Specialist | Performance Marketing & SEO",
    intro:
      "Alex Morgan is a digital marketing specialist focused on growth systems, lead generation, and scalable acquisition. He combines strategy, paid traffic, SEO, analytics, and funnel optimization to help businesses grow with more control.",
    imageAlt:
      "Alex Morgan, digital marketing specialist focused on performance marketing, SEO, and lead generation",
    metaTitle:
      "Alex Morgan - Digital Marketing Specialist | Performance Marketing, SEO, Analytics",
    metaDescription:
      "Alex Morgan is a digital marketing specialist working on performance marketing, SEO, analytics, lead generation, and conversion growth.",
    experience: "9+ years",
    focusChips: ["Performance & SEO", "Lead generation", "Analytics & growth"],
    highlightStats: [
      { label: "Experience", value: "9+ years" },
      { label: "Focus", value: "Traffic, leads, ROI" },
      { label: "Channels", value: "Paid + organic" },
    ],
    activitySummary:
      "Builds acquisition systems that connect strategy, traffic, analytics, and conversion so growth stays measurable and scalable.",
    achievementHighlights: [
      "Combines paid traffic, SEO, analytics, and funnel logic in one system",
      "Works across B2B, SaaS, e-commerce, and service businesses",
      "Improves lead quality, reporting clarity, and channel efficiency",
    ],
    skills: [
      "Digital marketing strategy",
      "Performance marketing and campaign optimization",
      "SEO strategy and on-page growth",
      "Google Ads and paid search",
      "Paid social campaign management",
      "Audience segmentation and funnel planning",
      "Lead generation systems",
      "Conversion rate optimization",
      "Web analytics and reporting",
      "Dashboard design and KPI tracking",
      "Content marketing coordination",
      "Email marketing and automation",
      "Competitor and market analysis",
      "B2B and e-commerce growth support",
      "Cross-channel performance analysis",
    ],
    services: [
      "Marketing strategy development",
      "Competitor research and market analysis",
      "Audience segmentation and customer personas",
      "Marketing funnel development",
      "Google Ads",
      "Paid social advertising",
      "Remarketing and retargeting",
      "Technical SEO and on-page optimization",
      "Content marketing",
      "Email marketing and automation",
      "Lead generation and B2B marketing",
      "Web analytics setup (GA4)",
      "Dashboards and automated reporting",
      "Conversion optimization and CRO",
    ],
    seoSections: [
      {
        heading: "Digital marketing specialist for scalable lead generation",
        paragraphs: [
          "Alex Morgan works with businesses that need more than isolated campaigns. He builds growth systems where strategy, paid acquisition, SEO, and analytics support the same revenue goal instead of competing for budget and attention.",
          "His work often starts with <u>Marketing strategy development</u>, funnel analysis, and channel prioritization so the team understands where demand should come from and how that demand should turn into qualified leads.",
        ],
      },
      {
        heading: "Performance marketing, SEO, and analytics in one operating model",
        paragraphs: [
          "Alex combines paid traffic and organic search to reduce channel dependency and improve efficiency over time. That includes <u>Google Ads</u>, <u>Paid social advertising</u>, and <u>Technical SEO and on-page optimization</u> supported by consistent measurement.",
          "He also works with <u>Web analytics setup (GA4)</u> and reporting so decisions are based on lead quality, conversion, and revenue signals rather than surface-level traffic metrics.",
        ],
      },
      {
        heading: "Growth support for B2B, SaaS, and e-commerce teams",
        paragraphs: [
          "For growth-stage teams, Alex helps connect acquisition with content, automation, and follow-up. That can include <u>Content marketing</u>, <u>Email marketing and automation</u>, and offer testing around real customer demand.",
          "The result is a marketing system that is easier to scale, easier to diagnose, and more aligned with how the business actually sells.",
        ],
      },
    ],
  },
  "emma-collins-ux-ui-designer": {
    role: "UX/UI Designer",
    h1: "Emma Collins - UX/UI Designer | Product Design & Conversion UX",
    intro:
      "Emma Collins is a UX/UI designer focused on product interfaces, landing pages, and conversion-oriented design systems. She connects research, usability, and visual clarity so digital products become easier to use and easier to grow.",
    imageAlt:
      "Emma Collins, UX/UI designer focused on product design, interface systems, and CRO",
    metaTitle: "Emma Collins - UX/UI Designer | Product Design, UX, UI, CRO",
    metaDescription:
      "Emma Collins is a UX/UI designer working on product design, user research, prototyping, and conversion-focused interface improvement.",
    experience: "8+ years",
    focusChips: ["Product design", "Web & mobile", "UX, UI, CRO"],
    highlightStats: [
      { label: "Experience", value: "8+ years" },
      { label: "Focus", value: "UX + UI + CRO" },
      { label: "Formats", value: "Web / Mobile" },
    ],
    activitySummary:
      "Designs user journeys, interfaces, and visual systems that improve clarity, usability, and conversion across digital products.",
    achievementHighlights: [
      "Works across product design, research, and conversion improvement",
      "Designs for SaaS, e-commerce, and business websites",
      "Connects usability decisions to measurable business outcomes",
    ],
    skills: [
      "UX/UI design and product design",
      "User research and insight synthesis",
      "User journey and flow design",
      "Wireframing and prototyping",
      "UI systems for web and mobile",
      "Design systems and component thinking",
      "Usability optimization",
      "Conversion-focused design",
      "A/B testing support",
      "Interaction design",
      "Brand-aligned interface design",
      "Cross-functional collaboration",
      "Data-informed design decisions",
    ],
    services: [
      "Product discovery",
      "UX research and user studies",
      "Product strategy and feature definition",
      "User personas and journey mapping",
      "Information architecture",
      "UX wireframes",
      "User flows and interaction scenarios",
      "Clickable prototypes",
      "UI design for web and mobile",
      "Design systems",
      "Usability optimization",
      "Conversion optimization and CRO",
      "A/B testing",
      "Brand strategy and positioning",
      "Visual direction and art direction",
    ],
    seoSections: [
      {
        heading: "UX/UI designer for digital products and conversion-focused interfaces",
        paragraphs: [
          "Emma Collins works on digital products and websites that need clearer structure, stronger usability, and a more intentional visual system. Her process starts with understanding user behavior before turning that insight into interface decisions.",
          "She uses <u>UX research and user studies</u>, architecture work, and prototyping to help teams simplify journeys, reduce friction, and make key actions easier to complete.",
        ],
      },
      {
        heading: "Product design for SaaS, e-commerce, and business websites",
        paragraphs: [
          "Emma supports both new products and redesigns. That includes <u>Product discovery</u>, interface planning, <u>UX wireframes</u>, and <u>Clickable prototypes</u> so teams can test ideas before committing fully to development.",
          "Her work is especially useful when a product needs better onboarding, stronger visual consistency, or a cleaner structure across web and mobile screens.",
        ],
      },
      {
        heading: "Design systems, usability, and CRO working together",
        paragraphs: [
          "Beyond visuals, Emma focuses on how design affects performance. She works with <u>Usability optimization</u>, <u>Conversion optimization, CRO</u>, and experiment support so interface changes lead to clearer business outcomes.",
          "That combination helps teams move from isolated screens to a more coherent product experience that is easier to maintain and easier to improve over time.",
        ],
      },
    ],
  },
};

export function getSpecialistProfile(slug: string) {
  return SPECIALIST_PROFILES.find((profile) => profile.slug === slug);
}

export function getSpecialistProfileBase(
  input: string | SpecialistProfile,
  locale: string
) {
  const profile = typeof input === "string" ? getSpecialistProfile(input) : input;
  if (!profile) {
    return undefined;
  }

  const contentLocale = getDefaultContentLocale(locale) as SupportedSpecialistLocale;
  const baseProfile = repairEncodedTree(profile);

  if (contentLocale === "ru") {
    return baseProfile;
  }

  return repairEncodedTree({
    ...baseProfile,
    ...EN_SPECIALIST_PROFILE_OVERRIDES[profile.slug],
  });
}

export function getLocalizedSpecialistProfile(
  input: string | SpecialistProfile,
  locale: string
) {
  const profile = typeof input === "string" ? getSpecialistProfile(input) : input;
  if (!profile) {
    return undefined;
  }

  const normalizedLocale = normalizeSiteLocale(locale);
  const overrides = getTranslationOverrideStoreSync();
  const baseProfile = getSpecialistProfileBase(profile, locale);

  if (!baseProfile) {
    return undefined;
  }

  return repairEncodedTree(
    deepMergeTranslationValue(
      baseProfile,
      overrides.specialistProfiles[profile.slug]?.[normalizedLocale]
    )
  );
}

export function normalizeSpecialistLinkLabel(label: string) {
  return label.replace(/\s+/g, " ").trim().toLowerCase();
}

export function getSpecialistServiceHref(label: string) {
  return (
    SPECIALIST_SERVICE_LINKS[normalizeSpecialistLinkLabel(label)] ?? "/services"
  );
}
