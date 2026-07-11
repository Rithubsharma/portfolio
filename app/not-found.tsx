import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-text-tertiary">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
      >
        Back to Home
      </Link>
    </section>
  );
}
