import Image from "next/image";
import Link from "next/link";
import { ClipboardCheckIcon, EyeIcon } from "lucide-react";

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
import { ModerationActions } from "@/features/admin/components/ModerationActions";
import { DashboardMetricStrip } from "@/features/dashboard/components/DashboardMetricStrip";
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";
import { StatusBadge } from "@/features/owner/components/StatusBadge";
import type { Dorm } from "@/types/Dorm";
import { formatDate } from "@/utils/formatDate";

export function AdminReviewFeature({ dorms, allDorms }: { dorms: Dorm[]; allDorms: Dorm[] }) {
  const approved = allDorms.filter((dorm) => dorm.status === "approved").length;

  return (
    <>
      <DashboardPageHeader
        title="Listing review"
        description="Verify property details before they appear publicly."
      />

      <DashboardMetricStrip
        items={[
          { label: "Total listings", value: allDorms.length },
          { label: "Pending review", value: dorms.length },
          { label: "Approved", value: approved },
        ]}
      />

      {dorms.length === 0 ? (
        <Empty className="mt-8 rounded-2xl border bg-card py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ClipboardCheckIcon />
            </EmptyMedia>
            <EmptyTitle>Review queue is clear</EmptyTitle>
            <EmptyDescription>New submissions will appear here for verification.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      ) : (
        <Card className="mt-8 overflow-hidden rounded-2xl shadow-none">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Pending submissions</CardTitle>
            <CardDescription>
              Review the address, images, price, contact details, and description.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Dorm</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-5 text-right">Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dorms.map((dorm) => (
                  <TableRow key={dorm.id}>
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <div className="relative size-14 overflow-hidden rounded-xl bg-muted">
                          {dorm.images[0] ? (
                            <Image
                              src={dorm.images[0].publicUrl}
                              alt={`${dorm.name} thumbnail`}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-semibold">{dorm.name}</p>
                          <p className="line-clamp-1 max-w-56 text-xs text-muted-foreground">
                            {dorm.address}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{dorm.city}</TableCell>
                    <TableCell>{formatDate(dorm.submittedAt ?? dorm.updatedAt)}</TableCell>
                    <TableCell>
                      <StatusBadge status={dorm.status} />
                    </TableCell>
                    <TableCell className="pr-5">
                      <div className="flex flex-wrap justify-end gap-2">
                        <Button
                          render={<Link href={`/admin/dorms/${dorm.id}`} />}
                          variant="outline"
                          size="sm"
                        >
                          <EyeIcon data-icon="inline-start" />
                          View details
                        </Button>
                        <ModerationActions dormId={dorm.id} dormName={dorm.name} />
                      </div>
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
