import { cache } from "react";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/Profile";

interface ProfileRow {
  id: string;
  full_name: string;
  phone: string | null;
  role: Profile["role"];
  is_suspended: boolean;
  created_at: string;
  updated_at: string;
}

const SAMPLE_PROFILES: Profile[] = [
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    fullName: "Maria Santos",
    phone: "+63 917 555 0184",
    role: "owner",
    isSuspended: false,
    createdAt: "2026-05-12T08:00:00Z",
    updatedAt: "2026-07-08T08:00:00Z",
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    fullName: "Elena Dela Cruz",
    phone: "+63 918 555 0142",
    role: "owner",
    isSuspended: false,
    createdAt: "2026-05-20T08:00:00Z",
    updatedAt: "2026-07-06T08:00:00Z",
  },
  {
    id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    fullName: "Patricia Salazar",
    phone: "+63 919 555 0117",
    role: "owner",
    isSuspended: false,
    createdAt: "2026-06-01T08:00:00Z",
    updatedAt: "2026-07-04T08:00:00Z",
  },
];

export const getProfiles = cache(async () => {
  if (!hasSupabaseEnv()) return SAMPLE_PROFILES;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role, is_suspended, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ProfileRow[]).map((row) => ({
    id: row.id,
    fullName: row.full_name,
    phone: row.phone ?? undefined,
    role: row.role,
    isSuspended: row.is_suspended,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
});
