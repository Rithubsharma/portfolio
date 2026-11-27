"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * A small network of services running sagas. A run walks a chain of nodes one hop
 * at a time, lighting each step it completes. When a step fails, the run travels
 * back the way it came and undoes the finished steps in reverse order.
 */

const SERVICE_NAMES = [
  "api", "provision", "db", "queue", "notify",
  "auth", "cache", "verify", "audit", "health",
  "config", "storage", "router", "worker", "events",
];

interface NodeState {
  u: number;
  v: number;
  depth: number;
  phase: number;
  links: number[];
  lit: number;
  failed: number;
  glow: number;
  x: number;
  y: number;
  name: string;
  large: boolean;
}

interface Run {
  path: number[];
  /** Index in `path` the packet last left. */
  at: number;
  /** Progress along the current hop, 0 to 1. */
  t: number;
  state: "out" | "hold" | "back" | "fade";
  failAt: number;
  until: number;
  alpha: number;
}

interface Ring {
  node: number;
  start: number;
}

const HOP_MS = 560;

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A jittered grid joined to its neighbours: regular enough to read, loose enough to feel grown. */
function buildGraph(cols: number, rows: number): NodeState[] {
  const rand = seeded(11);
  const nameRand = seeded(97); // separate seed so positions don't change
  const nodes: NodeState[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push({
        u: (c + 0.5 + (rand() - 0.5) * 0.6) / cols,
        v: (r + 0.5 + (rand() - 0.5) * 0.6) / rows,
        depth: 0.6 + rand() * 0.9,
        phase: rand() * Math.PI * 2,
        links: [],
        lit: 0,
        failed: 0,
        glow: 0,
        x: 0,
        y: 0,
        name: SERVICE_NAMES[Math.floor(nameRand() * SERVICE_NAMES.length)],
        large: nameRand() < 0.18,
      });
    }
  }
  const link = (a: number, b: number) => {
    if (nodes[a].links.includes(b)) return;
    nodes[a].links.push(b);
    nodes[b].links.push(a);
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (c + 1 < cols && rand() > 0.15) link(i, i + 1);
      if (r + 1 < rows && rand() < 0.6) link(i, i + cols);
      if (c + 1 < cols && r + 1 < rows && rand() < 0.25) link(i, i + cols + 1);
      else if (c + 1 < cols && r > 0 && rand() < 0.2) link(i, i - cols + 1);
    }
  }
  nodes.forEach((node, i) => {
    if (node.links.length === 0) link(i, i % cols === cols - 1 ? i - 1 : i + 1);
  });
  return nodes;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (n: number) => 1 - Math.pow(1 - n, 3);

