import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserSuspensionAction } from "@/features/admin/components/UserSuspensionAction";
import { formatDate } from "@/utils/formatDate";
import type { Profile } from "@/types/Profile";

export function AdminUsersFeature({ profiles }: { profiles: Profile[] }) {
  return (
    <>
      <h1 className="font-heading text-5xl tracking-tight">Users</h1>
      <p className="mt-2 text-muted-foreground">Manage owner access and account availability.</p>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Registered accounts</CardTitle>
          <CardDescription>
            Public contact details remain separate from profile access.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Account</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.fullName}</TableCell>
                  <TableCell>{profile.phone ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {profile.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(profile.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <UserSuspensionAction userId={profile.id} isSuspended={profile.isSuspended} />
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
