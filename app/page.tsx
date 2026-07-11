import { HeroSection } from "@/features/hero/HeroSection";
import { FeaturedProjects } from "@/features/projects/FeaturedProjects";
import { SkillsSection } from "@/features/skills/SkillsSection";
import { RecentPosts } from "@/features/blog/RecentPosts";
import { ContactCTA } from "@/features/contact/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="section-divider" />
      <FeaturedProjects />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />
      <RecentPosts />
      <div className="section-divider" />
      <ContactCTA />
    </>
  );
}
