import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="font-display text-[.85rem] uppercase tracking-[4px] text-vermillion">404</div>
      <h1 className="mt-3 font-display text-4xl text-ink">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-ink/60">
        The page you're looking for doesn't exist — but your perfect venue still does.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-maroon px-8 py-3.5 text-[.8rem] uppercase tracking-[2.5px] text-white transition-colors hover:bg-maroonDeep"
      >
        Back to Home
      </Link>
    </div>
  );
}
