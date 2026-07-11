import type { Metadata } from "next";
import { LoginFeature } from "@/features/auth/LoginFeature";

export const metadata: Metadata = { title: "Owner sign in" };
export default function LoginPage() {
  return <LoginFeature />;
}
