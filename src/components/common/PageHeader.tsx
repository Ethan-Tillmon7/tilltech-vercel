"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useHydrated } from "@/hooks/useHydrated";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onTypingDone?: () => void;
}

export default function PageHeader({
  title,
  subtitle,
  onTypingDone,
}: PageHeaderProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const [typingDone, setTypingDone] = useState(false);
  const showSubtitle = typingDone || (hydrated && reduceMotion);

  return (
    <div className="mb-12 text-center">
      <h1 className="font-pixel text-2xl wrap-break-word text-primary sm:text-3xl md:text-4xl">
        {/* The real title is in the server HTML for crawlers and screen readers; the typing is decoration. */}
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          {!hydrated ? (
            <>&nbsp;</>
          ) : reduceMotion ? (
            title
          ) : (
            <TypeAnimation
              sequence={[
                title,
                () => {
                  setTypingDone(true);
                  onTypingDone?.();
                },
              ]}
              wrapper="span"
              speed={50}
              cursor={true}
            />
          )}
        </span>
      </h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
          className="mt-4 text-lg text-text/70"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
