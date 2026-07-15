"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import type { DormMapListing } from "@/types/Dorm";

const DormPriceMap = dynamic(() => import("@/features/dorms/components/DormPriceMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-full min-h-[420px] w-full rounded-none" />,
});

export function DormResultsMap({ dorms }: { dorms: DormMapListing[] }) {
  if (dorms.length === 0) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center bg-secondary/45 p-8 text-center">
        <div className="max-w-xs">
          <p className="font-semibold">No locations to show</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Change the filters to see matching dorms on the map.
          </p>
        </div>
      </div>
    );
  }

  return <DormPriceMap dorms={dorms} />;
}
