"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";

import { normalizeSiteLocale } from "@/lib/site-locales";
import { useIsDarkTheme } from "@/lib/social-icons";

type ReviewItem = {
  service: string;
  name: string;
  role: string;
  title: string;
  body: string;
};

type CarouselItem = {
  key: string;
  realIndex: number;
  review: ReviewItem;
};

const REVIEWS_BY_LOCALE: Record<string, ReviewItem[]> = {
  ru: [
    {
      service: "Маркетинговая стратегия",
      name: "Елена С.",
      role: "Founder",
      title: "Появился системный подход",
      body:
        "Обращались за разработкой маркетинговой стратегии. До этого действовали скорее интуитивно, без четкого плана. Здесь помогли разложить все по полочкам: аудитория, каналы, воронка. Стало гораздо понятнее, куда двигаться, и наконец появился системный подход.",
    },
    {
      service: "Брендинг и айдентика",
      name: "Игорь П.",
      role: "Brand owner",
      title: "Стиль действительно отражает бизнес",
      body:
        "Делали полный брендинг с нуля. Очень понравилось, что не просто нарисовали логотип, а глубоко погрузились в продукт и позиционирование. В итоге получился стиль, который действительно отражает наш бизнес.",
    },
    {
      service: "UX/UI дизайн",
      name: "Мария К.",
      role: "Project lead",
      title: "Изменения сразу отразились на заявках",
      body:
        "Заказывали UX/UI для сайта. Было много проблем с удобством, пользователи терялись. После переработки интерфейса стало гораздо проще, и это сразу отразилось на заявках. Видно, что дизайн делали не на глаз, а с пониманием логики.",
    },
    {
      service: "Веб-разработка",
      name: "Антон Л.",
      role: "Operations manager",
      title: "Сайт запустили без лишних проблем",
      body:
        "Делали сайт под ключ. Понравилось, что все процессы четко выстроены: от структуры до запуска. Сайт получился быстрый, удобный и без багов. После запуска сразу начали получать заявки.",
    },
    {
      service: "Product / Software development",
      name: "Дмитрий В.",
      role: "Product owner",
      title: "Сэкономили время и деньги на разработке",
      body:
        "Обращались за разработкой продукта SaaS. Помогли не только с технической частью, но и с логикой самого продукта. Это сильно сэкономило время и деньги на этапе разработки.",
    },
    {
      service: "Mobile development",
      name: "Ольга Т.",
      role: "Startup founder",
      title: "Приложение получилось лучше ожиданий",
      body:
        "Разрабатывали мобильное приложение. Команда сразу предложила более удобные решения по функционалу, чем мы изначально планировали. В итоге приложение получилось намного лучше, чем ожидали.",
    },
    {
      service: "Контент-маркетинг",
      name: "Наталья Р.",
      role: "Marketing lead",
      title: "Контент начал реально работать",
      body:
        "Заказывали контент для сайта и блога. До этого тексты были ни о чем, сейчас же они реально работают: пошел трафик, появились заявки. Видно, что тексты пишутся не просто ради текста, а под задачу.",
    },
    {
      service: "SMM и соцсети",
      name: "Сергей М.",
      role: "Co-founder",
      title: "Появились рост и входящие заявки",
      body:
        "Вели нам соцсети и запускали рекламу. Раньше просто выкладывали посты без результата, сейчас появился рост подписчиков и заявки. Понравилось, что есть стратегия, а не хаотичные действия.",
    },
    {
      service: "SEO-продвижение",
      name: "Виктория Н.",
      role: "CEO",
      title: "Рост трафика стал стабильным",
      body:
        "Работаем по SEO уже несколько месяцев. Сначала были сомнения, но сейчас видим стабильный рост трафика. Особенно понравилось, что все объясняют и показывают результат, а не просто делают SEO.",
    },
    {
      service: "AI и автоматизация",
      name: "Роман Г.",
      role: "Operations lead",
      title: "Снизили нагрузку на команду",
      body:
        "Внедряли AI и автоматизацию процессов. Раньше много задач делали вручную, сейчас все работает намного быстрее. Это реально снизило нагрузку на команду и упростило работу.",
    },
  ],

  en: [
    {
      service: "Marketing strategy",
      name: "Elena S.",
      role: "Founder",
      title: "We finally got a systematic approach",
      body:
        "We came for a marketing strategy. Before that, we were acting more on intuition, without a clear plan. The team helped us break everything down: audience, channels, funnel. It became much clearer where to move next, and we finally got a systematic approach.",
    },
    {
      service: "Branding and identity",
      name: "Igor P.",
      role: "Brand owner",
      title: "The style truly reflects the business",
      body:
        "We ordered full branding from scratch. What we liked most was that they did not just draw a logo, but deeply studied the product and positioning. As a result, we got a style that truly reflects our business.",
    },
    {
      service: "UX/UI design",
      name: "Maria K.",
      role: "Project lead",
      title: "The changes immediately affected requests",
      body:
        "We ordered UX/UI design for the website. There were many usability problems, and users were getting lost. After the interface redesign, everything became much easier, and it immediately affected incoming requests. It is clear that the design was made with logic, not just by eye.",
    },
    {
      service: "Web development",
      name: "Anton L.",
      role: "Operations manager",
      title: "The website launched without unnecessary problems",
      body:
        "We ordered a turnkey website. I liked that all processes were clearly structured: from the site architecture to launch. The website turned out fast, convenient, and bug-free. After launch, we immediately started receiving requests.",
    },
    {
      service: "Product / Software development",
      name: "Dmitry V.",
      role: "Product owner",
      title: "We saved time and money on development",
      body:
        "We came for SaaS product development. They helped not only with the technical part, but also with the logic of the product itself. This saved us a lot of time and money during the development stage.",
    },
    {
      service: "Mobile development",
      name: "Olga T.",
      role: "Startup founder",
      title: "The app turned out better than expected",
      body:
        "We developed a mobile application. The team immediately suggested more convenient functionality solutions than we had originally planned. As a result, the app turned out much better than expected.",
    },
    {
      service: "Content marketing",
      name: "Natalia R.",
      role: "Marketing lead",
      title: "The content started to actually work",
      body:
        "We ordered content for the website and blog. Before that, the texts were empty and ineffective, but now they actually work: traffic started growing, and requests appeared. It is clear that the texts are written not just for the sake of content, but for a business goal.",
    },
    {
      service: "SMM and social media",
      name: "Sergey M.",
      role: "Co-founder",
      title: "We got growth and incoming requests",
      body:
        "They managed our social media and launched advertising. Before that, we were simply posting without any result, but now we see follower growth and incoming requests. I liked that there is a strategy, not chaotic actions.",
    },
    {
      service: "SEO promotion",
      name: "Victoria N.",
      role: "CEO",
      title: "Traffic growth became stable",
      body:
        "We have been working on SEO for several months. At first, we had doubts, but now we see stable traffic growth. I especially liked that they explain everything and show the result, instead of just saying they are doing SEO.",
    },
    {
      service: "AI and automation",
      name: "Roman G.",
      role: "Operations lead",
      title: "We reduced the workload on the team",
      body:
        "We implemented AI and process automation. Previously, many tasks were done manually, but now everything works much faster. This really reduced the workload on the team and simplified our work.",
    },
  ],

  fr: [
    {
      service: "Stratégie marketing",
      name: "Elena S.",
      role: "Fondatrice",
      title: "Nous avons enfin obtenu une approche structurée",
      body:
        "Nous avons fait appel à l’équipe pour développer une stratégie marketing. Avant cela, nous agissions plutôt à l’intuition, sans plan clair. Ils nous ont aidés à tout structurer : audience, canaux, tunnel de conversion. Nous comprenons maintenant beaucoup mieux dans quelle direction avancer, et nous avons enfin une approche systématique.",
    },
    {
      service: "Branding et identité visuelle",
      name: "Igor P.",
      role: "Propriétaire de marque",
      title: "Le style reflète vraiment l’entreprise",
      body:
        "Nous avons commandé une identité de marque complète à partir de zéro. Nous avons particulièrement apprécié le fait qu’ils ne se soient pas contentés de dessiner un logo, mais qu’ils aient étudié en profondeur le produit et son positionnement. Au final, nous avons obtenu un style qui reflète réellement notre entreprise.",
    },
    {
      service: "Design UX/UI",
      name: "Maria K.",
      role: "Cheffe de projet",
      title: "Les changements se sont immédiatement reflétés dans les demandes",
      body:
        "Nous avons commandé le design UX/UI du site. Il y avait beaucoup de problèmes d’ergonomie, les utilisateurs se perdaient. Après la refonte de l’interface, tout est devenu beaucoup plus simple, et cela s’est immédiatement reflété dans les demandes entrantes. On voit que le design a été pensé avec une vraie logique, pas fait au hasard.",
    },
    {
      service: "Développement web",
      name: "Anton L.",
      role: "Responsable des opérations",
      title: "Le site a été lancé sans problèmes inutiles",
      body:
        "Nous avons commandé un site clé en main. J’ai apprécié le fait que tous les processus soient clairement organisés : de la structure jusqu’au lancement. Le site est rapide, pratique et sans bugs. Après le lancement, nous avons immédiatement commencé à recevoir des demandes.",
    },
    {
      service: "Développement produit / logiciel",
      name: "Dmitry V.",
      role: "Product owner",
      title: "Nous avons économisé du temps et de l’argent sur le développement",
      body:
        "Nous avons fait appel à eux pour développer un produit SaaS. Ils nous ont aidés non seulement sur la partie technique, mais aussi sur la logique du produit lui-même. Cela nous a permis d’économiser beaucoup de temps et d’argent au stade du développement.",
    },
    {
      service: "Développement mobile",
      name: "Olga T.",
      role: "Fondatrice de startup",
      title: "L’application a dépassé nos attentes",
      body:
        "Nous avons développé une application mobile. L’équipe a immédiatement proposé des solutions fonctionnelles plus pratiques que celles que nous avions prévues au départ. Au final, l’application s’est révélée bien meilleure que ce que nous attendions.",
    },
    {
      service: "Marketing de contenu",
      name: "Natalia R.",
      role: "Responsable marketing",
      title: "Le contenu a commencé à vraiment fonctionner",
      body:
        "Nous avons commandé du contenu pour le site et le blog. Avant cela, les textes étaient vides et inefficaces, alors que maintenant ils fonctionnent réellement : le trafic a commencé à augmenter, et des demandes sont apparues. On voit que les textes ne sont pas écrits juste pour remplir le site, mais pour atteindre un objectif concret.",
    },
    {
      service: "SMM et réseaux sociaux",
      name: "Sergey M.",
      role: "Co-fondateur",
      title: "Nous avons obtenu de la croissance et des demandes entrantes",
      body:
        "Ils ont géré nos réseaux sociaux et lancé la publicité. Avant, nous publiions simplement des posts sans résultat, maintenant nous voyons une croissance des abonnés et des demandes entrantes. J’ai aimé le fait qu’il y ait une stratégie, et non des actions chaotiques.",
    },
    {
      service: "Référencement SEO",
      name: "Victoria N.",
      role: "CEO",
      title: "La croissance du trafic est devenue stable",
      body:
        "Nous travaillons sur le SEO depuis plusieurs mois. Au début, nous avions des doutes, mais maintenant nous voyons une croissance stable du trafic. Nous avons surtout apprécié le fait qu’ils expliquent tout et montrent les résultats, au lieu de simplement dire qu’ils font du SEO.",
    },
    {
      service: "IA et automatisation",
      name: "Roman G.",
      role: "Responsable des opérations",
      title: "Nous avons réduit la charge de travail de l’équipe",
      body:
        "Nous avons mis en place de l’IA et l’automatisation des processus. Avant, beaucoup de tâches étaient faites manuellement, maintenant tout fonctionne beaucoup plus vite. Cela a réellement réduit la charge de travail de l’équipe et simplifié notre quotidien.",
    },
  ],

  de: [
    {
      service: "Marketingstrategie",
      name: "Elena S.",
      role: "Gründerin",
      title: "Wir haben endlich einen systematischen Ansatz bekommen",
      body:
        "Wir haben uns für die Entwicklung einer Marketingstrategie an das Team gewendet. Davor handelten wir eher intuitiv, ohne klaren Plan. Hier wurde uns geholfen, alles sauber zu strukturieren: Zielgruppe, Kanäle, Funnel. Es wurde viel klarer, in welche Richtung wir uns bewegen sollten, und endlich entstand ein systematischer Ansatz.",
    },
    {
      service: "Branding und Corporate Identity",
      name: "Igor P.",
      role: "Markeninhaber",
      title: "Der Stil spiegelt das Unternehmen wirklich wider",
      body:
        "Wir haben ein vollständiges Branding von Grund auf erstellen lassen. Besonders gefallen hat uns, dass nicht einfach nur ein Logo gezeichnet wurde, sondern dass man tief in das Produkt und die Positionierung eingestiegen ist. Am Ende entstand ein Stil, der unser Unternehmen wirklich widerspiegelt.",
    },
    {
      service: "UX/UI-Design",
      name: "Maria K.",
      role: "Projektleiterin",
      title: "Die Änderungen wirkten sich sofort auf die Anfragen aus",
      body:
        "Wir haben UX/UI-Design für die Website bestellt. Es gab viele Probleme mit der Benutzerfreundlichkeit, die Nutzer haben sich verloren. Nach der Überarbeitung der Oberfläche wurde alles deutlich einfacher, und das wirkte sich sofort auf die Anfragen aus. Man sieht, dass das Design nicht nach Gefühl, sondern mit Verständnis für die Logik erstellt wurde.",
    },
    {
      service: "Webentwicklung",
      name: "Anton L.",
      role: "Operations Manager",
      title: "Die Website wurde ohne unnötige Probleme gestartet",
      body:
        "Wir haben eine Website schlüsselfertig entwickeln lassen. Mir hat gefallen, dass alle Prozesse klar aufgebaut waren: von der Struktur bis zum Launch. Die Website wurde schnell, bequem und fehlerfrei. Direkt nach dem Start haben wir begonnen, Anfragen zu erhalten.",
    },
    {
      service: "Produkt- / Softwareentwicklung",
      name: "Dmitry V.",
      role: "Product Owner",
      title: "Wir haben Zeit und Geld bei der Entwicklung gespart",
      body:
        "Wir haben uns für die Entwicklung eines SaaS-Produkts an sie gewendet. Sie haben uns nicht nur beim technischen Teil geholfen, sondern auch bei der Logik des Produkts selbst. Das hat uns in der Entwicklungsphase viel Zeit und Geld gespart.",
    },
    {
      service: "Mobile Entwicklung",
      name: "Olga T.",
      role: "Startup-Gründerin",
      title: "Die App wurde besser als erwartet",
      body:
        "Wir haben eine mobile App entwickeln lassen. Das Team hat sofort praktischere Lösungen für die Funktionen vorgeschlagen, als wir ursprünglich geplant hatten. Am Ende wurde die App deutlich besser, als wir erwartet hatten.",
    },
    {
      service: "Content-Marketing",
      name: "Natalia R.",
      role: "Marketing Lead",
      title: "Der Content begann wirklich zu funktionieren",
      body:
        "Wir haben Inhalte für die Website und den Blog bestellt. Vorher waren die Texte wenig aussagekräftig, jetzt funktionieren sie wirklich: Der Traffic ist gestiegen, und es kamen Anfragen. Man merkt, dass die Texte nicht einfach nur geschrieben werden, um Inhalte zu haben, sondern für ein konkretes Ziel.",
    },
    {
      service: "SMM und soziale Netzwerke",
      name: "Sergey M.",
      role: "Mitgründer",
      title: "Es gab Wachstum und eingehende Anfragen",
      body:
        "Sie haben unsere sozialen Netzwerke betreut und Werbung gestartet. Früher haben wir einfach Beiträge ohne Ergebnis veröffentlicht, jetzt sehen wir Wachstum bei den Abonnenten und eingehende Anfragen. Mir hat gefallen, dass es eine Strategie gibt und keine chaotischen Aktionen.",
    },
    {
      service: "SEO-Promotion",
      name: "Victoria N.",
      role: "CEO",
      title: "Das Traffic-Wachstum wurde stabil",
      body:
        "Wir arbeiten seit mehreren Monaten an SEO. Anfangs hatten wir Zweifel, aber jetzt sehen wir ein stabiles Wachstum des Traffics. Besonders gefallen hat uns, dass alles erklärt und das Ergebnis gezeigt wird, statt einfach nur zu sagen, dass SEO gemacht wird.",
    },
    {
      service: "KI und Automatisierung",
      name: "Roman G.",
      role: "Operations Lead",
      title: "Wir haben die Belastung des Teams reduziert",
      body:
        "Wir haben KI und Prozessautomatisierung eingeführt. Früher wurden viele Aufgaben manuell erledigt, jetzt funktioniert alles viel schneller. Das hat die Belastung des Teams wirklich reduziert und die Arbeit vereinfacht.",
    },
  ],

  ar: [
    {
      service: "استراتيجية التسويق",
      name: "إيلينا س.",
      role: "المؤسسة",
      title: "أصبح لدينا نهج منظم",
      body:
        "تواصلنا معهم من أجل تطوير استراتيجية تسويقية. قبل ذلك كنا نعمل غالبًا بشكل عفوي وبدون خطة واضحة. ساعدونا في ترتيب كل شيء: الجمهور، القنوات، ومسار المبيعات. أصبح من الواضح لنا إلى أين نتحرك، وظهر لدينا أخيرًا نهج منظم في العمل.",
    },
    {
      service: "الهوية البصرية والعلامة التجارية",
      name: "إيغور ب.",
      role: "مالك العلامة التجارية",
      title: "الأسلوب يعكس العمل فعلًا",
      body:
        "طلبنا تطوير هوية كاملة للعلامة التجارية من الصفر. أكثر ما أعجبنا أنهم لم يكتفوا برسم شعار فقط، بل تعمقوا في المنتج والتموضع. في النهاية حصلنا على أسلوب بصري يعكس عملنا فعلًا.",
    },
    {
      service: "تصميم UX/UI",
      name: "ماريا ك.",
      role: "قائدة المشروع",
      title: "التغييرات انعكست مباشرة على الطلبات",
      body:
        "طلبنا تصميم UX/UI للموقع. كانت هناك مشكلات كثيرة في سهولة الاستخدام، وكان المستخدمون يتشتتون داخل الموقع. بعد إعادة تصميم الواجهة أصبح كل شيء أسهل بكثير، وانعكس ذلك مباشرة على عدد الطلبات. من الواضح أن التصميم تم بناءً على فهم للمنطق، وليس بشكل عشوائي.",
    },
    {
      service: "تطوير الويب",
      name: "أنطون ل.",
      role: "مدير العمليات",
      title: "تم إطلاق الموقع بدون مشكلات غير ضرورية",
      body:
        "طلبنا تطوير موقع كامل. أعجبني أن كل العمليات كانت منظمة بوضوح: من البنية وحتى الإطلاق. أصبح الموقع سريعًا ومريحًا وبدون أخطاء. بعد الإطلاق بدأنا مباشرة في استقبال الطلبات.",
    },
    {
      service: "تطوير المنتجات / البرمجيات",
      name: "دميتري ف.",
      role: "مالك المنتج",
      title: "وفرنا الوقت والمال في التطوير",
      body:
        "تواصلنا معهم لتطوير منتج SaaS. ساعدونا ليس فقط في الجانب التقني، بل أيضًا في منطق المنتج نفسه. هذا وفر علينا الكثير من الوقت والمال في مرحلة التطوير.",
    },
    {
      service: "تطوير تطبيقات الجوال",
      name: "أولغا ت.",
      role: "مؤسسة شركة ناشئة",
      title: "التطبيق أصبح أفضل من المتوقع",
      body:
        "قمنا بتطوير تطبيق جوال. اقترح الفريق منذ البداية حلولًا أكثر راحة للوظائف مما كنا نخطط له في الأصل. في النهاية أصبح التطبيق أفضل بكثير مما توقعنا.",
    },
    {
      service: "تسويق المحتوى",
      name: "ناتاليا ر.",
      role: "قائدة التسويق",
      title: "بدأ المحتوى يعمل فعلًا",
      body:
        "طلبنا محتوى للموقع والمدونة. قبل ذلك كانت النصوص بلا فائدة واضحة، أما الآن فهي تعمل فعلًا: بدأ الترافيك في النمو وظهرت طلبات جديدة. من الواضح أن النصوص لا تُكتب لمجرد ملء الموقع، بل لتحقيق هدف محدد.",
    },
    {
      service: "SMM ووسائل التواصل الاجتماعي",
      name: "سيرغي م.",
      role: "شريك مؤسس",
      title: "ظهر نمو وطلبات واردة",
      body:
        "كانوا يديرون لنا وسائل التواصل الاجتماعي ويطلقون الإعلانات. في السابق كنا ننشر منشورات بدون نتيجة، أما الآن فظهر نمو في عدد المتابعين وبدأت تأتي طلبات. أعجبني أن هناك استراتيجية، وليس مجرد أفعال عشوائية.",
    },
    {
      service: "تحسين محركات البحث SEO",
      name: "فيكتوريا ن.",
      role: "المديرة التنفيذية",
      title: "أصبح نمو الترافيك مستقرًا",
      body:
        "نعمل على SEO منذ عدة أشهر. في البداية كانت لدينا شكوك، لكننا الآن نرى نموًا مستقرًا في الترافيك. أكثر ما أعجبنا أنهم يشرحون كل شيء ويعرضون النتائج، وليس فقط يقولون إنهم يعملون على SEO.",
    },
    {
      service: "الذكاء الاصطناعي والأتمتة",
      name: "رومان غ.",
      role: "قائد العمليات",
      title: "قللنا العبء على الفريق",
      body:
        "قمنا بتطبيق الذكاء الاصطناعي وأتمتة العمليات. في السابق كانت الكثير من المهام تتم يدويًا، أما الآن فأصبح كل شيء يعمل بسرعة أكبر. هذا قلل فعلًا العبء على الفريق وسهّل العمل.",
    },
  ],
};

