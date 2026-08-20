import {
  BookOpen,
  Utensils,
  Laptop,
  DoorOpen,
  Dumbbell,
  Home,
  Presentation,
  Users,
  Car,
  LucideIcon,
} from "lucide-react";
import { CampusLocation } from "@/data/types";
import { mockItems } from "@/data/mockItems";

const LOCATION_META: {
  name: CampusLocation;
  icon: LucideIcon;
  rotate: number;
}[] = [
  { name: "Main Library", icon: BookOpen, rotate: -2 },
  { name: "Cafeteria", icon: Utensils, rotate: 2 },
  { name: "Computer Science Block", icon: Laptop, rotate: -1 },
  { name: "Main Gate", icon: DoorOpen, rotate: 1 },
  { name: "Sports Complex", icon: Dumbbell, rotate: -2 },
  { name: "Hostel Block A", icon: Home, rotate: 2 },
  { name: "Hostel Block B", icon: Home, rotate: -1 },
  { name: "Auditorium", icon: Presentation, rotate: 1 },
  { name: "Student Center", icon: Users, rotate: -2 },
  { name: "Parking Area", icon: Car, rotate: 2 },
];

export default function CampusLocations() {
  const counts = LOCATION_META.map((loc) => {
    const items = mockItems.filter(
      (item) => item.location === loc.name && item.status === "active"
    );
    return {
      ...loc,
      lost: items.filter((i) => i.type === "lost").length,
      found: items.filter((i) => i.type === "found").length,
    };
  });

  return (
    <div className="comic-card relative overflow-hidden rounded-3xl p-5 sm:p-8">
      <div className="pointer-events-none absolute inset-0 halftone text-ink/5" />
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {counts.map((loc) => {
          const Icon = loc.icon;
          const total = loc.lost + loc.found;
          return (
            <div
              key={loc.name}
              style={{ transform: `rotate(${loc.rotate}deg)` }}
              className="flex flex-col items-center gap-2 rounded-2xl comic-border bg-paper p-3 text-center shadow-comic-sm transition-transform hover:-translate-y-1 hover:rotate-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sticker-light comic-border">
                <Icon className="h-5 w-5 text-sticker-dark" aria-hidden="true" />
              </div>
              <p className="font-display text-xs font-bold leading-tight text-ink sm:text-sm">
                {loc.name}
              </p>
              <div className="flex items-center gap-1.5">
                {loc.lost > 0 && (
                  <span className="rounded-full bg-marker-light px-2 py-0.5 text-[10px] font-tag font-bold text-marker-dark">
                    {loc.lost} lost
                  </span>
                )}
                {loc.found > 0 && (
                  <span className="rounded-full bg-pop-light px-2 py-0.5 text-[10px] font-tag font-bold text-pop-dark">
                    {loc.found} found
                  </span>
                )}
                {total === 0 && (
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-tag text-ink-soft">
                    all clear
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
