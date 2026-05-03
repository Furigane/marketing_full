import { getRelatedServices, getLocalizedService } from "@/lib/services-localized";
import type { ServiceDefinition } from "@/lib/services";
import { normalizeSiteLocale } from "@/lib/site-locales";

type MarketKey = "ru" | "en" | "fr" | "de" | "ar";

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceSeoBlock =
  | {
      type: "heading";
      level: 2 | 3 | 4;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: readonly string[];
    };

export type ServiceSeoContent = {
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  faqHeading: string;
  similarHeading: string;
  blocks: ServiceSeoBlock[];
  faq: ServiceFaqItem[];
};

const MARKET_NOTES: Record<MarketKey, { market: string; nuance: string }> = {
  ru: {
    market: "русскоязычных рынков",
    nuance:
      "учитываем формулировки спроса, привычные рекламные площадки, более прямую коммерческую подачу и сценарии, где решение принимается через звонок, мессенджер или короткую форму заявки.",
  },
  en: {
    market: "English-speaking markets",
    nuance:
      "adapt messaging to clearer value propositions, transparent proof points, and search behaviour where comparison, trust, and conversion friction matter as much as traffic volume.",
  },
  fr: {
    market: "French-speaking markets",
    nuance:
      "adapt messaging to a more trust-led buying journey, careful wording around expertise, and stronger emphasis on proof, structure, and service clarity before contact.",
  },
  de: {
    market: "German-speaking markets",
    nuance:
      "adapt messaging to precision, process transparency, and commercially exact promises so the page looks reliable before a prospect even starts the conversation.",
  },
  ar: {
    market: "Arabic-speaking markets",
    nuance:
      "adapt messaging to local buying context, mobile-first behaviour, and stronger expectations around clarity, responsiveness, and culturally appropriate trust signals.",
  },
};

function getMarketKey(locale: string): MarketKey {
  const normalized = normalizeSiteLocale(locale);
  return normalized in MARKET_NOTES ? (normalized as MarketKey) : "en";
}

function buildMetaTitle(title: string, locale: string) {
  const suffix =
    getMarketKey(locale) === "ru"
      ? "под ключ, цена и результат"
      : "service, strategy, and delivery";
  return `${title} | ${suffix}`;
}

function buildMetaDescription(
  title: string,
  summary: string,
  relatedTitles: string[],
  locale: string
) {
  if (getMarketKey(locale) === "ru") {
    return `${title}: ${summary} Включаем аналитику, структуру работ и перелинковку с услугами ${relatedTitles.slice(0, 2).join(" и ")}.`;
  }

  return `${title}: ${summary} Includes planning, execution, reporting, and internal links to ${relatedTitles.slice(0, 2).join(" and ")}.`;
}

