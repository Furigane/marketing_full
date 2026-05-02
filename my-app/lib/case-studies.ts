import type { ServiceId } from "@/lib/services";
import { getDefaultContentLocale, normalizeSiteLocale } from "@/lib/site-locales";
import {
  deepMergeTranslationValue,
  getTranslationOverrideStoreSync,
} from "@/lib/site-translation-runtime";

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
    specialistIds: ["leo-carter-performance-marketing", "mia-nolan-social-media", "lina-hayes-visual-designer", "noah-reed-project-manager"],
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
          title: "РЎРёР»СЊРїРѕ",
          category: "Р РѕР·РЅРёС‡РЅР°СЏ С‚РѕСЂРіРѕРІР»СЏ",
          description: "РљРѕРјРїР»РµРєСЃРЅРѕРµ РїСЂРѕРґРІРёР¶РµРЅРёРµ СЃРµС‚Рё СЃСѓРїРµСЂРјР°СЂРєРµС‚РѕРІ С‡РµСЂРµР· Instagram, СЂРµРєР»Р°РјСѓ Рё Р°РЅР°Р»РёС‚РёРєСѓ.",
          price: "300 EUR / РјРµСЃСЏС†",
        },
        heroBadge: "Р РѕР·РЅРёС‡РЅР°СЏ С‚РѕСЂРіРѕРІР»СЏ",
        heroHighlight: "Р РѕСЃС‚ РїСЂРѕРґР°Р¶",
        heroMetric: "Г—3.4",
        heroSubtitle: "Р·Р° 8 РјРµСЃСЏС†РµРІ СЂР°Р±РѕС‚С‹",
        heroDescription: "РњС‹ СЃРІСЏР·Р°Р»Рё РєРѕРЅС‚РµРЅС‚, РїР»Р°С‚РЅС‹Р№ С‚СЂР°С„РёРє Рё РѕС‚С‡С‘С‚РЅРѕСЃС‚СЊ РІ РѕРґРЅСѓ СЃРёСЃС‚РµРјСѓ, С‡С‚РѕР±С‹ Р±СЂРµРЅРґ РјРѕРі РјР°СЃС€С‚Р°Р±РёСЂРѕРІР°С‚СЊ СЃРїСЂРѕСЃ Р±РµР· РїРѕС‚РµСЂРё РєРѕРЅС‚СЂРѕР»СЏ РЅР°Рґ CPL Рё РїСЂРёРѕСЂРёС‚РµС‚Р°РјРё РєР°РјРїР°РЅРёР№.",
        resultItems: [
          {
            badge: "РђРЅР°Р»РёС‚РёРєР°",
            title: "РљРѕРЅС‚СЂРѕР»СЊ KPI РїРѕ РЅРµРґРµР»СЏРј",
            description: "Р¤РёРєСЃРёСЂРѕРІР°Р»Рё РѕС…РІР°С‚, СЃС‚РѕРёРјРѕСЃС‚СЊ Р»РёРґР° Рё РІРєР»Р°Рґ СЂРµРєР»Р°РјС‹ РІ РІС‹СЂСѓС‡РєСѓ, С‡С‚РѕР±С‹ СЂРµС€РµРЅРёСЏ РїРѕ Р±СЋРґР¶РµС‚Сѓ РїСЂРёРЅРёРјР°Р»РёСЃСЊ РїРѕ СѓСЃС‚РѕР№С‡РёРІРѕРјСѓ СЃРёРіРЅР°Р»Сѓ, Р° РЅРµ РїРѕ РѕС‚РґРµР»СЊРЅС‹Рј РІСЃРїР»РµСЃРєР°Рј.",
          },
          {
            badge: "РљРѕРЅС‚РµРЅС‚",
            title: "РЎС‚Р°Р±РёР»СЊРЅС‹Р№ РѕСЂРіР°РЅРёС‡РµСЃРєРёР№ РѕС…РІР°С‚",
            description: "РџРѕРЅСЏС‚РЅС‹Р№ СЂРёС‚Рј РїСѓР±Р»РёРєР°С†РёР№ Рё Р±РѕР»РµРµ СЃРёР»СЊРЅС‹Р№ РїСЂРѕРґР°РєС€РЅ РїРѕРІС‹СЃРёР»Рё СЃС‚Р°Р±РёР»СЊРЅРѕСЃС‚СЊ РєР°РЅР°Р»Р° Рё РїРѕРґРґРµСЂР¶Р°Р»Рё РґРѕРІРµСЂРёРµ Рє Р±СЂРµРЅРґСѓ РјРµР¶РґСѓ СЂРµРєР»Р°РјРЅС‹РјРё РІРѕР»РЅР°РјРё.",
          },
          {
            badge: "Р РµРєР»Р°РјР°",
            title: "Р­С„С„РµРєС‚РёРІРЅРѕСЃС‚СЊ Р±СЋРґР¶РµС‚Р°",
            description: "РЎР»Р°Р±С‹Рµ СЃРІСЏР·РєРё РѕС‚РєР»СЋС‡Р°Р»РёСЃСЊ СЂР°РЅРѕ, Р° Р°СѓРґРёС‚РѕСЂРёРё Рё РѕС„С„РµСЂС‹ СЃ РїСЂРµРґСЃРєР°Р·СѓРµРјРѕР№ РѕС‚РґР°С‡РµР№ РїРѕР»СѓС‡Р°Р»Рё Р±РѕР»СЊС€Рµ Р±СЋРґР¶РµС‚Р°.",
          },
          {
            badge: "РљРѕРјР°РЅРґР°",
            title: "РџСЂРѕР·СЂР°С‡РЅР°СЏ РѕС‚С‡С‘С‚РЅРѕСЃС‚СЊ",
            description: "РљР»РёРµРЅС‚ РІСЃРµРіРґР° РІРёРґРµР», С‡С‚Рѕ Р·Р°РїСѓС‰РµРЅРѕ, С‡С‚Рѕ РёР·РјРµРЅРёР»РѕСЃСЊ Рё РїРѕС‡РµРјСѓ РёРјРµРЅРЅРѕ С‚Р°РєРёРµ РїСЂРёРѕСЂРёС‚РµС‚С‹ РІС‹Р±СЂР°РЅС‹ РЅР° СЃР»РµРґСѓСЋС‰РёР№ СЃРїСЂРёРЅС‚.",
          },
        ],
        detailTitle: "РџРѕРґСЂРѕР±РЅРѕСЃС‚Рё РїСЂРѕРµРєС‚Р°",
        detailItems: [
          {
            title: "Р—Р°РґР°С‡Р°",
            body: "РљРѕРјРїР°РЅРёРё РЅСѓР¶РЅР° Р±С‹Р»Р° РЅРµ РїСЂРѕСЃС‚Рѕ Р°РєС‚РёРІРЅРѕСЃС‚СЊ РІ СЃРѕС†СЃРµС‚СЏС…, Р° СЂР°Р±РѕС‡Р°СЏ СЃРёСЃС‚РµРјР°, РєРѕС‚РѕСЂР°СЏ СЃРІСЏР·С‹РІР°РµС‚ СѓР·РЅР°РІР°РµРјРѕСЃС‚СЊ, С‚СЂР°С„РёРє Рё РєРѕРЅРІРµСЂСЃРёСЋ РІ РѕРґРёРЅ СѓРїСЂР°РІР»СЏРµРјС‹Р№ РїСЂРѕС†РµСЃСЃ.",
          },
          {
            title: "РџРѕРґС…РѕРґ",
            body: "РњС‹ РЅР°С‡Р°Р»Рё СЃ Р°СѓРґРёС‚Р° Рё С‡РёСЃС‚РєРё Р°РЅР°Р»РёС‚РёРєРё, Р·Р°С‚РµРј РїРµСЂРµСЃРѕР±СЂР°Р»Рё РєРѕРЅС‚РµРЅС‚-РїСЂРѕС†РµСЃСЃ Рё performance-РєР°РјРїР°РЅРёРё РІРѕРєСЂСѓРі РєРѕРЅРєСЂРµС‚РЅС‹С… РµР¶РµРЅРµРґРµР»СЊРЅС‹С… РіРёРїРѕС‚РµР·.",
          },
          {
            title: "Р РµР°Р»РёР·Р°С†РёСЏ",
            body: "РўРµСЃС‚С‹ РєСЂРµР°С‚РёРІРѕРІ, СЂР°Р±РѕС‚Р° СЃ Р°СѓРґРёС‚РѕСЂРёСЏРјРё Рё РєРѕРЅС‚РµРЅС‚-РїР»Р°РЅРёСЂРѕРІР°РЅРёРµ С€Р»Рё СЃРёРЅС…СЂРѕРЅРЅРѕ, Р° РЅРµ РєР°Рє РѕС‚РґРµР»СЊРЅС‹Рµ РЅРµСЃРІСЏР·Р°РЅРЅС‹Рµ РїРѕС‚РѕРєРё.",
          },
          {
            title: "Р РµР·СѓР»СЊС‚Р°С‚",
            body: "Р‘РёР·РЅРµСЃ РїРѕР»СѓС‡РёР» Р±РѕР»РµРµ СЃС‚Р°Р±РёР»СЊРЅС‹Р№ РїРѕС‚РѕРє Р·Р°СЏРІРѕРє, РїРѕРЅСЏС‚РЅСѓСЋ РѕС‚С‡С‘С‚РЅРѕСЃС‚СЊ Рё РїСЂРµРґСЃРєР°Р·СѓРµРјСѓСЋ СЃРІСЏР·СЊ РјРµР¶РґСѓ СЂРµРєР»Р°РјРЅС‹Рј Р±СЋРґР¶РµС‚РѕРј Рё РєРѕРјРјРµСЂС‡РµСЃРєРёРј СЂРµР·СѓР»СЊС‚Р°С‚РѕРј.",
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
    specialistIds: ["mia-nolan-social-media", "lina-hayes-visual-designer", "noah-reed-project-manager"],
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
          description: "Р—Р°РїСѓСЃРє СЂРµСЃС‚РѕСЂР°РЅР° С‡РµСЂРµР· РєРѕРЅС‚РµРЅС‚, РёРЅС‚РµРіСЂР°С†РёРё СЃ Р±Р»РѕРіРµСЂР°РјРё Рё Р»РѕРєР°Р»СЊРЅРѕРµ РїСЂРѕРґРІРёР¶РµРЅРёРµ.",
          price: "420 EUR / РјРµСЃСЏС†",
        },
        heroBadge: "HoReCa",
        heroHighlight: "Р РѕСЃС‚ Р°СѓРґРёС‚РѕСЂРёРё",
        heroMetric: "18K",
        heroSubtitle: "Р»РѕРєР°Р»СЊРЅС‹С… РїРѕРґРїРёСЃС‡РёРєРѕРІ Р·Р° 5 РјРµСЃСЏС†РµРІ",
        heroDescription: "РџСЂРѕРµРєС‚ РѕР±СЉРµРґРёРЅРёР» РєРѕРЅС‚РµРЅС‚-РїСЂРѕРґР°РєС€РЅ, РёРЅС‚РµРіСЂР°С†РёРё СЃ Р±Р»РѕРіРµСЂР°РјРё Рё СЂР°Р±РѕС‚Сѓ СЃ Р»РѕРєР°Р»СЊРЅРѕР№ Р°СѓРґРёС‚РѕСЂРёРµР№, С‡С‚РѕР±С‹ СЂРµСЃС‚РѕСЂР°РЅ РІС‹С€РµР» РЅР° СЂС‹РЅРѕРє СѓР¶Рµ СЃ РЅР°РєРѕРїР»РµРЅРЅС‹Рј РІРЅРёРјР°РЅРёРµРј.",
        resultItems: [
          { badge: "SMM", title: "Р РёС‚Рј Р·Р°РїСѓСЃРєР°", description: "РљР°РЅР°Р» СЃС‚Р°СЂС‚РѕРІР°Р» СЃ СЃРёСЃС‚РµРјРЅРѕР№ РїСѓР±Р»РёРєР°С†РёРѕРЅРЅРѕР№ СЃРµС‚РєРѕР№, Р° РЅРµ СЃ С…Р°РѕС‚РёС‡РЅРѕР№ Р°РєС‚РёРІРЅРѕСЃС‚СЊСЋ С‚РѕР»СЊРєРѕ РІ РґРµРЅСЊ РѕС‚РєСЂС‹С‚РёСЏ." },
          { badge: "Р‘Р»РѕРіРµСЂС‹", title: "Р РµР»РµРІР°РЅС‚РЅС‹Рµ РёРЅС‚РµРіСЂР°С†РёРё", description: "РњС‹ РІС‹Р±СЂР°Р»Рё Р»РѕРєР°Р»СЊРЅС‹С… Р°РІС‚РѕСЂРѕРІ, С‡СЊСЏ Р°СѓРґРёС‚РѕСЂРёСЏ СЃРѕРІРїР°РґР°Р»Р° СЃ РіРµРѕРіСЂР°С„РёРµР№ Рё РєРѕРЅС‚РµРєСЃС‚РѕРј Р·Р°РІРµРґРµРЅРёСЏ." },
          { badge: "Р’РёРґРµРѕ", title: "РЎРёР»СЊРЅС‹Р№ РІРёР·СѓР°Р»", description: "РљРѕСЂРѕС‚РєРёРµ food- Рё atmosphere-РІРёРґРµРѕ СЃС‚Р°Р»Рё РѕСЃРЅРѕРІРЅС‹Рј С„РѕСЂРјР°С‚РѕРј РїСЂРёРІР»РµС‡РµРЅРёСЏ РІРЅРёРјР°РЅРёСЏ РІ РїРµСЂРёРѕРґ Р·Р°РїСѓСЃРєР°." },
          { badge: "Р›РѕРєР°Р»СЊРЅРѕ", title: "РЎРІСЏР·СЊ СЃ РѕС„Р»Р°Р№РЅРѕРј", description: "РћРЅР»Р°Р№РЅ-РєРѕРЅС‚РµРЅС‚ Р±С‹Р» Р·Р°РІСЏР·Р°РЅ РЅР° Р±СЂРѕРЅРё, СЃРѕР±С‹С‚РёСЏ Рё С‚СЂР°С„РёРє РІ Р·Р°РІРµРґРµРЅРёРµ, Р° РЅРµ РЅР° Р°Р±СЃС‚СЂР°РєС‚РЅС‹Р№ РѕС…РІР°С‚." },
        ],
        detailTitle: "РџРѕРґСЂРѕР±РЅРѕСЃС‚Рё РїСЂРѕРµРєС‚Р°",
        detailItems: [
          { title: "Р—Р°РґР°С‡Р°", body: "Р РµСЃС‚РѕСЂР°РЅСѓ РЅСѓР¶РЅРѕ Р±С‹Р»Рѕ Р±С‹СЃС‚СЂРѕ СЃРѕР±СЂР°С‚СЊ СѓР·РЅР°РІР°РµРјРѕСЃС‚СЊ РЅР° Р»РѕРєР°Р»СЊРЅРѕРј СЂС‹РЅРєРµ РґРѕ С‚РѕРіРѕ, РєР°Рє СЃРїСЂРѕСЃ РЅР°С‡РЅС‘С‚ РїРѕРґРґРµСЂР¶РёРІР°С‚СЊСЃСЏ СЃР°СЂР°С„Р°РЅРЅС‹Рј СЌС„С„РµРєС‚РѕРј." },
          { title: "РџРѕРґС…РѕРґ", body: "РњС‹ РѕР±СЉРµРґРёРЅРёР»Рё РєРѕРЅС‚РµРЅС‚ Р·Р°РїСѓСЃРєР°, РёРЅС‚РµРіСЂР°С†РёРё СЃ Р±Р»РѕРіРµСЂР°РјРё Рё Р»РѕРєР°Р»СЊРЅРѕРµ СѓСЃРёР»РµРЅРёРµ РІРѕРєСЂСѓРі РєРѕРЅРєСЂРµС‚РЅС‹С… РјРѕРјРµРЅС‚РѕРІ РѕС‚РєСЂС‹С‚РёСЏ Рё РѕС„С„РµСЂРѕРІ." },
          { title: "Р РµР°Р»РёР·Р°С†РёСЏ", body: "РџСЂРѕРґР°РєС€РЅ РІРёР·СѓР°Р»Р°, СЃС‚РѕСЂРёСЃ-РјРµС…Р°РЅРёРєРё Рё РїР°СЂС‚РЅС‘СЂСЃРєРёРµ РїСѓР±Р»РёРєР°С†РёРё СѓРїСЂР°РІР»СЏР»РёСЃСЊ РєР°Рє РµРґРёРЅС‹Р№ rollout, Р° РЅРµ РєР°Рє РЅР°Р±РѕСЂ РѕС‚РґРµР»СЊРЅС‹С… РґРµР№СЃС‚РІРёР№." },
          { title: "Р РµР·СѓР»СЊС‚Р°С‚", body: "Р‘СЂРµРЅРґ РІС‹С€РµР» РЅР° СЂС‹РЅРѕРє СЃ Р±РѕР»РµРµ СЃРёР»СЊРЅРѕР№ СѓР·РЅР°РІР°РµРјРѕСЃС‚СЊСЋ, РїРѕРЅСЏС‚РЅС‹Рј СЃРѕС†РёР°Р»СЊРЅС‹Рј РґРѕРєР°Р·Р°С‚РµР»СЊСЃС‚РІРѕРј Рё Р»СѓС‡С€РµР№ РєРѕРЅРІРµСЂСЃРёРµР№ РІРЅРёРјР°РЅРёСЏ РІ СЂРµР°Р»СЊРЅС‹Рµ РІРёР·РёС‚С‹." },
        ],
      },
    },
  },
  {
    id: "luna-clinic",
    slug: "luna-clinic",
    image: "/img/Group 76 (1) 1.png",
    galleryImages: Array.from({ length: 5 }, () => "/img/Group 76 (1) 1.png"),
    specialistIds: ["evan-brooks-seo-strategist", "leo-carter-performance-marketing", "ella-stone-content-strategist"],
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
          description: "РџСЂРёРІР»РµС‡РµРЅРёРµ СЃРїСЂРѕСЃР° РґР»СЏ РєР»РёРЅРёРєРё С‡РµСЂРµР· РїРѕРёСЃРє, РґРѕСЂР°Р±РѕС‚РєСѓ РїРѕСЃР°РґРѕС‡РЅС‹С… СЃС‚СЂР°РЅРёС† Рё Р°РЅР°Р»РёС‚РёРєСѓ.",
          price: "560 EUR / РјРµСЃСЏС†",
        },
        heroBadge: "Healthcare",
        heroHighlight: "РљР°С‡РµСЃС‚РІРѕ Р»РёРґРѕРІ",
        heroMetric: "+62%",
        heroSubtitle: "РєРІР°Р»РёС„РёС†РёСЂРѕРІР°РЅРЅС‹С… РѕР±СЂР°С‰РµРЅРёР№ Р·Р° 6 РјРµСЃСЏС†РµРІ",
        heroDescription: "РњС‹ РїРµСЂРµСЃРѕР±СЂР°Р»Рё СЂР°Р±РѕС‚Сѓ СЃ РїРѕРёСЃРєРѕРІС‹Рј СЃРїСЂРѕСЃРѕРј Рё РїРѕСЃР°РґРѕС‡РЅС‹РјРё СЃС‚СЂР°РЅРёС†Р°РјРё С‚Р°Рє, С‡С‚РѕР±С‹ РєР»РёРЅРёРєР° РїРѕР»СѓС‡Р°Р»Р° Р±РѕР»РµРµ РєР°С‡РµСЃС‚РІРµРЅРЅС‹Рµ РѕР±СЂР°С‰РµРЅРёСЏ Рё РјРµРЅСЊС€Рµ РїСѓСЃС‚С‹С… Р·Р°С‚СЂР°С‚.",
        resultItems: [
          { badge: "SEO", title: "Р РµР»РµРІР°РЅС‚РЅР°СЏ РІРёРґРёРјРѕСЃС‚СЊ", description: "РџСЂРёРѕСЂРёС‚РµС‚ РїРѕР»СѓС‡РёР»Рё СЃС‚СЂР°РЅРёС†С‹ Рё РєР»Р°СЃС‚РµСЂС‹, СЃРѕРІРїР°РґР°СЋС‰РёРµ СЃ РєРѕРјРјРµСЂС‡РµСЃРєРёРјРё РјРµРґРёС†РёРЅСЃРєРёРјРё Р·Р°РїСЂРѕСЃР°РјРё, Р° РЅРµ Р°Р±СЃС‚СЂР°РєС‚РЅС‹Р№ РёРЅС„РѕСЂРјР°С†РёРѕРЅРЅС‹Р№ С‚СЂР°С„РёРє." },
          { badge: "РџРѕРёСЃРє", title: "Р—Р°С…РІР°С‚ РїР»Р°С‚РЅРѕРіРѕ СЃРїСЂРѕСЃР°", description: "РљР°РјРїР°РЅРёРё Р±С‹Р»Рё СЃС„РѕРєСѓСЃРёСЂРѕРІР°РЅС‹ РЅР° РєРѕРјРјРµСЂС‡РµСЃРєРёС… Р·Р°РїСЂРѕСЃР°С… Рё Р±РѕР»РµРµ С‡РёСЃС‚РѕР№ РјР°СЂС€СЂСѓС‚РёР·Р°С†РёРё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РЅР° РЅСѓР¶РЅС‹Рµ СѓСЃР»СѓРіРё." },
          { badge: "РљРѕРЅС‚РµРЅС‚", title: "РўРѕС‡РЅРµРµ РјРµСЃСЃРµРґР¶", description: "РўРµРєСЃС‚С‹ СЃР°Р№С‚Р° Р±С‹Р»Рё РїРµСЂРµРїРёСЃР°РЅС‹ РІРѕРєСЂСѓРі РґРѕРІРµСЂРёСЏ, СЃРїРµС†РёР°Р»РёР·Р°С†РёР№ Рё С„Р°РєС‚РѕСЂРѕРІ РїСЂРёРЅСЏС‚РёСЏ СЂРµС€РµРЅРёСЏ." },
          { badge: "Р”Р°РЅРЅС‹Рµ", title: "РќР°РґС‘Р¶РЅР°СЏ РѕС‚С‡С‘С‚РЅРѕСЃС‚СЊ", description: "Р§РёСЃС‚РєР° Р°РЅР°Р»РёС‚РёРєРё РїРѕР·РІРѕР»РёР»Р° РѕС‚Р»РёС‡Р°С‚СЊ СЃР»Р°Р±С‹Рµ Р·Р°СЏРІРєРё РѕС‚ СЂРµР°Р»СЊРЅРѕРіРѕ СЃРїСЂРѕСЃР° РЅР° РєРѕРЅСЃСѓР»СЊС‚Р°С†РёРё." },
        ],
        detailTitle: "РџРѕРґСЂРѕР±РЅРѕСЃС‚Рё РїСЂРѕРµРєС‚Р°",
        detailItems: [
          { title: "Р—Р°РґР°С‡Р°", body: "РљР»РёРЅРёРєР° СѓР¶Рµ РїРѕР»СѓС‡Р°Р»Р° С‚СЂР°С„РёРє, РЅРѕ Р·РЅР°С‡РёС‚РµР»СЊРЅР°СЏ РµРіРѕ С‡Р°СЃС‚СЊ РґР°РІР°Р»Р° СЃР»Р°Р±С‹Рµ РѕР±СЂР°С‰РµРЅРёСЏ Рё РїР»РѕС…Рѕ Р°С‚СЂРёР±СѓС‚РёСЂРѕРІР°Р»Р°СЃСЊ РјРµР¶РґСѓ РєР°РЅР°Р»Р°РјРё." },
          { title: "РџРѕРґС…РѕРґ", body: "РњС‹ РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ РїРµСЂРµСЃРѕР±СЂР°Р»Рё Р·Р°С…РІР°С‚ СЃРїСЂРѕСЃР° РІ РїРѕРёСЃРєРµ Рё СЂРµР»РµРІР°РЅС‚РЅРѕСЃС‚СЊ СЃС‚СЂР°РЅРёС†, Р° РЅРµ РїС‹С‚Р°Р»РёСЃСЊ Р»РµС‡РёС‚СЊ СЂРµРєР»Р°РјСѓ РѕС‚РґРµР»СЊРЅРѕ РѕС‚ СЃР°Р№С‚Р°." },
          { title: "Р РµР°Р»РёР·Р°С†РёСЏ", body: "РЎС‚СЂСѓРєС‚СѓСЂР° Р·Р°РїСЂРѕСЃРѕРІ, РјР°СЂС€СЂСѓС‚РёР·Р°С†РёСЏ РѕР±СЉСЏРІР»РµРЅРёР№, РєРѕРЅС‚РµРЅС‚ СЃС‚СЂР°РЅРёС† Рё Р°РЅР°Р»РёС‚РёРєР° РѕР±РЅРѕРІР»СЏР»РёСЃСЊ СЃРёРЅС…СЂРѕРЅРЅРѕ, С‡С‚РѕР±С‹ РІРѕСЂРѕРЅРєР° СЃС‚Р°Р»Р° С†РµР»СЊРЅРѕР№." },
          { title: "Р РµР·СѓР»СЊС‚Р°С‚", body: "РљР»РёРЅРёРєР° РїРѕР»СѓС‡РёР»Р° РјРµРЅСЊС€Рµ РїСѓСЃС‚С‹С… Р·Р°СЏРІРѕРє, СЃРёР»СЊРЅРµРµ РІРёРґРёРјРѕСЃС‚СЊ РїРѕ РЅСѓР¶РЅС‹Рј СѓСЃР»СѓРіР°Рј Рё Р±РѕР»РµРµ СѓРІРµСЂРµРЅРЅСѓСЋ РѕС‚С‡С‘С‚РЅРѕСЃС‚СЊ РїРѕ РєР°РЅР°Р»Р°Рј." },
        ],
      },
    },
  },
  {
    id: "atelier-home",
    slug: "atelier-home",
    image: "/img/Frame189(1)1.png",
    galleryImages: Array.from({ length: 5 }, () => "/img/Frame189(1)1.png"),
    specialistIds: ["lina-hayes-visual-designer", "noah-reed-project-manager", "ella-stone-content-strategist"],
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
          category: "РРЅС‚РµСЂСЊРµСЂС‹",
          description: "РћР±РЅРѕРІР»РµРЅРёРµ Р±СЂРµРЅРґР° Рё СЃР°Р№С‚Р° РґР»СЏ РёРЅС‚РµСЂСЊРµСЂРЅРѕР№ СЃС‚СѓРґРёРё, РІС‹С…РѕРґСЏС‰РµР№ РІ Р±РѕР»РµРµ РїСЂРµРјРёР°Р»СЊРЅС‹Р№ СЃРµРіРјРµРЅС‚.",
          price: "690 EUR / РїСЂРѕРµРєС‚",
        },
        heroBadge: "РРЅС‚РµСЂСЊРµСЂС‹",
        heroHighlight: "РџСЂРµРјРёР°Р»СЊРЅРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ",
        heroMetric: "new",
        heroSubtitle: "С†РёС„СЂРѕРІР°СЏ СЃРёСЃС‚РµРјР° РїРѕРґР°С‡Рё",
        heroDescription: "РЎС‚СѓРґРёРё РЅСѓР¶РµРЅ Р±С‹Р» Р±РѕР»РµРµ С‡РёСЃС‚С‹Р№ РїСЂРµРјРёР°Р»СЊРЅС‹Р№ СЏР·С‹Рє РЅР° СЃР°Р№С‚Рµ, РІ РїСЂРµР·РµРЅС‚Р°С†РёСЏС… Рё Р±СЂРµРЅРґ-РјР°С‚РµСЂРёР°Р»Р°С… РїРµСЂРµРґ РІС‹С…РѕРґРѕРј РІ Р±РѕР»РµРµ РІС‹СЃРѕРєРёР№ С†РµРЅРѕРІРѕР№ СЃРµРіРјРµРЅС‚.",
        resultItems: [
          { badge: "Р‘СЂРµРЅРґ", title: "Р‘РѕР»РµРµ С†РµР»СЊРЅР°СЏ Р°Р№РґРµРЅС‚РёРєР°", description: "РњС‹ СѓС‚РѕС‡РЅРёР»Рё С‚РёРїРѕРіСЂР°С„РёРєСѓ, С‚РѕРЅР°Р»СЊРЅРѕСЃС‚СЊ Рё РІРёР·СѓР°Р»СЊРЅСѓСЋ РёРµСЂР°СЂС…РёСЋ, С‡С‚РѕР±С‹ Р±СЂРµРЅРґ РІС‹РіР»СЏРґРµР» СЃРѕР±СЂР°РЅРЅРµРµ Рё РґРѕСЂРѕР¶Рµ." },
          { badge: "РЎР°Р№С‚", title: "РЎРёР»СЊРЅРµРµ Р»РѕРіРёРєР° СЃР°Р№С‚Р°", description: "РЎС‚СЂСѓРєС‚СѓСЂР° СЃР°Р№С‚Р° СѓС€Р»Р° РѕС‚ РїСЂРѕСЃС‚РѕР№ РІРёС‚СЂРёРЅС‹ РїСЂРѕРµРєС‚РѕРІ Рє СЃРµСЂРІРёСЃРЅРѕР№ РїРѕРґР°С‡Рµ СЃ РїРѕРЅСЏС‚РЅС‹РјРё С‚РѕС‡РєР°РјРё РєРѕРЅРІРµСЂСЃРёРё." },
          { badge: "РџСЂРѕРґР°Р¶Рё", title: "РџРѕРґРґРµСЂР¶РєР° РїСЂРµР·РµРЅС‚Р°С†РёР№", description: "РљРѕРјРјРµСЂС‡РµСЃРєРёРµ РїСЂРµР·РµРЅС‚Р°С†РёРё Рё Р±СЂРµРЅРґ-РјР°С‚РµСЂРёР°Р»С‹ Р±С‹Р»Рё РїСЂРёРІРµРґРµРЅС‹ РІ РѕРґРЅСѓ СЃРёСЃС‚РµРјСѓ РґР»СЏ РєР»РёРµРЅС‚СЃРєРёС… РІСЃС‚СЂРµС‡." },
          { badge: "РџСЂРѕС†РµСЃСЃ", title: "РџРµСЂРµРёСЃРїРѕР»СЊР·СѓРµРјР°СЏ СЃРёСЃС‚РµРјР°", description: "РљРѕРјР°РЅРґР° РїРѕР»СѓС‡РёР»Р° РЅР°Р±РѕСЂ РїСЂР°РІРёР» Рё Р°СЃСЃРµС‚РѕРІ, РєРѕС‚РѕСЂС‹Рµ РјРѕР¶РЅРѕ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РґР°Р»СЊС€Рµ Р±РµР· РїРѕС‚РµСЂРё РєРѕРЅСЃРёСЃС‚РµРЅС‚РЅРѕСЃС‚Рё." },
        ],
        detailTitle: "РџРѕРґСЂРѕР±РЅРѕСЃС‚Рё РїСЂРѕРµРєС‚Р°",
        detailItems: [
          { title: "Р—Р°РґР°С‡Р°", body: "РљР°С‡РµСЃС‚РІРѕ СЂР°Р±РѕС‚ СЃС‚СѓРґРёРё Р±С‹Р»Рѕ РІС‹СЃРѕРєРёРј, РЅРѕ С†РёС„СЂРѕРІР°СЏ РїРѕРґР°С‡Р° Р·Р°РЅРёР¶Р°Р»Р° РІРѕСЃРїСЂРёСЏС‚РёРµ Р±СЂРµРЅРґР° Рё РјРµС€Р°Р»Р° РїСЂРµРјРёР°Р»СЊРЅРѕРјСѓ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёСЋ." },
          { title: "РџРѕРґС…РѕРґ", body: "РњС‹ РѕР±РЅРѕРІРёР»Рё Р°Р№РґРµРЅС‚РёРєСѓ Рё Р»РѕРіРёРєСѓ СЃР°Р№С‚Р° РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ, С‡С‚РѕР±С‹ РЅРѕРІРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ Р±С‹Р»Рѕ РІРёРґРЅРѕ РІРѕ РІСЃРµС… РјР°С‚РµСЂРёР°Р»Р°С… РїРµСЂРІРѕРіРѕ РєР°СЃР°РЅРёСЏ." },
          { title: "Р РµР°Р»РёР·Р°С†РёСЏ", body: "РџСЂР°РІРёР»Р° Р±СЂРµРЅРґР°, РІРµР±-Р±Р»РѕРєРё Рё РїСЂРµР·РµРЅС‚Р°С†РёРѕРЅРЅС‹Рµ С€Р°Р±Р»РѕРЅС‹ РїРµСЂРµСЃРѕР±РёСЂР°Р»РёСЃСЊ РІРѕРєСЂСѓРі СЏСЃРЅРѕСЃС‚Рё, СЃРґРµСЂР¶Р°РЅРЅРѕСЃС‚Рё Рё РґРѕРІРµСЂРёСЏ." },
          { title: "Р РµР·СѓР»СЊС‚Р°С‚", body: "РЎС‚СѓРґРёСЏ РІС‹С€Р»Р° РІ РЅРѕРІС‹Рµ РїСЂРѕРґР°Р¶Рё СЃ Р±РѕР»РµРµ СЃРёР»СЊРЅРѕР№ РІРёР·СѓР°Р»СЊРЅРѕР№ С†РµР»СЊРЅРѕСЃС‚СЊСЋ Рё СѓР±РµРґРёС‚РµР»СЊРЅРѕР№ РїСЂРµРјРёР°Р»СЊРЅРѕР№ РїРѕРґР°С‡РµР№." },
        ],
      },
    },
  },
];

export function getCaseStudies() {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((item) => item.slug === slug);
}

export function getLocalizedCaseStudy(caseStudy: CaseStudyDefinition, locale: string) {
  const normalizedLocale = normalizeSiteLocale(locale);
  const baseLocale = getDefaultContentLocale(locale);
  const overrides = getTranslationOverrideStoreSync();

  return {
    ...caseStudy,
    content: deepMergeTranslationValue(
      caseStudy.locale[baseLocale],
      overrides.caseStudies[caseStudy.id]?.[normalizedLocale]
    ),
  };
}

export function getLocalizedCaseStudies(locale: string) {
  return CASE_STUDIES.map((item) => getLocalizedCaseStudy(item, locale));
}
