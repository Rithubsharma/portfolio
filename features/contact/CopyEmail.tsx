"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable; the address above is still selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="link mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors"
      aria-label={copied ? "Email address copied to clipboard" : "Copy email address to clipboard"}
    >
      {/* Checkmark fades in on copy, hidden otherwise */}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "1em",
          opacity: copied ? 1 : 0,
          transform: copied ? "scale(1)" : "scale(0.6)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        ✓
      </span>
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
