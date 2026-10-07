"use client";

import { motion } from "framer-motion";
import { FaMapPin } from "react-icons/fa";
import aboutData from "@/data/about.json";

export default function PlacesLived() {
  return (
    <div>
      <h2 className="mb-4 font-pixel text-sm text-primary sm:text-base">
        Places I&apos;ve Lived
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {aboutData.placesLived.map((place, i) => (
          <motion.div
            key={place.city}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 rounded-xl border border-secondary/30 bg-background/50 p-6"
          >
            <FaMapPin className="mt-1 shrink-0 text-primary" />
            <div>
              <h3 className="font-bold text-text">
                {place.city}, {place.state}
              </h3>
              <p className="text-sm text-text/50">{place.years}</p>
              {place.description && (
                <p className="mt-1 text-xs text-text/40">{place.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
