import type { Metadata } from "next";
import SectionWrapper from "@/components/common/SectionWrapper";
import PageContent from "@/components/common/PageContent";
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";

export const metadata: Metadata = {
  title: "Connect | TillTechnologies.ai",
  description: "Get in touch with Ethan Tillmon.",
};

export default function ContactPage() {
  return (
    <SectionWrapper>
      <PageContent
        title="Connect"
        subtitle="Get in touch — let's build something together."
      >
        <ContactForm />
        <div className="mt-12">
          <SocialLinks />
        </div>
      </PageContent>
    </SectionWrapper>
  );
}
