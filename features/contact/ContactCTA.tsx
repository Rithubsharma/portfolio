import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { personal } from "@/lib/data";

export function ContactCTA() {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-10 text-center sm:p-16">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[400px] rounded-full bg-accent/5 blur-[80px]" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-active">
                <Mail size={24} className="text-accent" />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  Get in touch
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                  Let&apos;s work together
                </h2>
                <p className="mx-auto max-w-xl text-base text-text-secondary sm:text-lg">
                  Have an interesting backend challenge, distributed systems problem, or want to talk
                  engineering? I&apos;m always happy to connect.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Send a message <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`mailto:${personal.email}`}>
                    <Mail size={16} /> {personal.email}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
