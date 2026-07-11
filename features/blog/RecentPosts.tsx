import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function RecentPosts() {
  const recent = blogPosts.filter((p) => p.published).slice(0, 3);

  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <SectionHeader
            eyebrow="Writing"
            title="Latest Posts"
            description="Thoughts on distributed systems, backend engineering, and the craft of building reliable software."
            align="left"
          />
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/writing">
              All posts <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-accent/50 via-border to-border" />

          {recent.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group relative flex gap-6 py-6 pl-10"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-8 h-[14px] w-[14px] rounded-full border-2 border-accent/50 bg-background transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_0_8px_var(--accent)]" />

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-base font-semibold text-text-primary transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs text-text-tertiary">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readingTime}
                    </span>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-surface px-1.5 py-0.5 text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/writing">
              View all posts <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
