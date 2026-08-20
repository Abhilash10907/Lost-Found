"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchX, Loader2, RefreshCw, AlertTriangle } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import ItemCard from "@/components/ItemCard";
import EmptyState from "@/components/EmptyState";
import { CampusItem, CampusLocation, ItemCategory, ItemStatus } from "@/data/types";
import { SortOption } from "@/lib/utils";
import { getItems } from "@/lib/api";

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
  const router = useRouter();
  const [items, setItems] = useState<CampusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<ItemCategory | "All">((searchParams.get("category") as ItemCategory) ?? "All");
  const [location, setLocation] = useState<CampusLocation | "All">((searchParams.get("location") as CampusLocation) ?? "All");
  const [sort, setSort] = useState<SortOption>((searchParams.get("sort") as SortOption) ?? "newest");

  // Sync state to URL query parameters with debounce for query
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      
      if (category === "All") params.delete("category");
      else params.set("category", category);
      
      if (location === "All") params.delete("location");
      else params.set("location", location);
      
      if (sort === "newest") params.delete("sort");
      else params.set("sort", sort);

      if (query.trim()) params.set("q", query.trim());
      else params.delete("q");

      const searchStr = params.toString();
      const newUrl = searchStr ? `${window.location.pathname}?${searchStr}` : window.location.pathname;
      router.replace(newUrl);
    }, 400);

    return () => clearTimeout(handler);
  }, [category, location, sort, query, router]);

  async function loadItems() {
    setLoading(true);
    setError(null);
    try {
      const fetchedItems = await getItems();
      setItems(fetchedItems);
    } catch (err: any) {
      console.error("Failed to fetch items:", err);
      setError("We couldn't reach the campus network. Give it another shot!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const results = useMemo(() => {
    let filtered = items.filter(
      (item) => item.type === type && item.status !== "returned"
    );

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (location !== "All") {
      filtered = filtered.filter((item) => item.location === location);
    }

    filtered = [...filtered].sort((a, b) => {
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

    return filtered;
  }, [items, type, query, category, location, sort]);

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
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-ink-soft">
              {loading ? "Fetching items..." : `${results.length} item${results.length !== 1 ? "s" : ""} found`}
            </p>
            {error && (
              <button 
                onClick={loadItems}
                className="inline-flex items-center gap-1 text-xs font-bold text-marker-dark hover:underline"
              >
                <RefreshCw className="h-3 w-3 animate-spin" /> Retry
              </button>
            )}
          </div>

          {loading ? (
            // Comic-style card skeleton loading states
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="comic-card animate-pulse overflow-hidden rounded-2xl border-[2.5px] border-ink bg-paper opacity-70"
                  style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
                >
                  <div className="relative h-36 w-full bg-ink/5 md:h-40">
                    <div className="absolute inset-0 halftone text-ink/5" />
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="h-5 w-3/4 rounded-md bg-ink/10" />
                    <div className="flex gap-2">
                      <div className="h-3.5 w-1/3 rounded-md bg-ink/5" />
                      <div className="h-3.5 w-1/4 rounded-md bg-ink/5" />
                    </div>
                    <div className="space-y-1.5 pt-2">
                      <div className="h-3 w-full rounded-md bg-ink/5" />
                      <div className="h-3 w-5/6 rounded-md bg-ink/5" />
                    </div>
                    <div className="mt-4 h-4 w-24 rounded-md bg-ink/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Comic-style Speech Bubble Error State
            <div className="comic-card mx-auto max-w-md rounded-3xl bg-marker-light p-6 text-center border-[2.5px] border-ink shadow-comic">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-marker text-paper comic-border mb-4">
                <AlertTriangle className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-extrabold text-ink">
                KA-BOOM!
              </h3>
              <p className="mt-2 text-sm font-medium text-ink-soft leading-relaxed">
                {error}
              </p>
              <button
                type="button"
                onClick={loadItems}
                className="btn-comic mt-5 bg-ink px-5 py-2.5 text-xs text-paper"
              >
                <RefreshCw className="mr-1 h-3.5 w-3.5" />
                Retry Connection
              </button>
            </div>
          ) : results.length === 0 ? (
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

