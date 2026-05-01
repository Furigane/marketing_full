export const DEFAULT_TEAM_MEMBER_ID = "anastasia" as const;

export const TEAM_MEMBERS = [
  {
    id: "anastasia",
    image: "/img/workers/beautifull-caucasian-woman-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "designer",
  },
  {
    id: "alexey",
    image: "/img/workers/man-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "targeting",
  },
  {
    id: "maria",
    image: "/img/workers/beautifuan-woman-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "smm",
  },
  {
    id: "arina",
    image: "/img/workers/dawda.jpg",
    roleType: "seo",
  },
  {
    id: "vyacheslav",
    image: "/img/workers/beautifull-caucasiany-hair-smiles-isolated 1.jpg",
    roleType: "targeting",
  },
  {
    id: "ivan",
    image: "/img/workers/man-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "manager",
  },
  {
    id: "elizaveta",
    image: "/img/workers/beautifuan-woman-with-curly-hair-smiles-isolated 1.jpg",
    roleType: "content",
  },
] as const;

type SupportedProfileLocale = "en" | "ru";
type TeamRoleType = (typeof TEAM_MEMBERS)[number]["roleType"];

export type TeamMemberId = (typeof TEAM_MEMBERS)[number]["id"];

export type TeamProfileFeature = {
  badge: string;
  title: string;
  description: string;
};

export type TeamProfileDetail = {
  title: string;
  body: string;
};

export type TeamProfileContent = {
  titleHighlight: string;
  titleSecondLine: string;
  description: string;
  featureItems: TeamProfileFeature[];
  detailTitle: string;
  detailItems: TeamProfileDetail[];
};

const TEAM_ROLE_CONTENT: Record<
  SupportedProfileLocale,
  Record<TeamRoleType, TeamProfileContent>
