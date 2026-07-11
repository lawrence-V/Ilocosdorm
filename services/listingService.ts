import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import type { ListingFormData } from "@/features/owner/schemas/listingSchema";

export async function saveListing(values: ListingFormData, dormId?: string) {
  if (!hasSupabaseEnv()) return { id: dormId ?? crypto.randomUUID(), preview: true };
  const supabase = createClient();
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims?.sub) throw new Error("Please sign in as an owner.");
  const payload = {
    owner_id: claims.claims.sub,
    name: values.name,
    slug: values.slug,
    description: values.description,
    monthly_price: values.monthlyPrice,
    address: values.address,
    city: values.city,
    latitude: values.latitude,
    longitude: values.longitude,
    gender_policy: values.genderPolicy,
    contact_name: values.contactName,
    contact_phone: values.contactPhone,
    contact_email: values.contactEmail || null,
    status: values.submitForReview ? "pending" : "draft",
    submitted_at: values.submitForReview ? new Date().toISOString() : null,
  };
  const query = dormId
    ? supabase.from("dorms").update(payload).eq("id", dormId).select("id").single()
    : supabase.from("dorms").insert(payload).select("id").single();
  const { data, error } = await query;
  if (error) throw error;
  return { id: data.id, preview: false };
}

export async function uploadDormImages(ownerId: string, dormId: string, files: File[]) {
  if (!hasSupabaseEnv()) return [];
  const supabase = createClient();
  const uploaded: string[] = [];
  for (const [index, file] of files.entries()) {
    const path = `${ownerId}/${dormId}/${crypto.randomUUID()}.webp`;
    const { error } = await supabase.storage
      .from("dorm-images")
      .upload(path, file, { contentType: "image/webp", upsert: false });
    if (error) throw error;
    const { error: rowError } = await supabase
      .from("dorm_images")
      .insert({ dorm_id: dormId, storage_path: path, display_order: index });
    if (rowError) throw rowError;
    uploaded.push(path);
  }
  return uploaded;
}

export async function uploadCurrentOwnerImages(dormId: string, files: File[]) {
  if (!hasSupabaseEnv()) return [];
  const supabase = createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) throw new Error("Please sign in as an owner.");
  return uploadDormImages(data.claims.sub, dormId, files);
}
