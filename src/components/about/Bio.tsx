"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import aboutData from "@/data/about.json";

export default function Bio() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
    >
      <Image
        src="/images/profile/CompositePicture.png"
        alt="Ethan Tillmon"
        width={160}
        height={160}
        className="h-40 w-40 shrink-0 rounded-full border-2 border-primary/30 object-cover"
        priority
      />

      <p className="leading-relaxed text-text/80">
        {aboutData.bio}
      </p>
    </motion.div>
  );
}
