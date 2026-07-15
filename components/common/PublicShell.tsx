import type { ReactNode } from "react";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { getCurrentProfile } from "@/services/authGuard";

function getAccountNavigation(role: "visitor" | "owner" | "admin" | undefined) {
  if (role === "admin") {
    return {
      accountHref: "/admin",
      accountLabel: "Admin dashboard",
      propertyHref: "/admin/dorms",
      propertyLabel: "Manage listings",
    };
  }

  if (role === "owner") {
    return {
      accountHref: "/owner",
      accountLabel: "Owner dashboard",
      propertyHref: "/owner/dorms/new",
      propertyLabel: "Add a dorm",
    };
  }

  if (role === "visitor") {
    return {
      accountHref: "/account",
      accountLabel: "My account",
      propertyHref: "/owner/apply",
      propertyLabel: "Apply to list",
    };
  }

  return undefined;
}

export async function PublicShell({ children }: { children: ReactNode }) {
  const profile = await getCurrentProfile();
  const accountNavigation = getAccountNavigation(profile?.role);

  return (
    <>
      <Header accountNavigation={accountNavigation} />
      <main className="flex-1">{children}</main>
      <Footer accountNavigation={accountNavigation} />
    </>
  );
}
