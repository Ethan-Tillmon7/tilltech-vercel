"use client";

import { motion } from "framer-motion";
import aboutData from "@/data/about.json";

const typeColors: Record<string, string> = {
  education: "border-primary bg-primary",
  career: "border-secondary bg-secondary",
  personal: "border-accent bg-accent",
  travel: "border-primary bg-primary",
};

export default function Timeline() {
  return (
    <div>
      <h2 className="mb-4 font-pixel text-sm text-primary sm:text-base">
        Timeline
      </h2>
      <div className="relative ml-4 border-l border-secondary/30 pl-8">
        {[...aboutData.timeline].reverse().map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            data-print-keep
            className="relative mb-10 last:mb-0"
          >
            {/* Dot */}
            <div
              className={`absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-2 ${
                typeColors[event.type] ?? "border-primary bg-primary"
              }`}
            />
            <p className="text-xs font-bold uppercase tracking-wider text-primary/70">
              {event.date}
            </p>
            <h3 className="mt-1 text-lg font-bold text-text">
              {event.title}
            </h3>
            <p className="text-sm text-text/60">{event.description}</p>
            {event.location && (
              <p className="mt-1 text-xs text-text/40">{event.location}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
