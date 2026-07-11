"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const LeafletMap = dynamic(() => import("@/features/dorms/components/LeafletMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-[360px] w-full" />,
});

export function DormMap({
  latitude,
  longitude,
  name,
}: {
  latitude: number;
  longitude: number;
  name: string;
}) {
  return <LeafletMap latitude={latitude} longitude={longitude} name={name} />;
}
