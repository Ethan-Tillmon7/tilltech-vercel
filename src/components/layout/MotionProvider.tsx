"use client";

import { MotionConfig } from "framer-motion";

/** Honors the OS "reduce motion" setting for every Framer animation: slides and lifts drop, fades stay. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
