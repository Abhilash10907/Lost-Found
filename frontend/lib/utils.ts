import { CampusLocation, ItemCategory } from "@/data/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export const CATEGORIES: ItemCategory[] = [
  "Electronics",
  "ID Cards",
  "Wallets",
  "Keys",
  "Bags",
  "Books",
  "Clothing",
  "Accessories",
  "Documents",
  "Other",
];

export const LOCATIONS: CampusLocation[] = [
  "Main Library",
  "Cafeteria",
  "Computer Science Block",
  "Main Gate",
  "Sports Complex",
  "Hostel Block A",
  "Hostel Block B",
  "Auditorium",
  "Student Center",
  "Parking Area",
];

export type SortOption = "newest" | "oldest" | "name-asc" | "name-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name-asc", label: "Name A\u2013Z" },
  { value: "name-desc", label: "Name Z\u2013A" },
];
