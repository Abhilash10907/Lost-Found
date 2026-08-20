import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsCard({
  icon: Icon,
  value,
  label,
  accent = "sticker",
  rotate = 0,
}: {
  icon: LucideIcon;
  value: string | number;
  label: string;
  accent?: "sticker" | "pop" | "marker" | "sunshine" | "grape";
  rotate?: number;
}) {
  const accentMap: Record<string, string> = {
    sticker: "bg-sticker-light text-sticker-dark",
    pop: "bg-pop-light text-pop-dark",
    marker: "bg-marker-light text-marker-dark",
    sunshine: "bg-sunshine-light text-ink",
    grape: "bg-grape-light text-grape-dark",
  };

  return (
    <div
      className="comic-card flex items-center gap-4 rounded-2xl p-4 sm:p-5"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl comic-border",
          accentMap[accent]
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <p className="font-display text-2xl font-extrabold leading-none text-ink sm:text-3xl">
          {value}
        </p>
        <p className="mt-1 text-sm font-medium text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
