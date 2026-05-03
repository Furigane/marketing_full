import type { BlogPost } from "@/lib/blog";
import { normalizeSiteLocale } from "@/lib/site-locales";

type LocaleKey = "ru" | "en" | "fr" | "de" | "ar";

export type TopicCluster = {
  title: string;
  description: string;
  articleIdeas: string[];
};

type AnnualPlanItem = {
  quarter: string;
  month: string;
  title: string;
  intent: string;
};

function getLocaleKey(locale: string): LocaleKey {
  const normalized = normalizeSiteLocale(locale);
  return normalized in TOPIC_CLUSTER_COPY ? (normalized as LocaleKey) : "en";
}

const TOPIC_CLUSTER_COPY: Record<LocaleKey, { section: string; plan: string }> = {
  ru: { section: "Topic clusters", plan: "Контент-план на 24 публикации" },
  en: { section: "Topic clusters", plan: "24-post annual plan" },
  fr: { section: "Topic clusters", plan: "Plan annuel de 24 articles" },
  de: { section: "Topic clusters", plan: "Jahresplan mit 24 Beiträgen" },
  ar: { section: "Topic clusters", plan: "خطة محتوى سنوية من 24 مقالاً" },
};

export function getTopicClusters(locale: string): TopicCluster[] {
  const key = getLocaleKey(locale);

  if (key === "ru") {
    return [
      {
        title: "SEO и коммерческие страницы",
        description: "Кластер для спроса на услуги, структуру страниц, перелинковку, schema и рост органического трафика.",
        articleIdeas: [
          "Как расширять страницы услуг под SEO без потери конверсии",
          "Какие ошибки в meta и H1 мешают росту услуг",
          "Как FAQ и FAQPage помогают коммерческим страницам",
        ],
      },
      {
        title: "Контент-система и блог",
        description: "Кластер про blog-to-service стратегию, topic clusters, информационный спрос и контент, который приводит к заявке.",
        articleIdeas: [
          "Как собрать topic clusters для агентства услуг",
          "Как связывать статьи с услугами без спама",
          "Как измерять вклад блога в продажи, а не только в трафик",
        ],
      },
      {
        title: "Реклама, аналитика и воронка",
        description: "Кластер для услуг, которые требуют связки трафика, аналитики, креативов и качества лидов.",
        articleIdeas: [
          "Когда таргет и контекст не работают из-за сайта",
          "Какие отчёты нужны, чтобы масштабировать маркетинг",
          "Как понять, какая услуга реально влияет на CPL и LTV",
        ],
      },
      {
        title: "Локализация и мультиязычность",
        description: "Кластер про hreflang, локализованные офферы, локальные рынки, переключатели языка и индексацию международных страниц.",
        articleIdeas: [
          "Как настроить hreflang для многоязычного сайта услуг",
          "Почему перевод без локализации ухудшает конверсию",
          "Как адаптировать SEO-контент под разные рынки",
        ],
      },
    ];
  }

  return [
    {
      title: "SEO service pages",
      description: "Cluster for commercial page depth, metadata, FAQs, schema markup, and search intent alignment.",
      articleIdeas: [
        "How to expand service pages without hurting conversions",
        "Metadata mistakes that weaken service visibility",
        "How FAQ content supports commercial SEO pages",
      ],
    },
    {
      title: "Content systems and blog strategy",
      description: "Cluster for topic clusters, article-to-service journeys, editorial structure, and conversion-focused content planning.",
      articleIdeas: [
        "How to build topic clusters for service businesses",
        "How to link blog posts to services contextually",
        "How to measure blog contribution beyond traffic",
      ],
    },
    {
      title: "Ads, analytics, and demand generation",
      description: "Cluster for paid traffic, measurement, landing page quality, and lead economics across channels.",
      articleIdeas: [
        "When paid ads underperform because the website is weak",
        "Reports that matter for scaling marketing",
        "How to connect CPL quality with service strategy",
      ],
    },
    {
      title: "Localization and multilingual growth",
      description: "Cluster for hreflang, localized metadata, language switching, market adaptation, and international indexing.",
      articleIdeas: [
        "How to implement hreflang for a multilingual site",
        "Why translation is not enough for market localization",
        "How to adapt service content to different markets",
      ],
    },
  ];
}

