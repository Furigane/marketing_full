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
      <div className="mb-6 flex items-center justify-between gap-4 lg:mb-8">
        <h2 className="text-3xl font-bold text-[var(--foreground)] lg:text-4xl">
          {t("title")}
        </h2>

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
                className="flex min-w-[260px] snap-start flex-col overflow-hidden rounded-3xl bg-[var(--workers-bg)] shadow transition-all duration-300 ease-out will-change-transform hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] lg:min-w-0"
              >
                <div className="relative h-44 w-full overflow-hidden rounded-t-3xl">
                  <Image
                    src={project.image}
                    alt={project.content.card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 260px, 25vw"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />

                  <span className="absolute right-3 top-3 max-w-[calc(100%-24px)] truncate whitespace-nowrap rounded-full bg-[#1e1e1e] px-3 py-1.5 text-xs font-semibold text-[#FDE3AC] shadow-[0_4px_18px_rgba(0,0,0,0.25)] lg:px-4 lg:py-2 lg:text-sm">
                    {project.content.card.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 lg:p-5">
                  <h3 className="mb-2 text-xl font-bold leading-tight text-[var(--foreground)] lg:text-2xl">
                    {project.content.card.title}
                  </h3>

                  <p className="mb-5 text-base font-medium leading-7 text-zinc-500 lg:text-lg lg:leading-8">
                    {project.content.card.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-2xl bg-[var(--projects-span-bg)] px-3 py-3">
                      <p className="shrink-0 text-xs leading-none text-zinc-400 lg:text-sm">
                        {t("priceLabel")}
                      </p>

    <p className="min-w-0 whitespace-nowrap text-[20px] font-medium leading-none text-[var(--foreground)] lg:text-[22px]">
      {project.content.card.price.replace(/\bEUR\b/g, "€")}
    </p>
  </div>

                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#9ab5f6] text-xl text-zinc-800"
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
