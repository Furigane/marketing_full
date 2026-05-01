"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { socialIconSrc } from "@/lib/social-icons";
import { Search } from "lucide-react";

const languages = ["ru", "en", "fr", "ar", "de"] as const;
// const navLinks = [
//   { label: "Команда", href: "/team" },
//   { label: "Услуги", href: "/services" },
//   { label: "Проекты", href: "/projects" },
//   { label: "Связаться", href: "/connect" },
// ];
const THEME_STORAGE_KEY = "site-theme";

/** Короткие подписи языков (как в макете: RU, ENG, …) */
function localeShortLabel(code: string) {
  const map: Record<string, string> = {
    ru: "RU",
    en: "ENG",
    fr: "FR",
    ar: "AR",
    de: "DE",
  };
  return map[code] ?? code.toUpperCase();
}

const SEARCH_COPY = {
  ru: {
    placeholder: "Поиск по сайту",
    submit: "Найти",
  },
  en: {
    placeholder: "Search the site",
    submit: "Search",
  },
  fr: {
    placeholder: "Recherche sur le site",
    submit: "Rechercher",
  },
  de: {
    placeholder: "Website durchsuchen",
    submit: "Suchen",
  },
  ar: {
    placeholder: "ابحث في الموقع",
    submit: "بحث",
  },
} as const;

function getLocalizedPath(locale: string, path: string) {
  return locale === "ru" ? path : `/${locale}${path}`;
}

type HeaderProps = {
  /** Фон как у секции team-surface (connect). Не подменяем --header-bg на родителе — так ломается тёмная тема. */
  matchTeamSurface?: boolean;
};

