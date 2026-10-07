"use client";

import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import TypewriterHeader from "./TypewriterHeader";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70svh] flex-col items-center justify-center px-4 py-16 lg:min-h-[calc(100svh-4rem)]">
      {/* Ambient grid background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(66,186,64,1) 1px, transparent 1px), linear-gradient(90deg, rgba(66,186,64,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <TypewriterHeader />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-8"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaChevronDown className="text-primary/50" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
