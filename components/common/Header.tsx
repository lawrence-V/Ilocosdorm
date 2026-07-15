import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { MobileNav } from "@/components/common/MobileNav";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";

export interface AccountNavigation {
  accountHref: string;
  accountLabel: string;
  propertyHref: string;
  propertyLabel: string;
}

export function Header({ accountNavigation }: { accountNavigation?: AccountNavigation }) {
  return (
    <header className="bg-background">
      <PageContainer className="flex h-[4.5rem] items-center justify-between">
        <div className="flex items-center gap-8 lg:gap-12">
          <Logo />
          <nav
            className="hidden items-center gap-8 text-sm font-semibold md:flex"
            aria-label="Main navigation"
          >
            <Link
              href="/dorms"
              className="text-muted-foreground transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
            >
              Explore dorms
            </Link>
            <Link
              href="/#locations"
              className="text-muted-foreground transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
            >
              Locations
            </Link>
          </nav>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          {accountNavigation ? (
            <>
              <Button
                render={<Link href={accountNavigation.accountHref} />}
                variant="ghost"
                size="lg"
                className="h-11 rounded-full px-5"
              >
                {accountNavigation.accountLabel}
              </Button>
              <Button
                render={<Link href={accountNavigation.propertyHref} />}
                size="lg"
                className="h-11 rounded-full px-5"
              >
                {accountNavigation.propertyLabel}
              </Button>
            </>
          ) : (
            <>
              <Button
                render={<Link href="/login" />}
                variant="ghost"
                size="lg"
                className="h-11 rounded-full px-5"
              >
                Sign in
              </Button>
              <Button
                render={<Link href="/register" />}
                size="lg"
                className="h-11 rounded-full px-5"
              >
                List your dorm
              </Button>
            </>
          )}
        </div>
        <MobileNav accountNavigation={accountNavigation} />
      </PageContainer>
    </header>
  );
}
