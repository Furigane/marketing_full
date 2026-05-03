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
        title: "РўР°СЂРіРµС‚РёСЂРѕРІР°РЅРЅР°СЏ СЂРµРєР»Р°РјР° Meta, VK Рё TikTok",
        summary: "РџР»Р°С‚РЅС‹Рµ СЃРѕС†СЃРµС‚Рё СЃ СѓРїРѕСЂРѕРј РЅР° Р·Р°СЏРІРєРё, РїРѕРЅСЏС‚РЅС‹Рµ РіРёРїРѕС‚РµР·С‹ Рё РєРѕРЅС‚СЂРѕР»РёСЂСѓРµРјСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ Р»РёРґР°.",
        description: "РњС‹ Р·Р°РїСѓСЃРєР°РµРј Рё РІРµРґС‘Рј СЂРµРєР»Р°РјРЅС‹Рµ РєР°РјРїР°РЅРёРё РІ Meta, VK Рё TikTok С‚Р°Рє, С‡С‚РѕР±С‹ СЂРµРєР»Р°РјР° РґР°РІР°Р»Р° РЅРµ РїСЂРѕСЃС‚Рѕ РѕС…РІР°С‚, Р° РєР°С‡РµСЃС‚РІРµРЅРЅС‹Рµ Р·Р°СЏРІРєРё. Р Р°Р±РѕС‚Р° РЅР°С‡РёРЅР°РµС‚СЃСЏ СЃ СЃРµРіРјРµРЅС‚Р°С†РёРё Р°СѓРґРёС‚РѕСЂРёР№, РїСЂРѕРІРµСЂРєРё РѕС„С„РµСЂРѕРІ, РЅР°СЃС‚СЂРѕР№РєРё Р°РЅР°Р»РёС‚РёРєРё Рё С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ РєСЂРµР°С‚РёРІРѕРІ. РњР°СЃС€С‚Р°Р±РёСЂСѓРµРј С‚РѕР»СЊРєРѕ С‚Рµ СЃРІСЏР·РєРё, РєРѕС‚РѕСЂС‹Рµ СѓРґРµСЂР¶РёРІР°СЋС‚ РЅСѓР¶РЅС‹Р№ CPL Рё РєР°С‡РµСЃС‚РІРѕ Р»РёРґРѕРІ.",
        deliverables: [
          "РЎС‚СЂСѓРєС‚СѓСЂР° РєР°РјРїР°РЅРёР№ РїРѕ СЌС‚Р°РїР°Рј РІРѕСЂРѕРЅРєРё Рё С‚РёРїР°Рј Р°СѓРґРёС‚РѕСЂРёР№",
          "РњР°С‚СЂРёС†Р° С‚РµСЃС‚РѕРІ РїРѕ РѕС„С„РµСЂР°Рј, Р°СѓРґРёС‚РѕСЂРёСЏРј Рё РєСЂРµР°С‚РёРІР°Рј",
          "Р•Р¶РµРЅРµРґРµР»СЊРЅР°СЏ РѕРїС‚РёРјРёР·Р°С†РёСЏ Р±СЋРґР¶РµС‚Р°, РїР»РµР№СЃРјРµРЅС‚РѕРІ Рё РєР°С‡РµСЃС‚РІР° Р·Р°СЏРІРѕРє",
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
        title: "РљРѕРЅС‚РµРєСЃС‚РЅР°СЏ СЂРµРєР»Р°РјР° Google Ads Рё РЇРЅРґРµРєСЃ Р”РёСЂРµРєС‚",
        summary: "Р—Р°Р±РёСЂР°РµРј РіРѕСЂСЏС‡РёР№ СЃРїСЂРѕСЃ РёР· РїРѕРёСЃРєР° Рё РІРµРґС‘Рј РµРіРѕ РЅР° СЂРµР»РµРІР°РЅС‚РЅС‹Рµ РїРѕСЃР°РґРѕС‡РЅС‹Рµ СЃС‚СЂР°РЅРёС†С‹.",
        description: "РњС‹ РІС‹СЃС‚СЂР°РёРІР°РµРј РїРѕРёСЃРєРѕРІС‹Рµ РєР°РјРїР°РЅРёРё РІРѕРєСЂСѓРі РєРѕРјРјРµСЂС‡РµСЃРєРѕРіРѕ СЃРїСЂРѕСЃР°, РєР»Р°СЃС‚РµСЂРёР·Р°С†РёРё Р·Р°РїСЂРѕСЃРѕРІ Рё СЂРµР»РµРІР°РЅС‚РЅС‹С… РїРѕСЃР°РґРѕС‡РЅС‹С… СЃС‚СЂР°РЅРёС†. Р¦РµР»СЊ СЂР°Р±РѕС‚С‹ вЂ” РїРѕР»СѓС‡Р°С‚СЊ Р·Р°СЏРІРєРё РёР· СѓР¶Рµ СЃС„РѕСЂРјРёСЂРѕРІР°РЅРЅРѕРіРѕ СЃРїСЂРѕСЃР°, СЃРѕРєСЂР°С‰Р°С‚СЊ РЅРµС†РµР»РµРІС‹Рµ СЂР°СЃС…РѕРґС‹ Рё РїРѕСЃС‚РµРїРµРЅРЅРѕ СѓР»СѓС‡С€Р°С‚СЊ РїСѓС‚СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РѕС‚ Р·Р°РїСЂРѕСЃР° РґРѕ РєРѕРЅРІРµСЂСЃРёРё.",
        deliverables: [
          "РЎРµРјР°РЅС‚РёС‡РµСЃРєР°СЏ СЃС‚СЂСѓРєС‚СѓСЂР° РїРѕ РЅР°РјРµСЂРµРЅРёСЋ, Р±СЂРµРЅРґСѓ Рё РіСЂСѓРїРїРµ СѓСЃР»СѓРі",
          "РћР±СЉСЏРІР»РµРЅРёСЏ, СЂР°СЃС€РёСЂРµРЅРёСЏ Рё РјРёРЅСѓСЃ-СЃР»РѕРІР° РїРѕРґ РєРѕРЅРІРµСЂСЃРёСЋ, Р° РЅРµ РєР»РёРєРё",
          "РћРїС‚РёРјРёР·Р°С†РёСЏ СЃС‚Р°РІРѕРє, Р±СЋРґР¶РµС‚Р° Рё РїРѕРёСЃРєРѕРІС‹С… Р·Р°РїСЂРѕСЃРѕРІ СЃ РѕС‚С‡С‘С‚РЅРѕСЃС‚СЊСЋ",
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
        title: "SEO-РїСЂРѕРґРІРёР¶РµРЅРёРµ СЃР°Р№С‚Р°",
        summary: "РўРµС…РЅРёС‡РµСЃРєР°СЏ, СЃРµРјР°РЅС‚РёС‡РµСЃРєР°СЏ Рё РєРѕРЅС‚РµРЅС‚РЅР°СЏ СЂР°Р±РѕС‚Р°, РєРѕС‚РѕСЂР°СЏ РґР°С‘С‚ СѓСЃС‚РѕР№С‡РёРІС‹Р№ РѕСЂРіР°РЅРёС‡РµСЃРєРёР№ СЂРѕСЃС‚.",
        description: "SEO РІРєР»СЋС‡Р°РµС‚ С‚РµС…РЅРёС‡РµСЃРєРёР№ Р°СѓРґРёС‚, СЂР°СЃРїСЂРµРґРµР»РµРЅРёРµ РїРѕРёСЃРєРѕРІРѕРіРѕ СЃРїСЂРѕСЃР° РїРѕ СЃС‚СЂР°РЅРёС†Р°Рј, С‚СЂРµР±РѕРІР°РЅРёСЏ Рє РєРѕРЅС‚РµРЅС‚Сѓ Рё РІРЅСѓС‚СЂРµРЅРЅРµР№ РїРµСЂРµР»РёРЅРєРѕРІРєРµ. РњС‹ СЂР°Р±РѕС‚Р°РµРј РЅРµ СЂР°РґРё С„РѕСЂРјР°Р»СЊРЅРѕРіРѕ СЂРѕСЃС‚Р° РїРѕР·РёС†РёР№, Р° СЂР°РґРё СЃРїСЂРѕСЃР°, РєРѕС‚РѕСЂС‹Р№ РІР»РёСЏРµС‚ РЅР° РїСЂРѕРґР°Р¶Рё, Рё СЃРѕР±РёСЂР°РµРј РїРѕРЅСЏС‚РЅС‹Р№ backlog Р·Р°РґР°С‡ РґР»СЏ СЂР°Р·СЂР°Р±РѕС‚РєРё Рё РєРѕРЅС‚РµРЅС‚Р°.",
        deliverables: [
          "РўРµС…РЅРёС‡РµСЃРєРёР№ Р°СѓРґРёС‚ СЃ РїСЂРёРѕСЂРёС‚РёР·Р°С†РёРµР№ РїСЂР°РІРѕРє РїРѕ РІР»РёСЏРЅРёСЋ",
          "РљР°СЂС‚Р° СЃРµРјР°РЅС‚РёРєРё Рё СЂРµРєРѕРјРµРЅРґР°С†РёРё РїРѕ РїРѕСЃР°РґРѕС‡РЅС‹Рј СЃС‚СЂР°РЅРёС†Р°Рј",
          "On-page Р·Р°РґР°С‡Рё Рё РїРµСЂРµР»РёРЅРєРѕРІРєР° СЃ РѕС‚С‡С‘С‚РЅРѕСЃС‚СЊСЋ РїРѕ РІРёРґРёРјРѕСЃС‚Рё",
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
        title: "РЎРѕР·РґР°РЅРёРµ РєРѕСЂРїРѕСЂР°С‚РёРІРЅРѕРіРѕ СЃР°Р№С‚Р°",
        summary: "РљРѕСЂРїРѕСЂР°С‚РёРІРЅС‹Р№ СЃР°Р№С‚ СЃ РїРѕРЅСЏС‚РЅРѕР№ СЃС‚СЂСѓРєС‚СѓСЂРѕР№, СЃРёР»СЊРЅРѕР№ РїРѕРґР°С‡РµР№ СѓСЃР»СѓРі Рё С„РѕРєСѓСЃРѕРј РЅР° Р·Р°СЏРІРєРё.",
        description: "РњС‹ РїСЂРѕРµРєС‚РёСЂСѓРµРј Рё СЃРѕР±РёСЂР°РµРј РєРѕСЂРїРѕСЂР°С‚РёРІРЅС‹Рµ СЃР°Р№С‚С‹ С‚Р°Рє, С‡С‚РѕР±С‹ РѕРЅРё СЏСЃРЅРѕ РѕР±СЉСЏСЃРЅСЏР»Рё РїСЂРµРґР»РѕР¶РµРЅРёРµ РєРѕРјРїР°РЅРёРё Рё РїРѕРґРґРµСЂР¶РёРІР°Р»Рё РїСЂРѕРґР°Р¶Рё. Р­С‚Рѕ РЅРµ РІРёС‚СЂРёРЅР° СЂР°РґРё РїСЂРёСЃСѓС‚СЃС‚РІРёСЏ, Р° СЂР°Р±РѕС‡РёР№ РєРѕРјРјРµСЂС‡РµСЃРєРёР№ РёРЅСЃС‚СЂСѓРјРµРЅС‚ СЃ РїСЂРѕРґСѓРјР°РЅРЅРѕР№ СЃС‚СЂСѓРєС‚СѓСЂРѕР№, С„РѕСЂРјР°РјРё Рё Р°РЅР°Р»РёС‚РёРєРѕР№.",
        deliverables: [
          "РљР°СЂС‚Р° СЃР°Р№С‚Р°, РїСЂРѕС‚РѕС‚РёРїС‹ Рё СЃС‚СЂСѓРєС‚СѓСЂР° РєРѕРЅС‚РµРЅС‚Р°",
          "РђРґР°РїС‚РёРІРЅС‹Р№ РґРёР·Р°Р№РЅ Рё С„СЂРѕРЅС‚РµРЅРґ-СЂРµР°Р»РёР·Р°С†РёСЏ",
          "РџРѕРґРєР»СЋС‡РµРЅРёРµ Р°РЅР°Р»РёС‚РёРєРё, С„РѕСЂРј Рё Р»РѕРіРёРєРё СЃР±РѕСЂР° Р·Р°СЏРІРѕРє",
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
        title: "SMM вЂ” РІРµРґРµРЅРёРµ СЃРѕС†РёР°Р»СЊРЅС‹С… СЃРµС‚РµР№",
        summary: "Р’РµРґС‘Рј СЃРѕС†СЃРµС‚Рё РєР°Рє СЃРёСЃС‚РµРјСѓ: РєРѕРЅС‚РµРЅС‚, РїСѓР±Р»РёРєР°С†РёРё, РІРѕРІР»РµС‡РµРЅРёРµ Рё СЂРѕСЃС‚ РєР°РЅР°Р»Р° РїРѕРґ Р·Р°РґР°С‡Рё Р±РёР·РЅРµСЃР°.",
        description: "РњС‹ РІС‹СЃС‚СЂР°РёРІР°РµРј SMM РЅРµ РєР°Рє С…Р°РѕС‚РёС‡РЅС‹Р№ РїРѕС‚РѕРє РїРѕСЃС‚РѕРІ, Р° РєР°Рє СЂР°Р±РѕС‡СѓСЋ СЃРёСЃС‚РµРјСѓ: РєРѕРЅС‚РµРЅС‚-РїР»Р°РЅ, РїСЂРѕРґР°РєС€РЅ, РїСѓР±Р»РёРєР°С†РёРё, РєРѕРјРјСѓРЅРёРєР°С†РёСЏ СЃ Р°СѓРґРёС‚РѕСЂРёРµР№ Рё Р°РЅР°Р»РёР· С„РѕСЂРјР°С‚РѕРІ. РљР°РЅР°Р» РЅР°С‡РёРЅР°РµС‚ РїРѕРґРґРµСЂР¶РёРІР°С‚СЊ РїСЂРѕРґР°Р¶Рё Рё РґРѕРІРµСЂРёРµ Рє Р±СЂРµРЅРґСѓ, Р° РЅРµ РїСЂРѕСЃС‚Рѕ Р·Р°РїРѕР»РЅСЏС‚СЊ Р»РµРЅС‚Сѓ.",
        deliverables: [
          "Р•Р¶РµРјРµСЃСЏС‡РЅС‹Р№ РєРѕРЅС‚РµРЅС‚-РїР»Р°РЅ РїРѕ С„РѕСЂРјР°С‚Р°Рј Рё СЂСѓР±СЂРёРєР°Рј",
          "РљРѕРѕСЂРґРёРЅР°С†РёСЏ С‚РµРєСЃС‚РѕРІ, РІРёР·СѓР°Р»Р° Рё РїСѓР±Р»РёРєР°С†РёР№",
          "РђРЅР°Р»РёС‚РёРєР° РєР°РЅР°Р»Р° Рё СЂРµРєРѕРјРµРЅРґР°С†РёРё РїРѕ СЃР»РµРґСѓСЋС‰РёРј С€Р°РіР°Рј",
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
        title: "Р Р°Р·СЂР°Р±РѕС‚РєР° СЂРµРєР»Р°РјРЅС‹С… РєСЂРµР°С‚РёРІРѕРІ",
        summary: "Р”РµР»Р°РµРј СЃС‚Р°С‚РёС‡РЅС‹Рµ Рё motion-РєСЂРµР°С‚РёРІС‹, РєРѕС‚РѕСЂС‹Рµ РїРѕРјРѕРіР°СЋС‚ Р±С‹СЃС‚СЂРѕ С‚РµСЃС‚РёСЂРѕРІР°С‚СЊ РіРёРїРѕС‚РµР·С‹ Рё СЃРЅРёР¶Р°С‚СЊ СЃС‚РѕРёРјРѕСЃС‚СЊ Р»РёРґР°.",
        description: "РџСЂРѕРґР°РєС€РЅ РєСЂРµР°С‚РёРІРѕРІ РІРєР»СЋС‡Р°РµС‚ РІРёР·СѓР°Р»СЊРЅС‹Рµ РєРѕРЅС†РµРїС†РёРё, СЂРµРєР»Р°РјРЅС‹Рµ Р·Р°С…РѕРґС‹, motion-РІР°СЂРёР°РЅС‚С‹ Рё Р°РґР°РїС‚Р°С†РёСЋ РїРѕРґ РїР»РµР№СЃРјРµРЅС‚С‹. РњС‹ СЂР°СЃСЃРјР°С‚СЂРёРІР°РµРј РєСЂРµР°С‚РёРІС‹ РєР°Рє С‡Р°СЃС‚СЊ СЃРёСЃС‚РµРјС‹ С‚РµСЃС‚РѕРІ Рё РѕРїС‚РёРјРёР·Р°С†РёРё, Р° РЅРµ РєР°Рє РѕС‚РґРµР»СЊРЅСѓСЋ РґРёР·Р°Р№РЅРµСЂСЃРєСѓСЋ Р·Р°РґР°С‡Сѓ.",
        deliverables: [
          "РљРѕРЅС†РµРїС†РёРё РґР»СЏ СЃС‚Р°С‚РёРєРё, СЃС‚РѕСЂРёСЃ Рё РєРѕСЂРѕС‚РєРёС… РІРёРґРµРѕ",
          "РђРґР°РїС‚Р°С†РёСЏ РєСЂРµР°С‚РёРІРѕРІ РїРѕРґ РїР»РѕС‰Р°РґРєРё Рё СЃРµРіРјРµРЅС‚С‹ Р°СѓРґРёС‚РѕСЂРёР№",
          "РС‚РµСЂР°С†РёРё РїРѕ CTR, CPL Рё РєР°С‡РµСЃС‚РІСѓ Р·Р°СЏРІРѕРє",
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
        title: "РљРѕРїРёСЂР°Р№С‚РёРЅРі РґР»СЏ СЃР°Р№С‚Р° Рё СЂРµРєР»Р°РјС‹",
        summary: "РџРёС€РµРј С‚РµРєСЃС‚С‹, РєРѕС‚РѕСЂС‹Рµ РїРѕРЅСЏС‚РЅРѕ РѕР±СЉСЏСЃРЅСЏСЋС‚ РїСЂРµРґР»РѕР¶РµРЅРёРµ Рё РїРѕРјРѕРіР°СЋС‚ РґРѕРІРµСЃС‚Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РґРѕ РґРµР№СЃС‚РІРёСЏ.",
        description: "РњС‹ РіРѕС‚РѕРІРёРј С‚РµРєСЃС‚С‹ РґР»СЏ СЃР°Р№С‚РѕРІ, СЂРµРєР»Р°РјС‹, Р»РµРЅРґРёРЅРіРѕРІ Рё СЃРѕРїСЂРѕРІРѕРґРёС‚РµР»СЊРЅС‹С… РјР°С‚РµСЂРёР°Р»РѕРІ С‚Р°Рє, С‡С‚РѕР±С‹ РѕРЅРё Р±С‹Р»Рё СЏСЃРЅС‹РјРё, РєРѕРјРјРµСЂС‡РµСЃРєРё СЃРёР»СЊРЅС‹РјРё Рё СЃРѕРѕС‚РІРµС‚СЃС‚РІРѕРІР°Р»Рё СЂРµР°Р»СЊРЅС‹Рј Р±РѕР»СЏРј Р°СѓРґРёС‚РѕСЂРёРё. РўРµРєСЃС‚ СЂР°Р±РѕС‚Р°РµС‚ РЅР° Р·Р°РґР°С‡Сѓ, Р° РЅРµ РїСЂРѕСЃС‚Рѕ Р·Р°РїРѕР»РЅСЏРµС‚ Р±Р»РѕРє.",
        deliverables: [
          "РЎС‚СЂСѓРєС‚СѓСЂС‹ Рё С‚РµРєСЃС‚С‹ РґР»СЏ СЃР°Р№С‚Р° Рё Р»РµРЅРґРёРЅРіРѕРІ",
          "Р РµРєР»Р°РјРЅС‹Рµ С‚РµРєСЃС‚С‹, Р·Р°С…РѕРґС‹ Рё CTA-РІР°СЂРёР°РЅС‚С‹",
          "Р•РґРёРЅР°СЏ С‚РѕРЅР°Р»СЊРЅРѕСЃС‚СЊ Рё СЃРјС‹СЃР» РІРѕ РІСЃРµС… РєР»СЋС‡РµРІС‹С… РјР°С‚РµСЂРёР°Р»Р°С…",
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
        title: "РќР°СЃС‚СЂРѕР№РєР° Р°РЅР°Р»РёС‚РёРєРё",
        summary: "Настраиваем события, цели и отчеты так, чтобы маркетинг опирался на реальные данные о конверсиях.",
        description: "РњС‹ РЅР°СЃС‚СЂР°РёРІР°РµРј СЃРѕР±С‹С‚РёСЏ, С†РµР»Рё, С‚РµРіРё Рё РѕС‚С‡С‘С‚РЅС‹Рµ РїСЂРµРґСЃС‚Р°РІР»РµРЅРёСЏ РІ Google Analytics Рё РЇРЅРґРµРєСЃ РњРµС‚СЂРёРєРµ, С‡С‚РѕР±С‹ РІС‹ РјРѕРіР»Рё РєРѕСЂСЂРµРєС‚РЅРѕ РѕС†РµРЅРёРІР°С‚СЊ РєР°РЅР°Р»С‹ Рё СЂРµРєР»Р°РјРЅС‹Рµ РєР°РјРїР°РЅРёРё. Р‘РµР· СЌС‚РѕРіРѕ РјР°СЃС€С‚Р°Р±РёСЂРѕРІР°РЅРёРµ Р±СЋРґР¶РµС‚Р° СЃС‚СЂРѕРёС‚СЃСЏ РЅР° РґРѕРіР°РґРєР°С…, Р° РЅРµ РЅР° С„Р°РєС‚Р°С….",
        deliverables: [
          "РљР°СЂС‚Р° СЃРѕР±С‹С‚РёР№ Рё РЅР°СЃС‚СЂРѕР№РєР° С†РµР»РµР№ РїРѕРґ РєР»СЋС‡РµРІС‹Рµ РґРµР№СЃС‚РІРёСЏ",
          "РљРѕРЅС„РёРіСѓСЂР°С†РёСЏ tag manager Рё РїСЂРѕРІРµСЂРєР° РєРѕСЂСЂРµРєС‚РЅРѕСЃС‚Рё РґР°РЅРЅС‹С…",
          "РћС‚С‡С‘С‚С‹ РїРѕ С‚СЂР°С„РёРєСѓ, Р»РёРґР°Рј Рё РєРѕРЅРІРµСЂСЃРёРѕРЅРЅС‹Рј РїСѓС‚СЏРј",
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
        title: "Email-РјР°СЂРєРµС‚РёРЅРі",
        summary: "Р’С‹СЃС‚СЂР°РёРІР°РµРј С†РµРїРѕС‡РєРё РїРёСЃРµРј Рё СЂР°СЃСЃС‹Р»РєРё РґР»СЏ РїСЂРѕРіСЂРµРІР°, СѓРґРµСЂР¶Р°РЅРёСЏ Рё РїРѕРІС‚РѕСЂРЅС‹С… РїСЂРѕРґР°Р¶.",
        description: "РњС‹ РЅР°СЃС‚СЂР°РёРІР°РµРј email-С†РµРїРѕС‡РєРё, СЂРµРіСѓР»СЏСЂРЅС‹Рµ СЂР°СЃСЃС‹Р»РєРё Рё Р°РІС‚РѕРјР°С‚РёР·Р°С†РёРё РґР»СЏ РїСЂРѕРіСЂРµРІР° Р»РёРґРѕРІ, СѓРґРµСЂР¶Р°РЅРёСЏ РєР»РёРµРЅС‚РѕРІ Рё РІРѕР·РІСЂР°С‚Р° Рє РїРѕРІС‚РѕСЂРЅРѕР№ РїРѕРєСѓРїРєРµ. Р Р°Р±РѕС‚Р° РІРєР»СЋС‡Р°РµС‚ СЃРµРіРјРµРЅС‚Р°С†РёСЋ, Р»РѕРіРёРєСѓ РєРѕРЅС‚РµРЅС‚Р°, С‚Р°Р№РјРёРЅРі Рё РѕС†РµРЅРєСѓ СЌС„С„РµРєС‚РёРІРЅРѕСЃС‚Рё.",
        deliverables: [
          "Welcome-, nurture- Рё РїСЂРѕРјРѕ-С†РµРїРѕС‡РєРё РїРёСЃРµРј",
          "РЎРµРіРјРµРЅС‚Р°С†РёСЏ Р±Р°Р·С‹ Рё Р»РѕРіРёРєР° РєРѕРЅС‚РµРЅС‚Р° РїРѕРґ СЃС†РµРЅР°СЂРёРё",
          "РћС‚СЃР»РµР¶РёРІР°РЅРёРµ РѕС‚РєСЂС‹С‚РёР№, РєР»РёРєРѕРІ Рё С†РµР»РµРІС‹С… РґРµР№СЃС‚РІРёР№",
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
        title: "Р РµРґРёР·Р°Р№РЅ СЃР°Р№С‚Р°",
        summary: "РћР±РЅРѕРІР»СЏРµРј СЃР°Р№С‚ С‚Р°Рє, С‡С‚РѕР±С‹ РѕРЅ Р»СѓС‡С€Рµ РїСЂРѕРґР°РІР°Р», Р° РЅРµ РїСЂРѕСЃС‚Рѕ РІС‹РіР»СЏРґРµР» СЃРѕРІСЂРµРјРµРЅРЅРµРµ.",
        description: "РњС‹ РїРµСЂРµСЃРѕР±РёСЂР°РµРј СЃС‚СЂСѓРєС‚СѓСЂСѓ, РІРёР·СѓР°Р»СЊРЅСѓСЋ РїРѕРґР°С‡Сѓ Рё РёРµСЂР°СЂС…РёСЋ СЃР°Р№С‚Р° РЅР° РѕСЃРЅРѕРІРµ Р·Р°РґР°С‡ Р±РёР·РЅРµСЃР° Рё СЃС†РµРЅР°СЂРёРµРІ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ. Р РµРґРёР·Р°Р№РЅ СѓР±РёСЂР°РµС‚ СЃР»Р°Р±С‹Рµ Р±Р»РѕРєРё, СЃРЅРёР¶Р°РµС‚ С‚СЂРµРЅРёРµ Рё РґРµР»Р°РµС‚ РєРѕРјРјСѓРЅРёРєР°С†РёСЋ РїРѕРЅСЏС‚РЅРµРµ Рё СѓР±РµРґРёС‚РµР»СЊРЅРµРµ.",
        deliverables: [
          "РђСѓРґРёС‚ С‚РµРєСѓС‰РёС… СЃС‚СЂР°РЅРёС† Рё РїСЂРѕР±Р»РµРјРЅС‹С… Р·РѕРЅ",
          "РќРѕРІС‹Рµ СЃС‚СЂСѓРєС‚СѓСЂС‹ СЌРєСЂР°РЅРѕРІ Рё РѕР±РЅРѕРІР»С‘РЅРЅР°СЏ РІРёР·СѓР°Р»СЊРЅР°СЏ СЃРёСЃС‚РµРјР°",
          "РЎРїРµС†РёС„РёРєР°С†РёСЏ РґР»СЏ РІРЅРµРґСЂРµРЅРёСЏ РёР»Рё РіРѕС‚РѕРІР°СЏ СЂРµР°Р»РёР·Р°С†РёСЏ",
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
        title: "UX/UI-РґРёР·Р°Р№РЅ",
        summary: "Проектируем интерфейсы вокруг задач пользователя, понятной структуры и сценариев конверсии.",
        description: "UX/UI-РґРёР·Р°Р№РЅ РІРєР»СЋС‡Р°РµС‚ Р°СЂС…РёС‚РµРєС‚СѓСЂСѓ РёРЅС„РѕСЂРјР°С†РёРё, РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёРµ СЃС†РµРЅР°СЂРёРё, РїСЂРѕС‚РѕС‚РёРїС‹ Рё С„РёРЅР°Р»СЊРЅСѓСЋ РІРёР·СѓР°Р»СЊРЅСѓСЋ СЃРёСЃС‚РµРјСѓ. РњС‹ РїСЂРёРЅРёРјР°РµРј РґРёР·Р°Р№РЅРµСЂСЃРєРёРµ СЂРµС€РµРЅРёСЏ РЅРµ РІ РѕС‚СЂС‹РІРµ РѕС‚ Р±РёР·РЅРµСЃР°, Р° РёСЃС…РѕРґСЏ РёР· С‚РѕРіРѕ, С‡С‚Рѕ РґРѕР»Р¶РЅРѕ СЃС‚Р°С‚СЊ РїСЂРѕС‰Рµ, РїРѕРЅСЏС‚РЅРµРµ Рё РєРѕРЅРІРµСЂСЃРёРѕРЅРЅРµРµ.",
        deliverables: [
          "РџРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёРµ СЃС†РµРЅР°СЂРёРё, wireframes Рё СЃС‚СЂСѓРєС‚СѓСЂР° РєРѕРЅС‚РµРЅС‚Р°",
          "UI kit Рё РјР°РєРµС‚С‹ РєР»СЋС‡РµРІС‹С… СЌРєСЂР°РЅРѕРІ",
          "РђРґР°РїС‚РёРІРЅС‹Рµ РґРёР·Р°Р№РЅ-С„Р°Р№Р»С‹, РіРѕС‚РѕРІС‹Рµ Рє СЂР°Р·СЂР°Р±РѕС‚РєРµ",
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
        title: "A/B-С‚РµСЃС‚РёСЂРѕРІР°РЅРёРµ СЂРµРєР»Р°РјС‹ Рё РїРѕСЃР°РґРѕС‡РЅС‹С… СЃС‚СЂР°РЅРёС†",
        summary: "Проводим A/B-тесты рекламы и посадочных страниц, чтобы улучшать конверсию на основе фактов.",
        description: "РњС‹ СЃРѕР±РёСЂР°РµРј backlog РіРёРїРѕС‚РµР·, РѕРїСЂРµРґРµР»СЏРµРј РјРµС‚СЂРёРєСѓ СѓСЃРїРµС…Р° Рё Р·Р°РїСѓСЃРєР°РµРј СЃС‚СЂСѓРєС‚СѓСЂРёСЂРѕРІР°РЅРЅС‹Рµ С‚РµСЃС‚С‹ РґР»СЏ РїРѕСЃР°РґРѕС‡РЅС‹С… СЃС‚СЂР°РЅРёС†, РѕС„С„РµСЂРѕРІ, СЂРµРєР»Р°РјРЅС‹С… РєСЂРµР°С‚РёРІРѕРІ Рё CTA-Р±Р»РѕРєРѕРІ. Р­С‚Рѕ РїРѕРјРѕРіР°РµС‚ Р±С‹СЃС‚СЂРµРµ РїРѕРЅРёРјР°С‚СЊ, С‡С‚Рѕ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ СѓР»СѓС‡С€Р°РµС‚ СЂРµР·СѓР»СЊС‚Р°С‚.",
        deliverables: [
          "РЎРїРёСЃРѕРє РіРёРїРѕС‚РµР· СЃ РїСЂРёРѕСЂРёС‚РµС‚РѕРј Рё РѕР¶РёРґР°РµРјС‹Рј СЌС„С„РµРєС‚РѕРј",
          "РќР°СЃС‚СЂРѕР№РєР° С‚РµСЃС‚Р° Рё РєСЂРёС‚РµСЂРёРё РѕС†РµРЅРєРё СЂРµР·СѓР»СЊС‚Р°С‚Р°",
          "Р’С‹РІРѕРґС‹ РїРѕ С‚РµСЃС‚Р°Рј Рё СЂРµРєРѕРјРµРЅРґР°С†РёРё Рє РјР°СЃС€С‚Р°Р±РёСЂРѕРІР°РЅРёСЋ",
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
        title: "РџСЂРѕРґРІРёР¶РµРЅРёРµ РЅР° РјР°СЂРєРµС‚РїР»РµР№СЃР°С…",
        summary: "РЈР»СѓС‡С€Р°РµРј РІРёРґРёРјРѕСЃС‚СЊ РєР°СЂС‚РѕС‡РµРє Рё РєРѕРЅРІРµСЂСЃРёСЋ РІРЅСѓС‚СЂРё РјР°СЂРєРµС‚РїР»РµР№СЃРѕРІ Р·Р° СЃС‡С‘С‚ РєРѕРЅС‚РµРЅС‚Р° Рё СЃС‚СЂСѓРєС‚СѓСЂС‹.",
        description: "РњС‹ СЂР°Р±РѕС‚Р°РµРј СЃ РєР°СЂС‚РѕС‡РєР°РјРё С‚РѕРІР°СЂР°, РІРёР·СѓР°Р»РѕРј, С‚РµРєСЃС‚Р°РјРё, РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµРј Рё РѕРїРµСЂР°С†РёРѕРЅРЅС‹РјРё С‚РѕС‡РєР°РјРё СЂРѕСЃС‚Р° РІРЅСѓС‚СЂРё РјР°СЂРєРµС‚РїР»РµР№СЃРѕРІ. Р—Р°РґР°С‡Р° вЂ” РїРѕРґРЅСЏС‚СЊ РІРёРґРёРјРѕСЃС‚СЊ РІ РІС‹РґР°С‡Рµ Рё СѓРІРµР»РёС‡РёС‚СЊ РєРѕРЅРІРµСЂСЃРёСЋ РѕС‚ РїСЂРѕСЃРјРѕС‚СЂР° РєР°СЂС‚РѕС‡РєРё РґРѕ РїРѕРєСѓРїРєРё.",
        deliverables: [
          "РђСѓРґРёС‚ РєР°СЂС‚РѕС‡РµРє Рё РїР»Р°РЅ РѕРїС‚РёРјРёР·Р°С†РёРё",
          "Р”РѕСЂР°Р±РѕС‚РєР° РЅР°Р·РІР°РЅРёР№, РІРёР·СѓР°Р»Р° Рё РїСЂРѕРґСѓРєС‚РѕРІРѕРіРѕ РєРѕРЅС‚РµРЅС‚Р°",
          "Р РµРєРѕРјРµРЅРґР°С†РёРё РїРѕ СЂРѕСЃС‚Сѓ С‚СЂР°С„РёРєР° Рё РєРѕРЅРІРµСЂСЃРёРё",
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
        title: "РЎРѕР·РґР°РЅРёРµ РёРЅС‚РµСЂРЅРµС‚-РјР°РіР°Р·РёРЅР°",
        summary: "Р Р°Р·СЂР°Р±Р°С‚С‹РІР°РµРј РёРЅС‚РµСЂРЅРµС‚-РјР°РіР°Р·РёРЅС‹ СЃ СЃРёР»СЊРЅРѕР№ РїРѕРґР°С‡РµР№ С‚РѕРІР°СЂР°, СѓРґРѕР±РЅРѕР№ РїРѕРєСѓРїРєРѕР№ Рё РІСЃС‚СЂРѕРµРЅРЅРѕР№ Р°РЅР°Р»РёС‚РёРєРѕР№.",
        description: "РњС‹ СЃРѕР·РґР°С‘Рј e-commerce СЃР°Р№С‚С‹, РіРґРµ РІР°Р¶РЅС‹ Рё СЃС‚СЂСѓРєС‚СѓСЂР° РєР°С‚Р°Р»РѕРіР°, Рё РєР°СЂС‚РѕС‡РєРё С‚РѕРІР°СЂР°, Рё Р»РѕРіРёРєР° РѕС„РѕСЂРјР»РµРЅРёСЏ Р·Р°РєР°Р·Р°. РњР°РіР°Р·РёРЅ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ СѓРґРѕР±РµРЅ РїРѕРєСѓРїР°С‚РµР»СЋ, РїСЂРѕР·СЂР°С‡РµРЅ РґР»СЏ РєРѕРјР°РЅРґС‹ Рё РіРѕС‚РѕРІ Рє РїСЂРѕРґРІРёР¶РµРЅРёСЋ СЃ РїРµСЂРІРѕРіРѕ РґРЅСЏ.",
        deliverables: [
          "РђСЂС…РёС‚РµРєС‚СѓСЂР° РєР°С‚Р°Р»РѕРіР° Рё СЃС†РµРЅР°СЂРёР№ РѕС„РѕСЂРјР»РµРЅРёСЏ Р·Р°РєР°Р·Р°",
          "РђРґР°РїС‚РёРІРЅС‹Р№ storefront Рё РґРёР·Р°Р№РЅ РєР°СЂС‚РѕС‡РµРє С‚РѕРІР°СЂР°",
          "Р‘Р°Р·РѕРІС‹Рµ РёРЅС‚РµРіСЂР°С†РёРё РґР»СЏ Р·Р°РєР°Р·РѕРІ, РѕРїР»Р°С‚С‹ Рё Р°РЅР°Р»РёС‚РёРєРё",
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
        title: "Influencer-СЂРµРєР»Р°РјР°",
        summary: "РџРѕРґР±РёСЂР°РµРј Р±Р»РѕРіРµСЂРѕРІ Рё РІС‹СЃС‚СЂР°РёРІР°РµРј РёРЅС‚РµРіСЂР°С†РёРё РїРѕРґ Р°СѓРґРёС‚РѕСЂРёСЋ, С„РѕСЂРјР°С‚ Рё Р·Р°РґР°С‡Сѓ РєР°РјРїР°РЅРёРё.",
        description: "РњС‹ РїРѕРґР±РёСЂР°РµРј СЂРµР»РµРІР°РЅС‚РЅС‹С… Р±Р»РѕРіРµСЂРѕРІ, РїСЂРѕРІРµСЂСЏРµРј Р°СѓРґРёС‚РѕСЂРёСЋ, СЃРѕРіР»Р°СЃРѕРІС‹РІР°РµРј С„РѕСЂРјР°С‚ СЂР°Р·РјРµС‰РµРЅРёСЏ Рё РіРѕС‚РѕРІРёРј РїРѕРЅСЏС‚РЅС‹Р№ Р±СЂРёС„. Р¦РµР»СЊ вЂ” РїСЂРµРІСЂР°С‚РёС‚СЊ РёРЅС‚РµРіСЂР°С†РёРё РІ СѓРїСЂР°РІР»СЏРµРјС‹Р№ РєР°РЅР°Р» РґРёСЃС‚СЂРёР±СѓС†РёРё, Р° РЅРµ РІ СЂР°Р·РѕРІСѓСЋ РёСЃС‚РѕСЂРёСЋ РЅР° РґРѕРІРµСЂРёРё.",
        deliverables: [
          "РџРѕРґР±РѕСЂ Р±Р»РѕРіРµСЂРѕРІ РїРѕ Р°СѓРґРёС‚РѕСЂРёРё Рё С‚РµРјР°С‚РёРєРµ",
          "Р‘СЂРёС„РёРЅРі Рё РєРѕРѕСЂРґРёРЅР°С†РёСЏ РёРЅС‚РµРіСЂР°С†РёР№",
          "Р Р°Р·Р±РѕСЂ СЂРµР·СѓР»СЊС‚Р°С‚Р° РїРѕ РѕС…РІР°С‚Сѓ, РѕС‚РєР»РёРєСѓ Рё РєР°С‡РµСЃС‚РІСѓ С‚СЂР°С„РёРєР°",
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
        title: "Р’РёРґРµРѕСЂРµРєР»Р°РјР° Рё РІРёРґРµРѕРїСЂРѕРґР°РєС€РЅ",
        summary: "Р“РѕС‚РѕРІРёРј РІРёРґРµРѕ РґР»СЏ СЂРµРєР»Р°РјС‹, СЃРѕС†СЃРµС‚РµР№ Рё РїСЂРµР·РµРЅС‚Р°С†РёРё РїСЂРѕРґСѓРєС‚Р° СЃ СѓС‡С‘С‚РѕРј С„РѕСЂРјР°С‚Р° РїР»РѕС‰Р°РґРєРё.",
        description: "РњС‹ РїСЂРѕРґСѓРјС‹РІР°РµРј СЃС†РµРЅР°СЂРёР№, РїРѕРґР°С‡Сѓ, СЂРёС‚Рј Рё С‚СЂРµР±РѕРІР°РЅРёСЏ Рє РїСЂРѕРґР°РєС€РЅСѓ РґР»СЏ СЂРµРєР»Р°РјРЅС‹С… СЂРѕР»РёРєРѕРІ, reels Рё РґСЂСѓРіРёС… РІРёРґРµРѕС„РѕСЂРјР°С‚РѕРІ. Р’ С†РµРЅС‚СЂРµ РІРЅРёРјР°РЅРёСЏ вЂ” РїРѕРЅСЏС‚РЅС‹Р№ РјРµСЃСЃРµРґР¶, Р°РєРєСѓСЂР°С‚РЅР°СЏ СѓРїР°РєРѕРІРєР° Рё Р°РґР°РїС‚Р°С†РёСЏ РїРѕРґ РїР»РѕС‰Р°РґРєРё.",
        deliverables: [
          "РљРѕРЅС†РµРїС†РёСЏ Рё СЃС†РµРЅР°СЂРёР№ РїРѕРґ РЅСѓР¶РЅС‹Р№ РІРёРґРµРѕС„РѕСЂРјР°С‚",
          "РљРѕРѕСЂРґРёРЅР°С†РёСЏ РїСЂРѕРґР°РєС€РЅР° Рё С‚СЂРµР±РѕРІР°РЅРёСЏ Рє РјР°С‚РµСЂРёР°Р»Р°Рј",
          "Р“РѕС‚РѕРІС‹Рµ РІРёРґРµРѕ, Р°РґР°РїС‚РёСЂРѕРІР°РЅРЅС‹Рµ РїРѕРґ СЂРµРєР»Р°РјСѓ Рё СЃРѕС†СЃРµС‚Рё",
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
        title: "РќР°СЃС‚СЂРѕР№РєР° CRM Рё Р°РІС‚РѕРјР°С‚РёР·Р°С†РёРё",
        summary: "РќР°СЃС‚СЂР°РёРІР°РµРј РІРѕСЂРѕРЅРєСѓ, РјР°СЂС€СЂСѓС‚РёР·Р°С†РёСЋ Р»РёРґРѕРІ Рё Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРёРµ РґРµР№СЃС‚РІРёСЏ, С‡С‚РѕР±С‹ РїСЂРѕРґР°Р¶Рё РЅРµ С‚РµСЂСЏР»Рё СЃРєРѕСЂРѕСЃС‚СЊ.",
        description: "РњС‹ РЅР°СЃС‚СЂР°РёРІР°РµРј СЌС‚Р°РїС‹ CRM, СЂР°СЃРїСЂРµРґРµР»РµРЅРёРµ Р»РёРґРѕРІ, РЅР°РїРѕРјРёРЅР°РЅРёСЏ Рё Р°РІС‚РѕРјР°С‚РёР·Р°С†РёРё С‚Р°Рє, С‡С‚РѕР±С‹ РјРµРЅРµРґР¶РµСЂС‹ РЅРµ С‚РµСЂСЏР»Рё Р·Р°СЏРІРєРё Рё РІРёРґРµР»Рё СЂРµР°Р»СЊРЅСѓСЋ РєР°СЂС‚РёРЅСѓ РїРѕ РІРѕСЂРѕРЅРєРµ. РљРѕРЅС„РёРіСѓСЂР°С†РёСЏ СЃС‚СЂРѕРёС‚СЃСЏ РїРѕРґ С„Р°РєС‚РёС‡РµСЃРєРёР№ РїСЂРѕС†РµСЃСЃ РєРѕРјР°РЅРґС‹, Р° РЅРµ РїРѕРґ Р°Р±СЃС‚СЂР°РєС‚РЅС‹Р№ С€Р°Р±Р»РѕРЅ.",
        deliverables: [
          "РЎС‚СЂСѓРєС‚СѓСЂР° РІРѕСЂРѕРЅРєРё Рё Р»РѕРіРёРєР° СЃС‚Р°С‚СѓСЃРѕРІ",
          "РђРІС‚РѕРјР°С‚РёР·Р°С†РёСЏ СЂР°СЃРїСЂРµРґРµР»РµРЅРёСЏ, РЅР°РїРѕРјРёРЅР°РЅРёР№ Рё follow-up",
          "РћС‚С‡С‘С‚РЅРѕСЃС‚СЊ РїРѕ РѕР±СЂР°Р±РѕС‚РєРµ Р»РёРґРѕРІ Рё СЂР°Р±РѕС‚Рµ РєРѕРјР°РЅРґС‹",
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
        title: "Р›РѕРєР°Р»СЊРЅРѕРµ SEO",
        summary: "РџРѕРІС‹С€Р°РµРј РІРёРґРёРјРѕСЃС‚СЊ РєРѕРјРїР°РЅРёРё РІ РєР°СЂС‚Р°С… Рё Р»РѕРєР°Р»СЊРЅРѕР№ РІС‹РґР°С‡Рµ РґР»СЏ СЃРїСЂРѕСЃР° СЂСЏРґРѕРј СЃ С‚РѕС‡РєРѕР№ РїСЂРѕРґР°Р¶.",
        description: "РњС‹ СЂР°Р±РѕС‚Р°РµРј СЃ Р±РёР·РЅРµСЃ-РїСЂРѕС„РёР»СЏРјРё, Р»РѕРєР°Р»СЊРЅС‹РјРё РїРѕСЃР°РґРѕС‡РЅС‹РјРё СЃС‚СЂР°РЅРёС†Р°РјРё, РѕС‚Р·С‹РІР°РјРё Рё РіРµРѕСЃРёРіРЅР°Р»Р°РјРё, С‡С‚РѕР±С‹ РєРѕРјРїР°РЅРёСЋ Р±С‹Р»Рѕ РїСЂРѕС‰Рµ РЅР°С…РѕРґРёС‚СЊ РІ РєР°СЂС‚Р°С… Рё Р»РѕРєР°Р»СЊРЅС‹С… РїРѕРёСЃРєРѕРІС‹С… Р·Р°РїСЂРѕСЃР°С….",
        deliverables: [
          "РћРїС‚РёРјРёР·Р°С†РёСЏ Р±РёР·РЅРµСЃ-РїСЂРѕС„РёР»СЏ Рё РѕР±РЅРѕРІР»РµРЅРёРµ РєРѕРЅС‚РµРЅС‚Р°",
          "Р РµРєРѕРјРµРЅРґР°С†РёРё РїРѕ Р»РѕРєР°Р»СЊРЅС‹Рј РїРѕСЃР°РґРѕС‡РЅС‹Рј СЃС‚СЂР°РЅРёС†Р°Рј",
          "Р§РµРє-Р»РёСЃС‚ РїРѕ СЂРѕСЃС‚Сѓ РѕС‚Р·С‹РІРѕРІ Рё Р»РѕРєР°Р»СЊРЅРѕР№ РІРёРґРёРјРѕСЃС‚Рё",
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
        title: "Р Р°Р·СЂР°Р±РѕС‚РєР° Р»РѕРіРѕС‚РёРїР°",
        summary: "РЎРѕР·РґР°С‘Рј Р»РѕРіРѕС‚РёРї, РєРѕС‚РѕСЂС‹Р№ СЂР°Р±РѕС‚Р°РµС‚ РЅР° РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ Рё РЅРѕСЂРјР°Р»СЊРЅРѕ Р¶РёРІС‘С‚ РІ СЂРµР°Р»СЊРЅС‹С… РЅРѕСЃРёС‚РµР»СЏС….",
        description: "РњС‹ СЂР°Р·СЂР°Р±Р°С‚С‹РІР°РµРј Р»РѕРіРѕС‚РёРї СЃ СѓС‡С‘С‚РѕРј СѓР·РЅР°РІР°РµРјРѕСЃС‚Рё, С‡РёС‚Р°РµРјРѕСЃС‚Рё Рё С‚РѕРіРѕ, РєР°Рє Р·РЅР°Рє Р±СѓРґРµС‚ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊСЃСЏ РІ digital Рё РѕС„Р»Р°Р№РЅ-СЃСЂРµРґРµ. Р­С‚Рѕ РЅРµ РїСЂРѕСЃС‚Рѕ РєСЂР°СЃРёРІР°СЏ С„РѕСЂРјР°, Р° С‡Р°СЃС‚СЊ Р±СѓРґСѓС‰РµР№ РІРёР·СѓР°Р»СЊРЅРѕР№ СЃРёСЃС‚РµРјС‹ Р±СЂРµРЅРґР°.",
        deliverables: [
          "РќРµСЃРєРѕР»СЊРєРѕ РєРѕРЅС†РµРїС‚СѓР°Р»СЊРЅС‹С… РЅР°РїСЂР°РІР»РµРЅРёР№ СЃ Р°СЂРіСѓРјРµРЅС‚Р°С†РёРµР№",
          "Р¤РёРЅР°Р»СЊРЅС‹Рµ РІРµСЂСЃРёРё Р»РѕРіРѕС‚РёРїР° РїРѕРґ РєР»СЋС‡РµРІС‹Рµ СЃС†РµРЅР°СЂРёРё",
          "Р‘Р°Р·РѕРІС‹Рµ РїСЂР°РІРёР»Р° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ Рё РїР°РєРµС‚ РёСЃС…РѕРґРЅРёРєРѕРІ",
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
        title: "Р Р°Р·СЂР°Р±РѕС‚РєР° С„РёСЂРјРµРЅРЅРѕРіРѕ СЃС‚РёР»СЏ",
        summary: "РЎРѕР±РёСЂР°РµРј РІРёР·СѓР°Р»СЊРЅСѓСЋ СЃРёСЃС‚РµРјСѓ Р±СЂРµРЅРґР°, С‡С‚РѕР±С‹ РєРѕРјРјСѓРЅРёРєР°С†РёСЏ Р±С‹Р»Р° С†РµР»РѕСЃС‚РЅРѕР№ Рё СѓР·РЅР°РІР°РµРјРѕР№ РІРѕ РІСЃРµС… РєР°РЅР°Р»Р°С….",
        description: "Р¤РёСЂРјРµРЅРЅС‹Р№ СЃС‚РёР»СЊ РІРєР»СЋС‡Р°РµС‚ С‚РёРїРѕРіСЂР°С„РёРєСѓ, С†РІРµС‚РѕРІС‹Рµ РїСЂРёРЅС†РёРїС‹, РєРѕРјРїРѕР·РёС†РёРѕРЅРЅС‹Рµ РїСЂР°РІРёР»Р°, РіСЂР°С„РёС‡РµСЃРєРёРµ СЌР»РµРјРµРЅС‚С‹ Рё РїСЂРёРјРµСЂС‹ РїСЂРёРјРµРЅРµРЅРёСЏ. РќР° РІС‹С…РѕРґРµ РєРѕРјР°РЅРґР° РїРѕР»СѓС‡Р°РµС‚ РЅРµ РЅР°Р±РѕСЂ РєР°СЂС‚РёРЅРѕРє, Р° СЂР°Р±РѕС‡СѓСЋ СЃРёСЃС‚РµРјСѓ, РєРѕС‚РѕСЂСѓСЋ РјРѕР¶РЅРѕ РјР°СЃС€С‚Р°Р±РёСЂРѕРІР°С‚СЊ.",
        deliverables: [
          "Р’РёР·СѓР°Р»СЊРЅРѕРµ РЅР°РїСЂР°РІР»РµРЅРёРµ Рё РїРѕРґР±РѕСЂ moodboard",
          "РџСЂР°РІРёР»Р° С‚РёРїРѕРіСЂР°С„РёРєРё, С†РІРµС‚Р° Рё РіСЂР°С„РёРєРё",
          "РџСЂРёРјРµСЂС‹ РїСЂРёРјРµРЅРµРЅРёСЏ РЅР° РєР»СЋС‡РµРІС‹С… РЅРѕСЃРёС‚РµР»СЏС…",
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
        title: "PR-СЂР°Р·РјРµС‰РµРЅРёРµ РІ РЎРњР",
        summary: "РЈРїР°РєРѕРІС‹РІР°РµРј РёРЅС„РѕРїРѕРІРѕРґС‹ Рё РјР°С‚РµСЂРёР°Р»С‹ РґР»СЏ РїСѓР±Р»РёРєР°С†РёР№, РєРѕС‚РѕСЂС‹Рµ СЂР°Р±РѕС‚Р°СЋС‚ РЅР° РґРѕРІРµСЂРёРµ Рё СѓР·РЅР°РІР°РµРјРѕСЃС‚СЊ.",
        description: "РњС‹ С„РѕСЂРјРёСЂСѓРµРј С‚РµРјС‹, РіРѕС‚РѕРІРёРј С‚РµРєСЃС‚С‹ Рё Р°РґР°РїС‚РёСЂСѓРµРј РёСЃС‚РѕСЂРёРё РїРѕРґ СЂР°Р·РјРµС‰РµРЅРёРµ РІ РјРµРґРёР° РёР»Рё РїР°СЂС‚РЅС‘СЂСЃРєРёС… РєР°РЅР°Р»Р°С…. Р’Р°Р¶РЅРѕ РЅРµ РїСЂРѕСЃС‚Рѕ РІС‹Р№С‚Рё СЃ РїСѓР±Р»РёРєР°С†РёРµР№, Р° СЃРІСЏР·Р°С‚СЊ РµС‘ СЃ СЂРµР°Р»СЊРЅРѕР№ РєРѕРјРјСѓРЅРёРєР°С†РёРѕРЅРЅРѕР№ Р·Р°РґР°С‡РµР№ Р±СЂРµРЅРґР°.",
        deliverables: [
          "РўРµРјС‹ Рё РїРѕРґР°С‡Р° РјР°С‚РµСЂРёР°Р»РѕРІ РґР»СЏ РїСѓР±Р»РёРєР°С†РёР№",
          "РўРµРєСЃС‚С‹ Рё СЃРѕРїСЂРѕРІРѕРґРёС‚РµР»СЊРЅС‹Рµ РјР°С‚РµСЂРёР°Р»С‹",
          "РџР»Р°РЅ СЂР°Р·РјРµС‰РµРЅРёР№ РїРѕРґ Р°СѓРґРёС‚РѕСЂРёСЋ Рё С†РµР»СЊ РєРѕРјРјСѓРЅРёРєР°С†РёРё",
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
        title: "Р‘СЂРµРЅРґР±СѓРє",
        summary: "Р”РѕРєСѓРјРµРЅС‚РёСЂСѓРµРј РїСЂР°РІРёР»Р° Р±СЂРµРЅРґР° С‚Р°Рє, С‡С‚РѕР±С‹ РёРјРё СЂРµР°Р»СЊРЅРѕ РјРѕРіР»Р° РїРѕР»СЊР·РѕРІР°С‚СЊСЃСЏ РєРѕРјР°РЅРґР° Рё РїРѕРґСЂСЏРґС‡РёРєРё.",
        description: "РњС‹ СЃРѕР±РёСЂР°РµРј Р±СЂРµРЅРґР±СѓРє РєР°Рє СЂР°Р±РѕС‡РµРµ СЂСѓРєРѕРІРѕРґСЃС‚РІРѕ: РїСЂР°РІРёР»Р° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ Р»РѕРіРѕС‚РёРїР°, С†РІРµС‚Р°, С‚РёРїРѕРіСЂР°С„РёРєРё, РєРѕРјРїРѕР·РёС†РёРё Рё С‚РёРїРѕРІС‹С… РЅРѕСЃРёС‚РµР»РµР№. Р­С‚Рѕ РїРѕРјРѕРіР°РµС‚ СѓРґРµСЂР¶РёРІР°С‚СЊ С†РµР»РѕСЃС‚РЅРѕСЃС‚СЊ Р±СЂРµРЅРґР° РІ РµР¶РµРґРЅРµРІРЅРѕР№ СЂР°Р±РѕС‚Рµ.",
        deliverables: [
          "РџСЂР°РІРёР»Р° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ Р»РѕРіРѕС‚РёРїР°, С†РІРµС‚Р° Рё С€СЂРёС„С‚РѕРІ",
          "РџСЂРёРјРµСЂС‹ РєРѕСЂСЂРµРєС‚РЅРѕРіРѕ Рё РЅРµРєРѕСЂСЂРµРєС‚РЅРѕРіРѕ РїСЂРёРјРµРЅРµРЅРёСЏ",
          "РЎС‚СЂСѓРєС‚СѓСЂРёСЂРѕРІР°РЅРЅС‹Р№ РґРѕРєСѓРјРµРЅС‚ РґР»СЏ РєРѕРјР°РЅРґС‹ Рё РїРѕРґСЂСЏРґС‡РёРєРѕРІ",
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
        title: "РњР°СЂРєРµС‚РёРЅРіРѕРІС‹Рµ РёСЃСЃР»РµРґРѕРІР°РЅРёСЏ",
        summary: "Исследуем аудиторию, рынок и конкурентов, чтобы стратегия опиралась на факты, а не на предположения.",
        description: "РњС‹ РїСЂРѕРІРѕРґРёРј РїСЂРёРєР»Р°РґРЅС‹Рµ РёСЃСЃР»РµРґРѕРІР°РЅРёСЏ РїРѕ СЃРµРіРјРµРЅС‚Р°Рј РєР»РёРµРЅС‚РѕРІ, РїСЂРµРґР»РѕР¶РµРЅРёСЏРј РЅР° СЂС‹РЅРєРµ, РїР°С‚С‚РµСЂРЅР°Рј РєРѕРјРјСѓРЅРёРєР°С†РёРё Рё РїРѕРІРµРґРµРЅРёСЋ РєРѕРЅРєСѓСЂРµРЅС‚РѕРІ. Р РµР·СѓР»СЊС‚Р°С‚ вЂ” Р±Р°Р·Р° РґР»СЏ Р±РѕР»РµРµ С‚РѕС‡РЅС‹С… СЂРµС€РµРЅРёР№ РїРѕ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёСЋ, СЂРµРєР»Р°РјРµ Рё РїСЂРѕРґСѓРєС‚РѕРІРѕР№ РїРѕРґР°С‡Рµ.",
        deliverables: [
          "РСЃСЃР»РµРґРѕРІР°С‚РµР»СЊСЃРєР°СЏ СЂР°РјРєР° РїРѕРґ РєРѕРЅРєСЂРµС‚РЅС‹Р№ Р±РёР·РЅРµСЃ-РІРѕРїСЂРѕСЃ",
          "Р’С‹Р¶РёРјРєР° РїРѕ РєРѕРЅРєСѓСЂРµРЅС‚Р°Рј Рё Р°СѓРґРёС‚РѕСЂРёРё",
          "РЎС‚СЂР°С‚РµРіРёС‡РµСЃРєРёРµ СЂРµРєРѕРјРµРЅРґР°С†РёРё РїРѕ РёС‚РѕРіР°Рј Р°РЅР°Р»РёР·Р°",
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
        title: "Р¤РѕС‚РѕСЃСЉС‘РјРєР° РґР»СЏ Р±РёР·РЅРµСЃР°",
        summary: "Р“РѕС‚РѕРІРёРј С„РѕС‚Рѕ-РєРѕРЅС‚РµРЅС‚ РґР»СЏ СЃР°Р№С‚Р°, СЂРµРєР»Р°РјС‹ Рё Р±СЂРµРЅРґ-РјР°С‚РµСЂРёР°Р»РѕРІ СЃ СѓС‡С‘С‚РѕРј Р·Р°РґР°С‡ РєРѕРјРјСѓРЅРёРєР°С†РёРё.",
        description: "РњС‹ РїСЂРѕРґСѓРјС‹РІР°РµРј РєРѕРЅС†РµРїС†РёСЋ, СЂРµС„РµСЂРµРЅСЃС‹ Рё С‚СЂРµР±РѕРІР°РЅРёСЏ Рє Р±РёР·РЅРµСЃ-СЃСЉС‘РјРєРµ РґР»СЏ РєРѕРјР°РЅРґС‹, РїСЂРѕРґСѓРєС‚Р° РёР»Рё Р±СЂРµРЅРґР°. Р’Р°Р¶РЅРѕ, С‡С‚РѕР±С‹ РІРёР·СѓР°Р» СЃРѕРІРїР°РґР°Р» СЃРѕ СЃС‚РёР»РµРј РєРѕРјРјСѓРЅРёРєР°С†РёРё Рё Р±С‹Р» РїСЂРёРіРѕРґРµРЅ РґР»СЏ СЂРµР°Р»СЊРЅС‹С… РєР°РЅР°Р»РѕРІ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ.",
        deliverables: [
          "Shot list Рё РЅР°Р±РѕСЂ СЂРµС„РµСЂРµРЅСЃРѕРІ Рє СЃСЉС‘РјРєРµ",
          "Р РµРєРѕРјРµРЅРґР°С†РёРё РїРѕ СЃС†РµРЅР°Рј, СЃС‚РёР»СЋ Рё РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЋ РєР°РґСЂРѕРІ",
          "РџР°РєРµС‚ РјР°С‚РµСЂРёР°Р»РѕРІ РґР»СЏ СЃР°Р№С‚Р°, СЂРµРєР»Р°РјС‹ Рё СЃРѕС†СЃРµС‚РµР№",
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
        title: "Р Р°Р·СЂР°Р±РѕС‚РєР° РїСЂРµР·РµРЅС‚Р°С†РёР№",
        summary: "РЎРѕР±РёСЂР°РµРј РїСЂРµР·РµРЅС‚Р°С†РёРё, РєРѕС‚РѕСЂС‹Рµ РїРѕРЅСЏС‚РЅРѕ РІРµРґСѓС‚ РїРѕ СЃРјС‹СЃР»Сѓ Рё Р°РєРєСѓСЂР°С‚РЅРѕ СѓРїР°РєРѕРІС‹РІР°СЋС‚ СЃР»РѕР¶РЅСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.",
        description: "РњС‹ РґРµР»Р°РµРј РїСЂРµР·РµРЅС‚Р°С†РёРё РґР»СЏ РїСЂРѕРґР°Р¶, СЃС‚СЂР°С‚РµРіРёРё, РёРЅРІРµСЃС‚РѕСЂРѕРІ Рё РІРЅСѓС‚СЂРµРЅРЅРµР№ РєРѕРјРјСѓРЅРёРєР°С†РёРё. Р¤РѕРєСѓСЃ вЂ” РЅР° Р»РѕРіРёРєРµ РїРѕРІРµСЃС‚РІРѕРІР°РЅРёСЏ, РІРёР·СѓР°Р»СЊРЅРѕР№ РёРµСЂР°СЂС…РёРё Рё СЃРѕРѕС‚РІРµС‚СЃС‚РІРёРё С„РёСЂРјРµРЅРЅРѕРјСѓ СЃС‚РёР»СЋ Р±СЂРµРЅРґР°.",
        deliverables: [
          "РЎС‚СЂСѓРєС‚СѓСЂР° СЃР»Р°Р№РґРѕРІ Рё Р»РѕРіРёРєР° СЂР°СЃСЃРєР°Р·Р°",
          "Р’РёР·СѓР°Р»СЊРЅС‹Р№ РґРёР·Р°Р№РЅ С€Р°Р±Р»РѕРЅР° Рё С„РёРЅР°Р»СЊРЅРѕР№ РїСЂРµР·РµРЅС‚Р°С†РёРё",
          "Р”РѕСЂР°Р±РѕС‚РєР° РіСЂР°С„РёРєРѕРІ, Р°РєС†РµРЅС‚РѕРІ Рё РєР»СЋС‡РµРІС‹С… СЃРѕРѕР±С‰РµРЅРёР№",
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
          "Conversation flow and qualification СЃС†РµРЅР°СЂios",
          "Routing logic to CRM or manager touchpoints",
          "Launch support and iteration from real user behaviour",
        ],
      },
      ru: {
        title: "Р§Р°С‚-Р±РѕС‚С‹ РґР»СЏ СЃР°Р№С‚Р° Рё РјРµСЃСЃРµРЅРґР¶РµСЂРѕРІ",
        summary: "РџСЂРѕРµРєС‚РёСЂСѓРµРј РґРёР°Р»РѕРіРѕРІС‹Рµ СЃС†РµРЅР°СЂРёРё, РєРѕС‚РѕСЂС‹Рµ СЃРѕР±РёСЂР°СЋС‚ РІРІРѕРґРЅС‹Рµ, РєРІР°Р»РёС„РёС†РёСЂСѓСЋС‚ РѕР±СЂР°С‰РµРЅРёСЏ Рё СЂР°Р·РіСЂСѓР¶Р°СЋС‚ РєРѕРјР°РЅРґСѓ.",
        description: "РњС‹ РїСЂРѕРґСѓРјС‹РІР°РµРј Р»РѕРіРёРєСѓ С‡Р°С‚-Р±РѕС‚Р°, РІРѕРїСЂРѕСЃС‹ РєРІР°Р»РёС„РёРєР°С†РёРё, РјР°СЂС€СЂСѓС‚РёР·Р°С†РёСЋ Рё С‚РѕС‡РєРё РїРµСЂРµРґР°С‡Рё РјРµРЅРµРґР¶РµСЂСѓ. Р‘РѕС‚ РїРѕРјРѕРіР°РµС‚ Р±С‹СЃС‚СЂРµРµ СЃРѕР±РёСЂР°С‚СЊ СЃС‚СЂСѓРєС‚СѓСЂСѓ Р·Р°РїСЂРѕСЃР° Рё СѓСЃРєРѕСЂСЏРµС‚ РїРµСЂРІС‹Р№ РєРѕРЅС‚Р°РєС‚ СЃ РєР»РёРµРЅС‚РѕРј.",
        deliverables: [
          "РЎС†РµРЅР°СЂРёР№ РґРёР°Р»РѕРіР° Рё Р»РѕРіРёРєР° РєРІР°Р»РёС„РёРєР°С†РёРё РѕР±СЂР°С‰РµРЅРёСЏ",
          "РњР°СЂС€СЂСѓС‚РёР·Р°С†РёСЏ РґР°РЅРЅС‹С… РІ CRM РёР»Рё Рє РјРµРЅРµРґР¶РµСЂСѓ",
          "РџРѕРґРґРµСЂР¶РєР° Р·Р°РїСѓСЃРєР° Рё РґРѕСЂР°Р±РѕС‚РєРё РїРѕ РїРѕРІРµРґРµРЅРёСЋ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№",
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
        title: "Р Р°Р·СЂР°Р±РѕС‚РєР° РєРІРёР·-Р»РµРЅРґРёРЅРіРѕРІ",
        summary: "РЎРѕР·РґР°С‘Рј РёРЅС‚РµСЂР°РєС‚РёРІРЅС‹Рµ Р»РµРЅРґРёРЅРіРё, РєРѕС‚РѕСЂС‹Рµ СЃРѕР±РёСЂР°СЋС‚ РІРІРѕРґРЅС‹Рµ Рѕ РєР»РёРµРЅС‚Рµ РµС‰С‘ РґРѕ РѕС‚РїСЂР°РІРєРё Р·Р°СЏРІРєРё.",
        description: "РњС‹ РїСЂРѕРµРєС‚РёСЂСѓРµРј РєРІРёР·-РІРѕСЂРѕРЅРєРё, РіРґРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РїСЂРѕС…РѕРґРёС‚ С‡РµСЂРµР· СЃРµСЂРёСЋ РІРѕРїСЂРѕСЃРѕРІ, Р° Р±РёР·РЅРµСЃ РїРѕР»СѓС‡Р°РµС‚ СЃРµРіРјРµРЅС‚РёСЂРѕРІР°РЅРЅС‹Р№, Р±РѕР»РµРµ С‚С‘РїР»С‹Р№ Р»РёРґ Рє РјРѕРјРµРЅС‚Сѓ РѕС‚РїСЂР°РІРєРё РєРѕРЅС‚Р°РєС‚РѕРІ.",
        deliverables: [
          "Р›РѕРіРёРєР° РєРІРёР·Р° Рё РїРѕСЃР»РµРґРѕРІР°С‚РµР»СЊРЅРѕСЃС‚СЊ СЌРєСЂР°РЅРѕРІ",
          "РўРµРєСЃС‚С‹ Рё РІРёР·СѓР°Р»СЊРЅР°СЏ СЃС‚СЂСѓРєС‚СѓСЂР° РґР»СЏ РєР°Р¶РґРѕРіРѕ С€Р°РіР°",
          "РРЅС‚РµРіСЂР°С†РёСЏ С„РѕСЂРјС‹ Рё РѕС‚СЃР»РµР¶РёРІР°РЅРёРµ РѕС‚РІРµС‚РѕРІ",
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
