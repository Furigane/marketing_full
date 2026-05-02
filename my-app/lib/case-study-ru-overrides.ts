import type { CaseStudyId } from "@/lib/case-studies";

export const CASE_STUDY_RU_CARD_OVERRIDES: Record<
  CaseStudyId,
  {
    title: string;
    category: string;
    description: string;
    price: string;
  }
> = {
  silpo: {
    title: "Сильпо",
    category: "Розничная торговля",
    description:
      "Комплексное продвижение сети супермаркетов через Instagram, рекламу и аналитику.",
    price: "300 EUR / месяц",
  },
  "nova-bistro": {
    title: "Nova Bistro",
    category: "HoReCa",
    description:
      "Запуск ресторана через контент, интеграции с блогерами и локальное продвижение.",
    price: "420 EUR / месяц",
  },
  "luna-clinic": {
    title: "Luna Clinic",
    category: "Healthcare",
    description:
      "Привлечение спроса для клиники через поиск, доработку посадочных страниц и аналитику.",
    price: "560 EUR / месяц",
  },
  "atelier-home": {
    title: "Atelier Home",
    category: "Интерьер",
    description:
      "Обновление бренда и сайта для интерьерной студии, выходящей в более премиальный сегмент.",
    price: "690 EUR / проект",
  },
};
