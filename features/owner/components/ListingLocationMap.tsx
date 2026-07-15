"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

const ListingLocationLeafletMap = dynamic(
  () => import("@/features/owner/components/ListingLocationLeafletMap"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[360px] w-full rounded-2xl" />,
  },
);

export function ListingLocationMap({
  latitude,
  longitude,
  onPositionChange,
}: {
  latitude: number;
  longitude: number;
  onPositionChange: (latitude: number, longitude: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
        <ListingLocationLeafletMap
          latitude={latitude}
          longitude={longitude}
          onPositionChange={onPositionChange}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Drag the pin or tap anywhere on the map to mark the property entrance.
      </p>
    </div>
  );
}
