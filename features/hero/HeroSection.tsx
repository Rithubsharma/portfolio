"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { personal, socialLinks } from "@/lib/data";
import { SocialIcon } from "@/components/shared/SocialIcons";

const EASE = [0.4, 0, 0.2, 1] as const;

export function HeroSection() {
  return (
    <section className="noise relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Subtle background */}
      <div className="absolute inset-0 dot-grid opacity-[0.15]" />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="max-w-3xl space-y-10"
        >
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-xs text-text-tertiary">
              {personal.availableForWork ? "Open to work" : "Software Engineer II · GoDaddy"}
            </span>
          </div>

          {/* Name */}
          <div>
            <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-text-primary">
              {personal.firstName}
              <br />
              {personal.lastName}
            </h1>
          </div>

          {/* Tagline */}
          <p className="max-w-lg text-lg leading-relaxed text-text-secondary sm:text-xl">
            Building distributed systems,
            <br />
            AI-powered developer platforms,
            <br />
            and scalable backend infrastructure.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover"
            >
              View Case Studies
              <ArrowRight size={15} />
            </Link>
            <a
              href={personal.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
            >
              Resume
            </a>
            {socialLinks
              .filter((s) => s.icon === "github" || s.icon === "linkedin")
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors duration-150 hover:text-text-primary"
                >
                  {link.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
