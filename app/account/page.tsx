import type { Metadata } from "next";

import { AccountFeature } from "@/features/account/AccountFeature";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { requireVisitor } from "@/services/authGuard";

export const metadata: Metadata = { title: "Your account" };

export default async function AccountPage() {
  const profile = await requireVisitor();

  return (
    <DashboardShell mode="account" activePath="/account">
      <AccountFeature fullName={profile.fullName} />
    </DashboardShell>
  );
}
