"use client";

import { useSearchParams } from "next/navigation";
import ReportForm from "@/components/ReportForm";
import { ItemStatus } from "@/data/types";

export default function ReportFormClient() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const initialType: ItemStatus = typeParam === "found" ? "found" : "lost";

  return <ReportForm initialType={initialType} />;
}
