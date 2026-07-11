import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import type { DormStatus } from "@/types/Dorm";

export async function moderateDorm(
  dormId: string,
  status: Extract<DormStatus, "approved" | "rejected" | "unavailable">,
  reason?: string,
) {
  if (!hasSupabaseEnv()) return { preview: true };
  const supabase = createClient();
  const { error } = await supabase.rpc("moderate_dorm", {
    target_dorm_id: dormId,
    next_status: status,
    moderation_reason: reason ?? null,
  });
  if (error) throw error;
  return { preview: false };
}

export async function setUserSuspension(userId: string, isSuspended: boolean) {
  if (!hasSupabaseEnv()) return { preview: true };
  const supabase = createClient();
  const { error } = await supabase.rpc("set_user_suspension", {
    target_user_id: userId,
    suspended: isSuspended,
  });
  if (error) throw error;
  return { preview: false };
}
