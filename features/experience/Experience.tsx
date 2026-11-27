"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { InView } from "@/components/motion/InView";
import { experiences } from "@/lib/data";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

// ─── CountUp for highlighted figures ─────────────────────────────────────────

interface ParsedNum {
  prefix: string;
  value: number;
  suffix: string;
  rest: string;
  isDecimal: boolean;
}

function parseMarkNum(text: string): ParsedNum | null {
  // $1.9M or $1.9M in revenue
  const m1 = text.match(/^(\$)([\d.]+)(M|K|B)?(.*)$/);
  if (m1 && parseFloat(m1[2]) > 0)
    return { prefix: m1[1], value: parseFloat(m1[2]), suffix: m1[3] || "", rest: m1[4], isDecimal: true };

  // 50,000+ or 50,000+ provisioning requests
  const m2 = text.match(/^([\d,]+)(\+)(.*)$/);
  if (m2)
    return { prefix: "", value: parseInt(m2[1].replace(/,/g, "")), suffix: m2[2], rest: m2[3], isDecimal: false };

  // 99.5% or 60% or 40% or 80% with optional trailing text
  const m3 = text.match(/^([\d.]+)(%)(.*)$/);
  if (m3)
    return { prefix: "", value: parseFloat(m3[1]), suffix: "%", rest: m3[3], isDecimal: m3[1].includes(".") };

  // 200 ms
  const m4 = text.match(/^(\d+)(\s*ms)(.*)$/i);
  if (m4)
    return { prefix: "", value: parseInt(m4[1]), suffix: m4[2], rest: m4[3], isDecimal: false };

  // Plain integer (500, 200, etc.) — only when it's the whole string or followed by a space
  const m5 = text.match(/^(\d+)(\s.+)?$/);
  if (m5 && m5[1].length > 1)
    return { prefix: "", value: parseInt(m5[1]), suffix: "", rest: m5[2] || "", isDecimal: false };

  return null;
}

function formatCount(parsed: ParsedNum, progress: number): string {
  const val = parsed.value * progress;
  if (parsed.isDecimal) return val.toFixed(1);
  if (parsed.value >= 1000) return Math.round(val).toLocaleString();
  return Math.round(val).toString();
}

/** A `.mark` span that counts up from zero when it enters the viewport. */
function CountMark({ text }: { text: string }) {
  const parsed = parseMarkNum(text);
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return;
        hasStarted.current = true;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setProgress(1);
          return;
        }

        const dur = 1400;
        const t0 = performance.now();
        let raf: number;
        const step = (now: number) => {
          const t = Math.min(1, (now - t0) / dur);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) {
            raf = requestAnimationFrame(step);
          }
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
      },
      { rootMargin: "0px 0px -20% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!parsed) return <span className="mark">{text}</span>;

  return (
    <span ref={ref} className="mark">
      {parsed.prefix}
      {formatCount(parsed, progress)}
      {parsed.suffix}
      {parsed.rest}
    </span>
  );
}

/** Renders `[[figure]]` spans in a point as highlighted marks, with count-up for numbers. */
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(/\[\[(.+?)\]\]/g).map((part, i) =>
        i % 2 === 1 ? (
          <CountMark key={i} text={part} />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const playhead = useTransform(progress, (value) => `${value * 100}%`);

  const roles = experiences.filter((e) => e.stack.length > 0);
  const internships = experiences.filter((e) => e.stack.length === 0);
  const node =
    "tl-node absolute top-1.5 h-[11px] w-[11px] border-2 border-text-primary bg-background -left-[calc(1.5rem+5px)] sm:-left-[calc(2.5rem+5px)]";

  return (
    <section id="experience" className="shell py-20 lg:py-32">
      <InView as="h2" className="section-title rv-title">
        Experience
      </InView>

      <div ref={trackRef} className="relative mt-12 pl-6 sm:pl-10 lg:mt-20">
        {/* The line fills as you read down the timeline; the tape mark is where you are. */}
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border" />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-0 top-0 w-[3px] origin-top -translate-x-px bg-accent"
        />
        <motion.span
          aria-hidden
          style={{ top: playhead }}
          className="absolute left-0 h-1.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-tape"
        />

        <ol className="space-y-20 lg:space-y-28">
          {roles.map((job) => (
            <InView as="li" key={job.id} className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
              <span aria-hidden className={node} />

              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <p className="rv-up flex items-center gap-3 text-sm font-medium tabular-nums text-text-secondary">
                    {job.current && (
                      <span className="bg-tape px-2 py-0.5 text-xs font-semibold text-tape-ink">
                        Now
                      </span>
                    )}
                    {job.period}
                  </p>
                  <h3
                    style={delay(1)}
                    className="rv-up mt-3 text-[clamp(2.75rem,6.4vw,5.75rem)] [font-stretch:92%]"
                  >
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stretch inline-block hover:text-accent"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </h3>
                  <p style={delay(2)} className="rv-up mt-4 text-xl font-semibold text-text-primary">
                    {job.role}
                  </p>
                  <p style={delay(3)} className="rv-up mt-1 text-sm text-text-secondary">
                    {job.location}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ul>
                  {job.points.map((point) => (
                    <InView as="li" key={point} className="relative py-6">
                      <span aria-hidden className="rv-rule absolute inset-x-0 top-0 h-px bg-border-strong" />
                      <p className="rv-up text-lg leading-relaxed text-text-primary lg:text-xl lg:leading-relaxed">
                        <Marked text={point} />
                      </p>
                    </InView>
                  ))}
                </ul>
                <InView className="relative pt-5">
                  <span aria-hidden className="rv-rule absolute inset-x-0 top-0 h-px bg-border-strong" />
                  <p className="rv-up text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Built with </span>
                    {job.stack.join(", ")}
                  </p>
                </InView>
              </div>
            </InView>
          ))}

          <InView as="li" className="relative">
            <span aria-hidden className={node} />
            <h3 className="rv-up text-2xl [font-stretch:92%] sm:text-3xl">Internships</h3>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:gap-12">
              {internships.map((job, i) => (
                <article key={job.id} style={delay(i + 1)} className="rv-up border-t border-border-strong pt-5">
                  <p className="text-sm tabular-nums text-text-secondary">
                    {job.period}, {job.location}
                  </p>
                  <h4 className="mt-2 text-2xl [font-stretch:92%]">{job.company}</h4>
                  <p className="mt-1 text-base font-semibold text-text-primary">{job.role}</p>
                  <ul className="mt-4 space-y-3 text-base text-text-secondary">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </InView>
        </ol>
      </div>
    </section>
  );
}
