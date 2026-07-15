import { UsersIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { UserSuspensionAction } from "@/features/admin/components/UserSuspensionAction";
import { DashboardPageHeader } from "@/features/dashboard/components/DashboardPageHeader";
import type { Profile } from "@/types/Profile";
import { formatDate } from "@/utils/formatDate";

export function AdminUsersFeature({ profiles }: { profiles: Profile[] }) {
  return (
    <>
      <DashboardPageHeader
        title="Users"
        description="Manage owner access and account availability."
      />

      {profiles.length === 0 ? (
        <Empty className="mt-8 rounded-2xl border bg-card py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UsersIcon />
            </EmptyMedia>
            <EmptyTitle>No registered accounts</EmptyTitle>
            <EmptyDescription>New owner profiles will appear here.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      ) : (
        <Card className="mt-8 overflow-hidden rounded-2xl shadow-none">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Registered accounts</CardTitle>
            <CardDescription>
              Public contact details remain separate from profile access.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="pr-5 text-right">Account</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="pl-5 font-semibold">{profile.fullName}</TableCell>
                    <TableCell>{profile.phone ?? "Not provided"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {profile.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(profile.createdAt)}</TableCell>
                    <TableCell className="pr-5 text-right">
                      <UserSuspensionAction userId={profile.id} isSuspended={profile.isSuspended} />
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
