import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

import heroImage from "@/public/images/ilocos-dorm-hero.png";

import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { ILOCOS_CITIES } from "@/constants/amenities";

export function BrowseByCity() {
  return (
    <section id="locations">
      <PageContainer className="grid gap-8 py-20 md:py-24 lg:grid-cols-[1.28fr_0.72fr] lg:items-center lg:gap-14">
        <div className="rounded-[1.75rem] bg-primary/5 p-1.5 ring-1 ring-primary/10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(1.75rem-0.375rem)] sm:aspect-[16/10]">
            <Image
              src={heroImage}
              alt="A student boarding house in a leafy Ilocos neighborhood"
              fill
              placeholder="blur"
              className="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 64vw"
            />
          </div>
        </div>

        <div>
          <MapPinIcon aria-hidden="true" strokeWidth={1.7} className="size-6 text-primary" />
          <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl">
            Browse by city
          </h2>
          <p className="mt-3 max-w-[42ch] leading-7 text-muted-foreground">
            Start with the city closest to your campus, then compare the details.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {ILOCOS_CITIES.map((city) => (
              <Button
                key={city}
                render={<Link href={`/dorms?city=${encodeURIComponent(city)}`} />}
                variant="secondary"
                className="h-11 min-w-0 justify-between rounded-xl px-4"
              >
                <span className="truncate">{city}</span>
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
