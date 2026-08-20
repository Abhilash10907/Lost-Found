import Link from "next/link";
import { Search, Heart } from "lucide-react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Lost Items", href: "/lost" },
  { label: "Found Items", href: "/found" },
  { label: "Report Item", href: "/report" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Footer() {
  return (
    <footer className="border-t-[2.5px] border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-marker text-paper comic-border">
                <Search className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-extrabold text-ink">
                Campus Find
              </span>
            </Link>
            <p className="mt-3 text-sm text-ink-soft">
              Helping students find what they&apos;ve lost.
            </p>
          </div>

          <div>
            <p className="mb-3 font-tag text-xs uppercase tracking-wide text-ink-soft">
              Navigate
            </p>
            <ul className="space-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-ink transition-colors hover:text-marker"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t-2 border-dashed border-ink/20 pt-6 text-xs text-ink-soft sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Campus Find</p>
          <p className="inline-flex items-center gap-1">
            Built for the campus community
            <Heart className="h-3.5 w-3.5 fill-marker text-marker" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
