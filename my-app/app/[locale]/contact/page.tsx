import type { LucideIcon } from "lucide-react";
import { Mail, MessageCircleMore, Send } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Header from "../../components/headaer/header";
import Footer from "../../components/footer/footer";
import PageBottomSections from "../../components/common/page-bottom-sections";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";

type ContactKey = "email" | "whatsapp" | "telegram";

type ContactItem = {
  key: ContactKey;
  value: string;
  href: string;
  icon: LucideIcon;
  iconClassName: string;
  external?: boolean;
};

const contactItems: ContactItem[] = [
  {
    key: "email",
    value: "mailmailmy@gmail.com",
    href: "mailto:mailmailmy@gmail.com",
    icon: Mail,
    iconClassName: "bg-[#2d6df6] text-white",
  },
  {
    key: "whatsapp",
    value: "+966 50 000 0000",
    href: "https://wa.me/966500000000",
    icon: MessageCircleMore,
    iconClassName: "bg-[#21b35b] text-white",
    external: true,
  },
  {
    key: "telegram",
    value: "@clubcard",
    href: "https://t.me/clubcard",
    icon: Send,
    iconClassName: "bg-[#31a8f7] text-white",
    external: true,
  },
];

export default async function ContactPage() {
  const t = await getTranslations("connectPage");

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection
          className="mt-4"
          innerClassName="flex flex-col gap-8 !pb-6 md:!pb-8"
        >
          <Header matchTeamSurface />

          <section className="mx-auto w-full max-w-[34rem] rounded-[2rem] bg-[var(--header-bg)] px-4 py-6 shadow-[0_24px_70px_rgba(7,10,17,0.22)] sm:px-6 sm:py-8">
            <h1
              className="text-center text-2xl font-semibold tracking-[-0.02em] sm:text-[2rem]"
              style={{ color: "var(--foreground)" }}
            >
              {t("title")}
            </h1>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer noopener" : undefined}
                    className="group flex items-center gap-4 rounded-[1.4rem] bg-[#1b1d27] px-4 py-3.5 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#212431]"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconClassName}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </span>

                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs text-white/50 sm:text-sm">
                        {t(`items.${item.key}.label`)}
                      </span>
                      <span className="truncate text-base font-medium text-white sm:text-xl">
                        {item.value}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        </TeamSurfaceHeaderSection>
        <PageBottomSections />
      </main>

      <Footer />
    </>
  );
}
