"use client";

import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

export default function TypewriterHeader() {
  const [firstLineDone, setFirstLineDone] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    if (firstLineDone) {
      const timer = setTimeout(() => setShowSecondLine(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [firstLineDone]);

  return (
    <div className="flex flex-col items-center gap-4">
      {firstLineDone ? (
        <h1 className="font-pixel text-base leading-relaxed text-primary sm:text-xl md:text-2xl lg:text-3xl">
          Hello World...
        </h1>
      ) : (
        <TypeAnimation
          sequence={[
            "Hello World...",
            () => setFirstLineDone(true),
          ]}
          wrapper="h1"
          speed={50}
          className="font-pixel text-base leading-relaxed text-primary sm:text-xl md:text-2xl lg:text-3xl"
          cursor={true}
        />
      )}
      {showSecondLine && (
        <TypeAnimation
          sequence={["Welcome to my site"]}
          wrapper="h2"
          speed={50}
          className="font-pixel text-base leading-relaxed text-primary sm:text-xl md:text-2xl lg:text-3xl"
          cursor={true}
        />
      )}
    </div>
  );
}