> = {
  en: {
    designer: {
      titleHighlight: "SMM designer",
      titleSecondLine: "& Content maker",
      description:
        "Shapes the brand's visual voice from strategy down to the pixel. Turns ideas into content people remember and share.",
      featureItems: [
        {
          badge: "Visuals",
          title: "Visual systems",
          description:
            "Builds a recognizable visual style for social media, ads, and landing pages so the brand looks consistent in every channel.",
        },
        {
          badge: "Content",
          title: "Creative production",
          description:
            "Designs post layouts, stories, reels covers, and simple motion assets that keep the feed clean, readable, and conversion-oriented.",
        },
        {
          badge: "Brand",
          title: "Brand consistency",
          description:
            "Keeps typography, colors, grids, and graphic rhythm aligned with the positioning so communication stays clear and premium.",
        },
        {
          badge: "Team",
          title: "Fast iteration",
          description:
            "Works closely with SMM, targeting, and copy teams to test creatives quickly and improve visuals based on performance.",
        },
      ],
      detailTitle: "What this specialist does",
      detailItems: [
        {
          title: "Main focus",
          body: "Turns marketing tasks into strong visual communication that supports reach, trust, and conversion at every stage of the funnel.",
        },
        {
          title: "Daily responsibilities",
          body: "Prepares concepts, adapts creatives for formats and placements, updates content packs, and maintains a clean visual library.",
        },
        {
          title: "How work is organized",
          body: "Design decisions are tied to campaign goals, audience segments, and content scenarios rather than aesthetics in isolation.",
        },
        {
          title: "Expected result",
          body: "You get a brand presence that looks coherent, is easy to scale across channels, and helps campaigns perform more reliably.",
        },
      ],
    },
    targeting: {
      titleHighlight: "Targeting specialist",
      titleSecondLine: "& Performance campaigns",
      description:
        "Builds and optimizes paid acquisition systems across ad platforms. Tests audiences, offers, and creatives until the numbers become predictable.",
      featureItems: [
        {
          badge: "Testing",
          title: "Offer validation",
          description:
            "Launches controlled tests with clear hypotheses to understand which offers and messages produce qualified leads faster.",
        },
        {
          badge: "Audiences",
          title: "Audience strategy",
          description:
            "Segments cold, warm, and remarketing audiences, then scales the combinations that keep acquisition cost under control.",
        },
        {
          badge: "Budget",
          title: "Budget control",
          description:
            "Distributes spend by campaign stage, cuts weak placements early, and increases budgets only after stable performance appears.",
        },
        {
          badge: "Analytics",
          title: "Data discipline",
          description:
            "Checks events, attribution, and lead quality before scaling so decisions rely on real conversion data rather than noisy clicks.",
        },
      ],
      detailTitle: "What this specialist does",
      detailItems: [
        {
          title: "Main focus",
          body: "Creates a paid traffic system that brings in leads and sales at a cost the business can realistically support.",
        },
        {
          title: "Daily responsibilities",
          body: "Builds campaigns, refreshes audiences and creatives, reviews placements, and monitors lead quality together with analytics.",
        },
        {
          title: "How work is organized",
          body: "Every optimization step is tied to a hypothesis, KPI corridor, and a clear next action if the result is above or below target.",
        },
        {
          title: "Expected result",
          body: "You get measurable performance marketing with fewer random spikes and a cleaner path from ad spend to revenue.",
        },
      ],
    },
    smm: {
      titleHighlight: "SMM specialist",
      titleSecondLine: "& Community growth",
      description:
        "Runs the social media system end to end: content planning, publishing rhythm, audience engagement, and channel growth tied to business goals.",
      featureItems: [
        {
          badge: "Strategy",
          title: "Content planning",
          description:
            "Builds a practical content calendar around audience interests, funnel stages, seasonal moments, and launch priorities.",
        },
        {
          badge: "Engagement",
          title: "Audience interaction",
          description:
            "Manages comments, DMs, story mechanics, and recurring formats that keep the brand active and responsive rather than decorative.",
        },
        {
          badge: "Growth",
          title: "Channel development",
          description:
            "Looks after reach dynamics, retention, and format performance so the social account grows without chaotic content decisions.",
        },
        {
          badge: "Coordination",
          title: "Cross-team sync",
          description:
            "Connects design, copy, and paid traffic so organic content and promotion reinforce each other instead of working separately.",
        },
      ],
      detailTitle: "What this specialist does",
      detailItems: [
        {
          title: "Main focus",
          body: "Turns social media into a predictable communication channel that supports both brand trust and lead generation.",
        },
        {
          title: "Daily responsibilities",
          body: "Plans topics, briefs creatives, reviews drafts, schedules posts, tracks reactions, and adjusts the content mix by feedback and metrics.",
        },
        {
          title: "How work is organized",
          body: "Publishing, engagement, and promotion are managed as one system with weekly priorities and clear goals for each format.",
        },
        {
          title: "Expected result",
          body: "You get stable channel activity, stronger audience connection, and content that supports business tasks instead of filling the feed.",
        },
      ],
    },
    seo: {
      titleHighlight: "SEO specialist",
      titleSecondLine: "& Organic search growth",
      description:
        "Improves technical health, on-page relevance, and content structure so the site gains qualified search visibility and compounds over time.",
      featureItems: [
        {
          badge: "Audit",
          title: "Technical clarity",
          description:
            "Identifies crawl, indexing, speed, and structure issues that suppress visibility before content investments can pay back.",
        },
        {
          badge: "Semantics",
          title: "Search intent mapping",
          description:
            "Groups keywords by intent and landing page role so pages rank for the right queries instead of competing with each other.",
        },
        {
          badge: "Content",
          title: "On-page optimization",
          description:
            "Improves metadata, structure, copy, and internal links to strengthen relevance and make pages easier to understand for search engines.",
        },
        {
          badge: "Growth",
          title: "Sustainable traffic",
          description:
            "Tracks ranking and page performance trends to prioritize changes that improve qualified traffic rather than vanity metrics.",
        },
      ],
      detailTitle: "What this specialist does",
      detailItems: [
        {
          title: "Main focus",
          body: "Builds a stable organic traffic foundation so the site captures demand consistently and reduces dependence on paid acquisition alone.",
        },
        {
          title: "Daily responsibilities",
          body: "Reviews pages, semantics, competitors, and technical signals, then prepares tasks for content, development, and internal linking.",
        },
        {
          title: "How work is organized",
          body: "SEO tasks are prioritized by impact and implementation cost, with attention to both quick wins and long-term site structure.",
        },
        {
          title: "Expected result",
          body: "You get stronger visibility for relevant searches, better page quality, and a clearer pipeline of organic growth opportunities.",
        },
      ],
    },
    manager: {
      titleHighlight: "Project manager",
      titleSecondLine: "& Client coordination",
      description:
        "Keeps the project moving: aligns priorities, coordinates specialists, controls deadlines, and makes sure the client always knows what happens next.",
      featureItems: [
        {
          badge: "Planning",
          title: "Scope alignment",
          description:
            "Breaks business goals into concrete tasks, owners, and delivery stages so the team works with less ambiguity and fewer bottlenecks.",
        },
        {
          badge: "Coordination",
          title: "Team orchestration",
          description:
            "Synchronizes design, content, ads, and analytics workstreams so handoffs are faster and project momentum stays intact.",
        },
        {
          badge: "Reporting",
          title: "Client visibility",
          description:
            "Maintains transparent status updates, priorities, and next steps so communication stays practical and decision-ready.",
        },
        {
          badge: "Control",
          title: "Deadline discipline",
          description:
            "Tracks blockers early, reorders tasks when needed, and protects the team from losing time on unclear or low-value work.",
        },
      ],
      detailTitle: "What this specialist does",
      detailItems: [
        {
          title: "Main focus",
          body: "Turns marketing execution into a manageable process with clear responsibilities, timing, and communication.",
        },
        {
          title: "Daily responsibilities",
          body: "Runs planning, follows up on tasks, gathers inputs, resolves blockers, and keeps both client and internal team aligned.",
        },
        {
          title: "How work is organized",
          body: "The project is managed through short planning cycles with visible priorities, decision points, and documented ownership.",
        },
        {
          title: "Expected result",
          body: "You get fewer missed deadlines, less communication noise, and a team that moves in one direction around business goals.",
        },
      ],
    },
    content: {
      titleHighlight: "Content manager",
      titleSecondLine: "& Editorial planning",
      description:
        "Owns the content flow from planning to publication. Keeps messaging structured, timely, and aligned with the brand, audience, and campaign goals.",
      featureItems: [
        {
          badge: "Editorial",
          title: "Content system",
          description:
            "Builds publishing plans, content themes, and format distribution so production stays regular and purposeful.",
        },
        {
          badge: "Messaging",
          title: "Message consistency",
          description:
            "Keeps tone of voice and key arguments aligned across posts, landing pages, and supporting campaign materials.",
        },
        {
          badge: "Production",
          title: "Workflow control",
          description:
            "Coordinates drafts, approvals, assets, and scheduling so content moves through the pipeline without chaos or missed windows.",
        },
        {
          badge: "Performance",
          title: "Content refinement",
          description:
            "Looks at reach, saves, clicks, and engagement patterns to improve topics and formats over time.",
        },
      ],
      detailTitle: "What this specialist does",
      detailItems: [
        {
          title: "Main focus",
          body: "Makes sure content is not produced ad hoc, but supports the marketing strategy with a consistent editorial process.",
        },
        {
          title: "Daily responsibilities",
          body: "Prepares content plans, coordinates copy and visuals, checks publication timing, and updates priorities from performance feedback.",
        },
        {
          title: "How work is organized",
          body: "Topics, formats, and deadlines are planned ahead, while room remains for quick adaptations during launches and promotions.",
        },
        {
          title: "Expected result",
          body: "You get a stable content machine that supports campaigns, keeps channels active, and reduces last-minute production stress.",
        },
      ],
    },
  },
  ru: {
    designer: {
      titleHighlight: "SMM-дизайнер",
      titleSecondLine: "& Контент-мейкер",
      description:
        "Формирует визуальный голос бренда от идеи до последнего пикселя. Превращает смыслы в контент, который замечают, запоминают и пересылают дальше.",
      featureItems: [
        {
          badge: "Визуал",
          title: "Визуальная система",
          description:
            "Собирает единый стиль для соцсетей, рекламы и посадочных страниц, чтобы бренд выглядел цельно во всех каналах.",
        },
        {
          badge: "Контент",
          title: "Креативное производство",
          description:
            "Готовит макеты постов, stories, обложки reels и простую анимацию так, чтобы лента была читаемой и работала на конверсию.",
        },
        {
          badge: "Бренд",
          title: "Консистентность бренда",
          description:
            "Следит за типографикой, цветами, сетками и графическим ритмом, чтобы коммуникация оставалась узнаваемой и аккуратной.",
        },
        {
          badge: "Команда",
          title: "Быстрые итерации",
          description:
            "Работает в связке с SMM, таргетом и копирайтингом, быстро обновляя креативы по результатам тестов и обратной связи.",
        },
      ],
      detailTitle: "Чем занимается специалист",
      detailItems: [
        {
          title: "Основной фокус",
          body: "Переводит маркетинговые задачи в сильную визуальную коммуникацию, которая помогает охвату, доверию и конверсии.",
        },
        {
          title: "Ежедневные задачи",
          body: "Готовит концепты, адаптирует креативы под форматы и площадки, обновляет контент-паки и поддерживает визуальную библиотеку проекта.",
        },
        {
          title: "Как строится работа",
          body: "Дизайн опирается не на вкус сам по себе, а на задачи кампаний, сегменты аудитории и сценарии потребления контента.",
        },
        {
          title: "Что получает клиент",
          body: "Цельное визуальное присутствие бренда, которое легко масштабировать на разные каналы и форматы продвижения.",
        },
      ],
    },
    targeting: {
      titleHighlight: "Таргетолог",
      titleSecondLine: "& Performance-реклама",
      description:
        "Строит систему платного привлечения: тестирует аудитории, офферы и креативы, пока рекламные результаты не становятся управляемыми и предсказуемыми.",
      featureItems: [
        {
          badge: "Тесты",
          title: "Проверка офферов",
          description:
            "Запускает гипотезы небольшими итерациями, чтобы быстро понять, какие сообщения и предложения дают качественные лиды.",
        },
        {
          badge: "Аудитории",
          title: "Стратегия сегментов",
          description:
            "Разделяет холодные, теплые и ретаргетинговые аудитории и масштабирует только те связки, где стоимость привлечения остается под контролем.",
        },
        {
          badge: "Бюджет",
          title: "Контроль расходов",
          description:
            "Распределяет бюджет по этапам воронки, быстро отключает слабые размещения и усиливает сильные кампании только после подтверждения метрик.",
        },
        {
          badge: "Аналитика",
          title: "Дисциплина данных",
          description:
            "Проверяет события, атрибуцию и качество лидов до масштабирования, чтобы решения принимались по реальной конверсии, а не по шумным кликам.",
        },
      ],
      detailTitle: "Чем занимается специалист",
      detailItems: [
        {
          title: "Основной фокус",
          body: "Строит платный трафик так, чтобы реклама приводила лиды и продажи по стоимости, которую бизнес способен выдерживать.",
        },
        {
          title: "Ежедневные задачи",
          body: "Собирает кампании, обновляет аудитории и креативы, контролирует площадки и вместе с аналитикой следит за качеством заявок.",
        },
        {
          title: "Как строится работа",
          body: "Каждая оптимизация привязана к гипотезе, KPI-коридору и понятному следующему действию, если результат выше или ниже цели.",
        },
        {
          title: "Что получает клиент",
          body: "Управляемый performance-маркетинг без случайных всплесков и с более прозрачной связкой между бюджетом и выручкой.",
        },
      ],
    },
    smm: {
      titleHighlight: "SMM-специалист",
      titleSecondLine: "& Рост сообщества",
      description:
        "Ведет социальные сети как систему: планирует контент, удерживает ритм публикаций, работает с вовлечением и ростом канала под бизнес-цели.",
      featureItems: [
        {
          badge: "Стратегия",
          title: "Контент-план",
          description:
            "Собирает рабочий контент-план под интересы аудитории, этапы воронки, сезонность и приоритеты запусков.",
        },
        {
          badge: "Вовлечение",
          title: "Работа с аудиторией",
          description:
            "Следит за комментариями, директом, сторис-механиками и постоянными рубриками, чтобы бренд был живым, а не декоративным.",
        },
        {
          badge: "Рост",
          title: "Развитие канала",
          description:
            "Анализирует охваты, удержание и поведение форматов, чтобы аккаунт рос без хаотичных публикаций и случайных тем.",
        },
        {
          badge: "Координация",
          title: "Связка с командой",
          description:
            "Синхронизирует дизайн, тексты и платное продвижение, чтобы органика и реклама усиливали друг друга.",
        },
      ],
      detailTitle: "Чем занимается специалист",
      detailItems: [
        {
          title: "Основной фокус",
          body: "Превращает соцсети в понятный канал коммуникации, который одновременно поддерживает доверие к бренду и приток заявок.",
        },
        {
          title: "Ежедневные задачи",
          body: "Планирует темы, брифует креативы, проверяет материалы, публикует контент, отслеживает реакции и корректирует контент-микс по метрикам.",
        },
        {
          title: "Как строится работа",
          body: "Публикации, вовлечение и продвижение ведутся как одна система с недельными приоритетами и целями по каждому формату.",
        },
        {
          title: "Что получает клиент",
          body: "Стабильную активность в канале, более сильную связь с аудиторией и контент, который решает задачи бизнеса, а не просто заполняет ленту.",
        },
      ],
    },
    seo: {
      titleHighlight: "SEO-специалист",
      titleSecondLine: "& Органический рост",
      description:
        "Улучшает техническую основу, структуру страниц и поисковую релевантность сайта, чтобы бизнес стабильно собирал целевой спрос из поиска.",
      featureItems: [
        {
          badge: "Аудит",
          title: "Техническая ясность",
          description:
            "Находит проблемы индексации, скорости, структуры и краулинга, которые мешают сайту расти еще до вложений в контент.",
        },
        {
          badge: "Семантика",
          title: "Карта поискового спроса",
          description:
            "Группирует ключевые запросы по интенту и роли страниц, чтобы разделы сайта не конкурировали друг с другом.",
        },
        {
          badge: "Контент",
          title: "Оптимизация страниц",
          description:
            "Улучшает метаданные, структуру, тексты и внутренние ссылки, чтобы страницы были понятнее для поисковых систем и пользователей.",
        },
        {
          badge: "Рост",
          title: "Устойчивый трафик",
          description:
            "Следит за динамикой позиций и страниц, чтобы приоритет получали изменения, которые влияют на качественный органический трафик.",
        },
      ],
      detailTitle: "Чем занимается специалист",
      detailItems: [
        {
          title: "Основной фокус",
          body: "Строит устойчивый фундамент органического трафика, чтобы сайт регулярно собирал спрос и меньше зависел только от платной рекламы.",
        },
        {
          title: "Ежедневные задачи",
          body: "Проверяет страницы, семантику, конкурентов и технические сигналы, затем формирует задачи для контента, разработки и внутренней перелинковки.",
        },
        {
          title: "Как строится работа",
          body: "SEO-приоритеты выстраиваются по влиянию на результат и стоимости внедрения, с балансом между быстрыми улучшениями и долгой системной работой.",
        },
        {
          title: "Что получает клиент",
          body: "Рост видимости по целевым запросам, более качественные страницы и понятный список органических точек роста.",
        },
      ],
    },
    manager: {
      titleHighlight: "Менеджер проекта",
      titleSecondLine: "& Координация клиента",
      description:
        "Держит проект в движении: выравнивает приоритеты, координирует специалистов, следит за сроками и убирает лишний хаос из коммуникации.",
      featureItems: [
        {
          badge: "Планирование",
          title: "Сборка объема работ",
          description:
            "Разбивает бизнес-цели на конкретные задачи, ответственных и этапы, чтобы команда работала без лишней неопределенности.",
        },
        {
          badge: "Координация",
          title: "Синхронизация команды",
          description:
            "Связывает дизайн, контент, рекламу и аналитику в единый процесс, чтобы задачи быстрее переходили между ролями.",
        },
        {
          badge: "Отчетность",
          title: "Прозрачность для клиента",
          description:
            "Поддерживает понятные статусы, приоритеты и следующие шаги, чтобы коммуникация оставалась деловой и полезной для решений.",
        },
        {
          badge: "Контроль",
          title: "Дисциплина по срокам",
          description:
            "Рано поднимает блокеры, перестраивает очередность задач и защищает команду от потери времени на неясные или второстепенные запросы.",
        },
      ],
      detailTitle: "Чем занимается специалист",
      detailItems: [
        {
          title: "Основной фокус",
          body: "Превращает маркетинговое выполнение в управляемый процесс с понятными ролями, сроками и точками принятия решений.",
        },
        {
          title: "Ежедневные задачи",
          body: "Проводит планирование, контролирует статус задач, собирает вводные, убирает блокеры и держит в одном контуре клиента и внутреннюю команду.",
        },
        {
          title: "Как строится работа",
          body: "Проект ведется короткими циклами с видимыми приоритетами, зонами ответственности и зафиксированными договоренностями.",
        },
        {
          title: "Что получает клиент",
          body: "Меньше срывов по срокам, меньше коммуникационного шума и команда, которая двигается в одном направлении.",
        },
      ],
    },
    content: {
      titleHighlight: "Контент-менеджер",
      titleSecondLine: "& Редакционное планирование",
      description:
        "Отвечает за поток контента от идеи до публикации. Следит, чтобы сообщения были своевременными, понятными и согласованными с брендом и задачами продвижения.",
      featureItems: [
        {
          badge: "Редактура",
          title: "Контент-система",
          description:
            "Собирает планы публикаций, темы и распределение форматов, чтобы производство шло регулярно и не разваливалось в последний момент.",
        },
        {
          badge: "Сообщение",
          title: "Единый смысл",
          description:
            "Следит, чтобы тональность и ключевые аргументы совпадали в постах, посадочных и поддерживающих материалах кампаний.",
        },
        {
          badge: "Процесс",
          title: "Контроль производства",
          description:
            "Координирует черновики, согласования, визуалы и публикации, чтобы контент проходил по пайплайну без хаоса и провалов по срокам.",
        },
        {
          badge: "Результат",
          title: "Улучшение по метрикам",
          description:
            "Смотрит на охваты, сохранения, переходы и вовлечение, чтобы со временем усиливать темы и форматы, которые реально работают.",
        },
      ],
      detailTitle: "Чем занимается специалист",
      detailItems: [
        {
          title: "Основной фокус",
          body: "Делает так, чтобы контент выпускался не стихийно, а поддерживал маркетинговую стратегию через понятный редакционный процесс.",
        },
        {
          title: "Ежедневные задачи",
          body: "Готовит контент-планы, координирует тексты и визуалы, следит за дедлайнами публикаций и обновляет приоритеты по обратной связи и цифрам.",
        },
        {
          title: "Как строится работа",
          body: "Темы, форматы и сроки планируются заранее, но в системе остается место для быстрых адаптаций под запуски и акции.",
        },
        {
          title: "Что получает клиент",
          body: "Стабильную контент-машину, которая поддерживает кампании, удерживает активность каналов и снижает авральное производство.",
        },
      ],
    },
  },
};

export function getTeamMember(id: string) {
  return TEAM_MEMBERS.find((member) => member.id === id);
}

export function getProfileLocale(locale: string): SupportedProfileLocale {
  return locale.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function getTeamProfileContent(locale: string, roleType: TeamRoleType) {
  return TEAM_ROLE_CONTENT[getProfileLocale(locale)][roleType];
}
