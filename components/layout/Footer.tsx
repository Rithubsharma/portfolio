import { SocialIcon } from "@/components/shared/SocialIcons";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-sm text-text-tertiary">
            Let&apos;s build reliable software.
          </p>

          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-text-tertiary transition-colors duration-150 hover:text-text-primary"
                aria-label={link.label}
              >
                <SocialIcon icon={link.icon} size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs text-text-tertiary">
            &copy; {year} {SITE_CONFIG.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
