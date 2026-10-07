"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useGitHubRepos } from "@/hooks/useGitHub";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";

const projects = projectsData as Project[];
const categories = ["all", "professional", "personal", "academic"] as const;

export default function ProjectGrid() {
  const [filter, setFilter] = useState<string>("all");
  const { repos } = useGitHubRepos();

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2 sm:gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`min-h-10 rounded-full px-3 py-2 text-sm capitalize transition-colors sm:px-4 ${
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
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
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
