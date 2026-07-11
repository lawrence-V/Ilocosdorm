import Image from "next/image";
import Link from "next/link";
import { MapPinIcon, ShieldCheckIcon, WifiIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Dorm } from "@/types/Dorm";

export function DormCard({ dorm }: { dorm: Dorm }) {
  const cover = dorm.images.toSorted((a, b) => a.displayOrder - b.displayOrder)[0];
  return (
    <Card className="group overflow-hidden py-0 shadow-none transition-colors hover:border-primary/35">
      <Link
        href={`/dorms/${dorm.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        {cover ? (
          <Image
            src={cover.publicUrl}
            alt={`${dorm.name} exterior`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
        <Badge
          className="absolute bottom-3 left-3 bg-background/95 text-foreground"
          variant="outline"
        >
          <MapPinIcon data-icon="inline-start" />
          {dorm.city}
        </Badge>
      </Link>
      <CardHeader className="gap-1.5">
        <CardTitle className="font-heading text-xl">
          <Link href={`/dorms/${dorm.slug}`}>{dorm.name}</Link>
        </CardTitle>
        <p className="line-clamp-1 text-sm text-muted-foreground">{dorm.address}</p>
      </CardHeader>
      <CardContent className="pb-0">
        <p className="font-semibold text-accent">
          From {formatCurrency(dorm.monthlyPrice)} / month
        </p>
      </CardContent>
      <CardFooter className="justify-between pb-5 text-muted-foreground">
        <span className="text-xs capitalize">{dorm.genderPolicy} residents</span>
        <div className="flex items-center gap-3" aria-label="Selected amenities">
          {dorm.amenities.some((item) => item.slug === "wifi") ? (
            <WifiIcon className="size-4" />
          ) : null}
          <ShieldCheckIcon className="size-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
