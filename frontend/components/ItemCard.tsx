"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { CampusItem } from "@/data/types";
import StatusBadge from "./StatusBadge";
import { formatDate, cn } from "@/lib/utils";

export default function ItemCard({
  item,
  rotate = 0,
}: {
  item: CampusItem;
  rotate?: number;
}) {
  return (
    <motion.div
      style={{ ["--rot" as string]: `${rotate}deg` }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative"
    >
      <Link
        href={`/item/${item.id}`}
        className="group block comic-card overflow-hidden rounded-2xl transition-shadow duration-200 hover:shadow-comic-lg"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {/* punch holes for the claim-ticket look */}
        <span className="absolute left-3 top-[132px] z-10 h-4 w-4 -translate-y-1/2 rounded-full bg-cream comic-border md:top-[152px]" />
        <span className="absolute right-3 top-[132px] z-10 h-4 w-4 -translate-y-1/2 rounded-full bg-cream comic-border md:top-[152px]" />

        <div className="relative h-36 w-full overflow-hidden border-b-[2.5px] border-ink bg-sticker-light md:h-40">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <StatusBadge status={item.type} />
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-paper/90 px-2 py-1 text-[10px] font-tag uppercase tracking-wide text-ink-soft comic-border">
            {item.category}
          </div>
        </div>

        {/* perforated divider */}
        <div className="relative border-b-2 border-dashed border-ink/30 px-4 py-1" />

        <div className="space-y-2 p-4 pt-3">
          <h3 className="font-display text-lg font-bold leading-tight text-ink">
            {item.name}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-tag text-[11px] text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {item.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(item.date)}
            </span>
          </div>

          <p className="line-clamp-2 text-sm text-ink-soft">
            {item.description}
          </p>

          <span
            className={cn(
              "mt-2 inline-flex items-center gap-1 text-sm font-bold text-sticker-dark",
              "group-hover:gap-2 transition-all"
            )}
          >
            Check it out
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
