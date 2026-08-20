"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search for your missing stuff...",
  className,
  size = "md",
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-full comic-border bg-paper shadow-comic-sm transition-shadow focus-within:shadow-comic",
        size === "lg" ? "px-5 py-3" : "px-4 py-2",
        className
      )}
    >
      <Search
        className={cn(
          "shrink-0 text-marker",
          size === "lg" ? "h-6 w-6" : "h-5 w-5"
        )}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search items"
        className={cn(
          "w-full bg-transparent font-medium text-ink placeholder:text-ink-soft/70 focus:outline-none",
          size === "lg" ? "text-base sm:text-lg" : "text-sm"
        )}
      />
      {onSubmit && (
        <button
          type="submit"
          className="btn-comic hidden shrink-0 bg-marker px-4 py-2 text-xs text-paper sm:inline-flex"
        >
          Search
        </button>
      )}
    </form>
  );
}
