import type { Metadata } from "next";

import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { OwnerApplicationFeature } from "@/features/owner/OwnerApplicationFeature";
import { requireVisitor } from "@/services/authGuard";
import { getLatestOwnerApplication } from "@/services/ownerApplicationQueryService";

export const metadata: Metadata = { title: "Owner verification" };

export default async function OwnerApplicationPage() {
  const profile = await requireVisitor();
  const application = await getLatestOwnerApplication(profile.fullName);

  return (
    <DashboardShell mode="account" activePath="/owner/apply">
      <OwnerApplicationFeature application={application} />
    </DashboardShell>
  );
}
