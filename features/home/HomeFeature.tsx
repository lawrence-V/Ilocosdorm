import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { DormGrid } from "@/features/dorms/components/DormGrid";
import { BrowseByCity } from "@/features/home/components/BrowseByCity";
import { DiscoveryShortcuts } from "@/features/home/components/DiscoveryShortcuts";
import { HeroSearch } from "@/features/home/components/HeroSearch";
import type { Dorm } from "@/types/Dorm";

export function HomeFeature({ dorms }: { dorms: Dorm[] }) {
  const newestDorms = dorms.slice(0, 6);

  return (
    <div className="bg-background">
      <section className="bg-secondary/45">
        <PageContainer className="py-14 sm:py-18 md:py-22">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-4xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Find a dorm near school.
            </h1>
            <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Compare verified homes, monthly prices, real photos, and locations across Ilocos.
            </p>
          </div>

          <div className="mx-auto mt-9 max-w-5xl">
            <HeroSearch />
          </div>

          <DiscoveryShortcuts />
        </PageContainer>
      </section>

      <BrowseByCity />

      <PageContainer className="py-20 md:py-28">
        <div className="mb-9 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl">
              Recently approved homes
            </h2>
            <p className="mt-3 max-w-[55ch] leading-7 text-muted-foreground">
              Clear prices, useful location details, and photos reviewed before publishing.
            </p>
          </div>
          <Button
            render={<Link href="/dorms" />}
            variant="outline"
            size="lg"
            className="h-11 rounded-full px-5"
          >
            View all dorms
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>

        <DormGrid dorms={newestDorms} />
      </PageContainer>

      <PageContainer className="pb-20 md:pb-28">
        <section className="grid overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground md:grid-cols-[1.3fr_0.7fr]">
          <div className="flex flex-col gap-5 p-7 sm:p-10 md:p-14">
            <h2 className="max-w-lg text-3xl leading-tight font-semibold tracking-[-0.03em] md:text-4xl">
              Help students find your property.
            </h2>
            <p className="max-w-[52ch] leading-7 text-primary-foreground/75">
              Add clear details, upload real photos, and track your listing from one workspace.
            </p>
            <div>
              <Button
                render={<Link href="/register" />}
                variant="secondary"
                size="lg"
                className="h-11 rounded-full px-5"
              >
                List your dorm
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </div>
          <div className="hidden bg-primary-foreground/7 p-10 md:flex md:flex-col md:justify-end">
            <p className="text-sm leading-6 text-primary-foreground/72">
              Every listing is checked before students and families can discover it.
            </p>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
