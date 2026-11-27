import Link from "next/link";
import { SagaNetwork } from "./SagaNetwork";
import { personal } from "@/lib/data";

export function Hero() {
  return (
    <section id="top" className="shell pb-20 pt-24 sm:pt-28 lg:pb-28">
      {/* Each line is sized in container units so both run the full measure:
          one narrow and tall, one wide and short. */}
      <h1 className="[container-type:inline-size]">
        <span className="hero-line text-[18.2cqw] leading-[0.84] [font-stretch:72%]">
          Systems that
        </span>
        <span className="hero-line mt-[0.3em] text-[12.15cqw] leading-[0.9] [animation-delay:140ms] [font-stretch:118%]">
          stay in step.
        </span>
      </h1>

      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
        <div className="hero-rise [animation-delay:500ms] lg:col-span-4">
          <p className="text-lg leading-relaxed text-text-primary sm:text-xl">
            I&apos;m {personal.name}, a backend engineer at {personal.company} in Bangalore. I
            build distributed systems in Go and Java that hold their timing under load.
          </p>
          <p className="mt-4 text-base text-text-secondary">
            Before that I ran a dance team of more than 50 people at IIT Roorkee, which is its
            own kind of concurrency.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/#work"
              className="btn"
            >
              See the work
            </Link>
            <a href={`mailto:${personal.email}`} className="link text-sm font-medium">
              Email me
            </a>
            <a href={personal.resumeUrl} className="link text-sm font-medium" target="_blank" rel="noopener noreferrer">
              Read my resume
            </a>
          </div>
        </div>

        <SagaNetwork className="hero-rise [animation-delay:300ms] lg:col-span-8" />
      </div>
    </section>
  );
}
