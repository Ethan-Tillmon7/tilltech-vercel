"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PageHeader from "./PageHeader";

interface PageContentProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageContent({
  title,
  subtitle,
  children,
}: PageContentProps) {
  const [ready, setReady] = useState(false);
  // With reduced motion there's no typing to wait for, so content shows straight away.
  const reduceMotion = useReducedMotion();
  const show = ready || reduceMotion;

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        onTypingDone={() => setReady(true)}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
