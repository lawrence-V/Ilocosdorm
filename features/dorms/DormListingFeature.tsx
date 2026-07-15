import { DormFilters } from "@/features/dorms/components/DormFilters";
import { DormGrid } from "@/features/dorms/components/DormGrid";
import { DesktopDormResultsMap } from "@/features/dorms/components/DesktopDormResultsMap";
import { MobileDormResultsMap } from "@/features/dorms/components/MobileDormResultsMap";
import type { Dorm, DormFilters as DormFiltersType, DormMapListing } from "@/types/Dorm";

export function DormListingFeature({
  dorms,
  filters,
}: {
  dorms: Dorm[];
  filters: DormFiltersType;
}) {
  const mapDorms: DormMapListing[] = dorms.map((dorm) => ({
    id: dorm.id,
    slug: dorm.slug,
    name: dorm.name,
    monthlyPrice: dorm.monthlyPrice,
    address: dorm.address,
    city: dorm.city,
    latitude: dorm.latitude,
    longitude: dorm.longitude,
  }));

  return (
    <>
      <section className="bg-secondary/45">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-11 md:px-8 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-balance text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl">
              Find your place in Ilocos
            </h1>
            <p className="mt-3 max-w-[58ch] leading-7 text-muted-foreground sm:text-lg">
              Search verified dorms by school, city, monthly budget, or resident policy.
            </p>
          </div>
          <div className="mt-8">
            <DormFilters filters={filters} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 md:px-8 md:py-14">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">Available homes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {dorms.length} verified {dorms.length === 1 ? "place" : "places"}
            </p>
          </div>
        </div>

        <div className="mb-8 lg:hidden">
          <MobileDormResultsMap dorms={mapDorms} />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] xl:gap-10">
          <DormGrid dorms={dorms} layout="split" />

          <aside className="sticky top-5 hidden h-[calc(100dvh-2.5rem)] min-h-[620px] overflow-hidden rounded-[1.75rem] bg-primary/5 p-1.5 ring-1 ring-primary/10 lg:block">
            <div className="h-full overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
              <DesktopDormResultsMap dorms={mapDorms} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
