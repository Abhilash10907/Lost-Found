import { Suspense } from "react";
import ReportFormClient from "./ReportFormClient";

export const metadata = {
  title: "Report an Item \u2014 Campus Find",
};

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Report an Item
        </h1>
        <p className="mt-2 text-sm text-ink-soft sm:text-base">
          A few details go a long way toward getting things back to their owners.
        </p>
      </div>
      <Suspense fallback={null}>
        <ReportFormClient />
      </Suspense>
    </div>
  );
}
