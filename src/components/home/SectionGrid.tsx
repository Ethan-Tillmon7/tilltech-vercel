"use client";

import SectionPreviewCard from "./SectionPreviewCard";

const sections = [
  {
    label: "About",
    href: "/about",
    icon: "FaUser",
    description: "Life & Education",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: "FaCode",
    description: "My Resume, Projects, & Toolkit",
  },
  {
    label: "Connect",
    href: "/contact",
    icon: "FaEnvelope",
    description: "Get in touch with me",
  },
];

export default function SectionGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, i) => (
          <SectionPreviewCard key={section.href} {...section} index={i} />
        ))}
      </div>
    </section>
  );
}