export function SagaNetwork({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<{ start: (fail: boolean) => void } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nodes: NodeState[] = [];
    let runs: Run[] = [];
    let rings: Ring[] = [];
    let cols = 0;
    let rows = 0;
    let w = 0;
    let h = 0;
    let visible = true;
    let raf = 0;
    let last = 0;
    let started = 0;
    let nextAmbient = 0;
    let ambientCount = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let easedX = 0.5;
    let easedY = 0.5;
    let hover = -1;
    let ink = "#0b2a2e";
    let line = "#788a85";
    let spot = "#bd6f00";
    let floor = "#e1e6e0";

    const readColors = () => {
      const styles = getComputedStyle(wrap);
      ink = styles.getPropertyValue("--text-primary").trim() || ink;
      line = styles.getPropertyValue("--border-strong").trim() || line;
      spot = styles.getPropertyValue("--spot").trim() || spot;
      floor = styles.getPropertyValue("--background-secondary").trim() || floor;
    };

    const place = (now: number) => {
      const pad = Math.max(22, Math.min(w, h) * 0.08);
      const still = reduced.matches;
      for (const node of nodes) {
        const driftX = still ? 0 : Math.sin(now / 2400 + node.phase) * 2.4;
        const driftY = still ? 0 : Math.cos(now / 2900 + node.phase) * 2.4;
        node.x = pad + node.u * (w - pad * 2) + ((0.5 - easedX) * 22 + driftX) * node.depth;
        node.y = pad + node.v * (h - pad * 2) + ((0.5 - easedY) * 14 + driftY) * node.depth;
      }
    };

    const nearest = (x: number, y: number) => {
      let best = -1;
      let bestDist = Infinity;
      nodes.forEach((node, i) => {
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return { index: best, dist: bestDist };
    };

    const makePath = (start: number) => {
      const path = [start];
      const target = 4 + Math.floor(Math.random() * (w < 520 ? 2 : 4));
      while (path.length < target) {
        const options = nodes[path[path.length - 1]].links.filter((n) => !path.includes(n));
        if (options.length === 0) break;
        path.push(options[Math.floor(Math.random() * options.length)]);
      }
      return path;
    };

    const litLength = (run: Run) => {
      if (run.state === "fade") return run.failAt >= 0 ? 0 : run.path.length - 1;
      if (run.state === "back") return run.at - run.t;
      return run.at + Math.min(1, run.t);
    };

    const pointOn = (run: Run, length: number) => {
      const i = Math.min(run.path.length - 2, Math.floor(length));
      const f = length - i;
      const a = nodes[run.path[i]];
      const b = nodes[run.path[i + 1]];
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    };

    const draw = (now: number) => {
      const still = reduced.matches;
      const intro = still ? 1 : clamp01((now - started - 500) / 900);
      const base = w < 520 ? 3.1 : 3.9;
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      ctx.strokeStyle = line;
      ctx.globalAlpha = 0.7 * intro;
      ctx.beginPath();
      nodes.forEach((node, i) => {
        for (const j of node.links) {
          if (j < i) continue;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
        }
      });
      ctx.stroke();

      if (hover >= 0) {
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = ink;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        for (const j of nodes[hover].links) {
          ctx.moveTo(nodes[hover].x, nodes[hover].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
        }
        ctx.stroke();
      }

      // The lit part of each run.
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = spot;
      for (const run of runs) {
        const length = litLength(run);
        if (length <= 0) continue;
        ctx.globalAlpha = run.alpha;
        ctx.beginPath();
        ctx.moveTo(nodes[run.path[0]].x, nodes[run.path[0]].y);
        for (let i = 1; i <= Math.floor(length); i++) {
          ctx.lineTo(nodes[run.path[i]].x, nodes[run.path[i]].y);
        }
        if (length % 1 > 0.001) {
          const tip = pointOn(run, length);
          ctx.lineTo(tip.x, tip.y);
        }
        ctx.stroke();
      }

      nodes.forEach((node, i) => {
        const appear = still ? 1 : easeOut(clamp01((now - started - 200 - node.u * 900) / 500));
        if (appear <= 0) return;
        const scale = node.large ? 1.28 : 1;
        const r = base * (0.8 + 0.3 * node.depth) * appear * scale;
        ctx.globalAlpha = appear;
        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (node.glow > 0.02) {
          ctx.globalAlpha = node.glow;
          ctx.fillStyle = spot;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * (1 + 0.55 * node.glow), 0, Math.PI * 2);
          ctx.fill();
        }
        if (node.failed > 0) {
          // A failed step: hollow with an × so it reads as "did not complete".
          ctx.globalAlpha = 1;
          ctx.fillStyle = floor;
          ctx.strokeStyle = ink;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // × mark
          const xr = r * 0.65;
          ctx.beginPath();
          ctx.moveTo(node.x - xr, node.y - xr);
          ctx.lineTo(node.x + xr, node.y + xr);
          ctx.moveTo(node.x + xr, node.y - xr);
          ctx.lineTo(node.x - xr, node.y + xr);
          ctx.lineWidth = 1.8;
          ctx.strokeStyle = ink;
          ctx.stroke();
        }
        if (i === hover) {
          ctx.globalAlpha = 0.85;
          ctx.strokeStyle = ink;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 6, 0, Math.PI * 2);
          ctx.stroke();
          // Service name label
          if (!still) {
            const fontSize = w < 520 ? 9 : 11;
            ctx.globalAlpha = 0.88;
            ctx.fillStyle = ink;
            ctx.font = `${fontSize}px ui-monospace, 'Cascadia Code', Menlo, monospace`;
            ctx.textAlign = "center";
            ctx.fillText(node.name, node.x, node.y + r + fontSize + 5);
            ctx.textAlign = "left";
          }
        }
      });

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = spot;
      for (const ring of rings) {
        const p = (now - ring.start) / 700;
        if (p < 0 || p >= 1) continue;
        ctx.globalAlpha = (1 - p) * 0.6;
        ctx.beginPath();
        ctx.arc(nodes[ring.node].x, nodes[ring.node].y, 6 + easeOut(p) * 20, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (!still) {
        for (const run of runs) {
          if (run.state === "fade") continue;
          const litLen = litLength(run);
          const tip = pointOn(run, litLen);
          const isForward = run.state === "out";

          // Trail behind forward-moving packets
          if (isForward && litLen > 0.35) {
            const trailLen = Math.min(litLen, 0.6);
            const trailPt = pointOn(run, litLen - trailLen);
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = spot;
            ctx.globalAlpha = run.alpha * 0.22;
            ctx.beginPath();
            ctx.moveTo(trailPt.x, trailPt.y);
            ctx.lineTo(tip.x, tip.y);
            ctx.stroke();
          }

          // Tip dot: larger for forward travel, smaller/dimmer for rollback
          ctx.globalAlpha = run.alpha * (isForward ? 1 : 0.55);
          ctx.fillStyle = isForward ? spot : ink;
          const tipR = isForward ? 5 : 3;
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, tipR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const advance = (now: number, dt: number) => {
      for (const run of runs) {
        if (run.state === "out") {
          run.t += dt / HOP_MS;
          if (run.t < 1) continue;
          const next = run.at + 1;
          rings.push({ node: run.path[next], start: now });
          if (next === run.failAt) {
            nodes[run.path[next]].failed++;
            run.t = 1;
            run.state = "hold";
            run.until = now + 700;
          } else {
            nodes[run.path[next]].lit++;
            run.at = next;
            run.t = 0;
            if (next === run.path.length - 1) {
              run.state = "hold";
              run.until = now + 900;
            }
          }
        } else if (run.state === "hold") {
          if (now < run.until) continue;
          if (run.failAt >= 0) {
            nodes[run.path[run.failAt]].failed--;
            run.state = "back";
            run.at = run.failAt;
            run.t = 0;
          } else {
            run.path.forEach((i) => nodes[i].lit--);
            run.state = "fade";
          }
        } else if (run.state === "back") {
          run.t += dt / (HOP_MS * 0.8);
          if (run.t < 1) continue;
          const prev = run.at - 1;
          nodes[run.path[prev]].lit--;
          rings.push({ node: run.path[prev], start: now });
          run.at = prev;
          run.t = 0;
          if (prev === 0) {
            run.state = "fade";
            run.alpha = 0;
          }
        } else {
          run.alpha -= dt / 500;
        }
      }
      runs = runs.filter((run) => run.alpha > 0);
      rings = rings.filter((ring) => now - ring.start < 700);
      for (const node of nodes) node.glow += ((node.lit > 0 ? 1 : 0) - node.glow) * 0.14;
    };

    const startRun = (from: number | undefined, fail: boolean) => {
      if (nodes.length === 0) return;
      let path: number[] = [];
      for (let tries = 0; tries < 8 && path.length < 4; tries++) {
        const start = from !== undefined && tries < 4 ? from : Math.floor(Math.random() * nodes.length);
        const candidate = makePath(start);
        if (candidate.length > path.length) path = candidate;
      }
      if (path.length < 3) return;
      const failAt = fail ? Math.max(2, Math.floor(path.length * 0.65)) : -1;
      const now = performance.now();

      if (reduced.matches) {
        for (const node of nodes) {
          node.lit = 0;
          node.failed = 0;
          node.glow = 0;
        }
        const end = fail ? failAt - 1 : path.length - 1;
        for (let i = 0; i <= end; i++) {
          nodes[path[i]].lit = 1;
          nodes[path[i]].glow = 1;
        }
        if (fail) nodes[path[failAt]].failed = 1;
        runs = [{ path, at: end, t: 0, state: "hold", failAt, until: Infinity, alpha: 1 }];
        draw(now);
        return;
      }

      nodes[path[0]].lit++;
      rings.push({ node: path[0], start: now });
      runs.push({ path, at: 0, t: 0, state: "out", failAt, until: 0, alpha: 1 });
    };
    apiRef.current = { start: (fail) => startRun(undefined, fail) };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(48, now - (last || now));
      last = now;
      easedX += (pointerX - easedX) * 0.06;
      easedY += (pointerY - easedY) * 0.06;
      place(now);
      // Every fifth background run fails, so the undo is part of the ambient picture.
      if (now >= nextAmbient && runs.length < (w < 520 ? 2 : 4)) {
        startRun(undefined, ambientCount % 5 === 4);
        ambientCount++;
        nextAmbient = now + 1300 + Math.random() * 700;
      }
      advance(now, dt);
      draw(now);
      if (visible) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (reduced.matches) {
        place(0);
        draw(performance.now());
        return;
      }
      last = 0;
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const nextCols = Math.min(10, Math.max(4, Math.round(w / 96)));
      const nextRows = Math.min(6, Math.max(3, Math.round(h / 88)));
      if (nextCols !== cols || nextRows !== rows) {
        cols = nextCols;
        rows = nextRows;
        nodes = buildGraph(cols, rows);
        runs = [];
        rings = [];
        started = performance.now();
        nextAmbient = started + 1500;
        place(0);
        if (reduced.matches) startRun(undefined, false);
      }
      wake();
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointerX = clamp01(x / rect.width);
      pointerY = clamp01(y / rect.height);
      const hit = nearest(x, y);
      hover = hit.dist < 44 ? hit.index : -1;
      canvas.style.cursor = hover >= 0 ? "pointer" : "default";
      if (reduced.matches) draw(performance.now());
    };
    const onLeave = () => {
      pointerX = 0.5;
      pointerY = 0.5;
      hover = -1;
      if (reduced.matches) draw(performance.now());
    };
    const onClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const hit = nearest(event.clientX - rect.left, event.clientY - rect.top);
      if (hit.index >= 0) startRun(hit.index, false);
    };

    readColors();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    viewObserver.observe(wrap);
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduced.matches) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      canvas.removeEventListener("click", onClick);
      apiRef.current = null;
    };
  }, []);

  const start = useCallback((fail: boolean) => apiRef.current?.start(fail), []);

  return (
    <div className={className}>
      <div
        ref={wrapRef}
        className="relative h-[clamp(280px,46vh,520px)] w-full overflow-hidden bg-linear-to-b from-background-secondary to-background-tertiary"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="A network of connected services. Requests travel between them and light each step they complete; when a step fails, the finished steps are undone in reverse."
          className="absolute inset-0 h-full w-full touch-pan-y"
        />
        {/* Spike tape: how a stage marks where people stand. */}
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-1.5 w-7 bg-tape" />
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-7 w-1.5 bg-tape" />
        <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-7 bg-tape" />
        <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-7 w-1.5 bg-tape" />
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-lg text-sm text-text-secondary">
          Each run walks a chain of services one step at a time. If a step fails, the finished
          steps are undone in reverse order: the saga pattern behind my orchestration framework.
          Click a node to start a run from it.
        </p>
        <div role="group" aria-label="Demo controls" className="flex shrink-0 gap-x-5">
          <button type="button" onClick={() => start(false)} className="link text-sm font-medium">
            <span aria-hidden className="mr-1.5 text-accent">▶</span>Start a run
          </button>
          <button type="button" onClick={() => start(true)} className="link text-sm font-medium">
            <span aria-hidden className="mr-1.5 text-error">✕</span>Fail a step
          </button>
        </div>
      </div>
    </div>
  );
}
