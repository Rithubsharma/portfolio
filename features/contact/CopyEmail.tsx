"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard is unavailable; the address above is still selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="relative mt-5 inline-flex items-center gap-2 overflow-hidden text-sm font-medium"
    >
      {/* Tape sweep behind the text — scales in on copy, fades out after */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 origin-left bg-tape transition-transform duration-500",
          copied ? "[transform:scaleX(1)]" : "[transform:scaleX(0)]"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      />
      <span
        aria-live="polite"
        className={cn(
          "link transition-colors duration-200",
          copied ? "text-tape-ink no-underline" : ""
        )}
      >
        {copied ? "Address copied" : "Copy address"}
      </span>
    </button>
  );
}