export function getAnnualContentPlan(locale: string): AnnualPlanItem[] {
  const key = getLocaleKey(locale);
  const quarterWord = key === "ru" ? "Квартал" : "Q";
  const months =
    key === "ru"
      ? ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const intents =
    key === "ru"
      ? ["SEO услуг", "Блог и контент", "Аналитика", "Кейсы и E-E-A-T", "Локализация", "Перелинковка"]
      : ["Service SEO", "Blog strategy", "Analytics", "Case studies and E-E-A-T", "Localization", "Internal linking"];

  const titles =
    key === "ru"
      ? [
          "Как оформлять страницы услуг под коммерческий спрос",
          "Когда бизнесу нужен контент-план, а не разовые статьи",
          "Какие метрики показывают, что страница услуги продаёт",
          "Как кейсы повышают доверие и видимость сайта",
          "Что нужно для hreflang без ошибок индексации",
          "Как выстроить перелинковку между услугами и блогом",
          "Почему слабый H1 рушит релевантность страницы",
          "Как расширять FAQ без воды и каннибализации",
          "Нужен ли отдельный контент под локальное SEO",
          "Как проверить canonical и sitemap на многоязычном сайте",
          "Как связать контекстную рекламу и SEO-страницы",
          "Какие страницы усиливать кейсами в первую очередь",
          "Как использовать alt-тексты для коммерческих изображений",
          "Когда блог не приводит лиды и как это исправить",
          "Как оформить услугу под дорогой B2B-чек",
          "Какие schema реально полезны услугам и кейсам",
          "Как адаптировать офферы под разные языки сайта",
          "Почему рынки требуют разной логики CTA",
          "Как строить topic clusters вокруг агентских услуг",
          "Какие статьи лучше ведут на услуги в середине воронки",
          "Как упаковать до/после результаты в кейсах",
          "Как проверить индексируемость ключевых страниц",
          "Какие внутренние ссылки усиливают конверсию",
          "Как собрать годовую editorial map под спрос и продажи",
        ]
      : [
          "How to structure service pages for commercial intent",
          "When a business needs a content plan instead of random posts",
          "Metrics that show a service page actually converts",
          "How case studies improve trust and visibility",
          "What hreflang needs to avoid indexing errors",
          "How to connect services and blog posts through internal links",
          "Why a weak H1 reduces page relevance",
          "How to expand FAQ sections without filler copy",
          "When local SEO needs dedicated content",
          "How to audit canonical tags and multilingual sitemaps",
          "How paid search and SEO pages should support each other",
          "Which pages should be strengthened with case studies first",
          "How to write alt text for commercial imagery",
          "Why blog content fails to generate leads and how to fix it",
          "How to position a service for higher-ticket B2B buyers",
          "Which schema types matter most for services and case studies",
          "How to adapt offers across languages",
          "Why different markets need different CTA logic",
          "How to build topic clusters around agency services",
          "Which articles best support mid-funnel service pages",
          "How to package before-and-after proof in case studies",
          "How to verify indexability for key pages",
          "Which internal links improve conversion journeys",
          "How to build a yearly editorial map around demand and sales",
        ];

  return titles.map((title, index) => ({
    quarter: `${quarterWord}${key === "ru" ? " " : ""}${Math.floor(index / 6) + 1}`,
    month: months[Math.floor(index / 2)],
    title,
    intent: intents[index % intents.length],
  }));
}

