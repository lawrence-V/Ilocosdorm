import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon, ShieldCheckIcon } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DormGallery } from "@/features/dorms/components/DormGallery";
import { DormMap } from "@/features/dorms/components/DormMap";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Dorm } from "@/types/Dorm";

export function DormDetailFeature({ dorm }: { dorm: Dorm }) {
  return (
    <PageContainer className="py-10 md:py-14">
      <DormGallery name={dorm.name} images={dorm.images} />
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        <article>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">
              <ShieldCheckIcon data-icon="inline-start" />
              Verified listing
            </Badge>
            <Badge variant="outline" className="capitalize">
              {dorm.genderPolicy} residents
            </Badge>
          </div>
          <h1 className="mt-5 font-heading text-5xl tracking-tight">{dorm.name}</h1>
          <p className="mt-3 flex items-start gap-2 text-muted-foreground">
            <MapPinIcon className="mt-0.5 size-4 shrink-0" />
            {dorm.address}
          </p>
          <p className="mt-6 text-2xl font-semibold text-accent">
            {formatCurrency(dorm.monthlyPrice)}{" "}
            <span className="text-base font-normal text-muted-foreground">/ month</span>
          </p>
          <Separator className="my-8" />
          <section>
            <h2 className="font-heading text-3xl">About this place</h2>
            <p className="mt-4 max-w-3xl whitespace-pre-line leading-8 text-muted-foreground">
              {dorm.description}
            </p>
          </section>
          <Separator className="my-8" />
          <section>
            <h2 className="font-heading text-3xl">Amenities</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {dorm.amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-3 text-sm">
                  <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-primary">
                    <CheckIcon className="size-4" />
                  </span>
                  {amenity.name}
                </div>
              ))}
            </div>
          </section>
          <Separator className="my-8" />
          <section>
            <h2 className="font-heading text-3xl">Location</h2>
            <p className="mb-5 mt-2 text-muted-foreground">
              The marker shows the location provided by the owner.
            </p>
            <DormMap latitude={dorm.latitude} longitude={dorm.longitude} name={dorm.name} />
          </section>
        </article>
        <aside>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Contact the owner</CardTitle>
              <CardDescription>
                Ask about room availability, house rules, and viewing schedules.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <p className="font-medium">{dorm.contactName}</p>
                <p className="text-sm text-muted-foreground">Property owner</p>
              </div>
              <Button render={<a href={`tel:${dorm.contactPhone}`} />} size="lg">
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
                >
                  <MailIcon data-icon="inline-start" />
                  Send an email
                </Button>
              ) : null}
              <p className="text-xs leading-5 text-muted-foreground">
                IlocosDorm does not collect payments. Confirm the property in person before sending
                money.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </PageContainer>
  );
}
