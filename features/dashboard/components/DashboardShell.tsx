import type { ReactNode } from "react";
import Link from "next/link";
import {
  Building2Icon,
  ClipboardCheckIcon,
  HomeIcon,
  LogOutIcon,
  PlusCircleIcon,
  UsersIcon,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const OWNER_ITEMS = [
  { href: "/owner", label: "Your dorms", icon: HomeIcon },
  { href: "/owner/dorms/new", label: "Add a dorm", icon: PlusCircleIcon },
];
const ADMIN_ITEMS = [
  { href: "/admin", label: "Listing review", icon: ClipboardCheckIcon },
  { href: "/admin/dorms", label: "Dorms", icon: Building2Icon },
  { href: "/admin/users", label: "Users", icon: UsersIcon },
];

export function DashboardShell({
  children,
  mode = "owner",
  activePath,
}: {
  children: ReactNode;
  mode?: "owner" | "admin";
  activePath: string;
}) {
  const items = mode === "owner" ? OWNER_ITEMS : ADMIN_ITEMS;
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center justify-between px-5 md:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {mode === "owner" ? "OS" : "AD"}
            </div>
            <span className="hidden text-sm sm:block">
              {mode === "owner" ? "Owner account" : "Administrator"}
            </span>
          </div>
        </div>
      </header>
      <div className="grid min-h-[calc(100vh-4rem)] md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r p-4 md:flex md:flex-col">
          <nav className="flex flex-col gap-1">
            {items.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                render={<Link href={href} />}
                variant="ghost"
                className={cn("justify-start", activePath === href && "bg-secondary text-primary")}
              >
                <Icon data-icon="inline-start" />
                {label}
              </Button>
            ))}
          </nav>
          <div className="mt-auto">
            <Separator className="mb-4" />
            <Button
              render={<Link href="/login" />}
              variant="ghost"
              className="w-full justify-start"
            >
              <LogOutIcon data-icon="inline-start" />
              Log out
            </Button>
          </div>
        </aside>
        <main className="min-w-0 p-5 md:p-8 lg:p-12">{children}</main>
      </div>
    </div>
  );
}
