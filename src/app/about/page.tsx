import type { Metadata } from "next";
import SectionWrapper from "@/components/common/SectionWrapper";
import PageContent from "@/components/common/PageContent";
import Bio from "@/components/about/Bio";
import Education from "@/components/about/Education";
import Timeline from "@/components/about/Timeline";
import PlacesLived from "@/components/about/PlacesLived";

export const metadata: Metadata = {
  title: "About | TillTechnologies.ai",
  description: "Learn about Ethan Tillmon — education, journey, interests, and story.",
};

export default function AboutPage() {
  return (
    <SectionWrapper>
      <PageContent title="About Me" subtitle="My story, education, and the places that shaped me.">
        {/* DOM order is the mobile reading order: who → what now → background → personal.
            On desktop the timeline spans the right column; the 1fr row absorbs any height difference. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr]">
          <div className="lg:col-start-1 lg:row-start-1">
            <Bio />
          </div>
          <div className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
            <Timeline />
          </div>
          <div className="lg:col-start-1 lg:row-start-2">
            <Education />
          </div>
          <div className="lg:col-start-1 lg:row-start-3">
            <PlacesLived />
          </div>
        </div>
      </PageContent>
    </SectionWrapper>
  );
}
