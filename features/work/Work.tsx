import type { CSSProperties } from "react";
import { InView } from "@/components/motion/InView";
import { Parallax } from "@/components/motion/Parallax";
import { ProjectDiagram } from "./ProjectDiagram";
import { WorkIndex } from "./WorkIndex";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;
const label = "font-sans text-sm font-semibold tracking-normal text-text-primary";

export function Work() {
  return (
    <section id="work" className="tone-deep pt-20 lg:pt-32">
      <div className="shell">
        <InView as="h2" className="section-title rv-title">
          Selected work
        </InView>
        <p className="mt-6 max-w-[58ch] text-lg text-text-secondary">
          Five systems from GoDaddy and DP World: what each one is, what I did, and what
          changed.
        </p>
      </div>

      <WorkIndex items={projects.map(({ id, title }) => ({ id, title }))} />

      {projects.map((project, index) => {
        // Alternate spreads swap sides and take a wider plate, so no two neighbours match.
        const flip = index % 2 === 1;
        return (
          <article
            key={project.id}
            id={`work-${project.id}`}
            className="scroll-mt-28 border-b border-border py-16 last:border-b-0 lg:py-28"
          >
            <div className="shell">
              <InView className="grid items-end gap-x-12 gap-y-3 lg:grid-cols-12">
                <p className="rv-up text-sm font-medium text-text-secondary lg:col-span-12">
                  {project.company}
                </p>
                <h3
                  style={delay(1)}
                  className="rv-stretch text-[clamp(2.6rem,7.4vw,7rem)] leading-[0.9] [font-stretch:86%] lg:col-span-8"
                >
                  {project.title}
                </h3>
                <p
                  style={delay(2)}
                  className="rv-up font-display text-[clamp(1.6rem,2.9vw,2.75rem)] font-extrabold leading-none [font-stretch:104%] lg:col-span-4 lg:pb-2 lg:text-right"
                >
                  {project.headline}
                </p>
              </InView>

              <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
                <InView
                  as="figure"
                  once={false}
                  margin="0px"
                  className={cn(flip ? "lg:col-span-8 lg:col-start-5" : "lg:col-span-7")}
                >
                  <Parallax distance={16}>
                    <ProjectDiagram kind={project.diagram} />
                  </Parallax>
                </InView>

                <InView
                  className={cn(
                    flip
                      ? "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:self-end"
                      : "lg:col-span-4 lg:col-start-9"
                  )}
                >
                  <p className="rv-up text-xl leading-snug text-text-primary sm:text-2xl">
                    {project.what}
                  </p>
                  <div style={delay(1)} className="rv-up mt-8">
                    <h4 className={label}>My part</h4>
                    <p className="mt-2 text-base text-text-secondary">{project.contribution}</p>
                  </div>
                  <div style={delay(2)} className="rv-up mt-8">
                    <h4 className={label}>Outcome</h4>
                    <ul className="mt-2 border-t border-border-strong">
                      {project.outcomes.map((outcome) => (
                        <li key={outcome} className="border-b border-border py-3 text-lg text-text-primary">
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={delay(3)} className="rv-up mt-8">
                    <h4 className={label}>Built with</h4>
                    <p className="mt-2 text-base text-text-secondary">{project.stack.join(", ")}</p>
                  </div>
                </InView>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
