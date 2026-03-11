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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left column: Bio + Education + Places Lived */}
          <div className="space-y-12">
            <Bio />
            <Education />
            <PlacesLived />
          </div>

          {/* Right column: Timeline */}
          <div>
            <Timeline />
          </div>
        </div>
      </PageContent>
    </SectionWrapper>
  );
}
