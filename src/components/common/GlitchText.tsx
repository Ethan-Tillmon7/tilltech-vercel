"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "span",
}: GlitchTextProps) {
  // null while idle, so the real text always shows unless a scramble is running.
  const [display, setDisplay] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotion = useReducedMotion();

  // Stop a scramble in flight if the card unmounts (e.g. a filter change) or the text changes.
  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
  }, [text]);

  const glitch = useCallback(() => {
    if (timer.current || reduceMotion) return;

    // Array.from splits by code point, so emoji and accented letters aren't torn in half.
    const original = Array.from(text);
    const duration = 400;
    const interval = 30;
    const steps = Math.floor(duration / interval);
    let step = 0;

    timer.current = setInterval(() => {
      step++;
      const progress = step / steps;

      // Progressively reveal the real characters from left to right
      const resolved = Math.floor(progress * original.length);
      const scrambled = original
        .map((char, i) => {
          if (/\s/.test(char)) return char;
          if (i < resolved) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");

      setDisplay(scrambled);

      if (step >= steps) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        setDisplay(null);
      }
    }, interval);
  }, [text, reduceMotion]);

  return (
    <Tag className={className} onMouseEnter={glitch}>
      {/* Assistive tech always gets the real title, never the scramble. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display ?? text}</span>
    </Tag>
  );
}
