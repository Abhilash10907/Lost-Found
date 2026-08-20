"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Frown,
  HeartHandshake,
  UploadCloud,
  CheckCircle2,
  ImageOff,
} from "lucide-react";
import { CATEGORIES, LOCATIONS, cn } from "@/lib/utils";
import { ItemCategory, CampusLocation, ItemStatus } from "@/data/types";

interface FormState {
  name: string;
  category: ItemCategory | "";
  description: string;
  date: string;
  time: string;
  location: CampusLocation | "";
  color: string;
  brand: string;
  additionalDetails: string;
  keepingLocation: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  category: "",
  description: "",
  date: "",
  time: "",
  location: "",
  color: "",
  brand: "",
  additionalDetails: "",
  keepingLocation: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function ReportForm({
  initialType = "lost",
}: {
  initialType?: ItemStatus;
}) {
  const [reportType, setReportType] = useState<ItemStatus>(initialType);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const nextErrors: Errors = {};
    if (!form.name.trim()) nextErrors.name = "Give your item a name.";
    if (!form.category) nextErrors.category = "Pick a category.";
    if (!form.description.trim() || form.description.trim().length < 10)
      nextErrors.description = "Add at least a short description (10+ characters).";
    if (!form.date) nextErrors.date = "When did this happen?";
    if (!form.location) nextErrors.location = "Where did this happen?";
    if (reportType === "found" && !form.keepingLocation.trim())
      nextErrors.keepingLocation = "Let us know where it's being kept.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const existing = JSON.parse(
        localStorage.getItem("campusfind-reports") || "[]"
      );
      const newReport = {
        id: `local-${Date.now()}`,
        type: reportType,
        image: imagePreview,
        ...form,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "campusfind-reports",
        JSON.stringify([newReport, ...existing])
      );
    } catch {
      // localStorage may be unavailable (e.g. private mode) — fail silently,
      // the report simply won't persist across reloads.
    }

    setSubmitted(true);
  }

  function resetForm() {
    setForm(INITIAL_STATE);
    setImagePreview(null);
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="comic-card mx-auto max-w-xl rounded-3xl p-8 text-center sm:p-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pop-light comic-border"
        >
          <CheckCircle2 className="h-10 w-10 text-pop-dark" aria-hidden="true" />
        </motion.div>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-ink">
          Report submitted successfully
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Your {reportType} item report for &ldquo;{form.name}&rdquo; is saved on this
          device. We&apos;ll show possible matches here once the matching system
          goes live in a later phase.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="btn-comic mt-6 bg-ink px-6 py-3 text-sm text-paper"
        >
          Report another item
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <p className="mb-3 text-center font-display text-sm font-bold uppercase tracking-wide text-ink-soft">
          What happened?
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setReportType("lost")}
            className={cn(
              "flex items-center gap-3 rounded-2xl comic-border p-4 text-left transition-transform hover:-translate-y-0.5",
              reportType === "lost"
                ? "bg-marker-light shadow-comic"
                : "bg-paper shadow-comic-sm"
            )}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-marker text-paper comic-border">
              <Frown className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display font-bold text-ink">
                I Lost Something
              </span>
              <span className="text-xs text-ink-soft">Help us help you find it</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setReportType("found")}
            className={cn(
              "flex items-center gap-3 rounded-2xl comic-border p-4 text-left transition-transform hover:-translate-y-0.5",
              reportType === "found"
                ? "bg-pop-light shadow-comic"
                : "bg-paper shadow-comic-sm"
            )}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pop text-paper comic-border">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display font-bold text-ink">
                I Found Something
              </span>
              <span className="text-xs text-ink-soft">Be someone&apos;s hero</span>
            </span>
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="comic-card space-y-5 rounded-3xl p-5 sm:p-8"
      >
        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink">
            Item name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="e.g. Black Leather Wallet"
            className={cn(
              "w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none",
              errors.name && "border-marker"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs font-medium text-marker-dark">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                updateField("category", e.target.value as ItemCategory)
              }
              className={cn(
                "w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none",
                errors.category && "border-marker"
              )}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs font-medium text-marker-dark">
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">
              Location
            </label>
            <select
              value={form.location}
              onChange={(e) =>
                updateField("location", e.target.value as CampusLocation)
              }
              className={cn(
                "w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none",
                errors.location && "border-marker"
              )}
            >
              <option value="">Select a location</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="mt-1 text-xs font-medium text-marker-dark">
                {errors.location}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              className={cn(
                "w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none",
                errors.date && "border-marker"
              )}
            />
            {errors.date && (
              <p className="mt-1 text-xs font-medium text-marker-dark">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">
              Approximate time
            </label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => updateField("time", e.target.value)}
              className="w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">Color</label>
            <input
              type="text"
              value={form.color}
              onChange={(e) => updateField("color", e.target.value)}
              placeholder="e.g. Navy Blue"
              className="w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">Brand</label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => updateField("brand", e.target.value)}
              placeholder="e.g. Fossil"
              className="w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
            placeholder="What does it look like? Any distinguishing marks?"
            className={cn(
              "w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none",
              errors.description && "border-marker"
            )}
          />
          {errors.description && (
            <p className="mt-1 text-xs font-medium text-marker-dark">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink">
            Additional identifying details
          </label>
          <textarea
            value={form.additionalDetails}
            onChange={(e) => updateField("additionalDetails", e.target.value)}
            rows={2}
            placeholder="Stickers, engravings, scratches, anything unique"
            className="w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none"
          />
        </div>

        {reportType === "found" && (
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">
              Where is the item currently being kept?
            </label>
            <input
              type="text"
              value={form.keepingLocation}
              onChange={(e) => updateField("keepingLocation", e.target.value)}
              placeholder="e.g. Library help desk, 2nd floor"
              className={cn(
                "w-full rounded-xl comic-border bg-paper px-3.5 py-2.5 text-sm focus:outline-none",
                errors.keepingLocation && "border-marker"
              )}
            />
            {errors.keepingLocation && (
              <p className="mt-1 text-xs font-medium text-marker-dark">
                {errors.keepingLocation}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink">
            Upload image
          </label>
          <label
            htmlFor="item-image"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl comic-border border-dashed bg-paper/60 px-4 py-8 text-center transition-colors hover:bg-sunshine-light/40"
          >
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt="Item preview"
                className="h-32 w-32 rounded-xl object-cover comic-border"
              />
            ) : (
              <>
                <UploadCloud className="h-8 w-8 text-ink-soft" aria-hidden="true" />
                <span className="text-sm font-medium text-ink-soft">
                  Click to upload a photo (optional)
                </span>
              </>
            )}
            <input
              id="item-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {!imagePreview && (
            <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-ink-soft">
              <ImageOff className="h-3.5 w-3.5" aria-hidden="true" />
              No photo yet — items with photos get matched faster.
            </p>
          )}
        </div>

        <button
          type="submit"
          className={cn(
            "btn-comic w-full justify-center px-6 py-3.5 text-sm text-paper",
            reportType === "lost" ? "bg-marker" : "bg-pop"
          )}
        >
          Submit {reportType === "lost" ? "Lost" : "Found"} Report
        </button>
      </form>
    </div>
  );
}
