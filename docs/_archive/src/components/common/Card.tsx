"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  href,
  hoverable = true,
}: CardProps) {
  const content = (
    <motion.div
      className={`rounded-xl border border-secondary/30 bg-background/50 p-6 backdrop-blur-sm ${className}`}
      whileHover={
        hoverable
          ? {
              y: -4,
              borderColor: "rgba(66, 186, 64, 0.5)",
              boxShadow: "0 0 20px rgba(66, 186, 64, 0.15)",
            }
          : undefined
      }
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
