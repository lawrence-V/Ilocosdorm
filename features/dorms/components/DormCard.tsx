import Image from "next/image";
import Link from "next/link";
import { GraduationCapIcon, MapPinIcon, ShieldCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getCampusContext } from "@/constants/campusContext";
import type { Dorm } from "@/types/Dorm";
import { formatCurrency } from "@/utils/formatCurrency";

export function DormCard({ dorm }: { dorm: Dorm }) {
  const cover = dorm.images.toSorted((a, b) => a.displayOrder - b.displayOrder)[0];

  return (
    <article className="group min-w-0">
      <div className="rounded-[1.5rem] bg-primary/5 p-1 ring-1 ring-primary/10 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 group-hover:shadow-[0_26px_60px_-42px_oklch(0.39_0.14_260_/_0.5)]">
        <Link
          href={`/dorms/${dorm.slug}`}
          className="relative block aspect-[4/3] overflow-hidden rounded-[calc(1.5rem-0.25rem)] bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          aria-label={`View ${dorm.name}`}
        >
          {cover ? (
            <Image
              src={cover.publicUrl}
              alt={`${dorm.name} property exterior or room`}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover:scale-[1.035]"
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            />
          ) : null}
        </Link>
      </div>

      <div className="px-1 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="rounded-lg">
            <ShieldCheckIcon data-icon="inline-start" />
            Verified
          </Badge>
          <span className="text-xs font-medium text-muted-foreground capitalize">
            {dorm.genderPolicy} residents
          </span>
        </div>

        <h3 className="mt-3 text-xl leading-tight font-semibold tracking-[-0.025em]">
          <Link
            href={`/dorms/${dorm.slug}`}
            className="transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {dorm.name}
          </Link>
        </h3>

        <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
          <p className="flex items-start gap-2">
            <MapPinIcon aria-hidden="true" strokeWidth={1.7} className="mt-0.5 size-4 shrink-0" />
            <span className="line-clamp-1">{dorm.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <GraduationCapIcon aria-hidden="true" strokeWidth={1.7} className="size-4 shrink-0" />
            <span className="line-clamp-1">{getCampusContext(dorm.city)}</span>
          </p>
        </div>

        <p className="mt-4 text-xl font-bold tracking-[-0.025em] text-primary tabular-nums">
          {formatCurrency(dorm.monthlyPrice)}
          <span className="text-sm font-normal text-muted-foreground"> / month</span>
        </p>
      </div>
    </article>
  );
}
