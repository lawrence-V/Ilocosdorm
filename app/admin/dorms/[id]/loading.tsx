import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DormWorkspaceDetailSkeleton } from "@/features/dorms/components/DormWorkspaceDetailSkeleton";

export default function AdminDormDetailLoading() {
  return (
    <DashboardShell mode="admin" activePath="/admin/dorms">
      <DormWorkspaceDetailSkeleton />
    </DashboardShell>
  );
}
