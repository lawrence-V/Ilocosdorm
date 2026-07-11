import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModerationActions } from "@/features/admin/components/ModerationActions";
import { StatusBadge } from "@/features/owner/components/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import type { Dorm } from "@/types/Dorm";

export function AdminReviewFeature({ dorms, allDorms }: { dorms: Dorm[]; allDorms: Dorm[] }) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="font-heading text-5xl tracking-tight">Listing review</h1>
          <p className="mt-2 text-muted-foreground">
            Verify property details before they appear publicly.
          </p>
        </div>
        <div className="flex gap-7 text-center">
          <div>
            <p className="font-heading text-3xl">{allDorms.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div>
            <p className="font-heading text-3xl">{dorms.length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div>
            <p className="font-heading text-3xl">
              {allDorms.filter((dorm) => dorm.status === "approved").length}
            </p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </div>
        </div>
      </div>
      <Card className="mt-10 overflow-hidden">
        <CardHeader>
          <CardTitle>Pending submissions</CardTitle>
          <CardDescription>
            Review the address, images, price, contact details, and description.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dorm</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Decision</TableHead>
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
                        <p className="line-clamp-1 max-w-48 text-xs text-muted-foreground">
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
                  <TableCell>
                    <ModerationActions dormId={dorm.id} dormName={dorm.name} />
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
