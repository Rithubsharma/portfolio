import type { Metadata } from "next";
import { ExperienceTimeline } from "@/features/experience/ExperienceTimeline";
import { EducationSection } from "@/features/about/EducationSection";
import { ContactCTA } from "@/features/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "4+ years of software engineering experience at GoDaddy and DP World — building distributed systems, Kafka pipelines, and AI-powered infrastructure.",
};

export default function ExperiencePage() {
  return (
    <>
      <ExperienceTimeline />
      <EducationSection />
      <ContactCTA />
    </>
  );
}