export default function Header({ matchTeamSurface = false }: HeaderProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [hoveredBreadcrumb, setHoveredBreadcrumb] = useState<string | null>(null);
  const [currentHash, setCurrentHash] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const languageRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const localeBase = String(locale).split("-")[0].toLowerCase();
  const searchCopy = SEARCH_COPY[(localeBase in SEARCH_COPY ? localeBase : "ru") as keyof typeof SEARCH_COPY];

  const navLinks = [
    {
      label: t('team'),
      href: "/main-page#specialists",
      breadcrumb: `${t("breadcrumbs.mainPage")} / ${t("breadcrumbs.specialists")}`,
    },
    {
      label: t('services'),
      href: "/main-page#services",
      breadcrumb: `${t("breadcrumbs.mainPage")} / ${t("breadcrumbs.servicesSection")}`,
    },
    {
      label: t('projects'),
      href: "/main-page#portfolio",
      breadcrumb: `${t("breadcrumbs.mainPage")} / ${t("breadcrumbs.portfolioSection")}`,
    },
    {
      label: t('blog'),
      href: "/blog",
      breadcrumb: `${t("breadcrumbs.blogPage")} / ${t("breadcrumbs.latestPosts")}`,
    },
    {
      label: t('connect'),
      href: "/contact",
      breadcrumb: `${t("breadcrumbs.contactPage")} / ${t("breadcrumbs.contactChannels")}`,
    },
  ];

  function resolveCurrentBreadcrumb() {
    const linkFromHash = navLinks.find((link) => {
      const [linkPath, linkHash = ""] = link.href.split("#");
      return linkHash && pathname === linkPath && currentHash === `#${linkHash}`;
    });

    if (linkFromHash) return linkFromHash.breadcrumb;

    const linkFromPath = navLinks.find((link) => link.href === pathname);
    if (linkFromPath) return linkFromPath.breadcrumb;

    if (pathname === "/main-page") return t("breadcrumbs.mainPage");
    if (pathname === "/team" || pathname.startsWith("/team/")) {
      return `${t("breadcrumbs.mainPage")} / ${t("team")}`;
    }
    if (pathname === "/services" || pathname.startsWith("/services/")) {
      return `${t("breadcrumbs.mainPage")} / ${t("services")}`;
    }
    if (pathname === "/projects" || pathname.startsWith("/projects/")) {
      return `${t("breadcrumbs.mainPage")} / ${t("projects")}`;
    }
    if (pathname === "/blog") {
      return `${t("breadcrumbs.blogPage")} / ${t("breadcrumbs.latestPosts")}`;
    }
    if (pathname === "/contact" || pathname === "/connect") {
      return `${t("breadcrumbs.contactPage")} / ${t("breadcrumbs.contactChannels")}`;
    }
    if (pathname === "/thank-you") {
      return `${t("breadcrumbs.contactPage")} / ${t("breadcrumbs.thankYouPage")}`;
    }

    return t("breadcrumbs.mainPage");
  }

  const activeBreadcrumb = hoveredBreadcrumb ?? resolveCurrentBreadcrumb();

  function handleLocaleChange(nextLocale: (typeof languages)[number]) {
    router.replace(pathname, { locale: nextLocale });
    setIsLanguageOpen(false);
  }

  function switchToNextLocale() {
    const currentIndex = languages.indexOf(localeBase as (typeof languages)[number]);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % languages.length;
    handleLocaleChange(languages[nextIndex]);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    const targetPath = getLocalizedPath(localeBase, "/search");
    const href = trimmed ? `${targetPath}?q=${encodeURIComponent(trimmed)}` : targetPath;

    router.push(href);
    setIsMobileMenuOpen(false);
  }


  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    const frameId = window.requestAnimationFrame(() => {
      setIsDark(shouldUseDark);
      setIsThemeReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isThemeReady) return;
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark, isThemeReady]);

  return (
    <>
      <header className="my-4 flex items-center justify-between rounded-full bg-[var(--header-bg)] px-3 py-2.5 sm:my-6 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
        <Link href="/main-page" className="flex items-center gap-3">
          <Image
            src="/svg/logo.svg"
            alt="Creative Group logo"
            width={38}
            height={38}
            className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
            priority
          />
          <h1 className="text-base leading-tight font-semibold text-[var(--foreground)] sm:text-xl lg:text-lg">
            CREATIVE GROUP
          </h1>
        </Link>

        <button
          type="button"
          className="inline-flex text-2xl text-[var(--foreground)] sm:text-3xl lg:hidden"
          aria-label="Открыть меню"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          ☰
        </button>

        <div className="hidden items-center gap-4 lg:flex">
          <nav onMouseLeave={() => setHoveredBreadcrumb(null)}>
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground)] transition-opacity duration-200 hover:opacity-80"
                    onMouseEnter={() => setHoveredBreadcrumb(link.breadcrumb)}
                    onFocus={() => setHoveredBreadcrumb(link.breadcrumb)}
                    onBlur={() => setHoveredBreadcrumb(null)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 rounded-full border border-[color:var(--foreground)]/10 bg-[var(--background)]/60 px-3 py-2"
          >
            <label htmlFor="site-search-desktop" className="sr-only">
              {searchCopy.placeholder}
            </label>
            <Search className="h-4 w-4 text-[var(--design-muted)]" aria-hidden="true" />
            <input
              id="site-search-desktop"
              name="q"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={searchCopy.placeholder}
              className="w-40 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--design-muted)] xl:w-48"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--foreground)] px-3 py-1 text-xs font-semibold text-[var(--background)] transition-opacity duration-200 hover:opacity-85"
            >
              {searchCopy.submit}
            </button>
          </form>

          <div className="flex items-center gap-2">
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                aria-expanded={isLanguageOpen}
                aria-haspopup="listbox"
                onClick={() => setIsLanguageOpen((prev) => !prev)}
                className="flex items-center justify-center gap-1.5 rounded-full px-2 py-1 text-sm text-[var(--foreground)] transition hover:opacity-90"
              >
                <span>{localeShortLabel(localeBase)}</span>
                <Image
                  src="/svg/chevron-right.svg"
                  alt=""
                  width={9}
                  height={9}
                  className={`transition-transform  items-center duration-200 dark:invert ${isLanguageOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isLanguageOpen && (
                <div
                  className={`absolute left-1/2 top-full z-30 mt-1.5 min-w-[5.5rem] -translate-x-1/2 rounded-2xl border border-[color:var(--foreground)]/12 p-1.5 shadow-sm dark:border-white/12 ${
                    matchTeamSurface ? "bg-[var(--team-surface)]" : "bg-[var(--header-bg)]"
                  }`}
                  role="listbox"
                  aria-label="Язык интерфейса"
                >
                  <ul className="flex flex-col gap-1">
                    {languages.map((lang) => {
                      const active = lang === localeBase;
                      return (
                        <li key={lang}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={active}
                            onClick={() =>
                              active ? setIsLanguageOpen(false) : handleLocaleChange(lang)
                            }
                            className={
                              active
                                ? "flex w-full items-center justify-center rounded-full border border-[var(--foreground)] px-2 py-1.5 text-xs font-medium text-[var(--foreground)] transition-all duration-200"
                                : "flex w-full items-center justify-center rounded-full border border-transparent px-2 py-1.5 text-xs font-medium text-[var(--design-muted)] transition-all duration-200 hover:border-[var(--design-btn)] hover:text-[var(--foreground)] hover:shadow-[0_0_12px_rgba(172,194,253,0.5)] dark:hover:shadow-[0_0_14px_rgba(95,119,184,0.45)]"
                            }
                          >
                            {localeShortLabel(lang)}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className={`relative flex h-10 w-20 items-center rounded-full p-1 transition-colors ${
                isDark ? "bg-indigo-300" : "bg-amber-200"
              }`}
              aria-label="Переключить тему"
              aria-pressed={isDark}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-lg transition-all duration-300 ${
                  isDark
                    ? "translate-x-10 bg-zinc-900 text-indigo-300"
                    : "translate-x-0 bg-zinc-900 text-amber-200"
                }`}
              >
                {isDark ? "☾" : "☼"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="mt-1 px-4 sm:px-5 lg:px-6">
        <p className="text-[10px] font-normal tracking-[0.16em] text-[var(--foreground)] opacity-35 sm:text-[11px]">
          {activeBreadcrumb}
        </p>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[color:var(--background)]/95 px-4 pb-6 pt-8 text-[var(--foreground)] shadow-[0_0_40px_rgba(0,0,0,0.12)] backdrop-blur-md dark:shadow-[0_0_48px_rgba(0,0,0,0.45)] sm:px-6 lg:hidden">
          <button
            type="button"
            aria-label="Закрыть меню"
            className="absolute right-6 top-6 text-3xl text-[var(--foreground)] hover:opacity-80"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>

          <nav>
            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className="mb-8 flex items-center gap-3 rounded-[24px] border border-[color:var(--foreground)]/12 bg-[var(--header-bg)] px-4 py-3"
            >
              <label htmlFor="site-search-mobile" className="sr-only">
                {searchCopy.placeholder}
              </label>
              <Search className="h-5 w-5 text-[var(--design-muted)]" aria-hidden="true" />
              <input
                id="site-search-mobile"
                name="q"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={searchCopy.placeholder}
                className="min-w-0 flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--design-muted)]"
              />
              <button
                type="submit"
                className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)]"
              >
                {searchCopy.submit}
              </button>
            </form>

            <ul className="space-y-4 text-3xl font-semibold text-[var(--foreground)]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:opacity-80"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="mt-16 inline-flex items-center gap-2 rounded-full bg-[#acc2fd] px-6 py-3 text-lg font-semibold text-[var(--hero-button)] shadow-md dark:bg-[var(--design-btn)] dark:text-zinc-100"
          >
            → Связаться с нами
          </button>

          <div className="mt-10 flex justify-center opacity-[0.18] dark:opacity-25">
            <Image
              src={
                isDark
                  ? `/img/${encodeURIComponent("Mask group (1).png")}`
                  : `/img/${encodeURIComponent("Mask group.png")}`
              }
              alt=""
              width={220}
              height={220}
            />
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[var(--foreground)]">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className={`relative flex h-10 w-20 items-center rounded-full p-1 transition-colors ${
                isDark ? "bg-indigo-300" : "bg-amber-200"
              }`}
              aria-label="Переключить тему"
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-lg transition-all duration-300 ${
                  isDark
                    ? "translate-x-10 bg-zinc-900 text-indigo-300"
                    : "translate-x-0 bg-zinc-900 text-amber-200"
                }`}
              >
                {isDark ? "☾" : "☼"}
              </span>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 text-2xl hover:opacity-80"
              onClick={switchToNextLocale}
            >
              {localeShortLabel(localeBase)}
              <Image
                src="/svg/chevron-right.svg"
                alt=""
                width={12}
                height={12}
                className="dark:invert"
              />
            </button>

            <div className="flex items-center gap-2">
              <Image
                src={socialIconSrc(isDark, "instagram")}
                alt="Instagram"
                width={24}
                height={24}
              />
              <Image
                src={socialIconSrc(isDark, "telegram")}
                alt="Telegram"
                width={24}
                height={24}
              />
              <Image
                src={socialIconSrc(isDark, "viber")}
                alt="Viber"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
