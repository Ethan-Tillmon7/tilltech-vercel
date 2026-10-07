"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import navItems from "@/data/navigation.json";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // The menu remembers the page it was opened on, so any navigation (a link, the back
  // button) closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const pathname = usePathname();
  const isMobileOpen = openOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll(); // a reload can land mid-page
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // While the overlay is open: lock page scroll, take the page behind it out of the tab
  // order, close on Escape, and close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!isMobileOpen) return;

    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    behind.forEach((el) => (el.inert = true));
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setOpenOn(null);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      behind.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-secondary/20 bg-background/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-pixel text-lg text-primary transition-colors hover:text-accent">
            TT<span className="sr-only"> – TillTechnologies home</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-4 md:flex">
            {navItems
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`px-2 py-3 text-sm transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-text/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
          </div>

          {/* Mobile hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpenOn(isMobileOpen ? null : pathname)}
            className="-mr-2.5 p-2.5 text-text transition-colors hover:text-primary md:hidden"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            {isMobileOpen ? <FaTimes size={22} aria-hidden="true" /> : <FaBars size={22} aria-hidden="true" />}
          </button>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setOpenOn(null)}
        pathname={pathname}
      />
    </>
  );
}
