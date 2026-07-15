import type { Metadata } from "next";

import { PublicShell } from "@/components/common/PublicShell";
import { SafetyGuidelinesFeature } from "@/features/safety/SafetyGuidelinesFeature";

export const metadata: Metadata = {
  title: "Safety guidelines",
  description:
    "Practical steps for verifying dorm listings, arranging viewings, and paying safely.",
};

export default function SafetyGuidelinesPage() {
  return (
    <PublicShell>
      <SafetyGuidelinesFeature />
    </PublicShell>
  );
}
