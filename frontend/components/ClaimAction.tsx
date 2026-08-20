"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HandHeart, X, Construction } from "lucide-react";
import { ItemStatus } from "@/data/types";
import { cn } from "@/lib/utils";

export default function ClaimAction({ type }: { type: ItemStatus }) {
  const [open, setOpen] = useState(false);
  const label = type === "found" ? "This Is Mine" : "I Found This";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "btn-comic w-full justify-center px-6 py-3.5 text-sm text-paper sm:w-auto",
          type === "found" ? "bg-marker" : "bg-pop"
        )}
      >
        <HandHeart className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="comic-card w-full max-w-sm rounded-3xl p-6 text-center"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full comic-border bg-paper"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="mx-auto -mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-sunshine-light comic-border">
                <Construction className="h-7 w-7 text-ink" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                Coming in a later phase
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Claiming and ownership verification aren&apos;t live yet. Once
                the backend is built, this button will kick off the real
                verification flow.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-comic mt-5 w-full justify-center bg-ink px-4 py-2.5 text-xs text-paper"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
