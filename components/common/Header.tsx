import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { MobileNav } from "@/components/common/MobileNav";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-background">
      <PageContainer className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <nav
            className="hidden items-center gap-7 text-sm font-medium md:flex"
            aria-label="Main navigation"
          >
            <Link href="/dorms" className="transition-colors hover:text-primary">
              Explore dorms
            </Link>
            <Link href="/#locations" className="transition-colors hover:text-primary">
              Locations
            </Link>
          </nav>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Button render={<Link href="/login" />} variant="ghost">
            Owner sign in
          </Button>
          <Button
            render={<Link href="/register" />}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            List your dorm
          </Button>
        </div>
        <MobileNav />
      </PageContainer>
    </header>
  );
}
