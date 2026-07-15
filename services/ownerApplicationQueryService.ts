import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { getProfiles } from "@/services/profileService";
import type { OwnerApplication } from "@/types/OwnerApplication";

interface OwnerApplicationRow {
  id: string;
  user_id: string;
  phone: string;
  property_address: string;
  relationship: OwnerApplication["relationship"];
  document_path: string;
  status: OwnerApplication["status"];
  rejection_reason: string | null;
  submitted_at: string;
  reviewed_at: string | null;
}

const SAMPLE_APPLICATIONS: OwnerApplication[] = [
  {
    id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    userId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    applicantName: "Maria Santos",
    phone: "+63 917 555 0184",
    propertyAddress: "Barangay 1, Vigan City, Ilocos Sur",
    relationship: "owner",
    documentPath: "sample/verification.pdf",
    documentUrl: "#",
    status: "pending",
    submittedAt: "2026-07-15T08:00:00Z",
  },
];

function mapApplication(row: OwnerApplicationRow, applicantName: string): OwnerApplication {
  return {
    id: row.id,
    userId: row.user_id,
    applicantName,
    phone: row.phone,
    propertyAddress: row.property_address,
    relationship: row.relationship,
    documentPath: row.document_path,
    status: row.status,
    rejectionReason: row.rejection_reason ?? undefined,
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at ?? undefined,
  };
}

export async function getLatestOwnerApplication(applicantName: string) {
  if (!hasSupabaseEnv()) return undefined;

  const supabase = await createClient();
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (claimsError || !userId) return undefined;

  const { data, error } = await supabase
    .from("owner_applications")
    .select(
      "id, user_id, phone, property_address, relationship, document_path, status, rejection_reason, submitted_at, reviewed_at",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;

  return data ? mapApplication(data as OwnerApplicationRow, applicantName) : undefined;
}

export async function getOwnerApplications() {
  if (!hasSupabaseEnv()) return SAMPLE_APPLICATIONS;

  const supabase = await createClient();
  const [applicationsResult, profiles] = await Promise.all([
    supabase
      .from("owner_applications")
      .select(
        "id, user_id, phone, property_address, relationship, document_path, status, rejection_reason, submitted_at, reviewed_at",
      )
      .order("submitted_at", { ascending: false }),
    getProfiles(),
  ]);

  if (applicationsResult.error) throw applicationsResult.error;

  const profileNames = new Map(profiles.map((profile) => [profile.id, profile.fullName]));
  const applications = (applicationsResult.data as OwnerApplicationRow[]).map((row) =>
    mapApplication(row, profileNames.get(row.user_id) ?? "Unknown applicant"),
  );

  const signedDocuments = await Promise.all(
    applications.map(async (application) => {
      const { data } = await supabase.storage
        .from("owner-verification")
        .createSignedUrl(application.documentPath, 15 * 60);
      return { ...application, documentUrl: data?.signedUrl };
    }),
  );

  return signedDocuments;
}
