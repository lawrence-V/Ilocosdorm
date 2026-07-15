import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import type { DormStatus } from "@/types/Dorm";
import type { OwnerApplicationStatus } from "@/types/OwnerApplication";

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

export async function reviewOwnerApplication(
  applicationId: string,
  status: Extract<OwnerApplicationStatus, "approved" | "rejected">,
  reason?: string,
) {
  if (!hasSupabaseEnv()) return { preview: true };
  const supabase = createClient();
  const { error } = await supabase.rpc("review_owner_application", {
    target_application_id: applicationId,
    next_status: status,
    review_reason: reason ?? null,
  });
  if (error) throw error;
  return { preview: false };
}
