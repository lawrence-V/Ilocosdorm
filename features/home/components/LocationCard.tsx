import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function LocationCard({
  city,
  imageUrl,
  index,
}: {
  city: string;
  imageUrl: string;
  index: number;
}) {
  return (
    <Link
      href={`/dorms?city=${encodeURIComponent(city)}`}
      className={cn(
        "group relative aspect-[4/3] w-[78vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl bg-muted md:w-auto md:max-w-none",
        index < 2 ? "md:col-span-3 md:aspect-[16/9]" : "md:col-span-2",
      )}
    >
      <Image
        src={imageUrl}
        alt={`${city} neighborhood`}
        fill
        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
        sizes={index < 2 ? "(max-width: 767px) 78vw, 50vw" : "(max-width: 767px) 78vw, 33vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-image-scrim/90 via-image-scrim/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-on-image sm:p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{city}</h3>
          <p className="text-sm text-on-image/80">Browse available homes</p>
        </div>
        <ArrowRightIcon
          aria-hidden="true"
          className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
