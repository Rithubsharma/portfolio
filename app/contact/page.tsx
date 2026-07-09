import type { Metadata } from "next";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { ContactForm } from "@/features/contact/ContactForm";
import { SocialIcon } from "@/components/shared/SocialIcons";
import { personal, socialLinks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rishav Sharma — software engineering opportunities, collaborations, or just to talk backend infrastructure.",
};

export default function ContactPage() {
  return (
    <section className="section pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: info */}
          <FadeIn from="left" className="space-y-10">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Contact
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                Let&apos;s work together
              </h1>
              <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
                Have an interesting engineering challenge, or want to discuss distributed systems,
                backend architecture, or AI infrastructure? I&apos;m always happy to connect.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-active">
                  <Mail size={16} className="text-accent" />
                </div>
                <a
                  href={`mailto:${personal.email}`}
                  className="transition-colors hover:text-text-primary"
                >
                  {personal.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-active">
                  <MapPin size={16} className="text-accent" />
                </div>
                <span>{personal.location}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-text-primary">Find me online</p>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface transition-colors group-hover:border-border-strong group-hover:bg-surface-hover">
                      <SocialIcon icon={link.icon} size={15} />
                    </div>
                    <span>{link.label}</span>
                    <ExternalLink
                      size={12}
                      className="text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="text-sm text-text-secondary">
                  Typically responds within <strong className="text-text-primary">24 hours</strong>
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn from="right" delay={0.1}>
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