export function buildServiceSeoContent(
  service: ServiceDefinition,
  locale: string
): ServiceSeoContent {
  const localized = getLocalizedService(service, locale);
  const related = getRelatedServices(service, locale).slice(0, 4);
  const relatedTitles = related.map((item) => item.content.title);
  const market = MARKET_NOTES[getMarketKey(locale)];
  const deliverables = localized.content.deliverables;
  const title = localized.content.title;
  const summary = localized.content.summary;
  const description = localized.content.description;

  const blocks: ServiceSeoBlock[] =
    getMarketKey(locale) === "ru"
      ? [
          { type: "heading", level: 2, text: `Как работает ${title}` },
          {
            type: "paragraph",
            text: `${title} нужен бизнесу не как отдельная маркетинговая активность, а как управляемый коммерческий процесс. Мы начинаем с того, что связываем спрос, предложение, воронку и реальные ограничения компании: кто принимает решение, какие у клиента возражения, насколько быстро должна прийти первая заявка и какие каналы уже дают результат. ${description} За счёт этого страница услуги описывает не абстрактный набор действий, а практическую систему, где каждый этап имеет понятный KPI, срок и критерий качества. Такой подход особенно важен, когда услуга должна не просто создавать видимость продвижения, а давать измеримое влияние на заявки, выручку и окупаемость маркетинга.`,
          },
          {
            type: "paragraph",
            text: `На старте мы уточняем, какие сегменты аудитории приносят деньги, какие смыслы уже работают в продажах и где возникают потери между первым касанием и обращением. Затем определяем, какой контент, какие страницы и какие точки контакта должны поддерживать ${title.toLowerCase()}. Благодаря этому услуга опирается не на догадки, а на структуру спроса и реальную экономику бизнеса. Если проекту дополнительно нужны ${relatedTitles[0] ?? "смежные услуги"} или ${relatedTitles[1] ?? "доработки сайта"}, мы сразу закладываем это в план, чтобы не дробить работу на несвязанные задачи.`,
          },
          { type: "heading", level: 3, text: "Что входит в работу" },
          {
            type: "paragraph",
            text: `Работа строится по этапам: диагностика, проектирование, запуск, оптимизация и масштабирование. На диагностике фиксируем исходную точку, проверяем аналитику, собираем вводные от команды и определяем приоритетные сценарии роста. На этапе проектирования формируем структуру работ, гипотезы, требования к посадочным страницам и правила внутренней перелинковки. Запуск нужен не для формального старта, а для получения первых управляемых сигналов: где есть качественный спрос, какие связки усиливают конверсию и какие элементы мешают росту.`,
          },
          { type: "list", items: deliverables },
          {
            type: "paragraph",
            text: `После запуска мы не ограничиваемся отчётом в духе "всё работает". Важнее понять, какие действия реально двигают бизнес. Поэтому в рамках ${title.toLowerCase()} мы пересматриваем гипотезы, усиливаем страницы с потенциалом, уточняем офферы и обновляем контент там, где это влияет на конверсию. Когда видно, что результат зависит не только от одной услуги, мы подключаем ${relatedTitles[2] ?? "смежные направления"} и ${relatedTitles[3] ?? "дополнительные маркетинговые инструменты"} так, чтобы рост оставался системным, а не случайным.`,
          },
          { type: "heading", level: 3, text: "Почему это усиливает SEO и продажи одновременно" },
          {
            type: "paragraph",
            text: `${title} влияет не только на прямую отдачу канала, но и на качество всего сайта как коммерческого актива. Мы расширяем смысловую глубину страницы, выстраиваем H2-H3-H4, усиливаем релевантность под спрос и добавляем внутренние ссылки на смежные услуги. Это помогает поисковым системам понять, как услуга связана с другими направлениями компании, а пользователю проще перейти к следующему логичному шагу. За счёт такой структуры страница становится сильнее и как SEO-актив, и как точка конверсии.`,
          },
          {
            type: "paragraph",
            text: `Отдельный акцент делаем на рынках ${market.market}. Мы не используем буквальный перевод без учёта поведения аудитории. Вместо этого локализуем офферы, формулировки выгод, доказательства, CTA и блоки доверия под ту модель выбора, которая привычна пользователю. Для ${market.market} это означает, что мы ${market.nuance} В результате страница лучше отвечает и поисковому намерению, и ожиданиям потенциального клиента.`,
          },
          { type: "heading", level: 4, text: "Как выстроена внутренняя перелинковка" },
          {
            type: "paragraph",
            text: `Чтобы ${title.toLowerCase()} не оставался изолированной страницей, мы связываем его с соседними услугами в контексте сценария покупки. Если клиенту нужен быстрый спрос, логично перейти к ${relatedTitles[0] ?? "смежной услуге"}. Если нужно повысить качество трафика и измеримость, подключаем ${relatedTitles[1] ?? "аналитику"}. Если проекту требуется более сильная посадочная страница или контентная опора, добавляем ${relatedTitles[2] ?? "контентную услугу"} и ${relatedTitles[3] ?? "дополнительную доработку"}. Такая перелинковка помогает и пользователю, и поисковому роботу видеть полную структуру предложения.`,
          },
          { type: "heading", level: 2, text: `Когда стоит заказывать ${title}` },
          {
            type: "paragraph",
            text: `${title} особенно полезен, когда у бизнеса уже есть спрос или амбиция роста, но не хватает системности: заявки нестабильны, каналы не связаны между собой, контент не поддерживает продажи, а команда не видит прозрачной картины по эффективности. В такой ситуации мы не продаём "магическую" услугу, а собираем рабочую конфигурацию, где у каждого действия есть понятная роль. Если компании нужно быстрее выйти на результат, мы синхронизируем услугу с сайтом, контентом, аналитикой и смежными каналами, чтобы не терять время на фрагментарные правки.`,
          },
          {
            type: "paragraph",
            text: `Итогом становится не набор отдельных файлов или одноразовый запуск, а более сильная коммерческая система. У бизнеса появляется страница услуги, которая лучше ранжируется, лучше объясняет ценность, поддерживает E-E-A-T за счёт структуры, FAQ и связанных кейсов, а также направляет посетителя к следующим релевантным разделам сайта. Именно поэтому мы рассматриваем ${title.toLowerCase()} как часть общей стратегии роста, а не как изолированную тактическую задачу.`,
          },
        ]
      : [
          { type: "heading", level: 2, text: `How ${title} works in a commercial funnel` },
          {
            type: "paragraph",
            text: `${title} is most effective when it is treated as a business system rather than a disconnected marketing activity. We start by aligning demand, offer quality, conversion flow, and operational constraints: who the buyer is, what objections already slow the deal down, how quickly the company needs qualified demand, and which touchpoints already influence revenue. ${description} That is why this page is intentionally deeper than a short service card. It explains how the work is planned, measured, and integrated with the rest of the site so the service can support both search visibility and conversion quality over time.`,
          },
          {
            type: "paragraph",
            text: `At the beginning we map where commercial intent is already visible, which messages sales conversations confirm, and where the funnel loses momentum between the first click and the final inquiry. Then we define which landing pages, supporting assets, and internal links need to be improved so ${title.toLowerCase()} is not working in isolation. When the scope requires additional support from ${relatedTitles[0] ?? "related services"} or ${relatedTitles[1] ?? "conversion assets"}, we include that dependency early instead of discovering it after launch.`,
          },
          { type: "heading", level: 3, text: "What is included" },
          {
            type: "paragraph",
            text: `The delivery model follows five practical stages: diagnosis, planning, launch, optimization, and scale. Diagnosis establishes the real baseline. Planning turns that baseline into a sequence of decisions, assets, and responsibilities. Launch is used to create signal rather than vanity activity. Optimization then improves the combinations that show commercial promise, while scale is introduced only after the conversion path holds up under real demand. This protects the business from paying for motion that looks busy but does not produce a reliable outcome.`,
          },
          { type: "list", items: deliverables },
          {
            type: "paragraph",
            text: `We also use the service to strengthen the rest of the site. Commercial pages need more than a single headline and a short paragraph if they are expected to rank and convert. So we expand page depth, clarify hierarchy with H2-H3-H4 headings, improve descriptive copy, and connect the service to adjacent solutions such as ${relatedTitles[2] ?? "related channel work"} and ${relatedTitles[3] ?? "supporting implementation"}. This gives search engines a clearer topical map and gives buyers a cleaner path to the next relevant offer.`,
          },
          { type: "heading", level: 3, text: "Why this supports SEO and internal linking" },
          {
            type: "paragraph",
            text: `A strong service page should answer commercial questions before the reader leaves the site. It should explain scope, expected workflow, likely outcomes, and what else may be required for success. That is why we enrich this page with supporting sections, FAQ content, and contextual links to related services. The goal is not to stuff links into the layout. The goal is to create a navigational structure where a reader can move naturally from ${title.toLowerCase()} to the next service they are likely to need, while the site gains stronger semantic relationships between pages.`,
          },
          {
            type: "paragraph",
            text: `Localization matters as well. For ${market.market}, we do not rely on literal translation alone. We adapt the framing of the offer, the proof style, the CTA language, and the page logic to match how buyers compare providers in that market. For ${market.market}, this means we ${market.nuance} That local adaptation improves both relevance and trust, which is critical when the page is meant to rank and convert at the same time.`,
          },
          { type: "heading", level: 4, text: "How the service fits a broader growth stack" },
          {
            type: "paragraph",
            text: `Most businesses do not need ${title.toLowerCase()} alone. They need the right combination of acquisition, conversion, analytics, and content support around it. Internal links on this page are therefore intentional. They connect the current service to the surrounding solutions that remove friction, improve measurement, or make the final offer easier to understand. When those relationships are visible, the page becomes more useful to prospects and more coherent to search engines.`,
          },
          { type: "heading", level: 2, text: `When ${title} is the right next step` },
          {
            type: "paragraph",
            text: `${title} is the right next step when the company needs a more reliable growth engine, not just another isolated task. Typical signals include unstable lead flow, a weak connection between marketing activity and revenue, inconsistent messaging across pages, and unclear priorities for what to improve first. In that situation we use the service to create a working structure: clearer goals, better page relevance, stronger internal links, and a cleaner route from demand to inquiry.`,
          },
          {
            type: "paragraph",
            text: `The end result is not a decorative update. It is a commercial page that can carry more search intent, answer more buying questions, and connect readers to the broader service ecosystem of the company. That is what makes the service useful for SEO, user experience, and sales at the same time.`,
          },
        ];

  const faq: ServiceFaqItem[] =
    getMarketKey(locale) === "ru"
      ? [
          {
            question: `Что входит в ${title}?`,
            answer: `${title} обычно включает анализ исходной точки, проектирование структуры работ, запуск гипотез, оптимизацию по данным и рекомендации по смежным услугам, если без них результат будет ограничен.`,
          },
          {
            question: `Через сколько виден результат по услуге ${title}?`,
            answer: `Первые сигналы обычно появляются после запуска и накопления данных, но устойчивый результат зависит от ниши, спроса, состояния сайта и того, насколько быстро внедряются рекомендации.`,
          },
          {
            question: `Нужны ли дополнительные услуги вместе с ${title}?`,
            answer: `Часто да. Например, проекту могут понадобиться аналитика, контент, новые посадочные страницы или смежные рекламные каналы. Мы показываем это заранее, чтобы не создавать ложных ожиданий.`,
          },
          {
            question: `Как ${title} помогает SEO страницы услуги?`,
            answer: `Мы расширяем коммерческий контент, усиливаем структуру заголовков, добавляем FAQ, schema и внутренние ссылки. За счёт этого страница лучше объясняет тему и становится полезнее для поиска и для пользователя.`,
          },
          {
            question: `Можно ли локализовать ${title} под другой рынок?`,
            answer: `Да. Мы адаптируем Title, Description, смысловые блоки, alt-тексты, schema и CTA под язык страницы и сценарии выбора на конкретном рынке, а не ограничиваемся буквальным переводом.`,
          },
        ]
      : [
          {
            question: `What is included in ${title}?`,
            answer: `${title} usually includes baseline analysis, planning, launch, optimization, reporting, and recommendations for adjacent work when another dependency is required for better commercial performance.`,
          },
          {
            question: `How quickly can ${title} show results?`,
            answer: `Early signals can appear soon after launch, but durable results depend on demand level, tracking quality, page readiness, and how fast the business can implement the agreed improvements.`,
          },
          {
            question: `Does ${title} require other supporting services?`,
            answer: `Often yes. Many projects need better analytics, stronger landing pages, content support, or adjacent acquisition channels. We surface those dependencies early rather than hiding them.`,
          },
          {
            question: `How does this page help SEO as well as sales?`,
            answer: `The page now includes deeper commercial copy, structured headings, FAQ content, schema markup, and contextual internal links. That makes the topic clearer for search engines and more useful for buyers.`,
          },
          {
            question: `Can the service be localized for another market?`,
            answer: `Yes. We adapt titles, descriptions, alt text, schema language, CTAs, and trust framing to the market context instead of relying on literal translation alone.`,
          },
        ];

  return {
    metaTitle: buildMetaTitle(title, locale),
    metaDescription: buildMetaDescription(title, summary, relatedTitles, locale),
    imageAlt:
      getMarketKey(locale) === "ru"
        ? `${title} Creative Group`
        : `${title} by Creative Group`,
    faqHeading: getMarketKey(locale) === "ru" ? "FAQ по услуге" : "Service FAQ",
    similarHeading: getMarketKey(locale) === "ru" ? "Похожие услуги" : "Related services",
    blocks,
    faq,
  };
}

export function buildServiceFaqSchema(service: ServiceDefinition, locale: string) {
  const seoContent = buildServiceSeoContent(service, locale);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: normalizeSiteLocale(locale),
    mainEntity: seoContent.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
