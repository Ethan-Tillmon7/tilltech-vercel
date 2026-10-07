"use client";

import { useRef, useState } from "react";
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

const compact = new Intl.NumberFormat("en", { notation: "compact" });

// No screenshot (or the media failed to load): keep the well so rows stay even, and draw it
// as a blank screen (the hero's grid) carrying the project's name, not an apology.
function BlankWell({ title }: { title: string }) {
  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-secondary/10 px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(66,186,64,1) 1px, transparent 1px), linear-gradient(90deg, rgba(66,186,64,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <span aria-hidden="true" className="relative line-clamp-3 text-center font-pixel text-xs leading-relaxed wrap-break-word text-primary/40">
        {title}
      </span>
    </div>
  );
}

export default function ProjectCard({ project, index, repoInfo }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = project.screenshots && project.screenshots.length > 1 ? project.screenshots : null;

  const playDemo = () => {
    // play() rejects if the browser blocks it or the source fails; the overlay just stays up.
    videoRef.current?.play().catch(() => setPlaying(false));
  };
  const stopDemo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };
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
        {project.demoUrl && !videoError ? (
          // Hover plays it for a mouse; a tap (or Enter/Space) toggles it everywhere else.
          <div
            className="relative h-48 overflow-hidden bg-secondary/10 print:hidden"
            onPointerEnter={(e) => e.pointerType === "mouse" && playDemo()}
            onPointerLeave={(e) => e.pointerType === "mouse" && stopDemo()}
          >
            <video
              ref={videoRef}
              // #t=0.1 makes Safari paint a first frame instead of a black well.
              src={`${project.demoUrl}#t=0.1`}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="h-full w-full object-cover"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setVideoError(true)}
            />
            <button
              type="button"
              onClick={() => (playing ? stopDemo() : playDemo())}
              aria-label={`${playing ? "Stop" : "Play"} ${project.title} demo video`}
              className={`absolute inset-0 flex items-center justify-center transition-colors ${
                playing ? "bg-transparent" : "bg-background/30"
              }`}
            >
              <FaPlay
                aria-hidden="true"
                className={`text-2xl text-primary transition-opacity ${playing ? "opacity-0" : "opacity-100"}`}
              />
            </button>
          </div>
        ) : slides && project.screenshotLayout === "carousel" ? (
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
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            </AnimatePresence>
            {/* Arrows reveal on hover for pointers, stay visible on touch, and show on keyboard focus. */}
            <button
              onClick={(e) => { e.preventDefault(); setSlideIndex((slideIndex - 1 + slides.length) % slides.length); }}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/70 p-2.5 text-primary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setSlideIndex((slideIndex + 1) % slides.length); }}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/70 p-2.5 text-primary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <FaChevronRight size={12} />
            </button>
            <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setSlideIndex(i); }}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === slideIndex}
                  className="p-2.5"
                >
                  <span className={`block h-1.5 w-1.5 rounded-full transition-colors ${i === slideIndex ? "bg-primary" : "bg-text/30"}`} />
                </button>
              ))}
            </div>
          </div>
        ) : slides ? (
          <div className="flex h-48 gap-1 overflow-hidden bg-secondary/10">
            {slides.map((src, i) => (
              <div key={i} className="relative flex-1">
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                />
              </div>
            ))}
          </div>
        ) : imgError || project.demoUrl ? (
          <BlankWell title={project.title} />
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
          {/* Chips sit above the title so the title gets the full row and never wraps to make room. */}
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs capitalize text-primary/70">
              {project.category}
            </span>
            {project.status === "in-development" && (
              <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                In Development
              </span>
            )}
          </div>
          <GlitchText text={project.title} as="h3" className="mb-2 text-lg font-bold wrap-break-word text-text" />

          <p className="mb-4 flex-1 text-sm leading-relaxed wrap-break-word text-text/60">
            {project.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} label={tech} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 flex items-center gap-2 py-2 text-sm text-text/50 transition-colors hover:text-primary"
              >
                <FaGithub aria-hidden="true" /> Code
                <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
              </a>
            )}
            {repoInfo && repoInfo.stars > 0 && (
              <span className="flex items-center gap-1 text-sm text-text/40">
                <FaStar aria-hidden="true" className="text-yellow-500" />
                <span className="sr-only">GitHub stars:</span> {compact.format(repoInfo.stars)}
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
                className="-my-2 flex items-center gap-2 py-2 text-sm text-text/50 transition-colors hover:text-primary"
              >
                <FaExternalLinkAlt aria-hidden="true" /> Live
                <span className="sr-only"> site for {project.title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}
