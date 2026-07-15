import { ExternalLinkIcon, ShieldCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OwnerApplicationActions } from "@/features/admin/components/OwnerApplicationActions";
import { DashboardMetricStrip } from "@/features/dashboard/components/DashboardMetricStrip";
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";
import type { OwnerApplication } from "@/types/OwnerApplication";
import { formatDate } from "@/utils/formatDate";

export function AdminOwnerApplicationsFeature({
  applications,
}: {
  applications: OwnerApplication[];
}) {
  const pending = applications.filter((application) => application.status === "pending").length;
  const approved = applications.filter((application) => application.status === "approved").length;
  const rejected = applications.filter((application) => application.status === "rejected").length;

  return (
    <>
      <DashboardPageHeader
        title="Owner verification"
        description="Review identity and property-authority evidence before granting listing access. Documents expire after 15 minutes when opened."
      />

      <DashboardMetricStrip
        items={[
          { label: "Pending review", value: pending },
          { label: "Approved", value: approved },
          { label: "Rejected", value: rejected },
        ]}
      />

      {applications.length === 0 ? (
        <Empty className="mt-8 rounded-2xl border bg-card py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShieldCheckIcon />
            </EmptyMedia>
            <EmptyTitle>No owner applications</EmptyTitle>
            <EmptyDescription>New verification requests will appear here.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      ) : (
        <Card className="mt-8 overflow-hidden rounded-2xl shadow-none">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Verification queue</CardTitle>
            <CardDescription>
              Confirm the name, phone, address, relationship, and supporting document.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Applicant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="pr-5 text-right">Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="pl-5">
                      <p className="font-semibold">{application.applicantName}</p>
                      <p className="text-xs text-muted-foreground">{application.phone}</p>
                    </TableCell>
                    <TableCell className="max-w-72">
                      <p className="line-clamp-2">{application.propertyAddress}</p>
                      <p className="mt-1 text-xs text-muted-foreground capitalize">
                        {application.relationship.replaceAll("_", " ")}
                      </p>
                    </TableCell>
                    <TableCell>
                      {application.documentUrl ? (
                        <Button
                          render={
                            <a href={application.documentUrl} target="_blank" rel="noreferrer" />
                          }
                          variant="outline"
                          size="sm"
                        >
                          <ExternalLinkIcon data-icon="inline-start" />
                          Open
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">Unavailable</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <ApplicationStatusBadge status={application.status} />
                    </TableCell>
                    <TableCell>{formatDate(application.submittedAt)}</TableCell>
                    <TableCell className="pr-5 text-right">
                      {application.status === "pending" ? (
                        <OwnerApplicationActions
                          applicationId={application.id}
                          applicantName={application.applicantName}
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {application.reviewedAt ? formatDate(application.reviewedAt) : "Reviewed"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function ApplicationStatusBadge({ status }: { status: OwnerApplication["status"] }) {
  if (status === "approved") return <Badge>Approved</Badge>;
  if (status === "rejected") return <Badge variant="destructive">Rejected</Badge>;
  return <Badge variant="secondary">Pending</Badge>;
}
