"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { moderateDorm } from "@/services/adminService";

export function ModerationActions({ dormId, dormName }: { dormId: string; dormName: string }) {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const act = async (status: "approved" | "rejected") => {
    try {
      await moderateDorm(dormId, status, reason);
      toast.success(status === "approved" ? "Listing approved." : "Listing returned to the owner.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to moderate listing.");
    }
  };
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <AlertDialog>
        <AlertDialogTrigger render={<Button size="sm" />}>
          <CheckIcon data-icon="inline-start" />
          Approve
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve {dormName}?</AlertDialogTitle>
            <AlertDialogDescription>
              The listing will immediately become visible to all visitors.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => act("approved")}>Approve listing</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger render={<Button size="sm" variant="outline" />}>
          <XIcon data-icon="inline-start" />
          Reject
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request changes</AlertDialogTitle>
            <AlertDialogDescription>
              Explain exactly what the owner needs to correct before resubmitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Field>
            <FieldLabel htmlFor={`reason-${dormId}`}>Reason</FieldLabel>
            <Textarea
              id={`reason-${dormId}`}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="For example: Upload a clear exterior photo…"
            />
          </Field>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={!reason.trim()} onClick={() => act("rejected")}>
              Send to owner
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
