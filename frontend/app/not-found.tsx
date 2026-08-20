import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-marker-light comic-border">
        <Compass className="h-10 w-10 text-marker-dark" aria-hidden="true" />
      </div>
      <h1 className="mt-5 font-display text-2xl font-extrabold text-ink">
        Hmm, we couldn&apos;t find that.
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        This item or page might have been returned, removed, or never existed.
      </p>
      <Link href="/" className="btn-comic mt-6 bg-ink px-6 py-3 text-sm text-paper">
        Back to Campus Find
      </Link>
    </div>
  );
}
