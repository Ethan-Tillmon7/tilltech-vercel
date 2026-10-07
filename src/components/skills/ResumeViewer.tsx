"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaChevronDown } from "react-icons/fa";
import Button from "@/components/common/Button";

const RESUME_URL = "/resume/Resum%C3%A9%20v1.4-PDF.pdf";
// The served file name has an accent and a version; visitors get a clean one.
const RESUME_FILENAME = "Ethan-Tillmon-Resume.pdf";

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);
  // Android Chrome and some in-app browsers can't render a PDF in a frame and show a blank box.
  const [canEmbed, setCanEmbed] = useState(true);

  const toggle = () => {
    setCanEmbed(navigator.pdfViewerEnabled !== false);
    setOpen((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-secondary/30 bg-background/50"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 p-6">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="resume-preview"
          className="-m-2 flex min-h-11 items-center gap-3 rounded-lg p-2 text-sm font-bold text-text/70 transition-colors hover:text-primary"
        >
          {open ? "Hide preview" : "Preview"}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-primary/60"
          >
            <FaChevronDown size={12} aria-hidden="true" />
          </motion.span>
        </button>
        <Button
          variant="outline"
          size="sm"
          href={RESUME_URL}
          download={RESUME_FILENAME}
        >
          <FaDownload aria-hidden="true" /> Download PDF
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="resume-iframe"
            id="resume-preview"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {canEmbed ? (
                <div className="overflow-hidden rounded-lg border border-secondary/20">
                  <iframe
                    src={RESUME_URL}
                    className="h-[min(600px,75svh)] w-full"
                    title="Ethan Tillmon's resume (PDF)"
                  />
                </div>
              ) : (
                <p className="rounded-lg border border-secondary/20 p-6 text-center text-sm text-text/70">
                  This browser can&apos;t show the PDF here.{" "}
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    Open it in a new tab
                  </a>{" "}
                  or download it above.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
