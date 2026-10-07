"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-pixel text-4xl text-primary">Oops</h1>
      <p className="mt-4 max-w-md text-lg text-text/70">
        This page hit an error while loading. Trying again usually fixes it.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-lg bg-primary px-6 py-3 font-bold text-background transition-colors hover:bg-accent"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-2 py-3 font-bold text-text/70 transition-colors hover:text-primary"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
