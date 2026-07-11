import { AdminDormsFeature } from "@/features/admin/AdminDormsFeature";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { getAdminDorms } from "@/services/dormService";
import { requireAdmin } from "@/services/authGuard";

export default async function AdminDormsPage() {
  await requireAdmin();
  const dorms = await getAdminDorms();
  return (
    <DashboardShell mode="admin" activePath="/admin/dorms">
      <AdminDormsFeature dorms={dorms} />
    </DashboardShell>
  );
}
