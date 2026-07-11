import { AdminReviewFeature } from "@/features/admin/AdminReviewFeature";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { getAdminDorms, getPendingDorms } from "@/services/dormService";
import { requireAdmin } from "@/services/authGuard";

export default async function AdminPage() {
  await requireAdmin();
  const [pending, all] = await Promise.all([getPendingDorms(), getAdminDorms()]);
  return (
    <DashboardShell mode="admin" activePath="/admin">
      <AdminReviewFeature dorms={pending} allDorms={all} />
    </DashboardShell>
  );
}
