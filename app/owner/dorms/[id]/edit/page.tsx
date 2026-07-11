import { notFound } from "next/navigation";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
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
      <h1 className="font-heading text-5xl tracking-tight">Edit dorm</h1>
      <p className="mt-2 text-muted-foreground">
        Approved listings return to review when significant details change.
      </p>
      <ListingFormFeature dorm={dorm} />
    </DashboardShell>
  );
}
