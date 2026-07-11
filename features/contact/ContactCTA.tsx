import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { personal } from "@/lib/data";

export function ContactCTA() {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="gradient-border p-12 text-center sm:p-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-mono text-xs text-text-tertiary">contact</p>
                <h2 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                  Let&apos;s work together
                </h2>
                <p className="mx-auto max-w-lg text-base text-text-secondary">
                  Interesting backend challenge, distributed systems problem, or want to talk engineering?
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Send a message <ArrowRight size={15} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`mailto:${personal.email}`}>
                    {personal.email}
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
