"use client";

import { motion } from "framer-motion";
import Badge from "@/components/common/Badge";
import type { SkillCategory as SkillCategoryType } from "@/types";

interface SkillCategoryProps {
  category: SkillCategoryType;
  index: number;
}

export default function SkillCategory({ category, index }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="mb-3 font-pixel text-xs text-text/70">{category.name}</h3>
      <ul className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <Badge label={skill.name} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
