"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { registerSchema, type RegisterFormData } from "@/features/auth/schemas/authSchema";
import { getRegistrationErrorMessage } from "@/features/auth/utils/getRegistrationErrorMessage";
import { signUp } from "@/services/authService";

export function RegisterFeature() {
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", terms: false },
  });
  const termsAccepted = useWatch({ control: form.control, name: "terms" });
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const result = await signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { full_name: values.fullName },
          emailRedirectTo: `${window.location.origin}/account`,
        },
      });
      toast.success(
        result.preview ? "Preview account created." : "Check your email to confirm your account.",
      );
      router.push(result.preview ? "/owner" : "/login");
    } catch (error) {
      toast.error(getRegistrationErrorMessage(error));
    }
  });
  return (
    <AuthShell
      title="Create your account"
      description="Browse as a student or apply to list a property after signing in."
    >
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field data-invalid={Boolean(form.formState.errors.fullName)}>
            <FieldLabel htmlFor="fullName">Full name</FieldLabel>
            <Input
              id="fullName"
              autoComplete="name"
              aria-invalid={Boolean(form.formState.errors.fullName)}
              className="h-11"
              {...form.register("fullName")}
            />
            <FieldError errors={[form.formState.errors.fullName]} />
          </Field>
          <Field data-invalid={Boolean(form.formState.errors.email)}>
            <FieldLabel htmlFor="register-email">Email address</FieldLabel>
            <Input
              id="register-email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(form.formState.errors.email)}
              className="h-11"
              {...form.register("email")}
            />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>
          <Field data-invalid={Boolean(form.formState.errors.password)}>
            <FieldLabel htmlFor="register-password">Password</FieldLabel>
            <Input
              id="register-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(form.formState.errors.password)}
              className="h-11"
              {...form.register("password")}
            />
            <FieldError errors={[form.formState.errors.password]} />
          </Field>
          <Field data-invalid={Boolean(form.formState.errors.confirmPassword)}>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(form.formState.errors.confirmPassword)}
              className="h-11"
              {...form.register("confirmPassword")}
            />
            <FieldError errors={[form.formState.errors.confirmPassword]} />
          </Field>
          <Field orientation="horizontal" data-invalid={Boolean(form.formState.errors.terms)}>
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) =>
                form.setValue("terms", checked === true, { shouldValidate: true })
              }
              aria-invalid={Boolean(form.formState.errors.terms)}
            />
            <FieldContent>
              <FieldLabel htmlFor="terms">
                I agree to provide accurate information and follow the platform rules.
              </FieldLabel>
              <FieldError errors={[form.formState.errors.terms]} />
            </FieldContent>
          </Field>
          <Button
            type="submit"
            size="lg"
            className="h-11"
            disabled={form.formState.isSubmitting || !termsAccepted}
          >
            {form.formState.isSubmitting ? "Creating account…" : "Create account"}
          </Button>
          <FieldDescription className="text-center">
            Already registered?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
