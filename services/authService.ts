import type { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types/Dorm";

export async function signIn(email: string, password: string) {
  if (!hasSupabaseEnv()) return { preview: true, role: "owner" as UserRole };
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError) throw profileError;

  let role = profile.role as UserRole;
  if (role === "visitor") {
    const { error: roleError } = await supabase.rpc("request_owner_access");
    if (roleError) throw roleError;
    role = "owner";
  }

  return { preview: false, role };
}

export async function signUp(credentials: SignUpWithPasswordCredentials) {
  if (!hasSupabaseEnv()) return { preview: true };
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp(credentials);
  if (error) throw error;
  if (data.session) {
    const { error: roleError } = await supabase.rpc("request_owner_access");
    if (roleError) throw roleError;
  }
  return { preview: false };
}

export async function signOut() {
  if (!hasSupabaseEnv()) return;
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
