import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { PageContainer } from "@/components/common/PageContainer";
import { Separator } from "@/components/ui/separator";
import type { AccountNavigation } from "@/components/common/Header";

export function Footer({ accountNavigation }: { accountNavigation?: AccountNavigation }) {
  return (
    <footer className="mt-auto border-t bg-secondary/55">
      <PageContainer className="py-14 md:py-18">
        <div className="grid gap-10 md:grid-cols-[1.5fr_0.75fr_0.75fr] md:gap-16">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-6 text-muted-foreground">
              Verified dorms and boarding houses across Ilocos, gathered in one dependable place.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-semibold">Explore</p>
            <Link
              href="/dorms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              All dorms
            </Link>
            <Link
              href={accountNavigation?.propertyHref ?? "/register"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {accountNavigation?.propertyLabel ?? "List a property"}
            </Link>
            <Link
              href="/safety"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Safety guidelines
            </Link>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-semibold">For owners</p>
            <Link
              href={accountNavigation?.accountHref ?? "/login"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {accountNavigation?.accountLabel ?? "Sign in"}
            </Link>
            <Link
              href={accountNavigation?.accountHref ?? "/owner"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <Separator className="my-9" />
        <p className="text-xs text-muted-foreground">
          © 2026 IlocosDorm. Built for students and families in Ilocos.
        </p>
      </PageContainer>
    </footer>
  );
}
