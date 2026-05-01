"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { getLocalizedCaseStudies } from "@/lib/case-studies";

export default function Projects() {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const projects = getLocalizedCaseStudies(locale);

  return (
    <section className="mt-8 min-w-0 px-4 py-6 lg:px-8 lg:py-8" id="portfolio">
      <h2 className="text-3xl font-bold text-[var(--foreground)] lg:text-4xl">{t("title")}</h2>
      <div className="mb-6 flex items-center justify-center lg:mb-8 lg:justify-end">
        <Link
          href="/projects"
          className="hidden items-center gap-2 rounded-full bg-[#f2d48c] px-5 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-[#ebc873] lg:inline-flex"
        >
          <span aria-hidden>{"\u2197"}</span>
          {t("allProjects")}
        </Link>
      </div>

      <div className="relative w-full min-w-0">
        <div className="overflow-x-auto overflow-y-visible overscroll-x-contain lg:overflow-visible">
          <div className="flex w-max snap-x snap-mandatory gap-4 pb-2 lg:grid lg:w-full lg:grid-cols-4 lg:overflow-visible lg:pb-0">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id}
                className="min-w-[260px] snap-start rounded-3xl bg-[var(--workers-bg)] shadow transition-all duration-300 ease-out will-change-transform hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] lg:min-w-0"
              >
                <div className="relative h-44 w-full rounded-b-3xl rounded-t-3xl">
                  <Image
                    src={project.image}
                    alt={project.content.card.title}
                    fill
                    className="rounded-t-3xl object-cover"
                  />
                  <span className="absolute right-2 top-0 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#1e1e1e] px-3 py-1.5 text-xs font-semibold text-[#FDE3AC] lg:right-3 lg:px-4 lg:py-2 lg:text-sm">
                    {project.content.card.category}
                  </span>
                </div>

                <div className="p-4 lg:p-5">
                  <h3 className="mb-2 text-xl font-bold text-[var(--foreground)] lg:text-2xl">
                    {project.content.card.title}
                  </h3>
                  <p className="mb-4 text-lg font-medium leading-9 text-zinc-500 lg:mb-5">
                    {project.content.card.description}
                  </p>

                  <div className="flex items-end justify-between gap-2">
                    <div className="flex items-center gap-2 rounded-2xl bg-[var(--projects-span-bg)] px-4 py-2">
                      <p className="text-sm text-zinc-400 lg:text-sm">{t("priceLabel")}</p>
                      <p className="text-xl font-medium text-[var(--foreground)] lg:text-2xl">
                        {project.content.card.price}
                      </p>
                    </div>
                    <span
                      className="grid h-12 w-12 place-items-center rounded-full bg-[#9ab5f6] text-4xl text-zinc-800 lg:h-10 lg:w-10 lg:text-2xl"
                      aria-label={t("openProject")}
                    >
                      <span aria-hidden>{"\u2197"}</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label={t("prevSlide")}
          className="absolute -left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow lg:grid"
        >
          <span aria-hidden>{"\u2190"}</span>
        </button>
        <button
          type="button"
          aria-label={t("nextSlide")}
          className="absolute -right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow lg:grid"
        >
          <span aria-hidden>{"\u2192"}</span>
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="h-3 w-8 rounded-full bg-zinc-900" />
        <span className="h-3 w-3 rounded-full border-2 border-zinc-900" />
        <span className="h-3 w-3 rounded-full border-2 border-zinc-900" />
      </div>
    </section>
  );
}
