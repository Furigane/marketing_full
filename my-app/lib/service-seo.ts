import { getLocalizedService, getRelatedServices } from "@/lib/services-localized";
import { getStaticMessages } from "@/lib/static-messages";
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

function getMarketKey(locale: string): MarketKey {
  const normalized = normalizeSiteLocale(locale);
  return normalized in getStaticMessages(locale).serviceSeo.marketNotes
    ? (normalized as MarketKey)
    : "en";
}

function fillTemplate(
  template: string,
  values: Record<string, string | number | undefined>
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function buildServiceSeoContent(
  service: ServiceDefinition,
  locale: string
): ServiceSeoContent {
  const messages = getStaticMessages(locale).serviceSeo;
  const marketKey = getMarketKey(locale);
  const market = messages.marketNotes[marketKey];
  const localized = getLocalizedService(service, locale);
  const related = getRelatedServices(service, locale).slice(0, 4);
  const relatedTitles = related.map((item) => item.content.title);
  const deliverables = localized.content.deliverables;
  const title = localized.content.title;
  const summary = localized.content.summary;
  const description = localized.content.description;
  const templateValues = {
    title,
    summary,
    description,
    market: market.market,
    nuance: market.nuance,
    related0: relatedTitles[0] ?? messages.fallbacks.related0,
    related1: relatedTitles[1] ?? messages.fallbacks.related1,
    related2: relatedTitles[2] ?? messages.fallbacks.related2,
    related3: relatedTitles[3] ?? messages.fallbacks.related3,
  };

  const blocks: ServiceSeoBlock[] = [
    { type: "heading", level: 2, text: fillTemplate(messages.blocks.introHeading, templateValues) },
    { type: "paragraph", text: fillTemplate(messages.blocks.introParagraph1, templateValues) },
    { type: "paragraph", text: fillTemplate(messages.blocks.introParagraph2, templateValues) },
    { type: "heading", level: 3, text: fillTemplate(messages.blocks.includedHeading, templateValues) },
    { type: "paragraph", text: fillTemplate(messages.blocks.includedParagraph1, templateValues) },
    { type: "list", items: deliverables },
    { type: "paragraph", text: fillTemplate(messages.blocks.includedParagraph2, templateValues) },
    { type: "heading", level: 3, text: fillTemplate(messages.blocks.seoHeading, templateValues) },
    { type: "paragraph", text: fillTemplate(messages.blocks.seoParagraph1, templateValues) },
    { type: "paragraph", text: fillTemplate(messages.blocks.seoParagraph2, templateValues) },
    { type: "heading", level: 4, text: fillTemplate(messages.blocks.linkingHeading, templateValues) },
    { type: "paragraph", text: fillTemplate(messages.blocks.linkingParagraph, templateValues) },
    { type: "heading", level: 2, text: fillTemplate(messages.blocks.whenHeading, templateValues) },
    { type: "paragraph", text: fillTemplate(messages.blocks.whenParagraph1, templateValues) },
    { type: "paragraph", text: fillTemplate(messages.blocks.whenParagraph2, templateValues) },
  ];

  const faq: ServiceFaqItem[] = messages.faq.map((item) => ({
    question: fillTemplate(item.question, templateValues),
    answer: fillTemplate(item.answer, templateValues),
  }));

  return {
    metaTitle: fillTemplate(messages.metaTitle, templateValues),
    metaDescription: fillTemplate(messages.metaDescription, templateValues),
    imageAlt: fillTemplate(messages.imageAlt, templateValues),
    faqHeading: messages.faqHeading,
    similarHeading: messages.similarHeading,
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
