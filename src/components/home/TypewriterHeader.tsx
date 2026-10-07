"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useHydrated } from "@/hooks/useHydrated";

const FIRST = "Hello World...";
const SECOND = "Welcome to my site";
const lineClasses = "font-pixel text-base leading-relaxed text-primary sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl";

export default function TypewriterHeader() {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const [firstLineDone, setFirstLineDone] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    if (firstLineDone) {
      const timer = setTimeout(() => setShowSecondLine(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [firstLineDone]);

  // The heading lives in the server HTML; the typed lines below are decoration.
  const heading = <h1 className="sr-only">{`${FIRST} ${SECOND}`}</h1>;

  if (hydrated && reduceMotion) {
    return (
      <div className="flex flex-col items-center gap-4">
        {heading}
        <p aria-hidden="true" className={lineClasses}>{FIRST}</p>
        <p aria-hidden="true" className={lineClasses}>{SECOND}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {heading}
      {firstLineDone ? (
        <p aria-hidden="true" className={lineClasses}>{FIRST}</p>
      ) : (
        <TypeAnimation
          sequence={[FIRST, () => setFirstLineDone(true)]}
          wrapper="p"
          speed={50}
          className={lineClasses}
          cursor={true}
          aria-hidden="true"
        />
      )}
      {showSecondLine ? (
        <TypeAnimation
          sequence={[SECOND]}
          wrapper="p"
          speed={50}
          className={lineClasses}
          cursor={true}
          aria-hidden="true"
        />
      ) : (
        // Reserve the second line's height so the centered hero doesn't jump when it types in.
        <p aria-hidden="true" className={`invisible ${lineClasses}`}>
          {SECOND}
        </p>
      )}
    </div>
  );
}
