"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import navItems from "@/data/navigation.json";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const menuVariants = {
  closed: { opacity: 0, x: "100%" },
  open: { opacity: 1, x: 0 },
};

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08 },
  }),
};

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Focus lands in the menu when it opens, so keyboard users start inside it.
  useEffect(() => {
    if (isOpen) firstLink.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          id="mobile-menu"
          aria-label="Menu"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-lg md:hidden"
        >
          {navItems.map((item, i) => (
            <motion.div key={item.href} custom={i} variants={itemVariants}>
              <Link
                href={item.href}
                onClick={onClose}
                ref={i === 0 ? firstLink : undefined}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`inline-block px-4 py-2 font-pixel text-lg transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-text/70"
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
