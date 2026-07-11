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

export function DormGrid({ dorms }: { dorms: Dorm[] }) {
  if (dorms.length === 0)
    return (
      <Empty className="border">
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dorms.map((dorm) => (
        <DormCard key={dorm.id} dorm={dorm} />
      ))}
    </div>
  );
}
