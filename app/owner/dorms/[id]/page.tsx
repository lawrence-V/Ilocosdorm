import { notFound } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DormWorkspaceDetailFeature } from "@/features/dorms/DormWorkspaceDetailFeature";
import { requireOwner } from "@/services/authGuard";
import { getOwnerDormById } from "@/services/dormService";

export default async function OwnerDormDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireOwner();
  const { id } = await params;
  const dorm = await getOwnerDormById(id);
  if (!dorm) notFound();

  return (
    <DashboardShell activePath="/owner">
      <DormWorkspaceDetailFeature
        dorm={dorm}
        role="owner"
        backHref="/owner"
        backLabel="Back to your dorms"
        actions={
          <Button render={<Link href={`/owner/dorms/${dorm.id}/edit`} />} size="lg">
            Edit listing
          </Button>
        }
      />
    </DashboardShell>
  );
}
