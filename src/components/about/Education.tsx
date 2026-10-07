"use client";

import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import aboutData from "@/data/about.json";

export default function Education() {
  return (
    <div>
      <h2 className="mb-4 font-pixel text-sm text-primary sm:text-base">
        Education
      </h2>
      <div className="space-y-6">
        {aboutData.education.map((edu, i) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-xl border border-secondary/30 bg-background/50 p-6"
          >
            <div className="flex items-start gap-4">
              <FaGraduationCap className="mt-1 shrink-0 text-primary" size={24} />
              <div>
                <h3 className="text-lg font-bold text-text">{edu.institution}</h3>
                <p className="text-text/70">
                  {edu.degree} in {edu.field}
                </p>
                <p className="text-sm text-text/50">
                  {edu.startYear}–{edu.endYear ?? "Present"} &middot; {edu.location}
                </p>
                {edu.highlights && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
