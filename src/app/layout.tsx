import type { Metadata } from "next";
import { Lato, Press_Start_2P } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/common/PageTransition";
import Analytics from "@/components/common/Analytics";
import MotionProvider from "@/components/common/MotionProvider";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import "./globals.css";

// Self-hosted at build time: no render-blocking request to Google, and no fallback to a
// stranger's font if fonts.googleapis.com is slow or blocked.
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato-src",
});
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel-src",
});

export const metadata: Metadata = {
  title: "TillTechnologies.ai | Ethan Tillmon",
  description:
    "Portfolio of Ethan Tillmon — Software Engineer, Builder, Runner",
  keywords: [
    "portfolio",
    "software engineer",
    "Ethan Tillmon",
    "TillTechnologies",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${pressStart.variable}`}>
      <body className="bg-background text-text font-lato antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-bold focus:text-background"
        >
          Skip to content
        </a>
        <Analytics />
        <div className="bg-particles" aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span /><span />
        </div>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="min-h-screen pt-16 outline-none">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </MotionProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
}
