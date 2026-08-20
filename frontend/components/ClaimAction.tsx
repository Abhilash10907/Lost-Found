"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HandHeart, X, Check, Loader2, Sparkles } from "lucide-react";
import { ItemStatus } from "@/data/types";
import { cn } from "@/lib/utils";
import { claimItem } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ClaimAction({
  type,
  id,
  status,
}: {
  type: ItemStatus;
  id: string;
  status: "active" | "matched" | "returned";
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  if (status === "returned") {
    return (
      <button
        disabled
        className="btn-comic w-full justify-center px-6 py-3.5 text-sm bg-pop-light border-pop text-pop-dark cursor-not-allowed sm:w-auto"
      >
        <Check className="h-4 w-4" aria-hidden="true" />
        Returned & Claimed!
      </button>
    );
  }

  const label = type === "found" ? "This Is Mine" : "I Found This";
  const modalTitle = type === "found" ? "Claim your item" : "Verify you found this";
  const modalDescription =
    type === "found"
      ? "Would you like to claim this item? We will notify the finder, mark it as returned, and help you coordinate the handoff."
      : "Thank you for finding this! We will notify the owner that their item has been located and coordinate the handoff.";

  async function handleConfirm() {
    setSubmitting(true);
    try {
      await claimItem(id);
      setOpen(false);
      router.refresh(); // refresh server component data in Next.js
    } catch (err) {
      console.error("Failed to claim item:", err);
      alert("Failed to confirm action. Please check your connection to the server.");
    } finally {
      setSubmitting(false);
    }
  }

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
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-tag text-ink-soft">ID: #{id}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full comic-border bg-paper hover:bg-cream"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sunshine-light comic-border">
                <Sparkles className="h-7 w-7 text-ink" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {modalTitle}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                {modalDescription}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleConfirm}
                  className={cn(
                    "btn-comic w-full justify-center px-4 py-2.5 text-xs text-paper",
                    type === "found" ? "bg-marker" : "bg-pop"
                  )}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Yes, confirm!"
                  )}
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setOpen(false)}
                  className="btn-comic w-full justify-center bg-paper text-ink px-4 py-2.5 text-xs hover:bg-cream"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

