import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DormWorkspaceDetailSkeleton } from "@/features/dorms/components/DormWorkspaceDetailSkeleton";

export default function OwnerDormDetailLoading() {
  return (
    <DashboardShell activePath="/owner">
      <DormWorkspaceDetailSkeleton />
    </DashboardShell>
  );
}
