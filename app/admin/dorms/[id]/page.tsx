import { notFound } from "next/navigation";

import { ModerationActions } from "@/features/admin/components/ModerationActions";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DormWorkspaceDetailFeature } from "@/features/dorms/DormWorkspaceDetailFeature";
import { requireAdmin } from "@/services/authGuard";
import { getAdminDormById } from "@/services/dormService";

export default async function AdminDormDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const dorm = await getAdminDormById(id);
  if (!dorm) notFound();

  return (
    <DashboardShell mode="admin" activePath={dorm.status === "pending" ? "/admin" : "/admin/dorms"}>
      <DormWorkspaceDetailFeature
        dorm={dorm}
        role="admin"
        backHref={dorm.status === "pending" ? "/admin" : "/admin/dorms"}
        backLabel={dorm.status === "pending" ? "Back to review queue" : "Back to all dorms"}
        actions={
          dorm.status === "pending" ? (
            <ModerationActions dormId={dorm.id} dormName={dorm.name} />
          ) : undefined
        }
      />
    </DashboardShell>
  );
}
