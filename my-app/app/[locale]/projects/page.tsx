import Footer from "../../components/footer/footer";
import Header from "../../components/headaer/header";
import Projects from "../../components/projects/projects";
import PageBottomSections from "../../components/common/page-bottom-sections";
import { TeamSurfaceHeaderSection } from "@/app/components/layout/team-surface-header";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRussian = locale.toLowerCase().startsWith("ru");

  return (
    <>
      <main className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:px-6 lg:max-w-[1400px]">
        <TeamSurfaceHeaderSection className="mt-4">
          <Header />
          <section className="pb-10 pt-6 md:pt-8">
            <div className="relative overflow-hidden rounded-[36px] border border-[color:var(--foreground)]/10 bg-[linear-gradient(135deg,rgba(245,212,140,0.14),transparent_36%),linear-gradient(220deg,rgba(172,194,253,0.18),transparent_44%),var(--workers-bg)] px-5 py-7 shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:px-7 sm:py-8 lg:px-8 lg:py-10">
              <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-[#acc2fd]/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#f2d48c]/15 blur-3xl" />

              <div className="relative">
                <div className="max-w-5xl">
                  <span className="inline-flex rounded-full border border-[color:var(--foreground)]/12 bg-[var(--background)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--design-muted)] backdrop-blur">
                    {isRussian ? "Каталог кейсов" : "Case study catalog"}
                  </span>

                  <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[0.98] tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl md:text-6xl">
                    {isRussian ? "Все компании в одном сильном портфолио" : "All companies in one strong portfolio"}
                  </h1>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
                    {isRussian
                      ? "Полный список проектов в визуально чистом каталоге: быстро просматривайте компании, ниши и стоимость, затем переходите в детальный кейс."
                      : "A visually cleaner catalog view of the full project list: scan companies, niches, and pricing fast, then open the detailed case study."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </TeamSurfaceHeaderSection>

        <Projects variant="catalog" />
        <PageBottomSections />
      </main>
      <Footer />
    </>
  );
}
