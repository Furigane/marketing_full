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

type SupportedSpecialistLocale = string;

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

const SPECIALIST_PROFILE_LOCALE_OVERRIDES: Record<
  string,
  Record<string, Partial<SpecialistProfile>>
> = {
  en: EN_SPECIALIST_PROFILE_OVERRIDES,

  de: {
    "leo-carter-performance-marketing": {
      role: "Produktmanager",
      h1: "Leo Carter – Produktmanager | SaaS & digitale Produktentwicklung",
      intro:
        "Leo Carter ist ein erfahrener Produktmanager mit Schwerpunkt auf digitales Produktwachstum, MVP-Launches und messbare Verbesserungen der Nutzererfahrung. Er arbeitet mit SaaS- und E-Commerce-Produkten und verbindet Produktstrategie, Research und Conversion-Denken mit Geschäftswachstum.",
      imageAlt:
        "Leo Carter, Produktmanager mit Fokus auf SaaS-Wachstum, MVP-Launches und UX-Verbesserung",
      metaTitle: "Leo Carter – Produktmanager | SaaS, MVP, UX, CRO",
      metaDescription:
        "Leo Carter arbeitet an MVP-Launches, Product Discovery, UX-Verbesserungen und Conversion-Wachstum für SaaS- und digitale Produkte.",
      experience: "8+ Jahre",
      focusChips: ["SaaS & E-Commerce", "MVP & Wachstum", "UX, CRO, Analytics"],
      highlightStats: [
        { label: "Erfahrung", value: "8+ Jahre" },
        { label: "SaaS-Zielgruppenwachstum", value: "+180%" },
        { label: "Fokus", value: "MVP, UX, CRO" },
      ],
      activitySummary:
        "Hilft beim Start, Strukturierung und Skalierung digitaler Produkte durch Product Discovery, Roadmap-Planung, Nutzerforschung und Conversion-Analyse.",
      achievementHighlights: [
        "Verantwortet den gesamten Produktzyklus von Discovery bis Launch und Iteration",
        "Arbeitet mit SaaS-, E-Commerce- und wachstumsorientierten digitalen Produkten",
        "Verbindet Produkt, UX, Analytics und Wachstumsprioritäten in einem System",
      ],
      skills: [
        "Produktmanagement und Lifecycle-Verantwortung",
        "Product Discovery und Hypothesenentwicklung",
        "Datenanalyse zu CAC, LTV, Retention und Conversion-Metriken",
        "UX-orientiertes Produktdenken",
        "Nutzerinterviews und Research-Synthese",
        "Agile-, Scrum- und Kanban-Workflows",
        "Koordination funktionsübergreifender Teams",
        "Backlog-Priorisierung und Roadmap-Planung",
        "MVP-Launch und Produktskalierung",
        "A/B-Testing und datengetriebene Entscheidungsfindung",
        "SaaS- und E-Commerce-Produktlieferung",
        "Conversion Rate Optimization (CRO)",
        "Zusammenarbeit mit Wachstum und Marketing",
        "Stakeholder-Kommunikation und Abstimmung",
        "Internationale Produktarbeit",
      ],
      services: [
        "Product Discovery",
        "UX Research and user studies",
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
          heading: "Produktmanager für MVP-Launches und digitales Produktwachstum",
          paragraphs: [
            "Leo Carter arbeitet mit digitalen Produkten, die eine klare Struktur, schnelle Validierung und einen Weg von der Idee zu wiederkehrendem Wachstum benötigen. Seine Rolle beginnt oft dort, wo Produktannahmen noch vage sind und das Team fundiertere Entscheidungen zu Zielgruppe, Wert und Prioritäten benötigt.",
            "Er kombiniert <u>Product Discovery</u>, Research und Produktstrategie, um Teams dabei zu helfen, zu definieren, was zuerst gebaut, was getestet und welche Nutzerprobleme am wichtigsten sind. Das verkürzt den Weg zwischen Planung und messbarem Produktfortschritt.",
          ],
        },
        {
          heading: "SaaS-Produktmanager mit Fokus auf Conversion und Retention",
          paragraphs: [
            "Bei SaaS- und Abonnementprodukten achtet Leo besonders auf Aktivierung, Retention und Conversion-Punkte entlang der Customer Journey. Er arbeitet mit <u>Conversion Optimization, CRO</u>, <u>A/B-Testing</u> und Verhaltensanalysen, um Produktentscheidungen mit echten Belegen zu verbessern.",
            "Das macht ihn nicht nur in der Launch-Phase wertvoll, sondern auch wenn ein bestehendes Produkt besseres Onboarding, klarere Prioritäten oder ein stärkeres Wachstumsmodell benötigt, das an das tatsächliche Nutzerverhalten geknüpft ist.",
          ],
        },
        {
          heading: "Produktstrategie verbunden mit Research, Analytics und Wachstum",
          paragraphs: [
            "Leo arbeitet häufig funktionsübergreifend in Produkt, Design, Analytics und Marketing. Das umfasst <u>UX Research und Nutzerstudien</u>, Roadmap-Planung und <u>Web-Analytics-Setup (GA4)</u>, damit Produktentscheidungen sowohl mit Nutzer-Insights als auch mit Geschäftszielen verbunden bleiben.",
            "Das Ergebnis ist ein disziplinierterer Produktprozess: weniger Annahmen, klarere Verantwortlichkeiten und eine stärkere Verbindung zwischen Features, Nutzererfahrung und Wachstumsergebnissen.",
          ],
        },
      ],
    },
    "alex-morgan-digital-marketing-specialist": {
      role: "Digital-Marketing-Spezialist",
      h1: "Alex Morgan – Digital-Marketing-Spezialist | Performance Marketing & SEO",
      intro:
        "Alex Morgan ist ein Digital-Marketing-Spezialist mit Fokus auf Wachstumssysteme, Lead-Generierung und skalierbare Kundengewinnung. Er kombiniert Strategie, bezahlten Traffic, SEO, Analytics und Funnel-Optimierung, um Unternehmen kontrollierter wachsen zu lassen.",
      imageAlt:
        "Alex Morgan, Digital-Marketing-Spezialist mit Fokus auf Performance Marketing, SEO und Lead-Generierung",
      metaTitle:
        "Alex Morgan – Digital-Marketing-Spezialist | Performance Marketing, SEO, Analytics",
      metaDescription:
        "Alex Morgan ist ein Digital-Marketing-Spezialist für Performance Marketing, SEO, Analytics, Lead-Generierung und Conversion-Wachstum.",
      experience: "9+ Jahre",
      focusChips: ["Performance & SEO", "Lead-Generierung", "Analytics & Wachstum"],
      highlightStats: [
        { label: "Erfahrung", value: "9+ Jahre" },
        { label: "Fokus", value: "Traffic, Leads, ROI" },
        { label: "Kanäle", value: "Bezahlt + Organisch" },
      ],
      activitySummary:
        "Entwickelt Akquise-Systeme, die Strategie, Traffic, Analytics und Conversion verbinden, damit Wachstum messbar und skalierbar bleibt.",
      achievementHighlights: [
        "Kombiniert bezahlten Traffic, SEO, Analytics und Funnel-Logik in einem System",
        "Arbeitet mit B2B-, SaaS-, E-Commerce- und Dienstleistungsunternehmen",
        "Verbessert Lead-Qualität, Berichtsklarheit und Kanaleffizienz",
      ],
      skills: [
        "Digital-Marketing-Strategie",
        "Performance Marketing und Kampagnenoptimierung",
        "SEO-Strategie und organisches Wachstum",
        "Google Ads und bezahlte Suche",
        "Management von Paid-Social-Kampagnen",
        "Zielgruppensegmentierung und Funnel-Planung",
        "Lead-Generierungssysteme",
        "Conversion Rate Optimization",
        "Web-Analytics und Reporting",
        "Dashboard-Design und KPI-Tracking",
        "Content-Marketing-Koordination",
        "E-Mail-Marketing und Automatisierung",
        "Wettbewerber- und Marktanalyse",
        "B2B- und E-Commerce-Wachstumsunterstützung",
        "Cross-Channel-Performance-Analyse",
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
          heading: "Digital-Marketing-Spezialist für skalierbare Lead-Generierung",
          paragraphs: [
            "Alex Morgan arbeitet mit Unternehmen, die mehr als isolierte Kampagnen benötigen. Er entwickelt Wachstumssysteme, bei denen Strategie, bezahlte Akquise, SEO und Analytics dasselbe Umsatzziel unterstützen, anstatt um Budget und Aufmerksamkeit zu konkurrieren.",
            "Seine Arbeit beginnt oft mit <u>Marketing Strategy Development</u>, Funnel-Analyse und Kanal-Priorisierung, damit das Team versteht, woher die Nachfrage kommen soll und wie diese Nachfrage in qualifizierte Leads umgewandelt werden soll.",
            "Alex startete seine Karriere mit Analytics und der Verwaltung von Werbekampagnen, wo er sich intensiv mit dem <u>Marketing-Audit und der Analyse der aktuellen Situation</u> sowie der Arbeit mit Daten beschäftigte. Er analysierte Akquisekanäle, optimierte Werbebudgets und baute ein System zur Messung der Marketingeffektivität auf. Bereits in dieser Phase wendete er aktiv die <u>Wettbewerber- und Marktanalyse</u> an, um Wachstumspotenziale zu identifizieren und die Marktposition der Marken zu stärken.",
          ],
        },
        {
          heading: "Performance Marketing, SEO und Analytics in einem Betriebsmodell",
          paragraphs: [
            "Alex kombiniert bezahlten Traffic und organische Suche, um Kanalabhängigkeit zu reduzieren und die Effizienz im Laufe der Zeit zu verbessern. Dazu gehören <u>Google Ads</u>, <u>Paid Social Advertising</u> und <u>Technical SEO und On-Page-Optimierung</u>, unterstützt durch konsistente Messung.",
            "Er arbeitet auch mit <u>Web-Analytics-Setup (GA4)</u> und Reporting, damit Entscheidungen auf Lead-Qualität, Conversion und Umsatzsignalen basieren und nicht auf oberflächlichen Traffic-Metriken.",
            "Im Rahmen seiner Projekte arbeitet Alex intensiv mit der <u>Zielgruppensegmentierung und der Erstellung von Kundenprofilen</u>, was eine präzisere Kommunikation und eine höhere Effektivität der Werbekampagnen ermöglicht. Er versteht das Nutzerverhalten tiefgehend und entwickelt <u>Marketingtrichter</u>, die Traffic in Kunden umwandeln. Außerdem setzt er konsequent <u>A/B-Testing</u> und <u>Conversion Optimization, CRO</u> ein, um die effektivsten Lösungen zu finden und die Conversion an allen Stellen des Funnels zu steigern.",
          ],
        },
        {
          heading: "Wachstumsunterstützung für B2B-, SaaS- und E-Commerce-Teams",
          paragraphs: [
            "Für wachstumsorientierte Teams hilft Alex dabei, Akquise mit Content, Automatisierung und Follow-up zu verbinden. Das kann <u>Content Marketing</u>, <u>E-Mail-Marketing und Automatisierung</u> sowie Angebots-Testing rund um echte Kundennachfrage umfassen.",
            "Das Ergebnis ist ein Marketing-System, das einfacher zu skalieren, leichter zu diagnostizieren und besser darauf ausgerichtet ist, wie das Unternehmen tatsächlich verkauft.",
            "Heute ist Alex Morgan ein Marketingspezialist, der strategisches Denken, tiefgehende Expertise im digitalen Marketing und praktische Erfahrung mit Akquisekanälen vereint. Seine Hauptaufgabe ist es, nicht nur Traffic zu generieren, sondern ein nachhaltiges System für Unternehmenswachstum und Umsatzsteigerung aufzubauen.",
          ],
        },
      ],
    },
    "emma-collins-ux-ui-designer": {
      role: "UX/UI-Designerin",
      h1: "Emma Collins – UX/UI-Designerin | Produktdesign & Conversion UX",
      intro:
        "Emma Collins ist eine UX/UI-Designerin mit Fokus auf Produktoberflächen, Landingpages und konversionsorientierte Designsysteme. Sie verbindet Research, Usability und visuelle Klarheit, damit digitale Produkte einfacher zu bedienen und einfacher zu wachsen sind.",
      imageAlt:
        "Emma Collins, UX/UI-Designerin mit Fokus auf Produktdesign, Interface-Systeme und CRO",
      metaTitle: "Emma Collins – UX/UI-Designerin | Produktdesign, UX, UI, CRO",
      metaDescription:
        "Emma Collins ist eine UX/UI-Designerin für Produktdesign, Nutzerforschung, Prototyping und konversionsorientierte Interface-Verbesserung.",
      experience: "8+ Jahre",
      focusChips: ["Produktdesign", "Web & Mobile", "UX, UI, CRO"],
      highlightStats: [
        { label: "Erfahrung", value: "8+ Jahre" },
        { label: "Fokus", value: "UX + UI + CRO" },
        { label: "Formate", value: "Web / Mobile" },
      ],
      activitySummary:
        "Gestaltet User Journeys, Interfaces und visuelle Systeme, die Klarheit, Usability und Conversion in digitalen Produkten verbessern.",
      achievementHighlights: [
        "Arbeitet an der Schnittstelle von Produktdesign, Research und Conversion-Verbesserung",
        "Gestaltet für SaaS, E-Commerce und Business-Websites",
        "Verbindet Usability-Entscheidungen mit messbaren Geschäftsergebnissen",
      ],
      skills: [
        "UX/UI-Design und Produktdesign",
        "Nutzerforschung und Insight-Synthese",
        "User Journey- und Flow-Design",
        "Wireframing und Prototyping",
        "UI-Systeme für Web und Mobile",
        "Designsysteme und Komponentendenken",
        "Usability-Optimierung",
        "Konversionsorientiertes Design",
        "A/B-Testing-Unterstützung",
        "Interaction Design",
        "Markenkonformes Interface-Design",
        "Funktionsübergreifende Zusammenarbeit",
        "Datengestützte Designentscheidungen",
      ],
      services: [
        "Product Discovery",
        "UX Research and user studies",
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
          heading:
            "UX/UI-Designerin für digitale Produkte und konversionsorientierte Interfaces",
          paragraphs: [
            "Emma Collins arbeitet mit digitalen Produkten und Websites, die eine klarere Struktur, stärkere Usability und ein bewussteres visuelles System benötigen. Ihr Prozess beginnt damit, das Nutzerverhalten zu verstehen, bevor dieses Wissen in Interface-Entscheidungen umgesetzt wird.",
            "Sie nutzt <u>UX Research und Nutzerstudien</u>, Architekturarbeit und Prototyping, um Teams dabei zu helfen, Journeys zu vereinfachen, Reibung zu reduzieren und wichtige Aktionen leichter abschließbar zu machen.",
          ],
        },
        {
          heading: "Produktdesign für SaaS, E-Commerce und Business-Websites",
          paragraphs: [
            "Emma unterstützt sowohl neue Produkte als auch Redesigns. Das umfasst <u>Product Discovery</u>, Interface-Planung, <u>UX Wireframes</u> und <u>Klickbare Prototypen</u>, damit Teams Ideen testen können, bevor sie sich vollständig der Entwicklung verschreiben.",
            "Ihre Arbeit ist besonders wertvoll, wenn ein Produkt ein besseres Onboarding, stärkere visuelle Konsistenz oder eine klarere Struktur über Web- und Mobile-Screens hinweg benötigt.",
          ],
        },
        {
          heading: "Designsysteme, Usability und CRO gemeinsam denken",
          paragraphs: [
            "Über die Visuals hinaus konzentriert sich Emma darauf, wie Design die Performance beeinflusst. Sie arbeitet mit <u>Usability-Optimierung</u>, <u>Conversion Optimization, CRO</u> und Experiment-Unterstützung, damit Interface-Änderungen zu klareren Geschäftsergebnissen führen.",
            "Diese Kombination hilft Teams, von isolierten Screens zu einem kohärenteren Produkterlebnis zu gelangen, das einfacher zu pflegen und einfacher im Laufe der Zeit zu verbessern ist.",
          ],
        },
      ],
    },
  },

  fr: {
    "leo-carter-performance-marketing": {
      role: "Chef de produit",
      h1: "Leo Carter – Chef de produit | SaaS & gestion de produits numériques",
      intro:
        "Leo Carter est un chef de produit expérimenté spécialisé dans la croissance des produits numériques, le lancement de MVP et l'amélioration mesurable de l'expérience utilisateur. Il travaille sur des produits SaaS et e-commerce en combinant stratégie produit, recherche et optimisation de la conversion au service de la croissance.",
      imageAlt:
        "Leo Carter, chef de produit spécialisé dans la croissance SaaS, les lancements MVP et l'amélioration UX",
      metaTitle: "Leo Carter – Chef de produit | SaaS, MVP, UX, CRO",
      metaDescription:
        "Leo Carter travaille sur les lancements MVP, la découverte produit, l'amélioration UX et la croissance de conversion pour les produits SaaS et numériques.",
      experience: "8+ ans",
      focusChips: ["SaaS & e-commerce", "MVP & croissance", "UX, CRO, analytics"],
      highlightStats: [
        { label: "Expérience", value: "8+ ans" },
        { label: "Croissance audience SaaS", value: "+180%" },
        { label: "Focus", value: "MVP, UX, CRO" },
      ],
      activitySummary:
        "Aide à lancer, structurer et faire évoluer des produits numériques en combinant découverte produit, planification de roadmap, recherche utilisateur et analyse de conversion.",
      achievementHighlights: [
        "Pilote le cycle produit complet de la découverte au lancement et à l'itération",
        "Travaille sur des produits SaaS, e-commerce et en phase de croissance",
        "Connecte produit, UX, analytics et priorités de croissance en un seul système",
      ],
      skills: [
        "Gestion de produit et responsabilité du cycle de vie",
        "Découverte produit et développement d'hypothèses",
        "Analyse des données CAC, LTV, rétention et conversion",
        "Réflexion produit orientée UX",
        "Entretiens utilisateurs et synthèse de recherche",
        "Workflows Agile, Scrum et Kanban",
        "Coordination d'équipes transverses",
        "Priorisation du backlog et planification de roadmap",
        "Lancement MVP et mise à l'échelle produit",
        "A/B testing et prise de décision basée sur les données",
        "Livraison de produits SaaS et e-commerce",
        "Optimisation du taux de conversion (CRO)",
        "Collaboration croissance et marketing",
        "Communication et alignement des parties prenantes",
        "Travail produit à l'international",
      ],
      services: [
        "Product Discovery",
        "UX Research and user studies",
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
          heading: "Chef de produit pour les lancements MVP et la croissance produit numérique",
          paragraphs: [
            "Leo Carter travaille avec des produits numériques qui ont besoin d'une structure claire, d'une validation rapide et d'un chemin de l'idée à une croissance reproductible. Son rôle commence souvent là où les hypothèses produit sont encore floues et où l'équipe a besoin de décisions plus solides sur l'audience, la valeur et les priorités.",
            "Il combine <u>Product Discovery</u>, recherche et stratégie produit pour aider les équipes à définir ce qui doit être construit en premier, ce qui doit être testé et quels problèmes utilisateurs sont les plus importants. Cela raccourcit la distance entre la planification et les progrès produit mesurables.",
            "En tant que Product Manager, Leo a été responsable du cycle complet de développement produit — de la phase de <u>Product Discovery</u> et de la définition de la stratégie jusqu'au lancement et à la mise à l'échelle. Il a participé activement à l'<u>élaboration de la stratégie marketing</u>, en travaillant étroitement avec les équipes marketing et produit pour créer des synergies entre le produit et les canaux d'acquisition. Son expérience inclut la gestion d'équipes transverses (développement, design, marketing), la mise en place de processus transparents et l'adoption des méthodologies Agile.",
          ],
        },
        {
          heading: "Chef de produit SaaS avec focus sur la conversion et la rétention",
          paragraphs: [
            "Sur les produits SaaS et d'abonnement, Leo accorde une attention particulière aux points d'activation, de rétention et de conversion tout au long du parcours client. Il travaille avec <u>Optimisation de la conversion, CRO</u>, <u>A/B testing</u> et analyses comportementales pour améliorer les décisions produit avec des preuves réelles.",
            "Cela le rend précieux non seulement en phase de lancement, mais aussi quand un produit existant a besoin d'un meilleur onboarding, de priorités plus claires ou d'un modèle de croissance plus solide lié au comportement réel des utilisateurs.",
            "Leo est particulièrement reconnu pour sa capacité à lancer des produits de zéro. Il a dirigé à plusieurs reprises des processus de <u>MVP development</u>, aidant les entreprises à valider rapidement leurs hypothèses et à trouver le product-market fit. Dans un projet SaaS d'automatisation marketing, il a contribué à augmenter l'audience active de 180% au cours de la première année, tout en améliorant significativement les indicateurs de rétention.",
          ],
        },
        {
          heading: "Stratégie produit connectée à la recherche, l'analytics et la croissance",
          paragraphs: [
            "Leo travaille souvent en transverse sur le produit, le design, l'analytics et le marketing. Cela inclut la <u>Recherche UX et études utilisateurs</u>, la planification de roadmap et la <u>Configuration web analytics (GA4)</u> pour que les décisions produit restent connectées aux insights utilisateurs et aux objectifs business.",
            "Le résultat est un processus produit plus discipliné : moins d'hypothèses, des responsabilités plus claires et un lien plus fort entre les fonctionnalités, l'expérience utilisateur et les résultats de croissance.",
            "Aujourd'hui, Leo Carter est un Product Manager qui allie réflexion stratégique et approche pragmatique de l'exécution. Sa mission principale est de créer des produits qui non seulement résolvent les vrais problèmes des utilisateurs, mais génèrent également une valeur commerciale mesurable, assurant une croissance durable à l'entreprise.",
          ],
        },
      ],
    },
    "alex-morgan-digital-marketing-specialist": {
      role: "Spécialiste en marketing digital",
      h1: "Alex Morgan – Spécialiste en marketing digital | Performance Marketing & SEO",
      intro:
        "Alex Morgan est un spécialiste en marketing digital spécialisé dans les systèmes de croissance, la génération de leads et l'acquisition scalable. Il combine stratégie, trafic payant, SEO, analytics et optimisation de tunnel pour aider les entreprises à croître avec plus de contrôle.",
      imageAlt:
        "Alex Morgan, spécialiste en marketing digital spécialisé dans le performance marketing, le SEO et la génération de leads",
      metaTitle:
        "Alex Morgan – Spécialiste marketing digital | Performance Marketing, SEO, Analytics",
      metaDescription:
        "Alex Morgan est un spécialiste marketing digital travaillant sur le performance marketing, le SEO, l'analytics, la génération de leads et la croissance de conversion.",
      experience: "9+ ans",
      focusChips: ["Performance & SEO", "Génération de leads", "Analytics & croissance"],
      highlightStats: [
        { label: "Expérience", value: "9+ ans" },
        { label: "Focus", value: "Trafic, leads, ROI" },
        { label: "Canaux", value: "Payant + organique" },
      ],
      activitySummary:
        "Construit des systèmes d'acquisition qui connectent stratégie, trafic, analytics et conversion pour que la croissance reste mesurable et scalable.",
      achievementHighlights: [
        "Combine trafic payant, SEO, analytics et logique de tunnel en un seul système",
        "Travaille avec des entreprises B2B, SaaS, e-commerce et de services",
        "Améliore la qualité des leads, la clarté du reporting et l'efficacité des canaux",
      ],
      skills: [
        "Stratégie marketing digital",
        "Performance marketing et optimisation de campagnes",
        "Stratégie SEO et croissance organique",
        "Google Ads et référencement payant",
        "Gestion de campagnes social payant",
        "Segmentation d'audience et planification de tunnel",
        "Systèmes de génération de leads",
        "Optimisation du taux de conversion",
        "Web analytics et reporting",
        "Design de dashboards et suivi des KPI",
        "Coordination de content marketing",
        "Email marketing et automatisation",
        "Analyse concurrentielle et de marché",
        "Soutien à la croissance B2B et e-commerce",
        "Analyse de performance cross-canal",
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
          heading: "Spécialiste marketing digital pour la génération de leads scalable",
          paragraphs: [
            "Alex Morgan travaille avec des entreprises qui ont besoin de plus que des campagnes isolées. Il construit des systèmes de croissance où stratégie, acquisition payante, SEO et analytics soutiennent le même objectif de revenus au lieu de se concurrencer pour le budget et l'attention.",
            "Son travail commence souvent par le <u>Développement de stratégie marketing</u>, l'analyse du tunnel et la priorisation des canaux pour que l'équipe comprenne d'où doit venir la demande et comment cette demande doit se transformer en leads qualifiés.",
          ],
        },
        {
          heading: "Performance marketing, SEO et analytics dans un seul modèle opérationnel",
          paragraphs: [
            "Alex combine trafic payant et recherche organique pour réduire la dépendance aux canaux et améliorer l'efficacité dans le temps. Cela inclut <u>Google Ads</u>, <u>Publicité social payante</u> et <u>SEO technique et optimisation on-page</u> soutenus par une mesure cohérente.",
            "Il travaille aussi avec la <u>Configuration web analytics (GA4)</u> et le reporting pour que les décisions soient basées sur la qualité des leads, la conversion et les signaux de revenus plutôt que sur des métriques de trafic superficielles.",
          ],
        },
        {
          heading: "Soutien à la croissance pour les équipes B2B, SaaS et e-commerce",
          paragraphs: [
            "Pour les équipes en phase de croissance, Alex aide à connecter l'acquisition avec le contenu, l'automatisation et le suivi. Cela peut inclure le <u>Content marketing</u>, l'<u>Email marketing et automatisation</u> et le test d'offres autour de la demande réelle des clients.",
            "Le résultat est un système marketing plus facile à scaler, plus facile à diagnostiquer et mieux aligné sur la façon dont l'entreprise vend réellement.",
          ],
        },
      ],
    },
    "emma-collins-ux-ui-designer": {
      role: "Designer UX/UI",
      h1: "Emma Collins – Designer UX/UI | Design produit & UX orientée conversion",
      intro:
        "Emma Collins est une designer UX/UI spécialisée dans les interfaces produit, les landing pages et les systèmes de design orientés conversion. Elle connecte recherche, utilisabilité et clarté visuelle pour que les produits numériques soient plus faciles à utiliser et à faire croître.",
      imageAlt:
        "Emma Collins, designer UX/UI spécialisée dans le design produit, les systèmes d'interface et le CRO",
      metaTitle: "Emma Collins – Designer UX/UI | Design produit, UX, UI, CRO",
      metaDescription:
        "Emma Collins est une designer UX/UI travaillant sur le design produit, la recherche utilisateur, le prototypage et l'amélioration d'interface orientée conversion.",
      experience: "8+ ans",
      focusChips: ["Design produit", "Web & mobile", "UX, UI, CRO"],
      highlightStats: [
        { label: "Expérience", value: "8+ ans" },
        { label: "Focus", value: "UX + UI + CRO" },
        { label: "Formats", value: "Web / Mobile" },
      ],
      activitySummary:
        "Conçoit des parcours utilisateurs, des interfaces et des systèmes visuels qui améliorent la clarté, l'utilisabilité et la conversion des produits numériques.",
      achievementHighlights: [
        "Travaille à l'intersection du design produit, de la recherche et de l'amélioration de conversion",
        "Conçoit pour le SaaS, l'e-commerce et les sites business",
        "Connecte les décisions d'utilisabilité aux résultats business mesurables",
      ],
      skills: [
        "Design UX/UI et design produit",
        "Recherche utilisateur et synthèse d'insights",
        "Design de parcours utilisateur et de flux",
        "Wireframing et prototypage",
        "Systèmes UI pour web et mobile",
        "Systèmes de design et pensée composant",
        "Optimisation de l'utilisabilité",
        "Design orienté conversion",
        "Support A/B testing",
        "Design d'interaction",
        "Design d'interface aligné à la marque",
        "Collaboration transverse",
        "Décisions de design basées sur les données",
      ],
      services: [
        "Product Discovery",
        "UX Research and user studies",
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
          heading:
            "Designer UX/UI pour produits numériques et interfaces orientées conversion",
          paragraphs: [
            "Emma Collins travaille sur des produits numériques et des sites web qui ont besoin d'une structure plus claire, d'une meilleure utilisabilité et d'un système visuel plus intentionnel. Son processus commence par la compréhension du comportement utilisateur avant de transformer ces insights en décisions d'interface.",
            "Elle utilise la <u>Recherche UX et études utilisateurs</u>, le travail d'architecture et le prototypage pour aider les équipes à simplifier les parcours, réduire les frictions et faciliter la réalisation des actions clés.",
          ],
        },
        {
          heading: "Design produit pour SaaS, e-commerce et sites business",
          paragraphs: [
            "Emma accompagne aussi bien les nouveaux produits que les redesigns. Cela inclut la <u>Product Discovery</u>, la planification d'interface, les <u>Wireframes UX</u> et les <u>Prototypes cliquables</u> pour que les équipes puissent tester des idées avant de s'engager pleinement dans le développement.",
            "Son travail est particulièrement utile quand un produit a besoin d'un meilleur onboarding, d'une cohérence visuelle plus forte ou d'une structure plus claire sur les écrans web et mobile.",
          ],
        },
        {
          heading: "Systèmes de design, utilisabilité et CRO travaillant ensemble",
          paragraphs: [
            "Au-delà du visuel, Emma se concentre sur la façon dont le design affecte la performance. Elle travaille avec l'<u>Optimisation de l'utilisabilité</u>, l'<u>Optimisation de la conversion, CRO</u> et le support expérimental pour que les changements d'interface conduisent à des résultats business plus clairs.",
            "Cette combinaison aide les équipes à passer d'écrans isolés à une expérience produit plus cohérente, plus facile à maintenir et à améliorer dans le temps.",
          ],
        },
      ],
    },
  },

  ar: {
    "leo-carter-performance-marketing": {
      role: "مدير المنتج",
      h1: "ليو كارتر – مدير المنتج | SaaS وإدارة المنتجات الرقمية",
      intro:
        "ليو كارتر مدير منتج متمرس يركّز على نمو المنتجات الرقمية وإطلاق النماذج الأولية (MVP) وتحسين تجربة المستخدم بشكل قابل للقياس. يعمل على منتجات SaaS والتجارة الإلكترونية، ويربط بين استراتيجية المنتج والبحث وتفكير التحويل لخدمة نمو الأعمال.",
      imageAlt:
        "ليو كارتر، مدير منتج متخصص في نمو SaaS وإطلاق MVP وتحسين تجربة المستخدم",
      metaTitle: "ليو كارتر – مدير المنتج | SaaS، MVP، UX، CRO",
      metaDescription:
        "ليو كارتر يعمل على إطلاق MVP واكتشاف المنتج وتحسين تجربة المستخدم ونمو التحويل لمنتجات SaaS والمنتجات الرقمية.",
      experience: "+8 سنوات",
      focusChips: ["SaaS والتجارة الإلكترونية", "MVP والنمو", "UX وCRO والتحليلات"],
      highlightStats: [
        { label: "الخبرة", value: "+8 سنوات" },
        { label: "نمو جمهور SaaS", value: "+180%" },
        { label: "التركيز", value: "MVP, UX, CRO" },
      ],
      activitySummary:
        "يساعد في إطلاق المنتجات الرقمية وهيكلتها وتوسيع نطاقها من خلال اكتشاف المنتج وتخطيط خارطة الطريق وبحث المستخدم وتحليل التحويل.",
      achievementHighlights: [
        "يتولى دورة المنتج الكاملة من الاكتشاف إلى الإطلاق والتكرار",
        "يعمل مع منتجات SaaS والتجارة الإلكترونية والمنتجات الرقمية في مرحلة النمو",
        "يربط المنتج وUX والتحليلات وأولويات النمو في منظومة واحدة",
      ],
      skills: [
        "إدارة المنتج والمسؤولية عن دورة الحياة",
        "اكتشاف المنتج وتطوير الفرضيات",
        "تحليل البيانات عبر مقاييس CAC وLTV والاحتفاظ والتحويل",
        "التفكير المنتجي الموجه نحو تجربة المستخدم",
        "مقابلات المستخدمين وتوليف نتائج البحث",
        "سير عمل Agile وScrum وKanban",
        "تنسيق الفرق متعددة الوظائف",
        "تحديد أولويات Backlog وتخطيط خارطة الطريق",
        "إطلاق MVP وتوسيع نطاق المنتج",
        "اختبار A/B واتخاذ القرار المبني على البيانات",
        "تسليم منتجات SaaS والتجارة الإلكترونية",
        "تحسين معدل التحويل (CRO)",
        "التعاون مع فرق النمو والتسويق",
        "التواصل مع أصحاب المصلحة ومواءمتهم",
        "العمل على المنتجات الدولية",
      ],
      services: [
        "Product Discovery",
        "UX Research and user studies",
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
          heading: "مدير منتج لإطلاق MVP ونمو المنتجات الرقمية",
          paragraphs: [
            "يعمل ليو كارتر مع المنتجات الرقمية التي تحتاج إلى هيكل واضح وتحقق سريع ومسار من الفكرة إلى نمو قابل للتكرار. يبدأ دوره في الغالب حيث تكون افتراضات المنتج لا تزال غامضة وتحتاج الفريق إلى قرارات أقوى حول الجمهور والقيمة والأولويات.",
            "يجمع بين <u>اكتشاف المنتج</u> والبحث واستراتيجية المنتج لمساعدة الفرق على تحديد ما يجب بناؤه أولاً وما يجب اختباره وأي مشكلات المستخدمين أكثر أهمية. يُقصّر هذا المسافة بين التخطيط والتقدم المنتجي القابل للقياس.",
            "في دور مدير المنتج، تولّى ليو المسؤولية عن الدورة الكاملة لتطوير المنتج — من مرحلة <u>اكتشاف المنتج</u> وصياغة الاستراتيجية وصولاً إلى الإطلاق والتوسع. شارك بفاعلية في <u>تطوير استراتيجية التسويق</u>، وعمل عن كثب مع فرق التسويق والمنتج لتحقيق التكامل بين المنتج وقنوات الاستحواذ. تشمل خبرته إدارة الفرق متعددة الوظائف (التطوير والتصميم والتسويق)، وبناء عمليات شفافة وتطبيق منهجيات Agile.",
          ],
        },
        {
          heading: "مدير منتج SaaS مع تركيز على التحويل والاحتفاظ",
          paragraphs: [
            "في منتجات SaaS والاشتراكات، يولي ليو اهتماماً خاصاً بنقاط التفعيل والاحتفاظ والتحويل عبر رحلة العميل. يعمل مع <u>تحسين التحويل، CRO</u> و<u>اختبار A/B</u> والتحليلات السلوكية لتحسين قرارات المنتج بأدلة حقيقية.",
            "يجعله هذا ذا قيمة ليس فقط في مرحلة الإطلاق، ولكن أيضاً عندما يحتاج المنتج الموجود إلى تأهيل أفضل أو أولويات أوضح أو نموذج نمو أقوى مرتبط بالسلوك الفعلي للمستخدمين.",
          ],
        },
        {
          heading: "استراتيجية منتج مرتبطة بالبحث والتحليلات والنمو",
          paragraphs: [
            "يعمل ليو في أغلب الأحيان عبر وظائف المنتج والتصميم والتحليلات والتسويق. يشمل ذلك <u>بحث UX ودراسات المستخدمين</u> وتخطيط خارطة الطريق و<u>إعداد تحليلات الويب (GA4)</u> لتبقى قرارات المنتج مرتبطة بكل من رؤى المستخدم والأهداف التجارية.",
            "النتيجة عملية منتج أكثر انضباطاً: افتراضات أقل، ومسؤوليات أوضح، وارتباط أقوى بين الميزات وتجربة المستخدم ونتائج النمو.",
            "اليوم، يُمثّل ليو كارتر مدير منتج يجمع بين التفكير الاستراتيجي والنهج العملي في التنفيذ. مهمته الأساسية هي بناء منتجات لا تحل مشكلات المستخدمين الحقيقية فحسب، بل تُحقق قيمة تجارية قابلة للقياس وتضمن نمواً مستداماً للشركة.",
          ],
        },
      ],
    },
    "alex-morgan-digital-marketing-specialist": {
      role: "متخصص تسويق رقمي",
      h1: "أليكس مورغان – متخصص تسويق رقمي | التسويق بالأداء وتحسين محركات البحث",
      intro:
        "أليكس مورغان متخصص تسويق رقمي يركّز على أنظمة النمو وتوليد العملاء المحتملين والاستحواذ القابل للتوسع. يجمع بين الاستراتيجية والإعلانات المدفوعة وتحسين محركات البحث والتحليلات وتحسين مسار التحويل لمساعدة الشركات على النمو بشكل أكثر تحكماً.",
      imageAlt:
        "أليكس مورغان، متخصص تسويق رقمي يركز على التسويق بالأداء وSEO وتوليد العملاء المحتملين",
      metaTitle:
        "أليكس مورغان – متخصص تسويق رقمي | التسويق بالأداء، SEO، التحليلات",
      metaDescription:
        "أليكس مورغان متخصص تسويق رقمي يعمل على التسويق بالأداء وSEO والتحليلات وتوليد العملاء المحتملين ونمو التحويل.",
      experience: "+9 سنوات",
      focusChips: ["الأداء وSEO", "توليد العملاء المحتملين", "التحليلات والنمو"],
      highlightStats: [
        { label: "الخبرة", value: "+9 سنوات" },
        { label: "التركيز", value: "الزيارات، العملاء، العائد" },
        { label: "القنوات", value: "مدفوعة + عضوية" },
      ],
      activitySummary:
        "يبني أنظمة استحواذ تربط الاستراتيجية والزيارات والتحليلات والتحويل لتبقى عملية النمو قابلة للقياس والتوسع.",
      achievementHighlights: [
        "يجمع الزيارات المدفوعة وSEO والتحليلات ومنطق مسار التحويل في منظومة واحدة",
        "يعمل مع شركات B2B وSaaS والتجارة الإلكترونية وشركات الخدمات",
        "يحسّن جودة العملاء المحتملين ووضوح التقارير وكفاءة القنوات",
      ],
      skills: [
        "استراتيجية التسويق الرقمي",
        "التسويق بالأداء وتحسين الحملات",
        "استراتيجية SEO والنمو العضوي",
        "Google Ads والبحث المدفوع",
        "إدارة حملات التواصل الاجتماعي المدفوعة",
        "تجزئة الجمهور وتخطيط مسار التحويل",
        "أنظمة توليد العملاء المحتملين",
        "تحسين معدل التحويل",
        "تحليلات الويب والتقارير",
        "تصميم لوحات المعلومات وتتبع مؤشرات الأداء الرئيسية",
        "تنسيق التسويق بالمحتوى",
        "التسويق عبر البريد الإلكتروني والأتمتة",
        "تحليل المنافسين والسوق",
        "دعم نمو B2B والتجارة الإلكترونية",
        "تحليل الأداء متعدد القنوات",
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
          heading: "متخصص تسويق رقمي لتوليد عملاء محتملين قابل للتوسع",
          paragraphs: [
            "يعمل أليكس مورغان مع الشركات التي تحتاج إلى أكثر من حملات معزولة. يبني أنظمة نمو تدعم فيها الاستراتيجية والاستحواذ المدفوع وSEO والتحليلات هدف الإيرادات نفسه بدلاً من التنافس على الميزانية والاهتمام.",
            "يبدأ عمله في الغالب بـ<u>تطوير استراتيجية التسويق</u> وتحليل مسار التحويل وترتيب أولويات القنوات لكي يفهم الفريق من أين يجب أن تأتي الطلبات وكيف يجب أن تتحول هذه الطلبات إلى عملاء محتملين مؤهلين.",
          ],
        },
        {
          heading: "التسويق بالأداء وSEO والتحليلات في نموذج تشغيلي واحد",
          paragraphs: [
            "يجمع أليكس بين الزيارات المدفوعة والبحث العضوي لتقليل الاعتماد على القنوات وتحسين الكفاءة بمرور الوقت. يشمل ذلك <u>Google Ads</u> و<u>إعلانات التواصل الاجتماعي المدفوعة</u> و<u>SEO التقني وتحسين الصفحة</u> مدعومة بقياس متسق.",
            "يعمل أيضاً مع <u>إعداد تحليلات الويب (GA4)</u> والتقارير لتكون القرارات مبنية على جودة العملاء المحتملين والتحويل وإشارات الإيرادات بدلاً من مقاييس الزيارات السطحية.",
          ],
        },
        {
          heading: "دعم النمو لفرق B2B وSaaS والتجارة الإلكترونية",
          paragraphs: [
            "بالنسبة لفرق مرحلة النمو، يساعد أليكس في ربط الاستحواذ بالمحتوى والأتمتة والمتابعة. قد يشمل ذلك <u>التسويق بالمحتوى</u> و<u>التسويق عبر البريد الإلكتروني والأتمتة</u> واختبار العروض حول الطلب الفعلي للعملاء.",
            "النتيجة منظومة تسويقية أسهل في التوسع وأسهل في التشخيص وأكثر توافقاً مع طريقة بيع الشركة فعلياً.",
          ],
        },
      ],
    },
    "emma-collins-ux-ui-designer": {
      role: "مصممة UX/UI",
      h1: "إيما كولينز – مصممة UX/UI | تصميم المنتجات وتجربة المستخدم الموجهة للتحويل",
      intro:
        "إيما كولينز مصممة UX/UI تركّز على واجهات المنتجات وصفحات الهبوط وأنظمة التصميم الموجهة للتحويل. تربط بين البحث وسهولة الاستخدام والوضوح البصري لجعل المنتجات الرقمية أسهل في الاستخدام والنمو.",
      imageAlt:
        "إيما كولينز، مصممة UX/UI متخصصة في تصميم المنتجات وأنظمة الواجهة وCRO",
      metaTitle: "إيما كولينز – مصممة UX/UI | تصميم المنتجات، UX، UI، CRO",
      metaDescription:
        "إيما كولينز مصممة UX/UI تعمل على تصميم المنتجات وبحث المستخدمين والنمذجة الأولية وتحسين الواجهة الموجهة للتحويل.",
      experience: "+8 سنوات",
      focusChips: ["تصميم المنتجات", "الويب والموبايل", "UX وUI وCRO"],
      highlightStats: [
        { label: "الخبرة", value: "+8 سنوات" },
        { label: "التركيز", value: "UX + UI + CRO" },
        { label: "الأشكال", value: "ويب / موبايل" },
      ],
      activitySummary:
        "تصمم رحلات المستخدمين والواجهات والأنظمة البصرية التي تحسّن الوضوح وسهولة الاستخدام والتحويل عبر المنتجات الرقمية.",
      achievementHighlights: [
        "تعمل على تقاطع تصميم المنتجات والبحث وتحسين التحويل",
        "تصمم لمنتجات SaaS والتجارة الإلكترونية ومواقع الأعمال",
        "تربط قرارات سهولة الاستخدام بالنتائج التجارية القابلة للقياس",
      ],
      skills: [
        "تصميم UX/UI وتصميم المنتجات",
        "بحث المستخدمين وتوليف الرؤى",
        "تصميم رحلة المستخدم والتدفق",
        "الإطارات السلكية والنمذجة الأولية",
        "أنظمة واجهة المستخدم للويب والموبايل",
        "أنظمة التصميم والتفكير المكوني",
        "تحسين سهولة الاستخدام",
        "التصميم الموجه للتحويل",
        "دعم اختبار A/B",
        "تصميم التفاعل",
        "تصميم الواجهة المتوافق مع العلامة التجارية",
        "التعاون متعدد الوظائف",
        "قرارات التصميم المبنية على البيانات",
      ],
      services: [
        "Product Discovery",
        "UX Research and user studies",
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
          heading: "مصممة UX/UI للمنتجات الرقمية والواجهات الموجهة للتحويل",
          paragraphs: [
            "تعمل إيما كولينز مع المنتجات الرقمية والمواقع الإلكترونية التي تحتاج إلى هيكل أوضح وسهولة استخدام أقوى ونظام بصري أكثر تعمداً. تبدأ عمليتها بفهم سلوك المستخدمين قبل تحويل هذه الرؤى إلى قرارات الواجهة.",
            "تستخدم <u>بحث UX ودراسات المستخدمين</u> والعمل المعماري والنمذجة الأولية لمساعدة الفرق على تبسيط الرحلات وتقليل الاحتكاك وتسهيل إتمام الإجراءات الرئيسية.",
          ],
        },
        {
          heading: "تصميم منتجات لـSaaS والتجارة الإلكترونية ومواقع الأعمال",
          paragraphs: [
            "تدعم إيما المنتجات الجديدة وإعادة التصميم على حد سواء. يشمل ذلك <u>اكتشاف المنتج</u> وتخطيط الواجهة و<u>الإطارات السلكية لتجربة المستخدم</u> و<u>النماذج الأولية القابلة للنقر</u> لكي تتمكن الفرق من اختبار الأفكار قبل الالتزام الكامل بالتطوير.",
            "عملها مفيد بشكل خاص عندما يحتاج المنتج إلى تأهيل أفضل أو اتساق بصري أقوى أو هيكل أوضح عبر شاشات الويب والموبايل.",
          ],
        },
        {
          heading: "أنظمة التصميم وسهولة الاستخدام وCRO تعمل معاً",
          paragraphs: [
            "ما وراء الجانب البصري، تركّز إيما على كيفية تأثير التصميم على الأداء. تعمل مع <u>تحسين سهولة الاستخدام</u> و<u>تحسين التحويل، CRO</u> ودعم التجارب لكي تؤدي تغييرات الواجهة إلى نتائج تجارية أوضح.",
            "يساعد هذا المزيج الفرق على الانتقال من شاشات معزولة إلى تجربة منتج أكثر تماسكاً وأسهل في الصيانة والتحسين بمرور الوقت.",
          ],
        },
      ],
    },
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

  const normalizedLocale = normalizeSiteLocale(locale);
  const baseProfile = repairEncodedTree(profile);

  const localeOverride =
    SPECIALIST_PROFILE_LOCALE_OVERRIDES[normalizedLocale]?.[profile.slug];

  if (!localeOverride) {
    return baseProfile;
  }

  return repairEncodedTree(
    deepMergeTranslationValue(baseProfile, localeOverride)
  );
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

  const localeOverride =
    overrides.specialistProfiles[profile.slug]?.[normalizedLocale];

  return repairEncodedTree(
    localeOverride
      ? deepMergeTranslationValue(baseProfile, localeOverride)
      : baseProfile
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