const SECTION_COPY = {
  ru: {
    eyebrow: "Отзывы",
    title: "Что клиенты говорят о нашей работе",
    badge: "Проверенный отзыв",
    prev: "Предыдущий отзыв",
    next: "Следующий отзыв",
  },
  en: {
    eyebrow: "Reviews",
    title: "What clients say about our work",
    badge: "Verified review",
    prev: "Previous review",
    next: "Next review",
  },
  fr: {
    eyebrow: "Avis",
    title: "Ce que les clients disent de notre travail",
    badge: "Avis vérifié",
    prev: "Avis précédent",
    next: "Avis suivant",
  },
  de: {
    eyebrow: "Bewertungen",
    title: "Was Kunden über unsere Arbeit sagen",
    badge: "Verifizierte Bewertung",
    prev: "Vorherige Bewertung",
    next: "Nächste Bewertung",
  },
  ar: {
    eyebrow: "آراء",
    title: "ماذا يقول العملاء عن عملنا",
    badge: "مراجعة موثقة",
    prev: "المراجعة السابقة",
    next: "المراجعة التالية",
  },
} as const;

const DESKTOP_GAP_PX = 16;
const MOBILE_GAP_PX = 12;
const SLIDE_DURATION_MS = 560;

function getWrappedIndex(index: number, length: number) {
  return (index + length) % length;
}

