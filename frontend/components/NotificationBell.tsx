"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Search, MessageCircle, CheckCircle2, Info } from "lucide-react";
import { mockNotifications } from "@/data/mockItems";
import { CampusNotification } from "@/data/types";
import { cn } from "@/lib/utils";

const ICONS: Record<CampusNotification["icon"], typeof Search> = {
  match: Search,
  message: MessageCircle,
  success: CheckCircle2,
  info: Info,
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-full comic-border bg-paper transition-transform hover:-translate-y-0.5 hover:shadow-comic-sm"
      >
        <Bell className="h-5 w-5 text-ink" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-marker text-[10px] font-bold text-paper comic-border animate-wiggle">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-80 max-w-[90vw] overflow-hidden rounded-2xl comic-border bg-paper shadow-comic-lg"
          >
            <div className="border-b-2 border-ink bg-sunshine-light px-4 py-3">
              <p className="font-display text-sm font-bold text-ink">
                Notifications
              </p>
            </div>
            <ul className="max-h-80 divide-y-2 divide-ink/10 overflow-y-auto">
              {mockNotifications.map((n) => {
                const Icon = ICONS[n.icon];
                return (
                  <li
                    key={n.id}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 text-sm",
                      n.unread && "bg-sticker-light/40"
                    )}
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper comic-border">
                      <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-ink">{n.message}</p>
                      <p className="mt-0.5 font-tag text-[10px] uppercase tracking-wide text-ink-soft">
                        {n.timeAgo}
                      </p>
                    </div>
                    {n.unread && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-marker" />
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
