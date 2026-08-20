"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CampusItem, ItemMatch } from "@/data/types";
import { cn } from "@/lib/utils";

const BREAKDOWN_LABELS: { key: keyof ItemMatch["breakdown"]; label: string }[] =
  [
    { key: "description", label: "Description" },
    { key: "location", label: "Location" },
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
  ];

function scoreColor(score: number) {
  if (score >= 85) return "bg-pop";
  if (score >= 60) return "bg-sunshine";
  return "bg-marker";
}

export default function MatchCard({
  match,
  sourceItem,
  matchedItem,
}: {
  match: ItemMatch;
  sourceItem: CampusItem;
  matchedItem: CampusItem;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative"
    >
      <Link
        href={`/item/${matchedItem.id}`}
        className="group block comic-card overflow-hidden rounded-2xl p-4 sm:p-5 transition-shadow duration-200 hover:shadow-comic-lg"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="sticker-badge bg-grape-light text-grape-dark">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {match.overallScore}% MATCH
          </span>
          <span className="hidden text-xs font-tag text-ink-soft sm:inline group-hover:text-ink transition-colors">
            for &ldquo;{sourceItem.name}&rdquo;
          </span>
        </div>

      <div className="flex gap-3 sm:gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl comic-border sm:h-20 sm:w-20">
          <Image
            src={matchedItem.image}
            alt={matchedItem.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold leading-tight text-ink sm:text-lg">
            {matchedItem.name}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{match.blurb}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {BREAKDOWN_LABELS.map(({ key, label }) => {
          const score = match.breakdown[key];
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="w-24 shrink-0 font-tag text-[11px] uppercase tracking-wide text-ink-soft">
                {label}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                <div
                  className={cn("h-full rounded-full", scoreColor(score))}
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right font-tag text-[11px] text-ink-soft">
                {score}%
              </span>
            </div>
          );
        })}
      </div>
    </Link>
  </motion.div>
);
}