function ReviewCard({
  review,
  badge,
  active,
  isDarkTheme,
}: {
  review: ReviewItem;
  badge: string;
  active: boolean;
  isDarkTheme: boolean;
}) {
  const cardClass = isDarkTheme
    ? "border-transparent bg-[#2b2b2b] text-white shadow-none"
    : "border border-[#e5e7eb] bg-white text-[#18181b] shadow-[0_22px_60px_rgba(15,23,42,0.08)]";
  const inactiveClass = isDarkTheme
    ? "scale-[0.965] opacity-70 blur-[0.2px]"
    : "scale-[0.972] opacity-78 blur-0";
  const badgeClass = isDarkTheme
    ? "bg-[#1f1f1f] text-[#f2d48c]"
    : "bg-[#1f1f1f] text-[#f2d48c]";
  const avatarClass = isDarkTheme ? "bg-[#d9d9df]" : "bg-[#dddce4]";
  const roleClass = isDarkTheme ? "text-white/75" : "text-black/60";
  const serviceClass = isDarkTheme
    ? "bg-white/8 text-white/80"
    : "bg-[#ecebe6] text-[#666154]";
  const bodyClass = isDarkTheme ? "text-white/85" : "text-[#4f463b]";

  return (
    <article
      className={`flex h-full flex-col rounded-[2rem] p-6 transition-[transform,opacity,filter,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:p-8 ${cardClass} ${
        active ? "scale-100 opacity-100 blur-0" : inactiveClass
      }`}
      style={!isDarkTheme ? { boxShadow: "0 22px 60px rgba(15, 23, 42, 0.12)" } : undefined}
    >
      <div className="relative flex-1">
        <span className={`absolute right-0 top-0 rounded-full px-4 py-1.5 text-sm font-semibold ${badgeClass}`}>
          {badge}
        </span>

        <div className="mb-6 flex items-center gap-4 pr-24">
          <div className={`h-14 w-14 rounded-full ${avatarClass}`} />
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold leading-tight">
              {review.name}
            </p>
            <p className={`mt-1 truncate text-base leading-tight ${roleClass}`}>
              {review.role}
            </p>
          </div>
        </div>

        <p className={`mb-4 inline-flex max-w-full rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${serviceClass}`}>
          <span className="truncate">{review.service}</span>
        </p>

        <h3 className="max-w-4xl text-[2rem] font-extrabold leading-tight lg:text-[2.25rem]">
          {review.title}
        </h3>
        <p className={`mt-4 max-w-5xl text-lg font-medium leading-[1.7] lg:text-[1.15rem] ${bodyClass}`}>
          {review.body}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <span className="text-4xl font-extrabold lg:text-5xl">5.0</span>
        <span className="text-3xl tracking-[0.15em] text-[#f2d48c] lg:text-4xl">
          {"★★★★★"}
        </span>
      </div>
    </article>
  );
}

