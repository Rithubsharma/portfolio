import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { hobbies } from "@/lib/data";

export function HobbiesSection() {
  return (
    <section className="section bg-background-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Beyond Code
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Life outside the terminal
          </h2>
        </FadeIn>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2">
          {hobbies.map((hobby) => (
            <StaggerItem key={hobby.title}>
              <div className="flex gap-5 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-border-strong hover:shadow-md">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-2xl">
                  {hobby.icon}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-text-primary">
                    {hobby.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {hobby.description}
                  </p>
                  {"youtubeUrl" in hobby && hobby.youtubeUrl && (
                    <a
                      href={hobby.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      Watch on YouTube
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
