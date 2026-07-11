import type { Metadata } from "next";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { OwnerDashboardFeature } from "@/features/owner/OwnerDashboardFeature";
import { getOwnerDorms } from "@/services/dormService";
import { requireOwner } from "@/services/authGuard";

export const metadata: Metadata = { title: "Owner dashboard" };
export default async function OwnerPage() {
  await requireOwner();
  const dorms = await getOwnerDorms();
  return (
    <DashboardShell activePath="/owner">
      <OwnerDashboardFeature dorms={dorms} />
    </DashboardShell>
  );
}
