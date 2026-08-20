import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, Palette, Tag, ArrowLeft } from "lucide-react";
import { getItemById, mockItems } from "@/data/mockItems";
import StatusBadge from "@/components/StatusBadge";
import ClaimAction from "@/components/ClaimAction";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return mockItems.map((item) => ({ id: item.id }));
}

export default function ItemDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const item = getItemById(params.id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={item.type === "lost" ? "/lost" : "/found"}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-marker"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to {item.type === "lost" ? "Lost" : "Found"} Items
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl comic-border shadow-comic">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute left-4 top-4">
            <StatusBadge status={item.type} />
          </div>
        </div>

        <div>
          <span className="sticker-badge bg-sticker-light text-sticker-dark">
            <Tag className="h-3.5 w-3.5" aria-hidden="true" />
            {item.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {item.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {item.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {formatDate(item.date)}
            </span>
            {item.time && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {item.time}
              </span>
            )}
            {item.color && (
              <span className="inline-flex items-center gap-1.5">
                <Palette className="h-4 w-4" aria-hidden="true" />
                {item.color}
              </span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink sm:text-base">
            {item.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl comic-border bg-paper p-4 text-sm">
            {item.brand && (
              <div>
                <dt className="font-tag text-[11px] uppercase tracking-wide text-ink-soft">
                  Brand
                </dt>
                <dd className="mt-0.5 font-medium text-ink">{item.brand}</dd>
              </div>
            )}
            {item.additionalDetails && (
              <div className="col-span-2">
                <dt className="font-tag text-[11px] uppercase tracking-wide text-ink-soft">
                  Additional details
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  {item.additionalDetails}
                </dd>
              </div>
            )}
            {item.type === "found" && item.keepingLocation && (
              <div className="col-span-2">
                <dt className="font-tag text-[11px] uppercase tracking-wide text-ink-soft">
                  Currently kept at
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  {item.keepingLocation}
                </dd>
              </div>
            )}
            <div className="col-span-2">
              <dt className="font-tag text-[11px] uppercase tracking-wide text-ink-soft">
                Current status
              </dt>
              <dd className="mt-0.5 font-medium capitalize text-ink">
                {item.status}
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-xs text-ink-soft">
            Contact details are kept private until ownership is verified.
          </p>

          <div className="mt-6">
            <ClaimAction type={item.type} />
          </div>
        </div>
      </div>
    </div>
  );
}
