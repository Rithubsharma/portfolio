import Link from "next/link";
import { personal } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="shell flex flex-col gap-3 py-8 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {personal.name}. {personal.location}.
        </p>
        <Link href="/#top" className="link font-medium">
          Back to top
        </Link>
      </div>
    </footer>
  );
}
