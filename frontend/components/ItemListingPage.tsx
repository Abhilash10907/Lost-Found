"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import ItemCard from "@/components/ItemCard";
import EmptyState from "@/components/EmptyState";
import { mockItems } from "@/data/mockItems";
import { CampusItem, CampusLocation, ItemCategory, ItemStatus } from "@/data/types";
import { SortOption } from "@/lib/utils";

export default function ItemListingPage({
  type,
  title,
  subtitle,
}: {
  type: ItemStatus;
  title: string;
  subtitle: string;
}) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<ItemCategory | "All">("All");
  const [location, setLocation] = useState<CampusLocation | "All">("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const results = useMemo(() => {
    let items: CampusItem[] = mockItems.filter(
      (item) => item.type === type && item.status !== "returned"
    );

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      items = items.filter((item) => item.category === category);
    }

    if (location !== "All") {
      items = items.filter((item) => item.location === location);
    }

    items = [...items].sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.date.localeCompare(a.date);
        case "oldest":
          return a.date.localeCompare(b.date);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return items;
  }, [type, query, category, location, sort]);

  function resetFilters() {
    setCategory("All");
    setLocation("All");
    setSort("newest");
    setQuery("");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-soft sm:text-base">{subtitle}</p>
      </div>

      <div className="mx-auto mb-8 max-w-xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={`Search by name, description, or location...`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <FilterPanel
            category={category}
            onCategoryChange={setCategory}
            location={location}
            onLocationChange={setLocation}
            sort={sort}
            onSortChange={setSort}
            onReset={resetFilters}
          />
        </div>

        <div>
          <p className="mb-4 text-sm font-medium text-ink-soft">
            {results.length} item{results.length !== 1 ? "s" : ""} found
          </p>
          {results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No items found."
              description="Try changing your search or filters."
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((item, i) => (
                <ItemCard key={item.id} item={item} rotate={i % 2 === 0 ? -1 : 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
