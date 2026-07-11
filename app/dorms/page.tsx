import type { Metadata } from "next";
import { PublicShell } from "@/components/common/PublicShell";
import { DormListingFeature } from "@/features/dorms/DormListingFeature";
import { getApprovedDorms } from "@/services/dormService";
import type { DormFilters, GenderPolicy } from "@/types/Dorm";

export const metadata: Metadata = {
  title: "Explore dorms",
  description: "Browse verified dorms and boarding houses across Ilocos.",
};

export default async function DormsPage({ searchParams }: PageProps<"/dorms">) {
  const params = await searchParams;
  const filters: DormFilters = {
    query: typeof params.query === "string" ? params.query : undefined,
    city: typeof params.city === "string" ? params.city : undefined,
    maxPrice:
      typeof params.maxPrice === "string" ? Number(params.maxPrice) || undefined : undefined,
    gender: typeof params.gender === "string" ? (params.gender as GenderPolicy) : undefined,
    sort: typeof params.sort === "string" ? (params.sort as DormFilters["sort"]) : "newest",
  };
  const dorms = await getApprovedDorms(filters);
  return (
    <PublicShell>
      <DormListingFeature dorms={dorms} filters={filters} />
    </PublicShell>
  );
}
