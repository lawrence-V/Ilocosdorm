import Link from "next/link";
import { Building2Icon, EyeIcon } from "lucide-react";

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
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";
import { StatusBadge } from "@/features/owner/components/StatusBadge";
import type { Dorm } from "@/types/Dorm";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

export function AdminDormsFeature({ dorms }: { dorms: Dorm[] }) {
  return (
    <>
      <DashboardPageHeader
        title="Dorms"
        description="Every listing and its current moderation state."
      />

      {dorms.length === 0 ? (
        <Empty className="mt-8 rounded-2xl border bg-card py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Building2Icon />
            </EmptyMedia>
            <EmptyTitle>No dorm records</EmptyTitle>
            <EmptyDescription>Listings will appear here after owners create them.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      ) : (
        <Card className="mt-8 overflow-hidden rounded-2xl shadow-none">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">All listings</CardTitle>
            <CardDescription>{dorms.length} records across Ilocos.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="pr-5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dorms.map((dorm) => (
                  <TableRow key={dorm.id}>
                    <TableCell className="pl-5 font-semibold">{dorm.name}</TableCell>
                    <TableCell>{dorm.city}</TableCell>
                    <TableCell>{formatCurrency(dorm.monthlyPrice)}</TableCell>
                    <TableCell>
                      <StatusBadge status={dorm.status} />
                    </TableCell>
                    <TableCell>{formatDate(dorm.updatedAt)}</TableCell>
                    <TableCell className="pr-5 text-right">
                      <Button
                        render={<Link href={`/admin/dorms/${dorm.id}`} />}
                        variant="outline"
                        size="sm"
                      >
                        <EyeIcon data-icon="inline-start" />
                        View details
                      </Button>
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
