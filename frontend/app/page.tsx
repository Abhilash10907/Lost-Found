"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Frown,
  HeartHandshake,
  Compass,
  Backpack,
  KeyRound,
  Wallet,
  Headphones,
  IdCard,
  GlassWater,
  Package,
  Search as SearchIcon,
  ThumbsUp,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ItemCard from "@/components/ItemCard";
import MatchCard from "@/components/MatchCard";
import StatsCard from "@/components/StatsCard";
import CampusLocations from "@/components/CampusLocations";
import { mockItems, mockMatches, campusStats, getItemById } from "@/data/mockItems";

const HERO_STICKERS = [
  { icon: Backpack, color: "bg-sticker-light text-sticker-dark", top: "6%", left: "4%", rotate: -10, delay: 0 },
  { icon: KeyRound, color: "bg-sunshine-light text-ink", top: "62%", left: "2%", rotate: 8, delay: 0.4 },
  { icon: Wallet, color: "bg-marker-light text-marker-dark", top: "2%", left: "80%", rotate: 6, delay: 0.2 },
  { icon: Headphones, color: "bg-pop-light text-pop-dark", top: "70%", left: "82%", rotate: -8, delay: 0.6 },
  { icon: IdCard, color: "bg-grape-light text-grape-dark", top: "36%", left: "88%", rotate: 4, delay: 0.3 },
  { icon: GlassWater, color: "bg-sticker-light text-sticker-dark", top: "40%", left: "0%", rotate: -6, delay: 0.5 },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(value: string) {
    const params = value.trim() ? `?q=${encodeURIComponent(value.trim())}` : "";
    router.push(`/lost${params}`);
  }

  const recentItems = mockItems
    .filter((item) => item.status !== "returned")
    .slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-[2.5px] border-ink">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <div className="relative mx-auto max-w-2xl text-center">
            {HERO_STICKERS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: s.delay, duration: 0.4 }}
                  style={{
                    top: s.top,
                    left: s.left,
                    ["--rot" as string]: `${s.rotate}deg`,
                    transform: `rotate(${s.rotate}deg)`,
                  }}
                  className={`absolute hidden h-14 w-14 items-center justify-center rounded-2xl comic-border shadow-comic-sm sm:flex ${s.color} animate-float`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </motion.span>
              );
            })}

            <span className="sticker-badge bg-sunshine-light text-ink">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              Campus-exclusive
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
              Lost something on campus?
              <br />
              <span className="text-marker">Let&apos;s get it back.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base text-ink-soft sm:text-lg">
              Campus Find connects students with lost and found items across
              campus.
            </p>

            <div className="mt-7">
              <SearchBar
                value={query}
                onChange={setQuery}
                onSubmit={handleSearch}
                size="lg"
                placeholder="What did you lose?"
              />
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/report?type=lost"
                className="btn-comic bg-marker px-6 py-3 text-sm text-paper"
              >
                <Frown className="h-4 w-4" aria-hidden="true" />
                I Lost Something
              </Link>
              <Link
                href="/report?type=found"
                className="btn-comic bg-pop px-6 py-3 text-sm text-paper"
              >
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                I Found Something
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <QuickAction
            emoji="\u{1F62D}"
            title="Lost something?"
            subtitle="Let's find it."
            cta="Report Lost Item"
            href="/report?type=lost"
            accent="marker"
          />
          <QuickAction
            emoji="\u{1F979}"
            title="Found something?"
            subtitle="You're someone's hero."
            cta="Report Found Item"
            href="/report?type=found"
            accent="pop"
          />
          <QuickAction
            emoji="\u{1F575}\uFE0F"
            title="Looking for something?"
            subtitle="Start hunting."
            cta="Search Items"
            href="/lost"
            accent="sticker"
          />
        </div>
      </section>

      {/* RECENTLY REPORTED */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Recently Reported
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Fresh sightings from around campus.
            </p>
          </div>
          <Link
            href="/lost"
            className="hidden text-sm font-bold text-sticker-dark hover:underline sm:inline-block"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recentItems.map((item, i) => (
            <ItemCard key={item.id} item={item} rotate={i % 2 === 0 ? -1 : 1} />
          ))}
        </div>
      </section>

      {/* SMART MATCHING PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <span className="sticker-badge bg-grape-light text-grape-dark">
            <SearchIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Preview
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            🔎 Possible Matches
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">
            A sneak peek at the smart matching system coming in a later phase.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {mockMatches.map((match) => {
            const source = getItemById(match.sourceItemId);
            const matched = getItemById(match.matchedItemId);
            if (!source || !matched) return null;
            return (
              <MatchCard
                key={match.id}
                match={match}
                sourceItem={source}
                matchedItem={matched}
              />
            );
          })}
        </div>
      </section>

      {/* CAMPUS LOCATIONS */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            📍 Lost & Found Around Campus
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">
            Where things tend to go missing (and where they turn up).
          </p>
        </div>
        <CampusLocations />
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            🎒 Campus Recovery
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">
            The Campus Find community, by the numbers.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard icon={Package} value={campusStats.reported} label="Stuff Reported" accent="sticker" rotate={-1} />
          <StatsCard icon={SearchIcon} value={campusStats.found} label="Stuff Found" accent="pop" rotate={1} />
          <StatsCard icon={ThumbsUp} value={campusStats.returned} label="Back With Owners" accent="sunshine" rotate={-1} />
          <StatsCard icon={Compass} value={campusStats.matches} label="Matches" accent="grape" rotate={1} />
        </div>
      </section>
    </div>
  );
}

function QuickAction({
  emoji,
  title,
  subtitle,
  cta,
  href,
  accent,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  accent: "marker" | "pop" | "sticker";
}) {
  const accentBtn = {
    marker: "bg-marker",
    pop: "bg-pop",
    sticker: "bg-sticker",
  }[accent];

  return (
    <div className="comic-card flex flex-col items-start gap-3 rounded-3xl p-6 transition-transform hover:-translate-y-1">
      <span className="text-3xl" aria-hidden="true">
        {emoji}
      </span>
      <div>
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
        <p className="text-sm text-ink-soft">{subtitle}</p>
      </div>
      <Link
        href={href}
        className={`btn-comic mt-1 px-4 py-2 text-xs text-paper ${accentBtn}`}
      >
        {cta}
      </Link>
    </div>
  );
}
