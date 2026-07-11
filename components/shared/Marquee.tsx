import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

const speedMap = {
  slow: "60s",
  normal: "40s",
  fast: "25s",
};

export function Marquee({
  children,
  direction = "left",
  className,
  speed = "normal",
}: MarqueeProps) {
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className={cn("marquee-row overflow-hidden", className)}>
      <div
        className={cn("flex w-max gap-3", animClass)}
        style={{ animationDuration: speedMap[speed] }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
