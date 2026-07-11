import { PublicShell } from "@/components/common/PublicShell";
import { HomeFeature } from "@/features/home/HomeFeature";
import { getApprovedDorms } from "@/services/dormService";

export default async function HomePage() {
  const dorms = await getApprovedDorms({ sort: "newest" });
  return (
    <PublicShell>
      <HomeFeature dorms={dorms} />
    </PublicShell>
  );
}
