import type { CSSProperties, ReactNode } from "react";
import type { ProjectDiagram as DiagramKind } from "@/types";

/**
 * One plate per project, drawn from the project's own numbers or from the parts the
 * resume names. Each is paired with a caption, so the SVG is hidden from assistive tech.
 * Motion is CSS only and runs while the plate is on screen (see `.dia` in globals.css).
 */
export function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  const { svg, caption } = DIAGRAMS[kind]();
  return (
    <>
      <div className="relative bg-background-secondary p-5 sm:p-8 lg:p-10">
        {svg}
        <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-1.5 w-10 bg-tape" />
      </div>
      <figcaption className="mt-4 max-w-[70ch] text-sm text-text-secondary">{caption}</figcaption>
    </>
  );
}

const frame = "dia block h-auto w-full text-text-primary";
const quiet = { fontSize: 13, fill: "var(--text-secondary)" };
const at = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

// ─── Saga lanes ──────────────────────────────────────────────────────────────

const STEPS = 6;
const LANES = 7;
const FAIL_LANE = 3;
const FAIL_STEP = 3;
const CYCLE = 8; // seconds
const HOP = 0.45; // seconds between steps
const pct = (seconds: number) => `${((seconds / CYCLE) * 100).toFixed(2)}%`;

/** Keyframes for one loop: steps light in order; the failing run then unwinds in reverse. */
const SAGA_CSS = [
  ...Array.from({ length: STEPS }, (_, i) => {
    const on = HOP * i;
    return `@keyframes saga-ok-${i}{0%,${pct(on)}{opacity:0}${pct(on + 0.2)},45%{opacity:1}50%,100%{opacity:0}}`;
  }),
  ...Array.from({ length: FAIL_STEP }, (_, i) => {
    const on = HOP * i;
    const off = 2.6 + HOP * (FAIL_STEP - 1 - i);
    return `@keyframes saga-undo-${i}{0%,${pct(on)}{opacity:0}${pct(on + 0.2)},${pct(off)}{opacity:1}${pct(off + 0.25)},100%{opacity:0}}`;
  }),
  `@keyframes saga-fail{0%,${pct(HOP * FAIL_STEP)}{opacity:0}${pct(HOP * FAIL_STEP + 0.15)}{opacity:1}${pct(HOP * FAIL_STEP + 0.4)}{opacity:.25}${pct(HOP * FAIL_STEP + 0.65)},${pct(3.6)}{opacity:1}${pct(3.9)},100%{opacity:0}}`,
].join("");

