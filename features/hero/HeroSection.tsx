"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { personal } from "@/lib/data";
import { GradientText } from "@/components/shared/GradientText";

const EASE = [0.4, 0, 0.2, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const STATS = [
  { value: "4+", label: "Years Exp" },
  { value: "IIT Roorkee", label: "2022" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[#2563eb]/[0.08] blur-[100px] dark:bg-[#3b82f6]/[0.15]" />
        <div className="animate-blob-reverse absolute -right-1/4 top-1/2 h-[500px] w-[500px] rounded-full bg-[#7c3aed]/[0.06] blur-[100px] dark:bg-[#a78bfa]/[0.12]" />
        <div className="animate-blob absolute left-1/3 bottom-0 h-[400px] w-[400px] rounded-full bg-[#06b6d4]/[0.05] blur-[100px] dark:bg-[#22d3ee]/[0.10]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-3xl space-y-8">
            {/* Status */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-text-tertiary">
                {personal.availableForWork ? "Open to work" : "Software Engineer II · GoDaddy"}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-[clamp(4rem,12vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em]">
                <GradientText>{personal.firstName}</GradientText>
                <br />
                <span className="text-text-primary">{personal.lastName}</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="max-w-lg text-lg leading-relaxed text-text-secondary sm:text-xl"
            >
              Building distributed systems,
              <br />
              AI-powered developer platforms,
              <br />
              and scalable backend infrastructure.
            </motion.p>

            {/* Company strip with logos */}
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="text-xs text-text-tertiary">Built systems at</span>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <Image src="/logos/godaddy.png" alt="GoDaddy" width={28} height={28} className="rounded-sm" />
                  <span className="text-sm font-semibold text-text-primary">GoDaddy</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Image src="/logos/dpworld.png" alt="DP World" width={28} height={28} className="rounded-sm" />
                  <span className="text-sm font-semibold text-text-primary">DP World</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Image src="/logos/iitr.png" alt="IIT Roorkee" width={28} height={28} className="rounded-sm" />
                  <span className="text-sm font-semibold text-text-primary">IIT Roorkee</span>
                </div>
              </div>
            </motion.div>

            {/* Stats strip */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5"
                >
                  <span className="font-mono text-sm font-semibold text-text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs text-text-tertiary">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
              >
                View Case Studies
                <ArrowRight size={15} />
              </Link>
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary hover:shadow-sm"
              >
                Resume
              </a>
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary hover:shadow-sm"
              >
                <ArrowUpRight size={14} />
                LinkedIn
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary hover:shadow-sm"
              >
                <Mail size={14} />
                Email
              </a>
            </motion.div>
          </div>

          {/* Profile photo */}
          <motion.div
            variants={itemVariants}
            className="relative shrink-0"
          >
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-72 lg:w-72">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] opacity-60 blur-md" />
              <Image
                src="/profile.jpeg"
                alt={personal.name}
                width={288}
                height={288}
                className="relative rounded-full border-2 border-border object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
