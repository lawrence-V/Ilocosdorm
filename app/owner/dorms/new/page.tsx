import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";
import { ListingFormFeature } from "@/features/owner/ListingFormFeature";
import { requireOwner } from "@/services/authGuard";

export default async function NewDormPage() {
  await requireOwner();
  return (
    <DashboardShell activePath="/owner/dorms/new">
      <DashboardPageHeader
        title="Add a dorm"
        description="Save a draft at any time, then submit it for administrator review."
      />
      <ListingFormFeature />
    </DashboardShell>
  );
}
