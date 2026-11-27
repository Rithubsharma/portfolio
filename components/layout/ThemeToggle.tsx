"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribeNoop = () => () => {};

/** Named for what it does on a stage: bring the house lights up or down. */
export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
  const { resolvedTheme, setTheme } = useTheme();
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
    >
      <span
        aria-hidden
        className={dark ? "h-2.5 w-2.5 rounded-full bg-tape" : "h-2.5 w-2.5 rounded-full border-2 border-current"}
      />
      {dark ? "Lights up" : "Lights down"}
    </button>
  );
}
