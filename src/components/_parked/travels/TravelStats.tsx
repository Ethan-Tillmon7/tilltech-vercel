"use client";

import { motion } from "framer-motion";
import travelsData from "@/data/travels.json";

export default function TravelStats() {
  const countryCount = travelsData.countries.length;
  const stateCount = travelsData.usStates.length;

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 sm:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-primary/20 bg-background/80 p-6 text-center backdrop-blur-sm"
      >
        <p className="font-pixel text-2xl text-primary sm:text-4xl">
          {countryCount}
        </p>
        <p className="mt-2 text-sm text-text/70 sm:text-base">
          Countries Visited
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-xl border border-primary/20 bg-background/80 p-6 text-center backdrop-blur-sm"
      >
        <p className="font-pixel text-2xl text-primary sm:text-4xl">
          {stateCount}
        </p>
        <p className="mt-2 text-sm text-text/70 sm:text-base">
          US States Visited
        </p>
      </motion.div>
    </div>
  );
}
