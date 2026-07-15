import type { ReactNode } from "react";
import Link from "next/link";
import {
  Building2Icon,
  CircleUserRoundIcon,
  ClipboardCheckIcon,
  HomeIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { cn } from "@/lib/utils";

const OWNER_ITEMS = [
  { href: "/owner", label: "Your dorms", icon: HomeIcon },
  { href: "/owner/dorms/new", label: "Add a dorm", icon: PlusCircleIcon },
];

const ADMIN_ITEMS = [
  { href: "/admin", label: "Listing review", icon: ClipboardCheckIcon },
  { href: "/admin/owners", label: "Owner verification", icon: ShieldCheckIcon },
  { href: "/admin/dorms", label: "Dorms", icon: Building2Icon },
  { href: "/admin/users", label: "Users", icon: UsersIcon },
];

const ACCOUNT_ITEMS = [
  { href: "/account", label: "Account", icon: CircleUserRoundIcon },
  { href: "/owner/apply", label: "Owner verification", icon: ShieldCheckIcon },
];

export function DashboardShell({
  children,
  mode = "owner",
  activePath,
}: {
  children: ReactNode;
  mode?: "owner" | "admin" | "account";
  activePath: string;
}) {
  const items = mode === "owner" ? OWNER_ITEMS : mode === "admin" ? ADMIN_ITEMS : ACCOUNT_ITEMS;

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="border-b bg-background">
        <div className="flex h-[4.5rem] items-center justify-between px-5 md:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-sm font-medium text-muted-foreground sm:flex">
              <ShieldCheckIcon aria-hidden="true" className="size-4 text-primary" />
              {mode === "owner"
                ? "Owner workspace"
                : mode === "admin"
                  ? "Admin workspace"
                  : "Account workspace"}
            </div>
            <LogoutButton compact className="md:hidden" />
          </div>
        </div>
      </header>

      <nav
        className="flex gap-2 overflow-x-auto border-b bg-secondary/35 px-5 py-3 md:hidden"
        aria-label={`${mode} navigation`}
      >
        {items.map(({ href, label, icon: Icon }) => (
          <Button
            key={href}
            render={<Link href={href} />}
            variant={activePath === href ? "secondary" : "ghost"}
            className="shrink-0"
          >
            <Icon data-icon="inline-start" />
            {label}
          </Button>
        ))}
      </nav>

      <div className="grid min-h-[calc(100dvh-4.5rem)] md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden border-r bg-secondary/30 p-5 md:flex md:flex-col">
          <nav className="flex flex-col gap-1" aria-label={`${mode} navigation`}>
            {items.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                render={<Link href={href} />}
                variant="ghost"
                className={cn(
                  "h-10 justify-start px-3",
                  activePath === href &&
                    "bg-background text-foreground shadow-sm ring-1 ring-foreground/8",
                )}
              >
                <Icon data-icon="inline-start" />
                {label}
              </Button>
            ))}
          </nav>
          <div className="mt-auto">
            <Separator className="mb-4" />
            <LogoutButton className="h-10 w-full px-3" />
          </div>
        </aside>
        <main className="min-w-0 p-5 sm:p-7 md:p-8 lg:p-12 xl:p-14">{children}</main>
      </div>
    </div>
  );
}
