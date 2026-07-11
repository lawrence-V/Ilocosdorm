import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex flex-col px-5 py-6 sm:px-10 lg:px-16">
        <Logo />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h1 className="font-heading text-4xl tracking-tight">{title}</h1>
          <p className="mt-3 text-muted-foreground">{description}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Looking for a place?{" "}
            <Link
              className="font-medium text-primary underline-offset-4 hover:underline"
              href="/dorms"
            >
              Explore dorms
            </Link>
          </p>
        </div>
      </section>
      <section className="relative hidden overflow-hidden bg-primary lg:block">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90"
          alt="Bright, welcoming student residence"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-primary/25" />
        <blockquote className="absolute inset-x-12 bottom-12 max-w-lg font-heading text-3xl leading-tight text-primary-foreground">
          “A dependable way for students to find a home, and for local owners to be discovered.”
        </blockquote>
      </section>
    </main>
  );
}
