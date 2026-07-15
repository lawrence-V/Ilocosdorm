"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileCheck2Icon, SendIcon, ShieldCheckIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";
import {
  ownerApplicationSchema,
  proofDocumentSchema,
  type OwnerApplicationFormData,
} from "@/features/owner/schemas/ownerApplicationSchema";
import { submitOwnerApplication } from "@/services/ownerApplicationService";
import type { OwnerApplication } from "@/types/OwnerApplication";
import { formatDate } from "@/utils/formatDate";

export function OwnerApplicationFeature({ application }: { application?: OwnerApplication }) {
  const router = useRouter();
  const [document, setDocument] = useState<File>();
  const [documentError, setDocumentError] = useState<string>();
  const form = useForm<OwnerApplicationFormData>({
    resolver: zodResolver(ownerApplicationSchema),
    defaultValues: {
      phone: "",
      propertyAddress: "",
      relationship: "owner",
      declaration: false,
    },
  });
  const declarationAccepted = useWatch({ control: form.control, name: "declaration" });
  const relationship = useWatch({ control: form.control, name: "relationship" });

  if (application?.status === "pending") {
    return <ApplicationStatus application={application} />;
  }

  const onSubmit = form.handleSubmit(async (values) => {
    const documentResult = proofDocumentSchema.safeParse(document);
    if (!documentResult.success) {
      setDocumentError(documentResult.error.issues[0]?.message ?? "Choose a valid document.");
      return;
    }

    try {
      const result = await submitOwnerApplication(values, documentResult.data);
      toast.success(
        result.preview
          ? "Preview application submitted."
          : "Application submitted for administrator review.",
      );
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit your application.");
    }
  });

  return (
    <>
      <DashboardPageHeader
        title="Owner verification"
        description="We verify property managers before they can create dorm listings. Your document stays private and is available only to administrators."
      />

      {application?.status === "rejected" ? (
        <Card className="mt-8 rounded-2xl border-destructive/30 bg-destructive/5 shadow-none">
          <CardHeader>
            <CardTitle>Changes required</CardTitle>
            <CardDescription>{application.rejectionReason}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 max-w-3xl">
        <Card className="rounded-2xl shadow-none">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">Property manager application</CardTitle>
            <CardDescription>
              Submit truthful, current information. You may send up to three applications in 30
              days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field data-invalid={Boolean(form.formState.errors.phone)}>
                <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                <Input id="phone" type="tel" className="h-11" {...form.register("phone")} />
                <FieldDescription>
                  Use a number administrators can call during review.
                </FieldDescription>
                <FieldError errors={[form.formState.errors.phone]} />
              </Field>

              <Field data-invalid={Boolean(form.formState.errors.propertyAddress)}>
                <FieldLabel htmlFor="propertyAddress">Property address</FieldLabel>
                <Textarea
                  id="propertyAddress"
                  rows={3}
                  placeholder="House number, street, barangay, city, and province"
                  {...form.register("propertyAddress")}
                />
                <FieldError errors={[form.formState.errors.propertyAddress]} />
              </Field>

              <Field data-invalid={Boolean(form.formState.errors.relationship)}>
                <FieldLabel htmlFor="relationship">Relationship to the property</FieldLabel>
                <Select
                  value={relationship}
                  onValueChange={(value) =>
                    form.setValue(
                      "relationship",
                      value as OwnerApplicationFormData["relationship"],
                      {
                        shouldValidate: true,
                      },
                    )
                  }
                >
                  <SelectTrigger id="relationship" className="h-11 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="owner">Property owner</SelectItem>
                      <SelectItem value="manager">Property manager</SelectItem>
                      <SelectItem value="authorized_representative">
                        Authorized representative
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError errors={[form.formState.errors.relationship]} />
              </Field>

              <Field data-invalid={Boolean(documentError)}>
                <FieldLabel htmlFor="proofDocument">Proof of ownership or authority</FieldLabel>
                <Input
                  id="proofDocument"
                  type="file"
                  accept="application/pdf,image/jpeg,image/png"
                  className="h-11"
                  onChange={(event) => {
                    setDocument(event.target.files?.[0]);
                    setDocumentError(undefined);
                  }}
                />
                <FieldDescription>
                  PDF, JPG, or PNG up to 1 MB. Use a permit, title excerpt, management agreement, or
                  authorization letter. Cover unrelated sensitive details.
                </FieldDescription>
                {documentError ? <p className="text-sm text-destructive">{documentError}</p> : null}
              </Field>

              <Field
                orientation="horizontal"
                data-invalid={Boolean(form.formState.errors.declaration)}
              >
                <Checkbox
                  id="declaration"
                  checked={declarationAccepted}
                  onCheckedChange={(checked) =>
                    form.setValue("declaration", checked === true, { shouldValidate: true })
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor="declaration">
                    I confirm that I am authorized to represent this property and that the details
                    are accurate.
                  </FieldLabel>
                  <FieldError errors={[form.formState.errors.declaration]} />
                </FieldContent>
              </Field>

              <Button
                type="submit"
                size="lg"
                className="h-11 w-fit"
                disabled={form.formState.isSubmitting || !declarationAccepted}
              >
                <SendIcon data-icon="inline-start" />
                {form.formState.isSubmitting ? "Submitting…" : "Submit for verification"}
              </Button>
            </FieldGroup>
          </CardContent>
        </Card>
      </form>
    </>
  );
}

function ApplicationStatus({ application }: { application: OwnerApplication }) {
  return (
    <>
      <DashboardPageHeader
        title="Verification in review"
        description="Your application is waiting for an administrator. You cannot create listings until it is approved."
      />
      <Card className="mt-8 max-w-3xl rounded-2xl shadow-none">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheckIcon className="size-5 text-primary" aria-hidden="true" />
                Owner application
              </CardTitle>
              <CardDescription>Submitted {formatDate(application.submittedAt)}</CardDescription>
            </div>
            <Badge variant="secondary">Pending</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Phone
            </p>
            <p className="mt-1 font-medium">{application.phone}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Relationship
            </p>
            <p className="mt-1 font-medium capitalize">
              {application.relationship.replaceAll("_", " ")}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Property
            </p>
            <p className="mt-1 font-medium">{application.propertyAddress}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-2">
            <FileCheck2Icon className="size-4 text-primary" aria-hidden="true" />
            Verification document received securely
          </div>
        </CardContent>
      </Card>
    </>
  );
}
