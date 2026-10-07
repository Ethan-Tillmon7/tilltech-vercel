"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import socialData from "@/data/social.json";

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub size={28} />,
  FaLinkedin: <FaLinkedin size={28} />,
  FaInstagram: <FaInstagram size={28} />,
};

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-2">
      {socialData.map((social, i) => (
        <motion.a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.2, color: "#42ba40" }}
          className="p-2 text-text/50 transition-colors hover:text-primary"
          aria-label={social.platform}
        >
          {iconMap[social.icon] ?? null}
        </motion.a>
      ))}
    </div>
  );
}
