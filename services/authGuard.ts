import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/Dorm";

async function requireRole(allowedRoles: UserRole[]) {
  if (!hasSupabaseEnv()) return;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, is_suspended")
    .eq("id", userId)
    .single();
  if (!profile || profile.is_suspended || !allowedRoles.includes(profile.role as UserRole))
    redirect("/login");
}

export function requireOwner() {
  return requireRole(["owner", "admin"]);
}
export function requireAdmin() {
  return requireRole(["admin"]);
}
