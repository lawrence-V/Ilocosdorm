import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/Dorm";

export interface AuthenticatedProfile {
  id: string;
  fullName: string;
  role: UserRole;
}

export async function getCurrentProfile(): Promise<AuthenticatedProfile | undefined> {
  if (!hasSupabaseEnv()) {
    return { id: "preview-user", fullName: "Preview User", role: "visitor" };
  }

  const supabase = await createClient();
  const { data, error: claimsError } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (claimsError || !userId) return undefined;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, role, is_suspended")
    .eq("id", userId)
    .maybeSingle();
  if (profileError || !profile || profile.is_suspended) return undefined;

  return {
    id: userId,
    fullName: profile.full_name,
    role: profile.role as UserRole,
  };
}

export async function requireAuthenticated(): Promise<AuthenticatedProfile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  return profile;
}

async function requireRole(allowedRoles: UserRole[]) {
  if (!hasSupabaseEnv()) {
    return { id: "preview-user", fullName: "Preview User", role: allowedRoles[0] ?? "visitor" };
  }

  const profile = await requireAuthenticated();
  if (allowedRoles.includes(profile.role)) return profile;

  if (profile.role === "visitor") redirect("/account");
  if (profile.role === "owner") redirect("/owner");
  redirect("/admin");
}

export function requireOwner() {
  return requireRole(["owner", "admin"]);
}
export function requireAdmin() {
  return requireRole(["admin"]);
}

export async function requireVisitor() {
  const profile = await requireAuthenticated();
  if (profile.role === "owner") redirect("/owner");
  if (profile.role === "admin") redirect("/admin");
  return profile;
}
