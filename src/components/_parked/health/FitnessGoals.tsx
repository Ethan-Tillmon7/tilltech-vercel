"use client";

import { motion } from "framer-motion";
import { FaCheck, FaBullseye } from "react-icons/fa";
import type { FitnessGoal } from "@/types";

const goals: FitnessGoal[] = [
  {
    id: "1",
    title: "Complete First Marathon",
    target: "26.2 miles",
    deadline: "Feb 28, 2025",
    completed: true,
  },
  {
    id: "2",
    title: "Run 1,000 Miles in 2025",
    target: "1,000 mi",
    current: "In Progress",
    completed: false,
  },
  {
    id: "3",
    title: "Complete a Half Iron Man",
    target: "70.3 miles",
    completed: false,
  },
];

export default function FitnessGoals() {
  return (
    <div>
      <h2 className="mb-6 font-pixel text-xs text-primary sm:text-sm">
        2026 Fitness Goals
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal, i) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border p-5 ${
              goal.completed
                ? "border-primary/30 bg-primary/5"
                : "border-secondary/30 bg-background/50"
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              {goal.completed ? (
                <FaCheck className="text-primary" />
              ) : (
                <FaBullseye className="text-text/40" />
              )}
              <h3 className="font-semibold text-text">{goal.title}</h3>
            </div>
            <p className="text-sm text-text/50">Target: {goal.target}</p>
            {goal.current && (
              <p className="text-sm text-primary/70">{goal.current}</p>
            )}
            {goal.deadline && (
              <p className="text-xs text-text/40">{goal.deadline}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
