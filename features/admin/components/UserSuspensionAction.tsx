"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { setUserSuspension } from "@/services/adminService";

export function UserSuspensionAction({
  userId,
  isSuspended,
}: {
  userId: string;
  isSuspended: boolean;
}) {
  const router = useRouter();
  const toggle = async () => {
    try {
      await setUserSuspension(userId, !isSuspended);
      toast.success(isSuspended ? "User restored." : "User suspended.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update user.");
    }
  };
  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {isSuspended ? "Restore" : "Suspend"}
    </Button>
  );
}
