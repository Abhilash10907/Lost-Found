import { cn } from "@/lib/utils";
import { ItemStatus } from "@/data/types";

const STYLES: Record<
  ItemStatus,
  { label: string; emoji: string; classes: string }
> = {
  lost: {
    label: "LOST",
    emoji: "\u{1F534}",
    classes: "bg-marker-light text-marker-dark",
  },
  found: {
    label: "FOUND!",
    emoji: "\u{1F7E2}",
    classes: "bg-pop-light text-pop-dark",
  },
  returned: {
    label: "RETURNED",
    emoji: "\u{1F389}",
    classes: "bg-sunshine-light text-ink",
  },
};

export default function StatusBadge({
  status,
  className,
}: {
  status: ItemStatus;
  className?: string;
}) {
  const style = STYLES[status];
  return (
    <span className={cn("sticker-badge", style.classes, className)}>
      <span aria-hidden="true">{style.emoji}</span>
      {style.label}
    </span>
  );
}
