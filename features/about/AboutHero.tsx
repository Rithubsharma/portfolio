import { MapPin, Mail, GraduationCap } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/shared/SocialIcons";
import { personal, socialLinks, interests } from "@/lib/data";

export function AboutHero() {
  return (
    <section className="section pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Sidebar */}
          <FadeIn from="left" className="lg:col-span-1">
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-accent/10 ring-4 ring-accent/20">
                <span className="text-4xl font-bold text-accent">
                  {personal.firstName.charAt(0)}{personal.lastName.charAt(0)}
                </span>
              </div>

              {/* Name */}
              <div>
                <h1 className="text-2xl font-bold text-text-primary">{personal.name}</h1>
                <p className="text-base text-text-secondary">{personal.role}</p>
              </div>

              {/* Meta */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-text-tertiary">
                  <MapPin size={14} className="shrink-0 text-accent" />
                  {personal.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-tertiary">
                  <Mail size={14} className="shrink-0 text-accent" />
                  <a href={`mailto:${personal.email}`} className="hover:text-text-primary transition-colors">
                    {personal.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-tertiary">
                  <GraduationCap size={14} className="shrink-0 text-accent" />
                  IIT Roorkee · B.Tech CS
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-sm text-text-secondary">
                  {personal.availableForWork ? "Open to opportunities" : "Working @ GoDaddy"}
                </span>
              </div>

              {/* Social */}
              <div className="flex gap-1">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary"
                    aria-label={link.label}
                  >
                    <SocialIcon icon={link.icon} size={16} />
                  </a>
                ))}
              </div>

              <Button asChild className="w-full">
                <a href={personal.resumeUrl} download>
                  Download Resume
                </a>
              </Button>
            </div>
          </FadeIn>

          {/* Main content */}
          <FadeIn from="right" className="lg:col-span-2">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">About</p>
                <h2 className="text-3xl font-bold tracking-tight text-text-primary">
                  The person behind the code
                </h2>
              </div>

              <div className="space-y-4">
                {personal.bio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* What I enjoy building */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-text-primary">What I think about</h3>
                <ul className="space-y-2">
                  {interests.map((interest) => (
                    <li key={interest} className="flex items-center gap-3 text-sm text-text-secondary">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
