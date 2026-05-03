"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { buildAbsoluteUrl } from "@/lib/seo";

type BreadcrumbItem = {
  href: string;
  label: string;
};

function humanizeSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function SiteBreadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header");
  const topLevelLabels: Record<string, string> = {
    "": t("breadcrumbs.mainPage"),
    "main-page": t("breadcrumbs.mainPage"),
    team: t("team"),
    services: t("services"),
    projects: t("projects"),
    blog: t("blog"),
    contact: t("connect"),
    connect: "Sitemap",
    privacy: "Privacy policy",
    search: "Search",
    "thank-you": t("breadcrumbs.thankYouPage"),
  };

  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const segments = cleanPath === "/" ? [] : cleanPath.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ href: "/", label: t("breadcrumbs.mainPage") }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    items.push({
      href: currentPath,
      label: topLevelLabels[segment] ?? humanizeSlug(segment),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: buildAbsoluteUrl(locale, item.href),
    })),
  };

  return (
    <div className="mt-1 px-4 sm:px-5 lg:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[10px] font-normal tracking-[0.16em] text-[var(--foreground)] opacity-55 sm:text-[11px]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="font-semibold text-[var(--foreground)]">{item.label}</span>
                ) : (
                  <Link href={item.href} className="transition-opacity hover:opacity-100">
                    {item.label}
                  </Link>
                )}
                {!isLast ? <span aria-hidden>/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