function SagaLanes() {
  const x = (step: number) => 70 + step * 92;
  const y = (lane: number) => 14 + lane * 42;
  return (
    <svg viewBox="0 0 640 410" className={frame} aria-hidden>
      <style>{SAGA_CSS}</style>
      {Array.from({ length: LANES }, (_, lane) => {
        const failing = lane === FAIL_LANE;
        const offset = failing ? -4 : -((lane * 1.9) % CYCLE);
        return (
          <g key={lane}>
            <line x1={x(0)} y1={y(lane) + 15} x2={x(STEPS - 1) + 30} y2={y(lane) + 15} stroke="var(--border-strong)" />
            {Array.from({ length: STEPS }, (_, step) => {
              const name = failing ? (step < FAIL_STEP ? `saga-undo-${step}` : null) : `saga-ok-${step}`;
              return (
                <g key={step}>
                  <rect x={x(step)} y={y(lane)} width="30" height="30" fill="var(--background-secondary)" stroke="var(--border-strong)" strokeWidth="1.5" />
                  {name && (
                    <rect
                      className="saga-step"
                      style={{ animationName: name, animationDelay: `${offset}s` }}
                      x={x(step)}
                      y={y(lane)}
                      width="30"
                      height="30"
                      fill="var(--accent)"
                    />
                  )}
                  {failing && step === FAIL_STEP && (
                    <g className="saga-step" style={{ animationName: "saga-fail", animationDelay: `${offset}s` }} stroke="currentColor" strokeWidth="3" fill="none">
                      <rect x={x(step)} y={y(lane)} width="30" height="30" />
                      <path d={`M${x(step) + 9} ${y(lane) + 9}l12 12m0 -12l-12 12`} />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      <text x="70" y="336" {...quiet}>Provisioning latency before</text>
      <rect className="dia-grow" x="70" y="344" width="490" height="12" fill="var(--border-strong)" />
      <text x="70" y="382" {...quiet}>After</text>
      <rect className="dia-grow" style={at(250)} x="70" y="390" width="196" height="12" fill="var(--accent)" />
    </svg>
  );
}

// ─── Plates ──────────────────────────────────────────────────────────────────

const DIAGRAMS: Record<DiagramKind, () => { svg: ReactNode; caption: string }> = {
  // 99.5% = 199 of every 200.
  dots: () => ({
    caption: "Out of every 200 provisioning requests, 199 succeed.",
    svg: (
      <svg viewBox="0 0 640 340" className={frame} aria-hidden>
        {Array.from({ length: 200 }, (_, i) => {
          const col = i % 20;
          const row = Math.floor(i / 20);
          const cx = 35 + col * 30;
          const cy = 35 + row * 30;
          const wave = at(col * 22 + row * 34);
          if (i !== 137) {
            return <circle key={i} className="dia-dot" style={wave} cx={cx} cy={cy} r="8" fill="currentColor" />;
          }
          return (
            <g key={i} fill="none" stroke="var(--accent)">
              <circle className="dia-ping" cx={cx} cy={cy} r="8" strokeWidth="1.5" />
              <circle className="dia-dot" style={wave} cx={cx} cy={cy} r="8" strokeWidth="3" />
            </g>
          );
        })}
      </svg>
    ),
  }),

  bars: () => ({
    caption:
      "The saga pattern, illustrated: each lane is a run working through its steps. One run meets a failing step and undoes its finished steps in reverse. Below, provisioning latency before and after the framework: 60% lower.",
    svg: <SagaLanes />,
  }),

  flame: () => {
    // [x, width, hot] per row, bottom row first.
    const rows: [number, number, boolean?][][] = [
      [[0, 400]],
      [[0, 250], [254, 146]],
      [[0, 118], [122, 128, true], [254, 86], [344, 56]],
      [[0, 62], [122, 96, true], [254, 44]],
      [[122, 70, true], [196, 22]],
      [[122, 34, true]],
    ];
    const inputs: [string, number][] = [["Traces", 255], ["Logs", 315], ["Runtime metrics", 375]];
    return {
      caption:
        "Above, a flame graph: the view a live profile produces, with the kind of hot stack the platform picks out (an illustrative shape, not real data). Below, the analysis engine: traces, logs and runtime metrics go in; root-cause analysis and optimization recommendations come out.",
      svg: (
        <svg viewBox="0 0 640 410" className={frame} aria-hidden>
          {rows.flatMap((row, r) =>
            row.map(([x, width, hot], i) => (
              <rect
                key={`${r}-${i}`}
                className="dia-grow"
                style={at(r * 110)}
                x={40 + x * 1.4}
                y={186 - (r + 1) * 28}
                width={width * 1.4}
                height="24"
                fill={hot ? "var(--accent)" : "currentColor"}
                opacity={hot ? 1 : 0.16 + r * 0.07}
              />
            ))
          )}

          {inputs.map(([name, y], i) => (
            <g key={name}>
              <text x="40" y={y} {...quiet}>{name}</text>
              <line x1="160" y1={y - 4} x2="250" y2={y - 4} stroke="var(--border-strong)" />
              <circle className="dia-pkt" style={{ "--dx": "90px", ...at(i * -700) } as CSSProperties} cx="160" cy={y - 4} r="4" fill="var(--accent)" />
            </g>
          ))}
          <rect x="250" y="232" width="170" height="160" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="335" y="306" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Claude Sonnet 4</text>
          <text x="335" y="328" textAnchor="middle" {...quiet}>+ rule-based detection</text>
          {[281, 351].map((y, i) => (
            <g key={y}>
              <line x1="420" y1={y} x2="470" y2={y} stroke="var(--border-strong)" />
              <circle className="dia-pkt" style={{ "--dx": "50px", ...at(-400 - i * 900) } as CSSProperties} cx="420" cy={y} r="4" fill="var(--accent)" />
            </g>
          ))}
          <text x="482" y="285" fontSize="13" fill="currentColor">Root-cause analysis</text>
          <text x="482" y="347" fontSize="13" fill="currentColor">
            Optimization
            <tspan x="482" dy="17">recommendations</tspan>
          </text>
        </svg>
      ),
    };
  },

  // IMS and WMS exchanging events through Kafka.
  lanes: () => ({
    caption: "IMS and WMS exchange inventory events through Kafka in real time.",
    svg: (
      <svg viewBox="0 0 640 320" className={frame} aria-hidden>
        {[130, 190].map((y, lane) => {
          const forward = lane === 0;
          return (
            <g key={y}>
              <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.55">
                <line className="dia-flow" x1={forward ? 160 : 250} y1={y} x2={forward ? 250 : 160} y2={y} />
                <line className="dia-flow" x1={forward ? 390 : 480} y1={y} x2={forward ? 480 : 390} y2={y} />
              </g>
              {[0, -1300].map((offset) => (
                <rect
                  key={offset}
                  className="dia-pkt"
                  style={{ "--dx": forward ? "320px" : "-320px", "--dur": "2.6s", ...at(offset) } as CSSProperties}
                  x={forward ? 155 : 475}
                  y={y - 5}
                  width="10"
                  height="10"
                  fill="currentColor"
                />
              ))}
            </g>
          );
        })}
        <rect x="11" y="90" width="149" height="140" fill="var(--background-secondary)" stroke="currentColor" strokeWidth="2" />
        <text x="85" y="169" textAnchor="middle" fontSize="26" fontWeight="700" fill="currentColor">IMS</text>
        <rect x="480" y="90" width="149" height="140" fill="var(--background-secondary)" stroke="currentColor" strokeWidth="2" />
        <text x="555" y="169" textAnchor="middle" fontSize="26" fontWeight="700" fill="currentColor">WMS</text>
        <rect x="250" y="50" width="140" height="220" fill="var(--accent)" />
        <text x="320" y="168" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--accent-foreground)">Kafka</text>
      </svg>
    ),
  }),

  // One second of time, with the page arriving inside the first 200 ms.
  ruler: () => ({
    caption: "One second, marked every 100 ms. The page arrives inside the first 200.",
    svg: (
      <svg viewBox="0 0 640 260" className={frame} aria-hidden>
        <rect className="dia-grow" x="20" y="90" width="120" height="100" fill="var(--accent)" />
        <line className="dia-sweep" style={{ "--dx": "120px" } as CSSProperties} x1="20" y1="70" x2="20" y2="190" stroke="currentColor" strokeWidth="3" />
        <line x1="20" y1="190" x2="620" y2="190" stroke="currentColor" strokeWidth="2" />
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={20 + i * 60} y1={i % 5 === 0 ? 140 : 168} x2={20 + i * 60} y2="190" stroke="currentColor" strokeWidth="2" />
        ))}
        <text x="20" y="222" {...quiet}>0</text>
        <text x="140" y="222" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">200 ms</text>
        <text x="620" y="222" textAnchor="end" {...quiet}>1 s</text>
      </svg>
    ),
  }),
};
