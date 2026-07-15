import { cache } from "react";

import { SAMPLE_DORMS } from "@/constants/sampleDorms";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Amenity, Dorm, DormFilters, DormImage, DormStatus, GenderPolicy } from "@/types/Dorm";

interface DormRow {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string;
  monthly_price: number | string;
  address: string;
  city: string;
  latitude: number | string;
  longitude: number | string;
  gender_policy: GenderPolicy;
  status: DormStatus;
  contact_name: string;
  contact_phone: string;
  contact_email: string | null;
  rejection_reason: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  dorm_images?: Array<{ id: string; storage_path: string; display_order: number }>;
  dorm_amenities?: Array<{ amenities: Amenity | Amenity[] | null }>;
}

function mapDorm(row: DormRow, storageBase: string): Dorm {
  const images: DormImage[] = (row.dorm_images ?? []).map((image) => ({
    id: image.id,
    storagePath: image.storage_path,
    displayOrder: image.display_order,
    publicUrl: `${storageBase}/storage/v1/object/public/dorm-images/${image.storage_path}`,
  }));
  const amenities = (row.dorm_amenities ?? []).flatMap((item) => {
    if (!item.amenities) return [];
    return Array.isArray(item.amenities) ? item.amenities : [item.amenities];
  });

  return {
    id: row.id,
    ownerId: row.owner_id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    monthlyPrice: Number(row.monthly_price),
    address: row.address,
    city: row.city,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    genderPolicy: row.gender_policy,
    status: row.status,
    contactName: row.contact_name,
    contactPhone: row.contact_phone,
    contactEmail: row.contact_email ?? undefined,
    rejectionReason: row.rejection_reason ?? undefined,
    submittedAt: row.submitted_at ?? undefined,
    approvedAt: row.approved_at ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    images,
    amenities,
  };
}

function filterDorms(dorms: Dorm[], filters: DormFilters) {
  const query = filters.query?.trim().toLowerCase();
  const selectedAmenities = new Set(filters.amenities ?? []);
  const results = dorms.filter((dorm) => {
    const searchMatch =
      !query || `${dorm.name} ${dorm.city} ${dorm.address}`.toLowerCase().includes(query);
    const amenitiesMatch =
      selectedAmenities.size === 0 ||
      [...selectedAmenities].every((slug) => dorm.amenities.some((item) => item.slug === slug));
    return (
      searchMatch &&
      (!filters.city || dorm.city === filters.city) &&
      (!filters.minPrice || dorm.monthlyPrice >= filters.minPrice) &&
      (!filters.maxPrice || dorm.monthlyPrice <= filters.maxPrice) &&
      (!filters.gender || dorm.genderPolicy === filters.gender) &&
      amenitiesMatch
    );
  });

  return results.toSorted((a, b) => {
    if (filters.sort === "price-asc") return a.monthlyPrice - b.monthlyPrice;
    if (filters.sort === "price-desc") return b.monthlyPrice - a.monthlyPrice;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

async function getLiveDorms(status?: DormStatus) {
  const supabase = await createClient();
  let query = supabase
    .from("dorms")
    .select(
      "*, dorm_images(id, storage_path, display_order), dorm_amenities(amenities(id, name, slug))",
    )
    .order("display_order", { referencedTable: "dorm_images", ascending: true });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  const storageBase = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return (data as unknown as DormRow[]).map((row) => mapDorm(row, storageBase));
}

export const getApprovedDorms = cache(async (filters: DormFilters = {}) => {
  const dorms = hasSupabaseEnv()
    ? await getLiveDorms("approved")
    : SAMPLE_DORMS.filter((dorm) => dorm.status === "approved");
  return filterDorms(dorms, filters);
});

export const getDormBySlug = cache(async (slug: string) => {
  const dorms = hasSupabaseEnv() ? await getLiveDorms("approved") : SAMPLE_DORMS;
  return dorms.find((dorm) => dorm.slug === slug && dorm.status === "approved") ?? null;
});

export const getOwnerDorms = cache(async (ownerId?: string) => {
  if (!hasSupabaseEnv())
    return SAMPLE_DORMS.filter((dorm) => dorm.ownerId === SAMPLE_DORMS[0].ownerId);
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const id = ownerId ?? claims?.claims?.sub;
  if (!id) return [];
  return (await getLiveDorms()).filter((dorm) => dorm.ownerId === id);
});

export const getOwnerDormById = cache(async (id: string) => {
  const dorms = await getOwnerDorms();
  return dorms.find((dorm) => dorm.id === id) ?? null;
});

export const getPendingDorms = cache(async () => {
  if (!hasSupabaseEnv()) return SAMPLE_DORMS.filter((dorm) => dorm.status === "pending");
  return getLiveDorms("pending");
});

export const getAdminDorms = cache(async () => {
  if (!hasSupabaseEnv()) return SAMPLE_DORMS;
  return getLiveDorms();
});

export const getAdminDormById = cache(async (id: string) => {
  const dorms = await getAdminDorms();
  return dorms.find((dorm) => dorm.id === id) ?? null;
});
