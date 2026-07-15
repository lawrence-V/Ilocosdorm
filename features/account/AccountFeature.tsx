import Link from "next/link";
import { Building2Icon, SearchIcon, ShieldCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";

export function AccountFeature({ fullName }: { fullName: string }) {
  return (
    <>
      <DashboardPageHeader
        title={`Welcome, ${fullName}`}
        description="Browse verified dorms as a student, or apply for owner access if you manage a property."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Card className="rounded-2xl shadow-none">
          <CardHeader>
            <SearchIcon className="mb-3 size-6 text-primary" aria-hidden="true" />
            <CardTitle className="text-xl">Find a dorm</CardTitle>
            <CardDescription>
              Compare approved listings without receiving owner permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button render={<Link href="/dorms" />} size="lg" className="h-11">
              <SearchIcon data-icon="inline-start" />
              Browse verified dorms
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-none">
          <CardHeader>
            <ShieldCheckIcon className="mb-3 size-6 text-primary" aria-hidden="true" />
            <CardTitle className="text-xl">List a property</CardTitle>
            <CardDescription>
              Verify your identity and relationship to the property before creating listings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              render={<Link href="/owner/apply" />}
              variant="outline"
              size="lg"
              className="h-11"
            >
              <Building2Icon data-icon="inline-start" />
              Apply for owner access
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
