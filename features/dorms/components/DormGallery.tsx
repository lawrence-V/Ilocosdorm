import Image from "next/image";
import type { DormImage } from "@/types/Dorm";

export function DormGallery({ name, images }: { name: string; images: DormImage[] }) {
  const sorted = images.toSorted((a, b) => a.displayOrder - b.displayOrder);
  if (sorted.length === 0) return <div className="aspect-[16/7] rounded-lg bg-muted" />;
  return (
    <div className="grid gap-3 overflow-hidden rounded-lg md:grid-cols-2">
      <div className="relative aspect-[4/3] md:row-span-2 md:aspect-auto">
        <Image
          src={sorted[0].publicUrl}
          alt={`${name} cover`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {sorted.slice(1, 5).map((image, index) => (
          <div key={image.id} className="relative aspect-[4/3] bg-muted">
            <Image
              src={image.publicUrl}
              alt={`${name} photo ${index + 2}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
