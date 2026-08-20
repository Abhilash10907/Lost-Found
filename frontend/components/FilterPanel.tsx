"use client";

import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { CampusLocation, ItemCategory } from "@/data/types";
import { CATEGORIES, LOCATIONS, SORT_OPTIONS, SortOption, cn } from "@/lib/utils";

interface FilterPanelProps {
  category: ItemCategory | "All";
  onCategoryChange: (value: ItemCategory | "All") => void;
  location: CampusLocation | "All";
  onLocationChange: (value: CampusLocation | "All") => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  onReset: () => void;
}

export default function FilterPanel({
  category,
  onCategoryChange,
  location,
  onLocationChange,
  sort,
  onSortChange,
  onReset,
}: FilterPanelProps) {
  return (
    <div className="comic-card rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-display font-bold text-ink">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </span>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-bold text-ink-soft transition-colors hover:text-marker"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-tag text-[11px] uppercase tracking-wide text-ink-soft">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange("All")}
            className={cn(
              "rounded-full comic-border px-3 py-1 text-xs font-bold transition-colors",
              category === "All"
                ? "bg-ink text-paper"
                : "bg-paper text-ink hover:bg-sunshine-light"
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "rounded-full comic-border px-3 py-1 text-xs font-bold transition-colors",
                category === cat
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink hover:bg-sunshine-light"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block font-tag text-[11px] uppercase tracking-wide text-ink-soft">
            Location
          </label>
          <select
            value={location}
            onChange={(e) =>
              onLocationChange(e.target.value as CampusLocation | "All")
            }
            className="w-full rounded-xl comic-border bg-paper px-3 py-2 text-sm font-medium text-ink focus:outline-none"
          >
            <option value="All">All locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-tag text-[11px] uppercase tracking-wide text-ink-soft">
            Sort by
          </label>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full rounded-xl comic-border bg-paper px-3 py-2 text-sm font-medium text-ink focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
