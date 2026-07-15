import Link from "next/link";
import {
  CheckIcon,
  GraduationCapIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { PageContainer } from "@/components/common/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCampusContext } from "@/constants/campusContext";
import { DormGallery } from "@/features/dorms/components/DormGallery";
import { DormMap } from "@/features/dorms/components/DormMap";
import type { Dorm } from "@/types/Dorm";
import { formatCurrency } from "@/utils/formatCurrency";

export function DormDetailFeature({ dorm }: { dorm: Dorm }) {
  return (
    <PageContainer className="py-7 md:py-12">
      <DormGallery name={dorm.name} images={dorm.images} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <article className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              <ShieldCheckIcon data-icon="inline-start" />
              Verified listing
            </Badge>
            <Badge variant="outline" className="capitalize">
              {dorm.genderPolicy} residents
            </Badge>
          </div>

          <h1 className="mt-5 text-balance text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl">
            {dorm.name}
          </h1>

          <div className="mt-5 grid gap-2 text-muted-foreground sm:grid-cols-2">
            <p className="flex items-start gap-2">
              <MapPinIcon aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{dorm.address}</span>
            </p>
            <p className="flex items-start gap-2">
              <GraduationCapIcon aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{getCampusContext(dorm.city)}</span>
            </p>
          </div>

          <p className="mt-7 text-3xl font-bold tracking-[-0.03em] text-primary">
            {formatCurrency(dorm.monthlyPrice)}
            <span className="text-base font-normal text-muted-foreground"> / month</span>
          </p>

          <Separator className="my-10" />

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
              About this place
            </h2>
            <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-8 text-muted-foreground">
              {dorm.description}
            </p>
          </section>

          <Separator className="my-10" />

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">Amenities</h2>
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
          </section>

          <Separator className="my-10" />

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">Location</h2>
            <p className="mt-3 mb-6 max-w-xl leading-7 text-muted-foreground">
              The marker shows the location provided by the owner. Confirm the route before your
              visit.
            </p>
            <DormMap latitude={dorm.latitude} longitude={dorm.longitude} name={dorm.name} />
          </section>
        </article>

        <aside>
          <Card className="rounded-2xl shadow-[0_24px_70px_-48px_oklch(0.34_0.075_157_/_0.55)] lg:sticky lg:top-6">
            <CardHeader className="gap-2">
              <CardTitle className="text-2xl font-semibold tracking-[-0.025em]">
                Contact the owner
              </CardTitle>
              <CardDescription className="leading-6">
                Ask about availability, house rules, and viewing schedules.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <ShieldAlertIcon
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold">Protect yourself before contacting</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Never pay before verifying the property, contact person, and written
                      agreement.
                    </p>
                    <Link
                      href="/safety"
                      className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
                    >
                      Read safety guidelines
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-secondary/70 p-4">
                <p className="font-semibold">{dorm.contactName}</p>
                <p className="mt-1 text-sm text-muted-foreground">Property owner</p>
              </div>
              <Button render={<a href={`tel:${dorm.contactPhone}`} />} size="lg" className="h-11">
                <PhoneIcon data-icon="inline-start" />
                {dorm.contactPhone}
              </Button>
              {dorm.contactEmail ? (
                <Button
                  render={
                    <a
                      href={`mailto:${dorm.contactEmail}?subject=${encodeURIComponent(`Inquiry about ${dorm.name}`)}`}
                    />
                  }
                  variant="outline"
                  size="lg"
                  className="h-11"
                >
                  <MailIcon data-icon="inline-start" />
                  Send an email
                </Button>
              ) : null}
              <Separator />
              <p className="text-xs leading-5 text-muted-foreground">
                IlocosDorm does not collect payments or guarantee private arrangements.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </PageContainer>
  );
}
