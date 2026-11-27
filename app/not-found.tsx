import Link from "next/link";
import { LegacyRedirect } from "@/components/layout/LegacyRedirect";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80vh] flex-col justify-center pt-16">
      <LegacyRedirect />
      <h1 className="text-[clamp(3rem,12vw,11rem)] [font-stretch:68%]">Missed the mark.</h1>
      <p className="mt-6 max-w-md text-lg text-text-secondary">
        There is no page at this address. It may have moved when the site was rebuilt.
      </p>
      <Link
        href="/"
        className="btn mt-8 self-start"
      >
        Go to the home page
      </Link>
    </section>
  );
}
