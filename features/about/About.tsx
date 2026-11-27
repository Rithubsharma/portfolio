import type { CSSProperties } from "react";
import Image from "next/image";
import { InView } from "@/components/motion/InView";
import { Parallax } from "@/components/motion/Parallax";
import { ScrubText } from "@/components/motion/ScrubText";
import { facts, personal } from "@/lib/data";
import { asset } from "@/lib/site";

const LEAD =
  "For four years I have built the part of a product nobody sees: the services, queues and data stores that have to answer every time.";

export function About() {
  return (
    <section id="about" className="shell py-20 lg:py-32">
      <InView as="h2" className="section-title rv-title">
        About
      </InView>

      <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <ScrubText
            text={LEAD}
            className="text-2xl leading-snug text-text-primary sm:text-3xl lg:text-[2.5rem] lg:leading-[1.18]"
          />
          <div className="mt-8 max-w-[62ch] space-y-5 text-lg text-text-secondary">
            <p>
              At {personal.company} I architected a security provisioning platform and the saga
              orchestration framework behind it, then built a diagnostics platform that profiles
              Go services while they run in production. At DP World I owned the inbound side of
              a warehouse management system and connected it to the rest of the warehouse over
              Kafka.
            </p>
            <p>
              I care about two things in that work: performance and reliability. Both come down
              to the same question, which is what happens when a lot of things occur at once and
              one of them goes wrong.
            </p>
            <p>
              Dance taught me a version of that question first. As Joint Secretary of the
              Choreography and Dance Section at IIT Roorkee I managed a team of more than 50,
              ran workshops across campus, and competed in the Inter-IIT group dance event.
            </p>
          </div>

          <InView as="dl" className="relative mt-12 max-w-[62ch]">
            <span aria-hidden className="rv-rule absolute inset-x-0 top-0 h-px bg-border-strong" />
            {facts.map((fact, i) => (
              <div
                key={fact.term}
                style={{ "--i": i } as CSSProperties}
                className="rv-up grid grid-cols-[6.5rem_1fr] gap-4 border-b border-border py-4"
              >
                <dt className="text-sm font-semibold text-text-primary">{fact.term}</dt>
                <dd className="text-sm text-text-secondary">{fact.detail}</dd>
              </div>
            ))}
          </InView>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-background-tertiary">
              {/* The photo sits slightly oversized and drifts inside its frame as you scroll. */}
              <Parallax className="absolute inset-0" innerClassName="relative h-full w-full scale-[1.14]" distance={18}>
                <Image
                  src={asset("/profile.jpeg")}
                  alt="Rishav Sharma, smiling, in a light blazer over a black t-shirt"
                  fill
                  sizes="(min-width: 1024px) 28vw, 24rem"
                  className="object-cover object-top grayscale"
                />
              </Parallax>
              {/* Tints the monochrome photo toward the site ink. */}
              <span aria-hidden className="absolute inset-0 bg-photo-tint opacity-30 mix-blend-color" />
              <span aria-hidden className="absolute bottom-0 left-0 h-2 w-24 bg-tape" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
