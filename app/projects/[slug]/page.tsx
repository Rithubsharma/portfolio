import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { ContactCTA } from "@/features/contact/ContactCTA";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

const categoryColors: Record<string, string> = {
  backend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ai: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  infrastructure: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  fullstack: "bg-green-500/10 text-green-400 border-green-500/20",
  "open-source": "bg-accent/10 text-accent border-accent/20",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <article className="section pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <FadeIn>
            <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2">
              <Link href="/projects">
                <ArrowLeft size={16} /> All Projects
              </Link>
            </Button>
          </FadeIn>

          {/* Hero */}
          <FadeIn delay={0.05} className="mb-12 space-y-5">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize",
                  categoryColors[project.category] ?? ""
                )}
              >
                {project.category}
              </span>
              {project.featured && (
                <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {project.title}
            </h1>

            <p className="text-lg leading-relaxed text-text-secondary">
              {project.longDescription}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View on GitHub <ExternalLink size={14} />
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo <ExternalLink size={14} />
                  </a>
                </Button>
              )}
            </div>
          </FadeIn>

          {/* Tech stack */}
          <FadeIn delay={0.1} className="mb-12">
            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border border-border bg-surface-active px-2.5 py-1 font-mono text-sm text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Case study sections */}
          <StaggerContainer className="space-y-10">
            <CaseStudySection title="The Problem" delay={0}>
              <p className="text-base leading-relaxed text-text-secondary">{project.problem}</p>
            </CaseStudySection>

            <CaseStudySection title="The Solution" delay={1}>
              <p className="text-base leading-relaxed text-text-secondary">{project.solution}</p>
            </CaseStudySection>

            <CaseStudySection title="Challenges" delay={2}>
              <ul className="space-y-3">
                {project.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                    <ChevronRight size={16} className="mt-0.5 shrink-0 text-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            <CaseStudySection title="Key Learnings" delay={3}>
              <ul className="space-y-3">
                {project.learnings.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                    <ChevronRight size={16} className="mt-0.5 shrink-0 text-accent" />
                    {l}
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            <CaseStudySection title="Impact" delay={4}>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.impact.map((m) => (
                  <div
                    key={m}
                    className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 px-4 py-3"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-success" />
                    <span className="text-sm font-medium text-text-primary">{m}</span>
                  </div>
                ))}
              </div>
            </CaseStudySection>
          </StaggerContainer>
        </div>
      </article>

      <ContactCTA />
    </>
  );
}

function CaseStudySection({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <StaggerItem>
      <div className="space-y-4">
        <h2 className="flex items-center gap-3 text-xl font-bold text-text-primary">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-xs font-bold text-accent">
            {String(delay + 1).padStart(2, "0")}
          </span>
          {title}
        </h2>
        {children}
      </div>
    </StaggerItem>
  );
}
