import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { ArrowRight, Clock3, Mail, MessageCircleMore, Send } from "lucide-react";
import { getTranslations } from "next-intl/server";

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Header from "../../components/headaer/header";
import Faq from "../../components2/faq/faq";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";
import { buildMetaDescription, buildMetaTitle, buildPageMetadata } from "@/lib/seo";

type ContactKey = "email" | "whatsapp" | "telegram";

type ContactItem = {
  key: ContactKey;
  value: string;
  href: string;
  icon: LucideIcon;
  accentClassName: string;
  external?: boolean;
};

const contactItems: ContactItem[] = [
  {
    key: "email",
    value: "mailmailmy@gmail.com",
    href: "mailto:mailmailmy@gmail.com",
    icon: Mail,
    accentClassName:
      "from-[#2d6df6]/25 via-[#2d6df6]/12 to-transparent text-[#8cb0ff] ring-[#2d6df6]/25",
  },
  {
    key: "whatsapp",
    value: "+966 50 000 0000",
    href: "https://wa.me/966500000000",
    icon: MessageCircleMore,
    accentClassName:
      "from-[#21b35b]/25 via-[#21b35b]/12 to-transparent text-[#61de90] ring-[#21b35b]/25",
    external: true,
  },
  {
    key: "telegram",
    value: "@clubcard",
    href: "https://t.me/clubcard",
    icon: Send,
    accentClassName:
      "from-[#31a8f7]/25 via-[#31a8f7]/12 to-transparent text-[#8ed3ff] ring-[#31a8f7]/25",
    external: true,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "connectPage" });

  return buildPageMetadata({
    locale,
    path: "/contact",
    title: buildMetaTitle(t("title"), "Creative Group"),
    description: buildMetaDescription(t("description")),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("connectPage");

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection
          className="mt-4"
          innerClassName="flex flex-col gap-10 !pb-6 md:!pb-8"
        >
          <Header matchTeamSurface />

          <section className="relative overflow-hidden rounded-[2rem] border border-[color:var(--foreground)]/10 bg-[linear-gradient(135deg,rgba(245,212,140,0.14),transparent_28%),linear-gradient(220deg,rgba(124,159,247,0.18),transparent_46%),var(--workers-bg)] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:p-6 lg:p-8">
            <div className="absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-[#f5d48c]/18 blur-3xl" />
            <div className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-[#7c9ff7]/16 blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--design-muted)] backdrop-blur">
                  {t("eyebrow")}
                </span>

                <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-[1.04] tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
                  {t("title")}
                </h1>

                <p className="mt-4 max-w-xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                  {t("description")}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/78 px-4 py-2 text-sm font-medium text-[var(--foreground)] backdrop-blur">
                    <Clock3 className="h-4 w-4 text-[#7c9ff7]" />
                    {t("availability")}
                  </div>
                  <a
                    href="#contact-form"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--design-btn)] px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-[var(--design-btn-hover)] dark:text-zinc-100"
                  >
                    {t("formCta")}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-6 grid gap-3">
                  {contactItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer noopener" : undefined}
                        className="group relative overflow-hidden rounded-[1.6rem] border border-[color:var(--foreground)]/10 bg-[var(--background)]/82 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-[#7c9ff7]/35"
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accentClassName} ring-1`}
                          >
                            <Icon className="h-5 w-5" strokeWidth={2.1} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-xs uppercase tracking-[0.18em] text-[var(--design-muted)]">
                              {t(`items.${item.key}.label`)}
                            </span>
                            <span className="mt-1 block truncate text-lg font-semibold text-[var(--foreground)]">
                              {item.value}
                            </span>
                          </span>

                          <ArrowRight className="h-4 w-4 shrink-0 text-[var(--design-muted)] transition group-hover:text-[#7c9ff7]" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.9rem] border border-[color:var(--foreground)]/10 bg-[var(--background)]/84 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.1)] backdrop-blur sm:p-6">
                <div className="rounded-[1.6rem] border border-[color:var(--foreground)]/8 bg-[var(--services-bg)] p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--design-muted)]">
                    {t("panelLabel")}
                  </p>
                  <p className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-[2rem]">
                    {t("panelTitle")}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--design-text)] sm:text-base">
                    {t("panelDescription")}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.3rem] border border-[color:var(--foreground)]/10 bg-[var(--background)]/84 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--design-muted)]">
                        {t("items.telegram.label")}
                      </p>
                      <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                        @clubcard
                      </p>
                    </div>
                    <div className="rounded-[1.3rem] border border-[color:var(--foreground)]/10 bg-[var(--background)]/84 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--design-muted)]">
                        {t("items.whatsapp.label")}
                      </p>
                      <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
                        +966 50 000 0000
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#contact-form"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--design-btn)] px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-[var(--design-btn-hover)] dark:text-zinc-100"
                    >
                      {t("formCta")}
                    </a>
                    <a
                      href="https://t.me/clubcard"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/88 px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#7c9ff7]"
                    >
                      {t("directCta")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Card embedded sectionId="contact-form" />
        </TeamSurfaceHeaderSection>

        <Faq />
      </main>

      <Footer />
    </>
  );
}
