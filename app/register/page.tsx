import type { Metadata } from "next";
import { RegisterFeature } from "@/features/auth/RegisterFeature";

export const metadata: Metadata = { title: "Create an account" };
export default function RegisterPage() {
  return <RegisterFeature />;
}
