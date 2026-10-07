"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useGitHubRepos } from "@/hooks/useGitHub";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";

const projects = projectsData as Project[];
// A pill only shows when its category has projects, so no filter ever leads to an empty grid.
const categories = ["all", "professional", "personal", "academic"].filter(
  (cat) => cat === "all" || projects.some((p) => p.category === cat)
);

export default function ProjectGrid() {
  const [filter, setFilter] = useState<string>("all");
  const { repos } = useGitHubRepos();

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  if (projects.length === 0) {
    return <p className="text-sm text-text/60">Projects are on their way.</p>;
  }

  return (
    <div>
      {/* Filter buttons (hidden when there's nothing to choose between) */}
      <div className={`-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden ${categories.length < 3 ? "hidden" : ""}`}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={filter === cat}
            onClick={() => setFilter(cat)}
            className={`min-h-10 shrink-0 rounded-full px-3 py-2 text-sm capitalize transition-colors sm:px-4 ${
              filter === cat
                ? "bg-primary text-background"
                : "border border-secondary/30 text-text/60 hover:border-primary/50 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-2"
      >
        <AnimatePresence>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} repoInfo={repos[project.id]} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