export default function Comment() {
  const locale = normalizeSiteLocale(useLocale());
  const copy = SECTION_COPY[locale];
  const reviews = REVIEWS_BY_LOCALE[locale] ?? REVIEWS_BY_LOCALE.ru;
  const isDarkTheme = useIsDarkTheme();
  const viewportRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const resetFrameRef = useRef<number | null>(null);

  const carouselItems = useMemo<CarouselItem[]>(() => {
    const first = reviews[0];
    const last = reviews[reviews.length - 1];

    return [
      { key: `clone-start-${reviews.length - 1}`, realIndex: reviews.length - 1, review: last },
      ...reviews.map((review, index) => ({
        key: `review-${index}`,
        realIndex: index,
        review,
      })),
      { key: "clone-end-0", realIndex: 0, review: first },
    ];
  }, [reviews]);

  const [position, setPosition] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [measurements, setMeasurements] = useState({
    viewportWidth: 0,
    desktopCardWidth: 0,
    mobileCardWidth: 0,
  });

  const activeIndex = getWrappedIndex(position - 1, reviews.length);

  const updateMeasurements = useCallback(() => {
    const viewport = viewportRef.current;
    const desktopTrack = desktopTrackRef.current;
    const mobileTrack = mobileTrackRef.current;

    if (!viewport || !desktopTrack || !mobileTrack) return;

    const desktopCard = desktopTrack.querySelector<HTMLElement>("[data-desktop-card='true']");
    const mobileCard = mobileTrack.querySelector<HTMLElement>("[data-mobile-card='true']");

    if (!desktopCard || !mobileCard) return;

    setMeasurements({
      viewportWidth: viewport.clientWidth,
      desktopCardWidth: desktopCard.getBoundingClientRect().width,
      mobileCardWidth: mobileCard.getBoundingClientRect().width,
    });
    setIsReady(true);
  }, []);

  useEffect(() => {
    updateMeasurements();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      updateMeasurements();
    });

    observer.observe(viewport);
    window.addEventListener("resize", updateMeasurements);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [updateMeasurements]);

  useEffect(() => {
    if (!isReady) return;

    const id = window.requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => window.cancelAnimationFrame(id);
  }, [isReady]);

  useEffect(() => {
    return () => {
      if (resetFrameRef.current !== null) {
        window.cancelAnimationFrame(resetFrameRef.current);
      }
    };
  }, []);

  const goToPosition = (nextPosition: number) => {
    if (!isReady || isAnimating) return;

    setIsAnimating(true);
    setPosition(nextPosition);
  };

  const showPrev = () => {
    goToPosition(position - 1);
  };

  const showNext = () => {
    goToPosition(position + 1);
  };

  const showByDot = (targetIndex: number) => {
    if (isAnimating) return;

    goToPosition(targetIndex + 1);
  };

  const handleTrackTransitionEnd = () => {
    if (position !== 0 && position !== reviews.length + 1) {
      setIsAnimating(false);
      return;
    }

    setTransitionEnabled(false);
    setPosition(position === 0 ? reviews.length : 1);

    resetFrameRef.current = window.requestAnimationFrame(() => {
      setTransitionEnabled(true);
      setIsAnimating(false);
      resetFrameRef.current = null;
    });
  };

  const desktopOffset =
    measurements.viewportWidth > 0 && measurements.desktopCardWidth > 0
      ? measurements.viewportWidth / 2 -
        measurements.desktopCardWidth / 2 -
        position * (measurements.desktopCardWidth + DESKTOP_GAP_PX)
      : 0;

  const mobileOffset =
    measurements.viewportWidth > 0 && measurements.mobileCardWidth > 0
      ? measurements.viewportWidth / 2 -
        measurements.mobileCardWidth / 2 -
        position * (measurements.mobileCardWidth + MOBILE_GAP_PX)
      : 0;

  const desktopTrackStyle = {
    transform: `translate3d(${desktopOffset}px, 0, 0)`,
    transitionProperty: "transform",
    transitionDuration: transitionEnabled ? `${SLIDE_DURATION_MS}ms` : "0ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  } as const;

  const mobileTrackStyle = {
    transform: `translate3d(${mobileOffset}px, 0, 0)`,
    transitionProperty: "transform",
    transitionDuration: transitionEnabled ? `${SLIDE_DURATION_MS}ms` : "0ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  } as const;

  return (
    <section
      className={`mt-8 rounded-[2.5rem] px-2 py-6 lg:px-6 lg:py-8 ${
        isDarkTheme
          ? "bg-transparent shadow-none"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="mb-5 px-2 lg:px-0">
        <span className="inline-flex rounded-full bg-[var(--hero-span)] px-3 py-1 text-sm font-semibold text-[var(--design-title)]">
          {copy.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[var(--foreground)] lg:text-4xl">
          {copy.title}
        </h2>
      </div>

      <div className="relative pb-14">
        <div ref={viewportRef} className="overflow-hidden rounded-[2.25rem]">
          <div className="lg:hidden">
            <div
              ref={mobileTrackRef}
              className="flex items-stretch gap-3 will-change-transform"
              style={{
                ...mobileTrackStyle,
                opacity: isReady ? 1 : 0,
              }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {carouselItems.map((item, index) => (
                <div
                  key={`mobile-${item.key}`}
                  data-mobile-card="true"
                  className="w-[92vw] min-w-[92vw] max-w-[92vw] shrink-0"
                >
                <ReviewCard
                  review={item.review}
                  badge={copy.badge}
                  active={index === position}
                  isDarkTheme={isDarkTheme}
                />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div
              ref={desktopTrackRef}
              className="flex items-stretch gap-4 will-change-transform"
              style={{
                ...desktopTrackStyle,
                opacity: isReady ? 1 : 0,
              }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {carouselItems.map((item, index) => (
                <div
                  key={`desktop-${item.key}`}
                  data-desktop-card="true"
                  className="w-[80vw] min-w-[820px] max-w-[1060px] shrink-0"
                >
                <ReviewCard
                  review={item.review}
                  badge={copy.badge}
                  active={index === position}
                  isDarkTheme={isDarkTheme}
                />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={copy.prev}
          onClick={showPrev}
          disabled={isAnimating}
          className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-zinc-900 shadow-[0_12px_36px_rgba(15,23,42,0.18)] transition-transform hover:scale-105 disabled:opacity-60 dark:shadow-lg lg:grid"
        >
          {"\u2190"}
        </button>
        <button
          type="button"
          aria-label={copy.next}
          onClick={showNext}
          disabled={isAnimating}
          className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xl text-zinc-900 shadow-[0_12px_36px_rgba(15,23,42,0.18)] transition-transform hover:scale-105 disabled:opacity-60 dark:shadow-lg lg:grid"
        >
          {"\u2192"}
        </button>

        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-[#f1efe9] px-4 py-2 shadow-[0_10px_26px_rgba(15,23,42,0.08)] dark:bg-transparent dark:px-0 dark:py-0 dark:shadow-none">
          {reviews.map((review, index) => (
            <button
              key={`${review.name}-${index}`}
              type="button"
              aria-label={`${copy.eyebrow} ${index + 1}`}
              onClick={() => showByDot(index)}
              disabled={isAnimating}
              className={
                index === activeIndex
                  ? isDarkTheme
                    ? "inline-block h-3 w-8 shrink-0 rounded-full bg-white"
                    : "inline-block h-3 w-8 shrink-0 rounded-full bg-black"
                  : isDarkTheme
                    ? "inline-block h-3 w-3 shrink-0 rounded-full border-2 border-white bg-transparent"
                    : "inline-block h-3 w-3 shrink-0 rounded-full border-2 border-black bg-transparent"
              }
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
