import type { Metadata } from "next";

import { AdminOwnerApplicationsFeature } from "@/features/admin/AdminOwnerApplicationsFeature";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { requireAdmin } from "@/services/authGuard";
import { getOwnerApplications } from "@/services/ownerApplicationQueryService";

export const metadata: Metadata = { title: "Owner verification" };

export default async function AdminOwnerApplicationsPage() {
  await requireAdmin();
  const applications = await getOwnerApplications();

  return (
    <DashboardShell mode="admin" activePath="/admin/owners">
      <AdminOwnerApplicationsFeature applications={applications} />
    </DashboardShell>
  );
}
