import Link from "next/link";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      description="Enter your account email and Supabase will send a recovery link."
    >
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="recovery-email">Email address</FieldLabel>
            <Input id="recovery-email" type="email" autoComplete="email" className="h-11" />
          </Field>
          <Button type="submit" size="lg" className="h-11">
            Send recovery link
          </Button>
          <Button render={<Link href="/login" />} variant="ghost">
            Back to sign in
          </Button>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
