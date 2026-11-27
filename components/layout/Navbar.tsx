"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_ITEMS, SECTIONS } from "@/lib/constants";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Which home-page section is currently under the header. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const ids = SECTIONS.map((s) => s.href.split("#")[1]);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          // Scrolling back above the first section clears the marker.
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(pathname === "/");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href.startsWith("/#") ? activeSection === href.slice(2) : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg font-extrabold [font-stretch:92%]"
        >
          {personal.name}
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? "true" : undefined}
                className={cn(
                  "relative block py-1 text-sm font-medium transition-colors",
                  isCurrent(item.href) ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {item.label}
                {isCurrent(item.href) && (
                  <motion.span
                    layoutId="nav-mark"
                    aria-hidden
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-accent"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
            className="text-sm font-semibold lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* How far down the page you are. */}
      <motion.span
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-tape"
      />

      {open && (
        <div
          id="site-menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-background lg:hidden"
        >
          <ul className="shell py-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="stretch block py-4 font-display text-5xl font-extrabold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
