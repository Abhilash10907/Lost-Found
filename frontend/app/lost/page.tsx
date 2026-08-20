import { Suspense } from "react";
import ItemListingPage from "@/components/ItemListingPage";

export const metadata = {
  title: "Lost Items \u2014 Campus Find",
};

export default function LostItemsPage() {
  return (
    <Suspense fallback={null}>
      <ItemListingPage
        type="lost"
        title="Lost Items"
        subtitle="Help campus members find what they've lost."
      />
    </Suspense>
  );
}
