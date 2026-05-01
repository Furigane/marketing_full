import { getTranslations } from "next-intl/server";

import Header from "../../components/headaer/header";
import Footer from "../../components/footer/footer";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";

export default async function ThankYouPage() {
  const t = await getTranslations("thankYouPage");

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection
          className="mt-4"
          innerClassName="flex flex-col gap-8 !pb-6 md:!pb-8"
        >
          <Header matchTeamSurface />

          <section className="mx-auto w-full max-w-3xl rounded-[2rem] bg-[var(--header-bg)] px-6 py-12 text-center shadow-[0_24px_70px_rgba(7,10,17,0.22)] sm:px-10 sm:py-16">
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)] sm:text-[2.4rem] sm:leading-tight">
              {t("message")}
            </h1>
          </section>
        </TeamSurfaceHeaderSection>
      </main>

      <Footer />
    </>
  );
}
