import Image from "next/image";
import Link from "next/link";
import { Building2Icon, EyeIcon, PlusIcon } from "lucide-react";

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
import { DashboardMetricStrip } from "@/features/dashboard/components/DashboardMetricStrip";
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";
import { StatusBadge } from "@/features/owner/components/StatusBadge";
import type { Dorm } from "@/types/Dorm";
import { formatDate } from "@/utils/formatDate";

export function OwnerDashboardFeature({ dorms }: { dorms: Dorm[] }) {
  const pending = dorms.filter((dorm) => dorm.status === "pending").length;
  const approved = dorms.filter((dorm) => dorm.status === "approved").length;

  return (
    <>
      <DashboardPageHeader
        title="Your dorms"
        description="Create, submit, and maintain your property listings."
        action={
          <Button render={<Link href="/owner/dorms/new" />} size="lg" className="h-11">
            <PlusIcon data-icon="inline-start" />
            Add a dorm
          </Button>
        }
      />

      <DashboardMetricStrip
        items={[
          { label: "Total dorms", value: dorms.length },
          { label: "Pending review", value: pending },
          { label: "Approved", value: approved },
        ]}
      />

      {dorms.length === 0 ? (
        <Empty className="mt-8 rounded-2xl border bg-card py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Building2Icon />
            </EmptyMedia>
            <EmptyTitle>No dorm listings yet</EmptyTitle>
            <EmptyDescription>Add your first property and save it as a draft.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button render={<Link href="/owner/dorms/new" />}>
              <PlusIcon data-icon="inline-start" />
              Add a dorm
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Card className="mt-8 overflow-hidden rounded-2xl shadow-none">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Property listings</CardTitle>
            <CardDescription>
              Open a listing to update its details or review status.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Dorm</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last updated</TableHead>
                  <TableHead className="pr-5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dorms.map((dorm) => (
                  <TableRow key={dorm.id}>
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 overflow-hidden rounded-xl bg-muted">
                          {dorm.images[0] ? (
                            <Image
                              src={dorm.images[0].publicUrl}
                              alt={`${dorm.name} thumbnail`}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-semibold">{dorm.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrencyCompact(dorm.monthlyPrice)} / month
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{dorm.city}</TableCell>
                    <TableCell>
                      <StatusBadge status={dorm.status} />
                    </TableCell>
                    <TableCell>{formatDate(dorm.updatedAt)}</TableCell>
                    <TableCell className="pr-5 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          render={<Link href={`/owner/dorms/${dorm.id}`} />}
                          variant="ghost"
                          size="sm"
                        >
                          <EyeIcon data-icon="inline-start" />
                          View
                        </Button>
                        <Button
                          render={<Link href={`/owner/dorms/${dorm.id}/edit`} />}
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
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

function formatCurrencyCompact(value: number) {
  return `₱${value.toLocaleString("en-PH")}`;
}
