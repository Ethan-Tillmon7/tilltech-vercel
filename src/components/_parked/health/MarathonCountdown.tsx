"use client";

import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { useCountdown } from "@/hooks/useCountdown";

const MARATHON_DATE = "2026-02-28T07:00:00";
const MARATHON_NAME = "The Woodlands Marathon";

export default function MarathonCountdown() {
  const { days, hours, minutes, seconds, isPast } =
    useCountdown(MARATHON_DATE);

  if (isPast) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center"
      >
        <FaTrophy className="mx-auto mb-4 text-4xl text-primary" />
        <h2 className="font-pixel text-sm text-primary sm:text-base">
          Marathon Completed!
        </h2>
        <p className="mt-2 text-text/60">{MARATHON_NAME} — February 28, 2026</p>
      </motion.div>
    );
  }

  const blocks = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="rounded-xl border border-secondary/30 bg-background/50 p-8 text-center"
    >
      <h2 className="mb-2 font-pixel text-xs text-primary sm:text-sm">
        Countdown
      </h2>
      <p className="mb-6 text-sm text-text/60">{MARATHON_NAME}</p>

      <div className="flex justify-center gap-4">
        {blocks.map((block) => (
          <div key={block.label} className="min-w-[4.5rem]">
            <div className="rounded-lg bg-secondary/20 px-3 py-4 font-pixel text-xl text-primary sm:text-2xl">
              {String(block.value).padStart(2, "0")}
            </div>
            <p className="mt-2 text-xs text-text/40">{block.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
