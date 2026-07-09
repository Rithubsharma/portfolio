import type { Metadata } from "next";
import { ProjectsGrid } from "@/features/projects/ProjectsGrid";
import { ContactCTA } from "@/features/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Backend systems, distributed infrastructure, and AI-powered tooling — projects built at GoDaddy, DP World, and in my own time.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsGrid />
      <ContactCTA />
    </>
  );
}
