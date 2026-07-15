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
import { reviewOwnerApplication } from "@/services/adminService";

export function OwnerApplicationActions({
  applicationId,
  applicantName,
}: {
  applicationId: string;
  applicantName: string;
}) {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const review = async (status: "approved" | "rejected") => {
    try {
      setSubmitting(true);
      await reviewOwnerApplication(applicationId, status, reason);
      toast.success(
        status === "approved"
          ? `${applicantName} can now create listings.`
          : "Application returned with review notes.",
      );
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to review the application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <AlertDialog>
        <AlertDialogTrigger render={<Button size="sm" disabled={submitting} />}>
          <CheckIcon data-icon="inline-start" />
          Approve
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve {applicantName}?</AlertDialogTitle>
            <AlertDialogDescription>
              This changes the account role to owner and allows property drafts and submissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={submitting} onClick={() => review("approved")}>
              Approve owner
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger render={<Button size="sm" variant="outline" disabled={submitting} />}>
          <XIcon data-icon="inline-start" />
          Reject
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request new verification details</AlertDialogTitle>
            <AlertDialogDescription>
              Give the applicant a specific reason so they can submit a corrected application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Field>
            <FieldLabel htmlFor={`owner-application-reason-${applicationId}`}>Reason</FieldLabel>
            <Textarea
              id={`owner-application-reason-${applicationId}`}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="For example: The authorization letter does not show the property address."
            />
          </Field>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={submitting || !reason.trim()}
              onClick={() => review("rejected")}
            >
              Reject application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
