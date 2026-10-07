"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import socialData from "@/data/social.json";

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub size={20} />,
  FaLinkedin: <FaLinkedin size={20} />,
  FaInstagram: <FaInstagram size={20} />,
};

export default function Footer() {
  return (
    <footer className="border-t border-secondary/20 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <Link href="/" className="font-pixel text-sm text-primary">
            Till Technologies
          </Link>

          <div className="flex items-center gap-1">
            {socialData.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-text/50 transition-colors hover:text-primary"
                aria-label={social.platform}
              >
                {iconMap[social.icon] ?? null}
              </a>
            ))}
          </div>

          <p className="text-sm text-text/40" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Ethan Tillmon
          </p>
        </div>
      </div>
    </footer>
  );
}
