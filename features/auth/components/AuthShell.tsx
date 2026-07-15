import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import heroImage from "@/public/images/ilocos-dorm-hero.png";

import { Logo } from "@/components/common/Logo";

export function AuthShell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <main className="grid min-h-[100dvh] bg-background lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="flex flex-col px-5 py-6 sm:px-10 sm:py-8 lg:px-16 xl:px-24">
        <Logo />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12 lg:py-16">
          <h1 className="text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-[45ch] leading-7 text-muted-foreground">{description}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Looking for a place?{" "}
            <Link
              className="font-semibold text-primary underline-offset-4 hover:underline"
              href="/dorms"
            >
              Explore dorms
            </Link>
          </p>
        </div>
      </section>

      <section className="relative min-h-[240px] overflow-hidden bg-primary sm:min-h-[420px] lg:m-4 lg:ml-0 lg:rounded-2xl">
        <Image
          src={heroImage}
          alt="A welcoming student boarding house in Ilocos"
          fill
          priority
          placeholder="blur"
          className="object-cover object-[62%_center]"
          sizes="(max-width: 1023px) 100vw, 55vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-image-scrim/90 via-image-scrim/10 to-transparent" />
        <blockquote className="absolute inset-x-6 bottom-6 max-w-lg text-xl leading-snug font-semibold tracking-[-0.025em] text-on-image sm:inset-x-10 sm:bottom-10 sm:text-2xl lg:text-3xl">
          A clear, dependable way to help students find a home and local owners get discovered.
        </blockquote>
      </section>
    </main>
  );
}
