import { notFound } from "next/navigation";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";
import { ListingFormFeature } from "@/features/owner/ListingFormFeature";
import { getOwnerDormById } from "@/services/dormService";
import { requireOwner } from "@/services/authGuard";

export default async function EditDormPage({ params }: PageProps<"/owner/dorms/[id]/edit">) {
  await requireOwner();
  const { id } = await params;
  const dorm = await getOwnerDormById(id);
  if (!dorm) notFound();
  return (
    <DashboardShell activePath="/owner">
      <DashboardPageHeader
        title="Edit dorm"
        description="Approved listings return to review when significant details change."
      />
      <ListingFormFeature dorm={dorm} />
    </DashboardShell>
  );
}
