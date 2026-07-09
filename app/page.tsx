import { HeroSection } from "@/features/hero/HeroSection";
import { FeaturedProjects } from "@/features/projects/FeaturedProjects";
import { SkillsSection } from "@/features/skills/SkillsSection";
import { RecentPosts } from "@/features/blog/RecentPosts";
import { ContactCTA } from "@/features/contact/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <SkillsSection preview />
      <RecentPosts />
      <ContactCTA />
    </>
  );
}
