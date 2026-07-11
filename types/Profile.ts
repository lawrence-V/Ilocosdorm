import type { UserRole } from "@/types/Dorm";

export interface Profile {
  id: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  isSuspended: boolean;
  createdAt: string;
  updatedAt: string;
}
