import type { Metadata } from "next";
import { AboutHero } from "@/features/about/AboutHero";
import { StrengthsSection } from "@/features/about/StrengthsSection";
import { SkillsSection } from "@/features/skills/SkillsSection";
import { EducationSection } from "@/features/about/EducationSection";
import { HobbiesSection } from "@/features/about/HobbiesSection";
import { ContactCTA } from "@/features/contact/ContactCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Development Engineer with 4+ years building distributed systems and cloud-native applications. IIT Roorkee graduate.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StrengthsSection />
      <SkillsSection />
      <EducationSection />
      <HobbiesSection />
      <ContactCTA />
    </>
  );
}
