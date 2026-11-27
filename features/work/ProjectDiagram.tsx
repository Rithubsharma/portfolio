import type { CSSProperties, ReactNode } from "react";
import type { ProjectDiagram as DiagramKind } from "@/types";

/**
 * One plate per project. Each is built from the project's own numbers or the
 * parts the resume names. Motion is CSS-only and runs while the plate is on
 * screen (see `.dia` in globals.css). The SVG is hidden from assistive tech;
 * the figcaption carries the description.
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
const label = { fontSize: 11, fill: "var(--text-tertiary)", fontWeight: 500 };
const at = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

// ─── Saga lanes ──────────────────────────────────────────────────────────────

const STEPS = 6;
const LANES = 7;
const FAIL_LANE = 3;
const FAIL_STEP = 3;
const CYCLE = 8; // seconds
const HOP = 0.45; // seconds between steps
const pct = (seconds: number) => `${((seconds / CYCLE) * 100).toFixed(2)}%`;

const SERVICES = ["Order", "Reserve", "Payment", "Dispatch", "Notify", "Review", "Archive"];

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
  // ROLLBACK label: appears just after the fail marker, disappears with it.
  `@keyframes saga-rollback{0%,${pct(HOP * FAIL_STEP + 0.4)}{opacity:0}${pct(HOP * FAIL_STEP + 0.65)},${pct(3.6)}{opacity:1}${pct(3.9)},100%{opacity:0}}`,
].join("");

function SagaLanes() {
  const x = (step: number) => 72 + step * 90;
  const y = (lane: number) => 20 + lane * 42;
  return (
    <svg viewBox="0 0 640 420" className={frame} aria-hidden>
      <style>{SAGA_CSS}</style>

      {/* Step column headers */}
      {Array.from({ length: STEPS }, (_, step) => (
        <text key={`sh-${step}`} x={x(step) + 15} y="10" textAnchor="middle" {...label}>
          {step + 1}
        </text>
      ))}

      {Array.from({ length: LANES }, (_, lane) => {
        const failing = lane === FAIL_LANE;
        const offset = failing ? -4 : -((lane * 1.9) % CYCLE);
        return (
          <g key={lane}>
            {/* Service name label */}
            <text
              x="4"
              y={y(lane) + 20}
              fontSize="11"
              fontWeight="600"
              fill={failing ? "var(--error)" : "var(--text-secondary)"}
            >
              {SERVICES[lane]}
            </text>

            <line
              x1={x(0)}
              y1={y(lane) + 15}
              x2={x(STEPS - 1) + 30}
              y2={y(lane) + 15}
              stroke="var(--border-strong)"
            />

            {Array.from({ length: STEPS }, (_, step) => {
              const name = failing
                ? step < FAIL_STEP
                  ? `saga-undo-${step}`
                  : null
                : `saga-ok-${step}`;
              return (
                <g key={step}>
                  <rect
                    x={x(step)}
                    y={y(lane)}
                    width="30"
                    height="30"
                    fill="var(--background-secondary)"
                    stroke="var(--border-strong)"
                    strokeWidth="1.5"
                  />
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
                    <g
                      className="saga-step"
                      style={{ animationName: "saga-fail", animationDelay: `${offset}s` }}
                      stroke="var(--error)"
                      strokeWidth="2.5"
                      fill="none"
                    >
                      <rect x={x(step)} y={y(lane)} width="30" height="30" stroke="var(--error)" strokeWidth="1.5" fill="var(--background-secondary)" />
                      <path d={`M${x(step) + 9} ${y(lane) + 9}l12 12m0-12l-12 12`} />
                    </g>
                  )}
                  {/* ROLLBACK label appears on the fail lane at fail step */}
                  {failing && step === FAIL_STEP && (
                    <g
                      className="saga-step"
                      style={{ animationName: "saga-rollback", animationDelay: `${offset}s` }}
                    >
                      <text
                        x={x(FAIL_STEP) + 38}
                        y={y(FAIL_LANE) + 20}
                        fontSize="10"
                        fontWeight="700"
                        fill="var(--error)"
                      >
                        ROLLBACK ←
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Latency comparison bars */}
      <text x="72" y="346" {...quiet}>Provisioning latency before</text>
      <rect className="dia-grow" x="72" y="354" width="490" height="12" fill="var(--border-strong)" />
      <text x="72" y="392" {...quiet}>After</text>
      <rect className="dia-grow" style={at(250)} x="72" y="400" width="196" height="12" fill="var(--accent)" />
    </svg>
  );
}

// ─── Plates ──────────────────────────────────────────────────────────────────

const DIAGRAMS: Record<DiagramKind, () => { svg: ReactNode; caption: string }> = {

  // 99.5% = 199 of every 200.
  dots: () => ({
    caption: "Out of every 200 provisioning requests, 199 succeed. The platform has processed more than 50,000.",
    svg: (
      <svg viewBox="0 0 640 360" className={frame} aria-hidden>
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

        {/* Counter */}
        <text
          x="320"
          y="320"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill="currentColor"
          className="dia-dot"
          style={at(200 * 22 + 50)}
        >
          50,000+ requests
        </text>
        <text
          x="320"
          y="344"
          textAnchor="middle"
          fontSize="13"
          fill="var(--text-secondary)"
          className="dia-dot"
          style={at(200 * 22 + 150)}
        >
          99.5% success rate
        </text>
      </svg>
    ),
  }),

  bars: () => ({
    caption:
      "The saga pattern: each lane is a run working through its steps. One run meets a failing step and unwinds in reverse. Below, provisioning latency before and after the framework: 60% lower.",
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

    // Function names for the larger blocks (must fit within scaled width).
    const funcNames: Record<string, string> = {
      "0-0": "runtime.goexit",
      "1-0": "http.ListenAndServe",
      "1-1": "pprof.Handler",
      "2-0": "net.Accept",
      "2-1": "syncmap.LoadOrStore",   // hot
      "3-1": "sync.Mutex.Lock",        // hot
      "4-0": "runtime.lock2",          // hot
    };

    const inputs: [string, number][] = [["Traces", 255], ["Logs", 315], ["Runtime metrics", 375]];

    return {
      caption:
        "Above, a flame graph with the hot stack the platform picks out. Below, the analysis engine: traces, logs and runtime metrics go in; root-cause analysis and optimization recommendations come out.",
      svg: (
        <svg viewBox="0 0 640 420" className={frame} aria-hidden>
          {/* Hotspot vertical marker */}
          <line
            x1="211"
            y1="8"
            x2="211"
            y2="192"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="3 4"
            opacity="0.5"
          />
          <text x="215" y="12" fontSize="10" fontWeight="700" fill="var(--accent)">
            hotspot
          </text>

          {rows.flatMap((row, r) =>
            row.map(([x, width, hot], i) => {
              const rx = 40 + x * 1.4;
              const ry = 186 - (r + 1) * 28;
              const rw = width * 1.4;
              const key = `${r}-${i}`;
              const name = funcNames[key];
              return (
                <g key={key}>
                  <rect
                    className="dia-grow"
                    style={at(r * 110)}
                    x={rx}
                    y={ry}
                    width={rw}
                    height="24"
                    fill={hot ? "var(--accent)" : "currentColor"}
                    opacity={hot ? 1 : 0.16 + r * 0.07}
                  />
                  {/* Function name above each significant block */}
                  {name && rw > 80 && (
                    <text
                      x={rx + 4}
                      y={ry - 2}
                      fontSize="9"
                      fontWeight={hot ? "700" : "500"}
                      fill={hot ? "var(--accent)" : "var(--text-tertiary)"}
                      style={at(r * 110 + 400)}
                      className="dia-dot"
                    >
                      {name}
                    </text>
                  )}
                </g>
              );
            })
          )}

          {inputs.map(([name, y], i) => (
            <g key={name}>
              <text x="40" y={y} {...quiet}>{name}</text>
              <line x1="160" y1={y - 4} x2="250" y2={y - 4} stroke="var(--border-strong)" />
              <circle
                className="dia-pkt"
                style={{ "--dx": "90px", ...at(i * -700) } as CSSProperties}
                cx="160"
                cy={y - 4}
                r="4"
                fill="var(--accent)"
              />
            </g>
          ))}

          <rect x="250" y="232" width="170" height="168" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="335" y="308" textAnchor="middle" fontSize="14" fontWeight="800" fill="currentColor">
            Claude Sonnet 4
          </text>
          <text x="335" y="328" textAnchor="middle" {...quiet}>+ rule-based detection</text>

          {[281, 358].map((y, i) => (
            <g key={y}>
              <line x1="420" y1={y} x2="470" y2={y} stroke="var(--border-strong)" />
              <circle
                className="dia-pkt"
                style={{ "--dx": "50px", ...at(-400 - i * 900) } as CSSProperties}
                cx="420"
                cy={y}
                r="4"
                fill="var(--accent)"
              />
            </g>
          ))}
          <text x="482" y="285" fontSize="12" fill="currentColor">Root-cause analysis</text>
          <text x="482" y="362" fontSize="12" fill="currentColor">
            Optimization
            <tspan x="482" dy="17">recommendations</tspan>
          </text>
        </svg>
      ),
    };
  },

  // IMS and WMS exchanging events through Kafka.
  lanes: () => ({
    caption: "IMS and WMS exchange inventory events through Kafka in real time. Two topic lanes: one per direction.",
    svg: (
      <svg viewBox="0 0 640 320" className={frame} aria-hidden>
        {/* Topic labels above each lane */}
        <text x="320" y="116" textAnchor="middle" {...label}>
          inventory.events →
        </text>
        <text x="320" y="210" textAnchor="middle" {...label}>
          ← warehouse.confirm
        </text>

        {[130, 190].map((y, lane) => {
          const forward = lane === 0;
          return (
            <g key={y}>
              <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.55">
                <line
                  className="dia-flow"
                  x1={forward ? 160 : 250}
                  y1={y}
                  x2={forward ? 250 : 160}
                  y2={y}
                />
                <line
                  className="dia-flow"
                  x1={forward ? 390 : 480}
                  y1={y}
                  x2={forward ? 480 : 390}
                  y2={y}
                />
              </g>
              {[0, -1300].map((offset) => (
                <rect
                  key={offset}
                  className="dia-pkt"
                  style={{
                    "--dx": forward ? "320px" : "-320px",
                    "--dur": "2.6s",
                    ...at(offset),
                  } as CSSProperties}
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

        {/* IMS box */}
        <rect x="11" y="90" width="149" height="140" fill="var(--background-secondary)" stroke="currentColor" strokeWidth="2" />
        <text x="85" y="161" textAnchor="middle" fontSize="22" fontWeight="800" fill="currentColor">IMS</text>
        <text x="85" y="180" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Inventory Mgmt</text>

        {/* Kafka box */}
        <rect x="250" y="50" width="140" height="220" fill="var(--accent)" />
        <text x="320" y="155" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--accent-foreground)">Kafka</text>
        <text x="320" y="175" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent-foreground)" opacity="0.8">2 topics</text>
        {/* Partition lines inside Kafka */}
        <line x1="250" y1="162" x2="390" y2="162" stroke="var(--accent-foreground)" strokeWidth="0.5" opacity="0.4" />

        {/* WMS box */}
        <rect x="480" y="90" width="149" height="140" fill="var(--background-secondary)" stroke="currentColor" strokeWidth="2" />
        <text x="555" y="161" textAnchor="middle" fontSize="22" fontWeight="800" fill="currentColor">WMS</text>
        <text x="555" y="180" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Warehouse Mgmt</text>

        {/* Event type labels on the edges */}
        <text x="85" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">RECEIVE / RESERVE</text>
        <text x="555" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CONFIRM / UPDATE</text>
      </svg>
    ),
  }),

  // One second of time, with the page arriving inside the first 200 ms.
  ruler: () => ({
    caption: "One second, marked every 100 ms. The product page arrives inside the first 200 — a Redis cache hit.",
    svg: (
      <svg viewBox="0 0 640 260" className={frame} aria-hidden>
        <rect className="dia-grow" x="20" y="90" width="120" height="100" fill="var(--accent)" />

        {/* Cache label */}
        <text x="80" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)" className="dia-dot" style={at(300)}>
          Cache hit
        </text>

        {/* TTFB label inside the bar */}
        <text x="80" y="147" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--accent-foreground)" className="dia-dot" style={at(400)}>
          TTFB
        </text>

        <line
          className="dia-sweep"
          style={{ "--dx": "120px" } as CSSProperties}
          x1="20"
          y1="70"
          x2="20"
          y2="190"
          stroke="currentColor"
          strokeWidth="3"
        />
        <line x1="20" y1="190" x2="620" y2="190" stroke="currentColor" strokeWidth="2" />
        {Array.from({ length: 11 }, (_, i) => (
          <line
            key={i}
            x1={20 + i * 60}
            y1={i % 5 === 0 ? 140 : 168}
            x2={20 + i * 60}
            y2="190"
            stroke="currentColor"
            strokeWidth="2"
          />
        ))}
        <text x="20" y="222" {...quiet}>0</text>
        <text x="140" y="222" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">200 ms</text>
        <text x="620" y="222" textAnchor="end" {...quiet}>1 s</text>

        {/* Legend for Redis */}
        <rect x="20" y="240" width="10" height="10" fill="var(--accent)" />
        <text x="36" y="250" fontSize="11" fill="var(--text-secondary)">Redis cache response</text>
      </svg>
    ),
  }),
};
