"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { getLocalizedCaseStudies } from "@/lib/case-studies";

type ProjectsProps = {
  variant?: "featured" | "catalog";
};

export default function Projects({ variant = "featured" }: ProjectsProps) {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const projects = getLocalizedCaseStudies(locale);
  const isCatalog = variant === "catalog";

  if (isCatalog) {
    return (
      <section className="min-w-0 pb-4 px-4 pt-6 lg:px-8 lg:pt-8" id="projects">
        <div className="relative mb-8 overflow-hidden rounded-[36px] border border-[color:var(--foreground)]/10 bg-[linear-gradient(135deg,rgba(245,212,140,0.14),transparent_34%),linear-gradient(220deg,rgba(172,194,253,0.16),transparent_42%),var(--workers-bg)] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-6 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-stretch lg:gap-8 lg:p-7">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#acc2fd]/20 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-[#f2d48c]/15 blur-3xl" />

          <div className="relative space-y-4">
            <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--foreground)]/10 bg-[var(--background)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--design-muted)] backdrop-blur">
              Portfolio
            </span>

            <div className="space-y-3">
              <h2 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--foreground)] sm:text-3xl lg:text-[42px]">
                {locale.toLowerCase().startsWith("ru")
                  ? "Подборка компаний, с которыми уже есть измеримый результат"
                  : "A curated company list built around measurable results"}
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-[var(--design-text)] sm:text-base">
                {locale.toLowerCase().startsWith("ru")
                  ? "Каждая карточка ведёт в полноценный кейс: что делали, какие специалисты участвовали и за счёт каких услуг проект дал результат."
                  : "Each card opens a full case study showing what was done, which specialists were involved, and which services moved the outcome."}
              </p>
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-2 gap-3 lg:mt-0 lg:grid-cols-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[28px] border border-[color:var(--foreground)]/8 bg-[var(--background)]/85 px-4 py-4 text-center backdrop-blur">
                <p className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">{projects.length}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--design-muted)]">
                  {locale.toLowerCase().startsWith("ru") ? "Компании" : "Companies"}
                </p>
              </div>
              <div className="rounded-[28px] bg-[#f2d48c] px-4 py-4 text-center text-zinc-900">
                <p className="text-3xl font-extrabold tracking-tight">2</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-700">
                  {locale.toLowerCase().startsWith("ru") ? "В ряд" : "Per row"}
                </p>
              </div>
            </div>

            <div className="col-span-2 rounded-[28px] border border-[color:var(--foreground)]/8 bg-[var(--background)]/70 px-4 py-4 backdrop-blur lg:col-span-1">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--design-muted)]">
                {locale.toLowerCase().startsWith("ru") ? "Формат каталога" : "Catalog format"}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--design-text)]">
                {locale.toLowerCase().startsWith("ru")
                  ? "Быстрый просмотр портфолио без перегруза: сначала компания и ниша, потом цена и переход в детальный разбор."
                  : "Fast portfolio scanning without clutter: company and niche first, then price and a clear path into the full breakdown."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-7">
          {projects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.id}
              className="group relative overflow-hidden rounded-[34px] border border-[color:var(--foreground)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%),var(--workers-bg)] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1.5 hover:border-[#acc2fd]/30 hover:shadow-[0_28px_90px_rgba(15,23,42,0.18)] sm:p-5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(172,194,253,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(245,213,141,0.2),transparent_32%)] opacity-80 transition duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--background)]/92 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--design-muted)] backdrop-blur">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--design-btn)]" />
                    <span>{project.content.card.category}</span>
                  </div>

                  <span className="inline-flex rounded-full border border-[#0f62fe]/20 bg-[#0f62fe]/8 px-3 py-1.5 text-xs font-semibold text-[#87aaf8] dark:border-[#9ab5f6]/30 dark:bg-[#9ab5f6]/10 dark:text-[#c7d6ff]">
                    {locale.toLowerCase().startsWith("ru") ? "Открыть кейс" : "Open case"}
                  </span>
                </div>

                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[28px]">
                  <Image
                    src={project.image}
                    alt={project.content.card.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/8 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                        {locale.toLowerCase().startsWith("ru") ? "Компания" : "Company"}
                      </p>
                      <p className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                        {project.content.card.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-1 pb-1">
                  <div className="space-y-2">
                    <p className="text-sm leading-7 text-[var(--design-text)] sm:text-base">
                      {project.content.card.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-[28px] border border-[color:var(--foreground)]/8 bg-[var(--background)]/88 px-4 py-3.5 backdrop-blur">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--design-muted)]">
                        {t("priceLabel")}
                      </p>
                      <p className="mt-1 truncate text-lg font-bold text-[var(--foreground)] sm:text-xl">
                        {project.content.card.price.replace(/\bEUR\b/g, "€")}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-[#acc2fd] px-4 py-2.5 text-sm font-semibold text-zinc-900 transition duration-300 group-hover:translate-x-1 group-hover:bg-[#9fb8fc]">
                      <span>{locale.toLowerCase().startsWith("ru") ? "Смотреть" : "View"}</span>
                      <span aria-hidden>{"\u2197"}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

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
