"use client";

import { useState } from "react";

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
    <button type="button" onClick={copy} className="link mt-5 text-sm font-medium">
      <span aria-live="polite">{copied ? "Address copied" : "Copy address"}</span>
    </button>
  );
}
