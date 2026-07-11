import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/common/PublicShell";
import { DormDetailFeature } from "@/features/dorms/DormDetailFeature";
import { getDormBySlug } from "@/services/dormService";

export async function generateMetadata({ params }: PageProps<"/dorms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const dorm = await getDormBySlug(slug);
  if (!dorm) return { title: "Dorm not found" };
  return {
    title: dorm.name,
    description: dorm.description.slice(0, 155),
    openGraph: { images: dorm.images[0]?.publicUrl ? [dorm.images[0].publicUrl] : [] },
  };
}

export default async function DormDetailPage({ params }: PageProps<"/dorms/[slug]">) {
  const { slug } = await params;
  const dorm = await getDormBySlug(slug);
  if (!dorm) notFound();
  return (
    <PublicShell>
      <DormDetailFeature dorm={dorm} />
    </PublicShell>
  );
}
