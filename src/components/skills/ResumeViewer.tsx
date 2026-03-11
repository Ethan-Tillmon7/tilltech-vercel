"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaChevronDown } from "react-icons/fa";
import Button from "@/components/common/Button";

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-secondary/30 bg-background/50"
    >
      <div className="flex items-center justify-between p-6">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3"
        >
          <h3 className="font-pixel text-xs text-primary">Resume</h3>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-primary/60"
          >
            <FaChevronDown size={12} />
          </motion.span>
        </button>
        <Button
          variant="outline"
          size="sm"
          href="/resume/Resum%C3%A9%20v1.3-PDF.pdf"
        >
          <FaDownload /> Download PDF
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="resume-iframe"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="overflow-hidden rounded-lg border border-secondary/20">
                <iframe
                  src="/resume/Resum%C3%A9%20v1.3-PDF.pdf"
                  className="h-[600px] w-full"
                  title="Resume"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
