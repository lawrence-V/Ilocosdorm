import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { ListingFormFeature } from "@/features/owner/ListingFormFeature";
import { requireOwner } from "@/services/authGuard";

export default async function NewDormPage() {
  await requireOwner();
  return (
    <DashboardShell activePath="/owner/dorms/new">
      <h1 className="font-heading text-5xl tracking-tight">Add a dorm</h1>
      <p className="mt-2 text-muted-foreground">
        Save a draft at any time, then submit it for administrator review.
      </p>
      <ListingFormFeature />
    </DashboardShell>
  );
}
