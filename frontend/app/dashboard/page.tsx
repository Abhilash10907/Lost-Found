import Link from "next/link";
import { Backpack, Search, PartyPopper, Frown, HeartHandshake, Sparkles, CheckCircle2 } from "lucide-react";
import ItemCard from "@/components/ItemCard";
import MatchCard from "@/components/MatchCard";
import EmptyState from "@/components/EmptyState";
import { mockItems, mockMatches, mockActivity, getItemById } from "@/data/mockItems";

export const metadata = {
  title: "Dashboard \u2014 Campus Find",
};

const ACTIVITY_ICONS = {
  lost: Frown,
  found: HeartHandshake,
  match: Sparkles,
  returned: CheckCircle2,
};

export default function DashboardPage() {
  const myLostItems = mockItems.filter(
    (item) => item.type === "lost" && item.status !== "returned"
  ).slice(0, 3);
  const myFoundItems = mockItems.filter(
    (item) => item.type === "found" && item.status !== "returned"
  ).slice(0, 3);
  const returnedCount = mockItems.filter((item) => item.status === "returned").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="sticker-badge bg-sunshine-light text-ink">Welcome back</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Your Campus Find dashboard
        </h1>
        <p className="mt-2 text-sm text-ink-soft sm:text-base">
          Track what you&apos;ve reported and what might be waiting for you.
        </p>
      </div>

      {/* OVERVIEW */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <OverviewCard
          icon={Backpack}
          value={myLostItems.length + myFoundItems.length}
          label="Items Reported"
          emoji="\u{1F392}"
          accent="sticker"
        />
        <OverviewCard
          icon={Search}
          value={mockMatches.length}
          label="Possible Matches"
          emoji="\u{1F50E}"
          accent="grape"
        />
        <OverviewCard
          icon={PartyPopper}
          value={returnedCount}
          label="Items Returned"
          emoji="\u{1F389}"
          accent="pop"
        />
      </div>

      {/* MY LOST ITEMS */}
      <DashboardSection title="My Lost Items" href="/lost">
        {myLostItems.length === 0 ? (
          <EmptyState title="Nothing reported lost." description="Hopefully it stays that way." />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {myLostItems.map((item, i) => (
              <ItemCard key={item.id} item={item} rotate={i % 2 === 0 ? -1 : 1} />
            ))}
          </div>
        )}
      </DashboardSection>

      {/* MY FOUND ITEMS */}
      <DashboardSection title="My Found Items" href="/found">
        {myFoundItems.length === 0 ? (
          <EmptyState title="No found reports yet." description="Turned something in? It'll show up here." />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {myFoundItems.map((item, i) => (
              <ItemCard key={item.id} item={item} rotate={i % 2 === 0 ? -1 : 1} />
            ))}
          </div>
        )}
      </DashboardSection>

      {/* POSSIBLE MATCHES */}
      <DashboardSection title="Possible Matches">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {mockMatches.map((match) => {
            const source = getItemById(match.sourceItemId);
            const matched = getItemById(match.matchedItemId);
            if (!source || !matched) return null;
            return (
              <MatchCard key={match.id} match={match} sourceItem={source} matchedItem={matched} />
            );
          })}
        </div>
      </DashboardSection>

      {/* RECENT ACTIVITY */}
      <DashboardSection title="Recent Activity">
        <div className="comic-card rounded-2xl p-2 sm:p-4">
          <ul className="divide-y-2 divide-ink/10">
            {mockActivity.map((entry) => {
              const Icon = ACTIVITY_ICONS[entry.icon];
              return (
                <li key={entry.id} className="flex items-center gap-3 px-3 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sunshine-light comic-border">
                    <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink">{entry.message}</span>
                  <span className="font-tag text-[11px] uppercase tracking-wide text-ink-soft">
                    {entry.timeAgo}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </DashboardSection>
    </div>
  );
}

function DashboardSection({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
          {title}
        </h2>
        {href && (
          <Link href={href} className="text-sm font-bold text-sticker-dark hover:underline">
            View all &rarr;
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function OverviewCard({
  icon: Icon,
  value,
  label,
  emoji,
  accent,
}: {
  icon: typeof Backpack;
  value: number;
  label: string;
  emoji: string;
  accent: "sticker" | "grape" | "pop";
}) {
  const accentMap = {
    sticker: "bg-sticker-light text-sticker-dark",
    grape: "bg-grape-light text-grape-dark",
    pop: "bg-pop-light text-pop-dark",
  };
  return (
    <div className="comic-card flex items-center gap-4 rounded-2xl p-5">
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl comic-border text-xl ${accentMap[accent]}`}>
        <span aria-hidden="true">{emoji}</span>
      </span>
      <div>
        <p className="font-display text-2xl font-extrabold leading-none text-ink">{value}</p>
        <p className="mt-1 text-sm font-medium text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
