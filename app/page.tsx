import { Hero } from "@/features/hero/Hero";
import { About } from "@/features/about/About";
import { Experience } from "@/features/experience/Experience";
import { Work } from "@/features/work/Work";
import { Skills } from "@/features/skills/Skills";
import { Contact } from "@/features/contact/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Contact />
    </>
  );
}
