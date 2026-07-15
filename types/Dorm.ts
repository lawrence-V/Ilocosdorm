export type UserRole = "visitor" | "owner" | "admin";
export type DormStatus = "draft" | "pending" | "approved" | "rejected" | "unavailable";
export type GenderPolicy = "male" | "female" | "mixed";

export interface Amenity {
  id: number;
  name: string;
  slug: string;
}

export interface DormImage {
  id: string;
  storagePath: string;
  displayOrder: number;
  publicUrl: string;
}

export interface Dorm {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  monthlyPrice: number;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  genderPolicy: GenderPolicy;
  status: DormStatus;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  rejectionReason?: string;
  submittedAt?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  images: DormImage[];
  amenities: Amenity[];
}

export interface DormFilters {
  query?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: GenderPolicy;
  amenities?: string[];
  sort?: "newest" | "price-asc" | "price-desc";
}

export type DormMapListing = Pick<
  Dorm,
  "id" | "slug" | "name" | "monthlyPrice" | "address" | "city" | "latitude" | "longitude"
>;
