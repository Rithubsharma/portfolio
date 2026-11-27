import { InView } from "@/components/motion/InView";
import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";
import { personal, socialLinks } from "@/lib/data";

export function Contact() {
  const [user, domain] = personal.email.split("@");

  return (
    <section id="contact" className="shell pb-16 pt-20 lg:pt-32">
      <InView as="h2" className="section-title rv-title">
        Contact
      </InView>
      <p className="mt-6 max-w-[52ch] text-lg text-text-secondary">
        Email is the fastest way to reach me. I am glad to talk about backend engineering,
        distributed systems, or a problem you are stuck on.
      </p>

      <a
        href={`mailto:${personal.email}`}
        className="stretch mt-12 block font-display text-[clamp(1.7rem,7.2vw,8rem)] font-extrabold leading-[0.95] hover:text-accent lg:mt-16"
      >
        {user}
        <wbr />@{domain}
      </a>
      <CopyEmail email={personal.email} />

      <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
        <ul className="border-t border-border-strong lg:col-span-5">
          {socialLinks.map((link) => (
            <li key={link.label} className="border-b border-border">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 py-4"
              >
                <span className="stretch-child font-display text-2xl font-extrabold group-hover:text-accent group-hover:[font-stretch:112%] sm:text-3xl">
                  {link.label}
                </span>
                <span className="text-sm text-text-secondary">{link.note}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="font-sans text-base font-semibold tracking-normal text-text-primary">
            Or write to me here
          </h3>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
