import Image from "next/image";
import Link from "next/link";
import { MoreVerticalIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/features/owner/components/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import type { Dorm } from "@/types/Dorm";

export function OwnerDashboardFeature({ dorms }: { dorms: Dorm[] }) {
  const pending = dorms.filter((dorm) => dorm.status === "pending").length;
  const approved = dorms.filter((dorm) => dorm.status === "approved").length;
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="font-heading text-5xl tracking-tight">Your dorms</h1>
          <p className="mt-2 text-muted-foreground">
            Create, submit, and maintain your property listings.
          </p>
        </div>
        <Button
          render={<Link href="/owner/dorms/new" />}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <PlusIcon data-icon="inline-start" />
          Add a dorm
        </Button>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total dorms</CardDescription>
            <CardTitle className="font-heading text-4xl">{dorms.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending review</CardDescription>
            <CardTitle className="font-heading text-4xl">{pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Approved</CardDescription>
            <CardTitle className="font-heading text-4xl">{approved}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card className="mt-8 overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dorm</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dorms.map((dorm) => (
                <TableRow key={dorm.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 overflow-hidden rounded bg-muted">
                        {dorm.images[0] ? (
                          <Image
                            src={dorm.images[0].publicUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-medium">{dorm.name}</p>
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
                  <TableCell className="text-right">
                    <Button
                      render={<Link href={`/owner/dorms/${dorm.id}/edit`} />}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`More actions for ${dorm.name}`}
                    >
                      <MoreVerticalIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function formatCurrencyCompact(value: number) {
  return `₱${value.toLocaleString("en-PH")}`;
}
