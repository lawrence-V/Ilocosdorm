import Link from "next/link";
import { PageContainer } from "@/components/common/PageContainer";
import { PublicShell } from "@/components/common/PublicShell";
import { Button } from "@/components/ui/button";

export default function DormNotFound() {
  return (
    <PublicShell>
      <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-heading text-5xl">This dorm is not available</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          It may be pending review, unavailable, or no longer listed.
        </p>
        <Button render={<Link href="/dorms" />} className="mt-7">
          Explore available dorms
        </Button>
      </PageContainer>
    </PublicShell>
  );
}