export function getEnhancedBlogContent(post: BlogPost, locale: string) {
  const key = getLocaleKey(locale);

  if (post.slug !== "content-system-launch") {
    return null;
  }

  if (key === "ru") {
    return `## Контент-система для бизнеса начинается с цели
Мы начинаем не с публикаций и не с красивого редакционного календаря. Мы начинаем с вопроса, какую коммерческую задачу должен решать контент: привести новый спрос, сократить цикл сделки, усилить доверие к дорогой услуге или подготовить человека к разговору с менеджером. В этот момент становится ясно, что блог, SEO и посадочные страницы нельзя развивать отдельно друг от друга. Когда бизнес публикует статьи без связи с услугами, он получает архив материалов. Когда он строит контент-систему, он получает путь от вопроса пользователя к заявке. Поэтому на старте мы связываем {{service:copywriting|копирайтинг для сайта и рекламы}}, {{service:seoPromotion|SEO-продвижение сайта}}, {{service:smmManagement|ведение социальных сетей}} и {{service:corporateWebsite|разработку корпоративного сайта}} в одну логику, где каждая единица контента отвечает за конкретный этап воронки.

### Почему контент нужно проектировать от спроса, а не от тем
Типовая ошибка в контенте агентств и компаний услуг выглядит одинаково: темы выбирают по вдохновению, по "интересности" или по тому, что сделал конкурент. Но спрос живёт не в этих категориях. Он живёт в конкретных формулировках: что мешает бизнесу расти, почему не работают заявки, как связать сайт с рекламой, где искать точки роста в SEO и как доказать компетенцию до созвона. Если не опираться на такие формулировки, статья может быть качественной, но некоммерчески бесполезной. Поэтому сначала мы разбираем поисковый и продажный контекст, затем определяем, какие статьи поддерживают верх воронки, какие материалы подогревают аудиторию в середине, а какие страницы должны уже закрывать коммерческий интент. Именно поэтому статья почти всегда должна уметь перевести пользователя на {{service:analyticsSetup|настройку аналитики}}, {{service:emailMarketing|email-маркетинг}} или другую услугу, которая логично продолжает тему.

#### Что получает бизнес на выходе
На выходе появляется не набор публикаций, а система, в которой каждый материал знает свою роль. Одни тексты забирают информационный спрос, другие помогают объяснить сложную услугу, третьи усиливают кейсы и доказательства. Менеджеру проще продавать, потому что пользователь приходит уже подготовленным. SEO становится устойчивее, потому что контент поддерживает коммерческие разделы. А блог перестаёт быть отдельной декоративной зоной сайта.

## Где статьи реально усиливают продажи и SEO
Блог начинает приносить пользу тогда, когда он встроен в архитектуру сайта. Каждая статья должна усиливать услуги, а не висеть рядом с ними как информационный довесок. Для этого мы строим topic clusters: есть коммерческий центр, например услуга, и вокруг него собираются смежные статьи. Одна отвечает на базовый вопрос, другая снимает возражение, третья показывает методику, четвёртая ведёт к кейсу. Так повышается релевантность всего кластера, а поисковые системы лучше понимают, что сайт глубоко раскрывает тему. Для агентских сайтов особенно полезно связывать статьи с {{service:seoPromotion|SEO-продвижением}}, {{service:targetedMetaVkTiktok|таргетированной рекламой}}, {{service:contextGoogleYandex|контекстной рекламой}} и {{service:corporateWebsite|сайтом как точкой конверсии}}.

### Как выбрать коммерческий центр кластера
Не каждая тема заслуживает отдельного кластера. Сначала нужно понять, какие услуги реально влияют на выручку, на какие запросы компания хочет ранжироваться и где есть разрыв между спросом и качеством существующих страниц. Если услуга уже важна в продажах, но страница короткая и слабая, блог должен усиливать именно её. Если услуга новая, контент помогает быстрее накопить релевантность и доверие. Если у бизнеса сложная воронка, статьи используются как этап прогрева до заявки. Так мы определяем, куда должна вести статья: на услугу, кейс, категорию услуг или консультационный блок.

### Как распределять статьи по воронке
Верх воронки нужен для вопросов и сравнений. Середина воронки работает с формулировками "как выбрать", "почему не работает", "что проверить перед запуском". Низ воронки связывается с коммерческими страницами, кейсами, ROI, сроками и форматами работы. Когда на сайте есть только один слой статей, он начинает конкурировать сам с собой. А когда темы распределены по воронке, каждая публикация усиливает определённый шаг. Отсюда и требование, чтобы каждая статья вела минимум на 3-5 услуг: пользователю нужен выбор следующего шага, а не тупик после чтения.

## Почему короткие статьи почти не помогают услуге
Статья на 300-500 слов редко успевает раскрыть тему, ответить на возражения и передать смысл смежной услуги. Она выглядит как заметка, а не как экспертный актив. Для информационного спроса и SEO в конкурентных тематиках этого почти всегда недостаточно. Именно поэтому мы доводим статьи до 1500-2000+ слов. Такая длина сама по себе ничего не гарантирует, но она даёт место для нормальной структуры: H2-H3-H4, примеров, переходов к услуге, блока доказательств и контекстной перелинковки. Пользователь получает ощущение глубины, а поисковый робот получает понятную карту темы.

### Как избегать воды при расширении статьи
Расширять статью нужно не за счёт повторов, а за счёт полезных слоёв. Мы добавляем блоки про типовые ошибки, критерии выбора, этапы работы, примеры сценариев, связку с аналитикой, локализацию под рынки и вопросы, которые реально задаёт клиент перед заявкой. Если статья говорит о контент-системе, она должна объяснить, как контент связывается с сайтом, рекламой, CRM, аналитикой и внутренними ссылками. В противном случае текст остаётся красивым, но некоммерческим.

## Как мы связываем статью с услугами без спама
Контекстная ссылка работает только тогда, когда она продолжает мысль. Если статья объясняет, почему контент не приносит лиды, логично вести читателя на {{service:copywriting|копирайтинг}}, {{service:corporateWebsite|разработку корпоративного сайта}} и {{service:analyticsSetup|настройку аналитики}}. Если речь идёт о росте поискового спроса, логично подключить {{service:seoPromotion|SEO-продвижение}} и {{service:localSeo|локальное SEO}}. Если тема касается платного трафика, читателю нужны переходы к {{service:targetedMetaVkTiktok|таргету}}, {{service:contextGoogleYandex|контексту}} и {{service:adCreatives|креативам}}. Мы не вставляем ссылки ради числа. Мы выстраиваем маршрут, где каждая следующая услуга усиливает предыдущую мысль.

### Какие услуги чаще всего должны стоять рядом
Для агентского сайта почти всегда полезны связки "трафик + посадочная страница + аналитика", "SEO + контент + перелинковка", "кейсы + E-E-A-T + лидогенерация". Именно такие связки помогают пользователю понять, что решение его задачи лежит не в одной кнопке. Сайт, который показывает только изолированные услуги, выглядит слабее, чем сайт, который объясняет систему решений.

## Как локализация меняет контент-план
Мультиязычный блог нельзя вести как машинный дубль одного языка. Даже если базовая тема одна и та же, рынок по-разному воспринимает доказательства, офферы, риски и тон коммуникации. Для русскоязычного спроса часто важны прямота, понятные сроки и конкретные цифры. Для англоязычных рынков важнее прозрачность процесса, качество доказательств и аккуратная работа с доверием. Поэтому локализация контента касается не только перевода заголовка, но и подбора примеров, CTA, FAQ, формулировок обещания и внутренних ссылок. Это особенно важно там, где статья ведёт на коммерческую услугу.

### Что проверять после публикации
После публикации статья должна попасть не только в блог, но и в систему контроля качества. Мы проверяем meta title, description, canonical, hreflang, наличие indexable HTML-ссылок, актуальность schema, связку со страницами услуг и понятность CTA. Затем смотрим, какие услуги получают переходы, какие блоки читают, где проседает вовлечение и какие запросы появляются в поиске. Без этого контент превращается в библиотеку, а не в инструмент роста.

## Итог: блог должен быть частью коммерческой архитектуры
Сильный блог не заменяет услуги, но делает их убедительнее и заметнее. Он помогает забрать информационный спрос, перевести пользователя в коммерческий контекст, усилить внутреннюю перелинковку и доказать экспертность через глубину, структуру и кейсы. Именно поэтому контент-план мы строим не вокруг "тем для блога", а вокруг того, какие услуги бизнес хочет продать, какие рынки он хочет охватить и какие типы спроса уже существуют в поиске. Тогда каждая статья работает как часть системы, а не как отдельная публикация ради галочки.`;
  }

  return `## A content system starts with a commercial goal
We do not start with publishing for the sake of activity. We start with the commercial goal: what kind of demand the business needs, which objections slow down decisions, what a qualified lead should already understand before talking to sales, and where the current website fails to carry that journey. That is the point where the blog stops being a decorative section and becomes part of a business system. Instead of treating content, SEO, and service pages as separate streams, we connect {{service:copywriting|copywriting}}, {{service:seoPromotion|SEO promotion}}, {{service:smmManagement|social media management}}, and {{service:corporateWebsite|corporate website development}} into one structure where each asset supports a specific stage of the funnel.

### Why demand should drive content planning
One of the most common mistakes in content planning is choosing topics because they feel interesting, fashionable, or easy to publish. Demand does not behave that way. Real demand appears in the language of friction: why leads are weak, why paid traffic does not convert, how service pages can rank, what needs to be measured before scaling, and how to make expertise visible before a call. If the content plan ignores those questions, the company may publish decent articles that never contribute to revenue. That is why we first map search demand, sales objections, and commercial priorities before we write anything. Only then do we decide which themes belong at the top of the funnel, which should support mid-funnel evaluation, and which must connect directly to a commercial service page.

#### What the business gets in the end
The result is not a pile of articles. The result is a content system where each page has a job. Some articles capture informational demand. Some help explain a complex service. Some reinforce case studies and trust signals. Others move readers into the exact service page that should handle the next step of the buying journey. That is where the blog starts to support both SEO and sales.

## Where blog content strengthens services and search visibility
Articles become strategically useful when they are built around topic clusters. A service page acts as the commercial center, while supporting articles answer adjacent questions, remove objections, or explain the process behind the result. Search engines see a clearer topical structure. Readers see a more logical path from curiosity to action. For service businesses, this is especially powerful when articles reinforce pages like {{service:seoPromotion|SEO promotion}}, {{service:targetedMetaVkTiktok|paid social advertising}}, {{service:contextGoogleYandex|paid search advertising}}, and {{service:corporateWebsite|the website as a conversion asset}} instead of sitting apart from them.

### How to choose the center of a topic cluster
Not every topic deserves its own cluster. We first identify which services matter most commercially, where the site is already close to ranking, and which pages have the highest chance of influencing qualified demand if their topical support improves. If an important service page is short, thin, or under-linked, the blog should help reinforce it. If a service is new, supporting articles can speed up trust and relevance. If the funnel is complex, content can guide the reader through the evaluation stage before the service page asks for action. That is how we decide where an article should lead: a service page, a case study, a specialist profile, or another conversion-oriented asset.

### How articles should be distributed across the funnel
Top-of-funnel pieces answer early questions. Mid-funnel pieces deal with comparisons, process, mistakes, and evaluation criteria. Lower-funnel pieces help connect the reader with commercial intent, case studies, expected results, pricing logic, or delivery scope. When a website publishes only one type of article, its content competes with itself. When articles are distributed intentionally across the funnel, every piece supports a different moment in decision-making. This is also why every article should point to three to five services. Readers need a natural next step, not a dead end after the final paragraph.

## Why short articles rarely support a service page
Short posts often fail because they cannot do enough jobs at once. They do not have room to explain the context, answer objections, connect to related services, and build enough topical relevance for a competitive search landscape. That is why we push strategic articles toward the 1,500 to 2,000 word range. Length alone is not value, but it creates the room needed for clear H2-H3-H4 structure, examples, transition logic, proof elements, and internal links. The reader gets depth. Search engines get clearer context. Commercial pages get stronger support.

### How to expand an article without adding filler
Expanding an article should not mean repeating the same point in different wording. The useful way to extend depth is to add layers that help the reader decide: common mistakes, evaluation criteria, process steps, scenarios, measurement methods, localization nuances, and service dependencies. If the topic is content strategy, the article should explain how content interacts with the site, paid channels, analytics, CRM, and internal linking. Without that depth, the article may sound polished, but it will still be commercially weak.

## How we link articles to services without making the page feel forced
Contextual links work only when they continue the logic of the paragraph. If the article explains why content fails to generate qualified demand, the natural next steps are {{service:copywriting|copywriting}}, {{service:corporateWebsite|corporate website development}}, and {{service:analyticsSetup|analytics setup}}. If the topic is organic growth, the reader may need {{service:seoPromotion|SEO promotion}} and {{service:localSeo|local SEO}}. If the topic is demand generation from paid traffic, it makes sense to guide them toward {{service:targetedMetaVkTiktok|paid social}}, {{service:contextGoogleYandex|paid search}}, and {{service:adCreatives|ad creatives}}. The purpose is not link volume. The purpose is journey design.

### Which service combinations matter most
For most agency websites, the strongest relationships are between traffic, landing pages, analytics, and content. Paid media often underperforms because the website is weak. SEO underperforms because service pages are too thin. Content underperforms because there is no measurement or conversion path behind it. Case studies underperform because they do not connect to the relevant services. When the site makes those relationships visible, the business looks more competent and the user experiences less friction.

## Why localization changes the content plan
A multilingual content strategy cannot be built as a literal copy of one language. Even when the core topic stays the same, different markets respond to different proof styles, promise structures, and buying expectations. Russian-speaking users often expect direct value articulation and clearer commercial framing. English-speaking audiences may need stronger process transparency, layered evidence, and more deliberate trust framing. That means localization is not limited to translating titles. It affects examples, CTAs, FAQs, internal linking emphasis, and the way a service offer is framed in each market.

### What to verify after publication
Publishing is not the finish line. Every article should be checked for metadata quality, canonical behavior, hreflang coverage, crawlable HTML links, schema validity, and a clear relationship to the services it is supposed to strengthen. Then we look at engagement, search visibility, service-page traffic flow, and whether the article helps create better commercial conversations. Without that layer of verification, a blog becomes an archive. With it, the blog becomes a working growth asset.

## Final point: the blog should serve the commercial architecture of the site
A strong blog does not replace service pages. It prepares readers for them, strengthens their relevance, and proves expertise through depth, structure, and proof. That is why we build content plans around the services the business wants to sell, the markets it wants to grow in, and the search demand that already exists. When content is planned that way, every article becomes part of a system rather than another isolated publication.`;
}

export function getBlogSeoCopy(locale: string) {
  const key = getLocaleKey(locale);
  return TOPIC_CLUSTER_COPY[key];
}
