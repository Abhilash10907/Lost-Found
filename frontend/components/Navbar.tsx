"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, UserCircle2 } from "lucide-react";
import NotificationBell from "./NotificationBell";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Lost Items", href: "/lost" },
  { label: "Found Items", href: "/found" },
  { label: "Report Item", href: "/report" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-[2.5px] border-ink bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-marker text-paper comic-border shadow-comic-sm">
            <Search className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">
            Campus Find
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-bold text-ink-soft transition-colors hover:bg-sunshine-light hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NotificationBell />
          <Link
            href="/dashboard"
            className="btn-comic bg-ink px-4 py-2 text-xs text-paper"
          >
            <UserCircle2 className="h-4 w-4" aria-hidden="true" />
            Profile
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <NotificationBell />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full comic-border bg-paper"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t-2 border-ink bg-cream lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-sunshine-light"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="btn-comic mt-2 justify-center bg-ink px-4 py-2.5 text-xs text-paper"
              >
                <UserCircle2 className="h-4 w-4" aria-hidden="true" />
                Profile
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
