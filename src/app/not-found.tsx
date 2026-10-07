import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-pixel text-6xl text-primary">404</h1>
      <p className="mt-4 text-lg text-text/70">
        Page not found — looks like you wandered off the map.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 font-bold text-background transition-colors hover:bg-accent"
      >
        Back Home
      </Link>
    </div>
  );
}
