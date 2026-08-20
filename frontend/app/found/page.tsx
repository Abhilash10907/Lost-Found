import { Suspense } from "react";
import ItemListingPage from "@/components/ItemListingPage";

export const metadata = {
  title: "Found Items \u2014 Campus Find",
};

export default function FoundItemsPage() {
  return (
    <Suspense fallback={null}>
      <ItemListingPage
        type="found"
        title="Found Items"
        subtitle="Browse items recently found around campus."
      />
    </Suspense>
  );
}
