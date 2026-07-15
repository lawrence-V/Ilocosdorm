export type OwnerApplicationStatus = "pending" | "approved" | "rejected";

export type OwnerRelationship = "owner" | "manager" | "authorized_representative";

export interface OwnerApplication {
  id: string;
  userId: string;
  applicantName: string;
  phone: string;
  propertyAddress: string;
  relationship: OwnerRelationship;
  documentPath: string;
  documentUrl?: string;
  status: OwnerApplicationStatus;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
}
