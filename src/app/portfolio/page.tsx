import type { Metadata } from "next";
import SectionWrapper from "@/components/common/SectionWrapper";
import PageContent from "@/components/common/PageContent";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import SkillCategory from "@/components/skills/SkillCategory";
import ResumeViewer from "@/components/skills/ResumeViewer";
import skillsData from "@/data/skills.json";
import type { SkillCategory as SkillCategoryType } from "@/types";

const categories = skillsData as SkillCategoryType[];

export const metadata: Metadata = {
  title: "Portfolio | TillTechnologies.ai",
  description: "Projects, skills, and resume — Ethan Tillmon's developer toolkit.",
};

const sectionHeading = "mb-6 font-pixel text-sm text-primary sm:text-base";

export default function PortfolioPage() {
  return (
    <SectionWrapper>
      <PageContent
        title="Portfolio"
        subtitle="Projects I've built, skills in my toolkit, and my resume."
      >
        {/* Order follows the subtitle: the work leads, the résumé closes. */}
        <section aria-labelledby="projects-heading">
          <h2 id="projects-heading" className={sectionHeading}>
            Projects
          </h2>
          <ProjectGrid />
        </section>

        <section aria-labelledby="skills-heading" className="mt-16">
          <h2 id="skills-heading" className={sectionHeading}>
            Skills
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <SkillCategory key={cat.slug} category={cat} index={i} />
            ))}
          </div>
        </section>

        <section aria-labelledby="resume-heading" className="mt-16 print:hidden">
          <h2 id="resume-heading" className={sectionHeading}>
            Resume
          </h2>
          <ResumeViewer />
        </section>
      </PageContent>
    </SectionWrapper>
  );
}
