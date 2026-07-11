import { AdminUsersFeature } from "@/features/admin/AdminUsersFeature";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { getProfiles } from "@/services/profileService";
import { requireAdmin } from "@/services/authGuard";

export default async function AdminUsersPage() {
  await requireAdmin();
  const profiles = await getProfiles();
  return (
    <DashboardShell mode="admin" activePath="/admin/users">
      <AdminUsersFeature profiles={profiles} />
    </DashboardShell>
  );
}
