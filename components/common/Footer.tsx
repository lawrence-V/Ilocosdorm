import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { PageContainer } from "@/components/common/PageContainer";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <PageContainer className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex max-w-sm flex-col gap-4">
            <div className="[&_a]:text-primary-foreground">
              <Logo />
            </div>
            <p className="text-sm leading-6 text-primary-foreground/70">
              Verified dorms and boarding houses across Ilocos, gathered in one dependable place.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-semibold">Explore</p>
            <Link
              href="/dorms"
              className="text-primary-foreground/70 hover:text-primary-foreground"
            >
              All dorms
            </Link>
            <Link
              href="/register"
              className="text-primary-foreground/70 hover:text-primary-foreground"
            >
              List a property
            </Link>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-semibold">For owners</p>
            <Link
              href="/login"
              className="text-primary-foreground/70 hover:text-primary-foreground"
            >
              Owner sign in
            </Link>
            <Link
              href="/owner"
              className="text-primary-foreground/70 hover:text-primary-foreground"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/15" />
        <p className="text-xs text-primary-foreground/60">
          © 2026 IlocosDorm. Built for students and families in Ilocos.
        </p>
      </PageContainer>
    </footer>
  );
}
