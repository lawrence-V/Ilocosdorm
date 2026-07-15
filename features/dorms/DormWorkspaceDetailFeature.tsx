import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  CheckIcon,
  GraduationCapIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCampusContext } from "@/constants/campusContext";
import { DormGallery } from "@/features/dorms/components/DormGallery";
import { DormListingFact } from "@/features/dorms/components/DormListingFact";
import { DormMap } from "@/features/dorms/components/DormMap";
import { StatusBadge } from "@/features/owner/components/StatusBadge";
import type { Dorm } from "@/types/Dorm";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface DormWorkspaceDetailFeatureProps {
  dorm: Dorm;
  backHref: string;
  backLabel: string;
  actions?: ReactNode;
  role: "owner" | "admin";
}

export function DormWorkspaceDetailFeature({
  dorm,
  backHref,
  backLabel,
  actions,
  role,
}: DormWorkspaceDetailFeatureProps) {
  const submittedDate = dorm.submittedAt ?? dorm.updatedAt;
  const headerDateLabel = role === "admin" && dorm.submittedAt ? "Submitted" : "Last updated";
  const factDateLabel = dorm.submittedAt ? "Submitted" : "Last updated";

  return (
    <div className="mx-auto max-w-7xl">
      <Button render={<Link href={backHref} />} variant="ghost" className="-ml-2">
        <ArrowLeftIcon data-icon="inline-start" />
        {backLabel}
      </Button>

      <div className="mt-7 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={dorm.status} />
            <span className="text-sm text-muted-foreground">
              {headerDateLabel} {formatDate(submittedDate)}
            </span>
          </div>
          <h1 className="mt-4 text-balance text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            {dorm.name}
          </h1>
          <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6">
            <p className="flex items-start gap-2">
              <MapPinIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {dorm.address}, {dorm.city}
            </p>
            <p className="flex items-start gap-2">
              <GraduationCapIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {getCampusContext(dorm.city)}
            </p>
          </div>
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </div>

      <div className="mt-8">
        <DormGallery name={dorm.name} images={dorm.images} />
      </div>

      <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-14">
        <article className="min-w-0">
          <section>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                About the property
              </h2>
              <p className="text-3xl font-semibold tracking-[-0.03em] text-primary">
                {formatCurrency(dorm.monthlyPrice)}
                <span className="text-sm font-normal text-muted-foreground"> / month</span>
              </p>
            </div>
            <p className="mt-5 max-w-3xl whitespace-pre-line leading-8 text-muted-foreground">
              {dorm.description}
            </p>
          </section>

          <Separator className="my-10" />

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">Amenities</h2>
            {dorm.amenities.length > 0 ? (
              <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {dorm.amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center gap-3 text-sm font-medium">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <CheckIcon aria-hidden="true" className="size-4" />
                    </span>
                    {amenity.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">No amenities were added.</p>
            )}
          </section>

          <Separator className="my-10" />

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">Submitted location</h2>
            <p className="mt-3 mb-6 max-w-2xl leading-7 text-muted-foreground">
              Use the property pin and written address together when checking this listing.
            </p>
            <div className="overflow-hidden rounded-2xl border">
              <DormMap latitude={dorm.latitude} longitude={dorm.longitude} name={dorm.name} />
            </div>
          </section>
        </article>

        <aside className="space-y-5">
          {dorm.rejectionReason ? (
            <Card className="border-destructive/30 bg-destructive/5 shadow-none">
              <CardHeader>
                <CardTitle className="text-base">Changes requested</CardTitle>
                <CardDescription className="leading-6 text-foreground">
                  {dorm.rejectionReason}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}

          <Card className="rounded-2xl shadow-none xl:sticky xl:top-6">
            <CardHeader>
              <CardTitle className="text-xl">Listing facts</CardTitle>
              <CardDescription>Information supplied by the dorm owner.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <DormListingFact
                icon={<UsersIcon />}
                label="Resident policy"
                value={`${dorm.genderPolicy} residents`}
              />
              <DormListingFact
                icon={<CalendarClockIcon />}
                label={factDateLabel}
                value={formatDate(submittedDate)}
              />
              <Separator />
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Contact person
                </p>
                <p className="mt-2 font-semibold">{dorm.contactName}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <PhoneIcon aria-hidden="true" className="size-4" />
                  {dorm.contactPhone}
                </p>
                {dorm.contactEmail ? (
                  <p className="mt-2 flex items-center gap-2 break-all text-sm text-muted-foreground">
                    <MailIcon aria-hidden="true" className="size-4 shrink-0" />
                    {dorm.contactEmail}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
