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
        <section className="px-1 pb-10 pt-6 md:px-2 md:pt-8">
          <h1 className="text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl md:text-5xl">
            {isRussian ? "Портфолио" : "Portfolio"}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--design-text)] md:text-lg">
            {isRussian
              ? "Подборка клиентских кейсов с описанием выполненной работы, задействованных специалистов и услуг, которые повлияли на результат."
              : "Selected client projects with a breakdown of the work completed, the specialists involved, and the services that moved the result."}
          </p>
        </section>
      </TeamSurfaceHeaderSection>
      <Projects />
      <PageBottomSections />
      </main>
      <Footer />
    </>
  );
}
