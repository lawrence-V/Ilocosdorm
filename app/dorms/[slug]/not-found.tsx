import Link from "next/link";
import { PageContainer } from "@/components/common/PageContainer";
import { PublicShell } from "@/components/common/PublicShell";
import { Button } from "@/components/ui/button";

export default function DormNotFound() {
  return (
    <PublicShell>
      <PageContainer className="flex min-h-[65dvh] flex-col items-start justify-center py-16 sm:items-center sm:text-center">
        <h1 className="max-w-xl text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl">
          This dorm is not available
        </h1>
        <p className="mt-4 max-w-md leading-7 text-muted-foreground">
          It may be pending review, unavailable, or no longer listed.
        </p>
        <Button render={<Link href="/dorms" />} className="mt-7" size="lg">
          Explore available dorms
        </Button>
      </PageContainer>
    </PublicShell>
  );
}
