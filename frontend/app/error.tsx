"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error("Next.js Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <div className="comic-card rounded-3xl bg-marker-light p-6 text-center border-[2.5px] border-ink shadow-comic relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 halftone opacity-30 text-ink/5" />
        
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-marker text-paper comic-border mb-5">
          <AlertTriangle className="h-8 w-8 text-paper" aria-hidden="true" />
        </div>
        
        <h1 className="relative font-display text-2xl font-extrabold text-ink tracking-tight sm:text-3xl">
          KA-BOOM!
        </h1>
        
        <p className="relative mt-3 text-sm font-semibold text-ink-soft leading-relaxed">
          The campus lost & found network suffered a glitch or went offline.
        </p>

        {error.message && (
          <div className="relative mt-4 rounded-xl border-2 border-ink/15 bg-paper/50 p-2.5 text-left font-mono text-[10px] text-ink-soft/90 max-h-24 overflow-auto">
            <span className="font-bold text-ink">Error details: </span>
            {error.message}
          </div>
        )}
        
        <div className="relative mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-comic w-full justify-center bg-ink px-5 py-3 text-sm text-paper"
          >
            <RefreshCw className="mr-1.5 h-4 w-4 animate-spin-slow" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="btn-comic w-full justify-center bg-paper text-ink px-5 py-3 text-sm hover:bg-cream"
          >
            <Home className="mr-1.5 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
