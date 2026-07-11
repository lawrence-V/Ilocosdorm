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
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import type { Dorm } from "@/types/Dorm";

export function AdminDormsFeature({ dorms }: { dorms: Dorm[] }) {
  return (
    <>
      <h1 className="font-heading text-5xl tracking-tight">Dorms</h1>
      <p className="mt-2 text-muted-foreground">Every listing and its current moderation state.</p>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>All listings</CardTitle>
          <CardDescription>{dorms.length} records across Ilocos.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dorms.map((dorm) => (
                <TableRow key={dorm.id}>
                  <TableCell className="font-medium">{dorm.name}</TableCell>
                  <TableCell>{dorm.city}</TableCell>
                  <TableCell>{formatCurrency(dorm.monthlyPrice)}</TableCell>
                  <TableCell>
                    <StatusBadge status={dorm.status} />
                  </TableCell>
                  <TableCell>{formatDate(dorm.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
