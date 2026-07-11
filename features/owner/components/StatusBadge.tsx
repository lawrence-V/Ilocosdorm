import { Badge } from "@/components/ui/badge";
import type { DormStatus } from "@/types/Dorm";

const labels: Record<DormStatus, string> = {
  draft: "Draft",
  pending: "Pending review",
  approved: "Approved",
  rejected: "Changes needed",
  unavailable: "Unavailable",
};

export function StatusBadge({ status }: { status: DormStatus }) {
  return (
    <Badge
      variant={
        status === "approved" ? "default" : status === "rejected" ? "destructive" : "outline"
      }
    >
      {labels[status]}
    </Badge>
  );
}
