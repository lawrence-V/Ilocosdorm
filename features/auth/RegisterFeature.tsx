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
          emailRedirectTo: `${window.location.origin}/owner`,
        },
      });
      toast.success(
        result.preview ? "Preview account created." : "Check your email to confirm your account.",
      );
      router.push(result.preview ? "/owner" : "/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create your account.");
    }
  });
  return (
    <AuthShell
      title="List your dorm"
      description="Create an owner account and reach students across Ilocos."
    >
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field data-invalid={Boolean(form.formState.errors.fullName)}>
            <FieldLabel htmlFor="fullName">Full name</FieldLabel>
            <Input
              id="fullName"
              autoComplete="name"
              aria-invalid={Boolean(form.formState.errors.fullName)}
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
                I confirm that my listing information will be accurate.
              </FieldLabel>
              <FieldError errors={[form.formState.errors.terms]} />
            </FieldContent>
          </Field>
          <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating account…" : "Create owner account"}
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
