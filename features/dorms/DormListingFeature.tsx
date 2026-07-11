import { PageContainer } from "@/components/common/PageContainer";
import { DormFilters } from "@/features/dorms/components/DormFilters";
import { DormGrid } from "@/features/dorms/components/DormGrid";
import type { Dorm, DormFilters as DormFiltersType } from "@/types/Dorm";

export function DormListingFeature({
  dorms,
  filters,
}: {
  dorms: Dorm[];
  filters: DormFiltersType;
}) {
  return (
    <PageContainer className="py-12 md:py-16">
      <div className="max-w-2xl">
        <h1 className="font-heading text-5xl tracking-tight">Explore dorms</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Compare verified places across Ilocos, then contact the owner directly.
        </p>
      </div>
      <div className="mt-10">
        <DormFilters filters={filters} />
      </div>
      <div className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {dorms.length} verified {dorms.length === 1 ? "place" : "places"}
          </p>
        </div>
        <DormGrid dorms={dorms} />
      </div>
    </PageContainer>
  );
}
