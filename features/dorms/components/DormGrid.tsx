import { Building2Icon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DormCard } from "@/features/dorms/components/DormCard";
import type { Dorm } from "@/types/Dorm";

export function DormGrid({
  dorms,
  layout = "default",
}: {
  dorms: Dorm[];
  layout?: "default" | "split";
}) {
  if (dorms.length === 0)
    return (
      <Empty className="rounded-2xl border bg-card py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Building2Icon />
          </EmptyMedia>
          <EmptyTitle>No dorms found</EmptyTitle>
          <EmptyDescription>
            Try changing your location, budget, or amenity filters.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent />
      </Empty>
    );
  return (
    <div
      className={
        layout === "split"
          ? "grid gap-x-5 gap-y-10 md:grid-cols-2"
          : "grid gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-12"
      }
    >
      {dorms.map((dorm) => (
        <DormCard key={dorm.id} dorm={dorm} />
      ))}
    </div>
  );
}
