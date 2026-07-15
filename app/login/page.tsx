import type { Metadata } from "next";
import { LoginFeature } from "@/features/auth/LoginFeature";

export const metadata: Metadata = { title: "Sign in" };
export default function LoginPage() {
  return <LoginFeature />;
}
