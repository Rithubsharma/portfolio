"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialIcon } from "@/components/shared/SocialIcons";
import { personal, socialLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Background elements */}
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: Text content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary">
                <span className="relative flex h-1.5 w-1.5">
                  {personal.availableForWork ? (
                    <>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                    </>
                  ) : (
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </span>
                {personal.availableForWork ? "Open to opportunities" : "Currently @ GoDaddy"}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                {personal.firstName}{" "}
                <span className="text-accent">{personal.lastName}</span>
              </h1>
              <p className="text-xl font-medium text-text-secondary sm:text-2xl">
                {personal.role}
              </p>
            </motion.div>

            {/* Value proposition */}
            <motion.p
              variants={item}
              className="max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg"
            >
              {personal.shortBio}
            </motion.p>

            {/* Meta */}
            <motion.div variants={item} className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-text-tertiary">
                <MapPin size={13} />
                {personal.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <span className="text-sm text-text-tertiary">IIT Roorkee</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-3"
            >
              <Button size="lg" asChild>
                <Link href="/projects">
                  View Projects <ArrowRight size={16} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={personal.resumeUrl} download>
                  <Download size={16} /> Resume
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/contact">
                  Hire me
                </Link>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary"
                  aria-label={link.label}
                >
                  <SocialIcon icon={link.icon} size={16} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Avatar + floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <AvatarCard />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-xs text-text-tertiary">Scroll</span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-border to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Radial gradient glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      {/* Top-right glow */}
      <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />

      {/* Bottom-left glow */}
      <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[80px]" />
    </>
  );
}

function AvatarCard() {
  const stats = [
    { label: "Years Exp.", value: "4+" },
    { label: "Companies", value: "4" },
    { label: "Projects", value: "10+" },
  ];

  return (
    <div className="relative w-full max-w-sm">
      {/* Main card */}
      <div className="glass relative overflow-hidden rounded-2xl p-8 shadow-xl">
        {/* Avatar placeholder */}
        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-accent/10 ring-4 ring-accent/20">
          <span className="text-5xl font-bold text-accent">
            {personal.firstName.charAt(0)}{personal.lastName.charAt(0)}
          </span>
        </div>

        {/* Name + role */}
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-text-primary">{personal.name}</p>
          <p className="text-sm text-text-secondary">{personal.role}</p>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-border" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-tertiary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge: GoDaddy */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-4 top-6 glass rounded-xl px-3 py-2 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-accent/20 flex items-center justify-center">
            <span className="text-xs font-bold text-accent">G</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary">GoDaddy</p>
            <p className="text-[10px] text-text-tertiary">SDE 2 · Current</p>
          </div>
        </div>
      </motion.div>

      {/* Floating badge: IIT Roorkee */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-4 bottom-6 glass rounded-xl px-3 py-2 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-accent/20 flex items-center justify-center">
            <span className="text-xs font-bold text-accent">IIT</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary">IIT Roorkee</p>
            <p className="text-[10px] text-text-tertiary">B.Tech CS · 8.0 GPA</p>
          </div>
        </div>
      </motion.div>

      {/* Tech pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 shadow-lg"
      >
        <div className="flex items-center gap-2">
          {["Go", "Kafka", "AWS", "K8s"].map((tech, i) => (
            <span
              key={tech}
              className={cn(
                "text-xs font-mono font-medium text-text-secondary",
                i < 3 && "after:ml-2 after:content-['·'] after:text-border-strong"
              )}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
