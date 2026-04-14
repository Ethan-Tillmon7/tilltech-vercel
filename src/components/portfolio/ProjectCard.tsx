"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPlay, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Badge from "@/components/common/Badge";
import GlitchText from "@/components/common/GlitchText";
import type { Project, GitHubRepoInfo } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  repoInfo?: GitHubRepoInfo;
}

export default function ProjectCard({ project, index, repoInfo }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = project.screenshots && project.screenshots.length > 1 ? project.screenshots : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      className="h-full"
    >
      <div className="h-full">
        <motion.div
          className="group flex h-full flex-col overflow-hidden rounded-xl border border-secondary/30 bg-background/50"
          whileHover={{
            y: -4,
            borderColor: "rgba(66, 186, 64, 0.5)",
            boxShadow: "0 0 25px rgba(66, 186, 64, 0.1)",
          }}
          transition={{ duration: 0.25 }}
        >
        {/* Thumbnail */}
        {project.demoUrl ? (
          <div className="relative h-48 overflow-hidden bg-secondary/10">
            <video
              src={project.demoUrl}
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:opacity-0">
              <FaPlay className="text-2xl text-primary" />
            </div>
          </div>
        ) : slides ? (
          <div className="relative h-48 overflow-hidden bg-secondary/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[slideIndex]}
                  alt={`${project.title} screenshot ${slideIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            </AnimatePresence>
            <button
              onClick={(e) => { e.preventDefault(); setSlideIndex((slideIndex - 1 + slides.length) % slides.length); }}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-primary opacity-0 transition-opacity group-hover:opacity-100"
            >
              <FaChevronLeft size={10} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setSlideIndex((slideIndex + 1) % slides.length); }}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-primary opacity-0 transition-opacity group-hover:opacity-100"
            >
              <FaChevronRight size={10} />
            </button>
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setSlideIndex(i); }}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${i === slideIndex ? "bg-primary" : "bg-text/30"}`}
                />
              ))}
            </div>
          </div>
        ) : imgError ? (
          <div className="flex h-48 items-center justify-center bg-secondary/10">
            <span className="font-pixel text-[0.6rem] text-primary/30">
              Image coming soon...
            </span>
          </div>
        ) : (
          <div className="relative h-48 overflow-hidden bg-secondary/10">
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <GlitchText text={project.title} as="h3" className="font-semibold text-text" />
            <div className="flex shrink-0 items-center gap-1.5">
              {project.status === "in-development" && (
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  In Development
                </span>
              )}
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs capitalize text-primary/70">
                {project.category}
              </span>
            </div>
          </div>

          <p className="mb-4 flex-1 text-sm leading-relaxed text-text/60">
            {project.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} label={tech} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text/50 transition-colors hover:text-primary"
              >
                <FaGithub /> Code
              </a>
            )}
            {repoInfo && repoInfo.stars > 0 && (
              <span className="flex items-center gap-1 text-sm text-text/40">
                <FaStar className="text-yellow-500" /> {repoInfo.stars}
              </span>
            )}
            {repoInfo?.language && (
              <span className="text-xs text-text/30">{repoInfo.language}</span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text/50 transition-colors hover:text-primary"
              >
                <FaExternalLinkAlt /> Live
              </a>
            )}
          </div>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}
