import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { ILOCOS_CITIES } from "@/constants/amenities";
import { DormGrid } from "@/features/dorms/components/DormGrid";
import { HeroSearch } from "@/features/home/components/HeroSearch";
import type { Dorm } from "@/types/Dorm";

const LOCATION_IMAGES = [
  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800&q=80",
];

export function HomeFeature({ dorms }: { dorms: Dorm[] }) {
  return (
    <>
      <section className="relative isolate min-h-[850px] overflow-visible bg-primary text-primary-foreground md:min-h-[610px]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
          alt="A welcoming modern residence surrounded by tropical greenery"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,48,34,0.94)_0%,rgba(5,48,34,0.72)_36%,rgba(5,48,34,0.08)_70%)]" />
        <PageContainer className="relative flex min-h-[610px] flex-col justify-start pb-24 pt-24 md:justify-center md:pt-16">
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl leading-[0.98] tracking-tight sm:text-7xl">
              Find a place
              <br />
              that feels right.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-primary-foreground/80">
              Verified dormitories across Ilocos. Real places, clear details, and direct owner
              contacts.
            </p>
          </div>
        </PageContainer>
        <PageContainer className="absolute inset-x-0 bottom-8 md:bottom-0 md:translate-y-1/2">
          <HeroSearch />
        </PageContainer>
      </section>

      <PageContainer className="pb-24 pt-16 md:pt-28">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-4xl">Newest dorms</h2>
            <p className="mt-2 text-muted-foreground">Recently approved places ready to explore.</p>
          </div>
          <Button render={<Link href="/dorms" />} variant="link">
            View all dorms
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
        <DormGrid dorms={dorms.slice(0, 3)} />
      </PageContainer>

      <section id="locations" className="bg-secondary py-20">
        <PageContainer>
          <div className="mb-8">
            <h2 className="font-heading text-4xl">Explore by location</h2>
            <p className="mt-2 text-muted-foreground">
              Start near the campus or city you already know.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ILOCOS_CITIES.map((city, index) => (
              <Link
                key={city}
                href={`/dorms?city=${encodeURIComponent(city)}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <Image
                  src={LOCATION_IMAGES[index]}
                  alt={`${city} streetscape`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                  <p className="font-heading text-xl">{city}</p>
                  <span className="text-xs">Browse dorms →</span>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
