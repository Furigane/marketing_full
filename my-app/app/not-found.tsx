import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <span className="rounded-full bg-[var(--services-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]">
        404
      </span>
      <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
        Page not found
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--design-text)]">
        The page does not exist or has been moved. Use the main sections below to continue
        browsing the site.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="rounded-full bg-[#acc2fd] px-5 py-3 font-semibold text-zinc-900" href="/ru">
          Home
        </Link>
        <Link className="rounded-full border border-[color:var(--foreground)]/10 px-5 py-3 font-semibold text-[var(--foreground)]" href="/ru/services">
          Services
        </Link>
        <Link className="rounded-full border border-[color:var(--foreground)]/10 px-5 py-3 font-semibold text-[var(--foreground)]" href="/ru/blog">
          Blog
        </Link>
        <Link className="rounded-full border border-[color:var(--foreground)]/10 px-5 py-3 font-semibold text-[var(--foreground)]" href="/ru/contact">
          Contact
        </Link>
      </div>
    </main>
  );
}
