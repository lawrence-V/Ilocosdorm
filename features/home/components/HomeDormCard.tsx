import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, GraduationCapIcon, MapPinIcon, ShieldCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCampusContext } from "@/constants/campusContext";
import { cn } from "@/lib/utils";
import type { Dorm } from "@/types/Dorm";
import { formatCurrency } from "@/utils/formatCurrency";

export function HomeDormCard({ dorm, featured = false }: { dorm: Dorm; featured?: boolean }) {
  const cover = dorm.images.toSorted((a, b) => a.displayOrder - b.displayOrder)[0];

  return (
    <Card
      className={cn(
        "group gap-0 overflow-hidden rounded-2xl py-0 shadow-none transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-42px_oklch(0.31_0.07_158_/_0.55)]",
        featured
          ? "lg:col-span-7 lg:row-span-2"
          : "lg:col-span-5 lg:grid lg:grid-cols-[0.82fr_1.18fr]",
      )}
    >
      <Link
        href={`/dorms/${dorm.slug}`}
        className={cn(
          "relative block overflow-hidden bg-muted",
          featured
            ? "aspect-[16/10] lg:aspect-auto lg:min-h-[360px]"
            : "aspect-[16/10] lg:aspect-auto",
        )}
        aria-label={`View ${dorm.name}`}
      >
        {cover ? (
          <Image
            src={cover.publicUrl}
            alt={`${dorm.name} property`}
            fill
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
            sizes={featured ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 1023px) 100vw, 20vw"}
          />
        ) : null}
      </Link>

      <CardContent className={cn("flex flex-col gap-5 p-5 sm:p-6", featured && "lg:p-8")}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                <ShieldCheckIcon data-icon="inline-start" />
                Verified
              </Badge>
              <span className="text-xs font-medium text-muted-foreground capitalize">
                {dorm.genderPolicy} residents
              </span>
            </div>
            <h3
              className={cn(
                "text-xl leading-tight font-semibold tracking-[-0.02em]",
                featured && "sm:text-3xl",
              )}
            >
              <Link href={`/dorms/${dorm.slug}`} className="hover:text-primary">
                {dorm.name}
              </Link>
            </h3>
          </div>
          <ArrowUpRightIcon
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        <div className="grid gap-2 text-sm text-muted-foreground">
          <p className="flex items-start gap-2">
            <MapPinIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span className="line-clamp-1">{dorm.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <GraduationCapIcon aria-hidden="true" className="size-4 shrink-0" />
            {getCampusContext(dorm.city)}
          </p>
        </div>

        <p className="mt-auto text-lg font-semibold text-primary">
          {formatCurrency(dorm.monthlyPrice)}
          <span className="text-sm font-normal text-muted-foreground"> / month</span>
        </p>
      </CardContent>
    </Card>
  );
}
