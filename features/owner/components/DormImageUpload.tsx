"use client";

import Image from "next/image";
import { CheckCircle2Icon, ImagePlusIcon, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PendingDormImage {
  id: string;
  file: File;
  previewUrl: string;
}

export function DormImageUpload({
  images,
  processing,
  onFilesSelected,
  onRemove,
}: {
  images: PendingDormImage[];
  processing: boolean;
  onFilesSelected: (files: FileList | null) => Promise<void>;
  onRemove: (imageId: string) => void;
}) {
  const isFull = images.length >= 5;

  return (
    <Field>
      {images.length ? (
        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-secondary/55 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2Icon className="size-4 text-primary" aria-hidden="true" />
              {images.length} of 5 photos ready
            </div>
            <span className="text-xs text-muted-foreground">Not uploaded yet</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10"
              >
                <Image
                  src={image.previewUrl}
                  alt={`Selected dorm photo ${index + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2">
                  {index === 0 ? <Badge>Cover photo</Badge> : <span />}
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-sm"
                    className="rounded-full bg-background/90 shadow-sm backdrop-blur"
                    aria-label={`Remove photo ${index + 1}`}
                    onClick={() => onRemove(image.id)}
                  >
                    <XIcon />
                  </Button>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 pt-8 pb-2 text-xs font-medium text-white">
                  Photo {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <FieldLabel
        htmlFor="images"
        aria-disabled={processing || isFull}
        className={cn(
          "flex min-h-28 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center transition-colors hover:bg-muted",
          (processing || isFull) && "cursor-not-allowed opacity-55",
        )}
      >
        <ImagePlusIcon className="size-5" />
        {processing
          ? "Processing images…"
          : isFull
            ? "Maximum of five photos selected"
            : images.length
              ? "Add more photos"
              : "Choose dorm images"}
      </FieldLabel>
      <Input
        id="images"
        className="sr-only"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        disabled={processing || isFull}
        onChange={async (event) => {
          await onFilesSelected(event.target.files);
          event.target.value = "";
        }}
      />
      <FieldDescription>
        {images.length
          ? "Review the photos above. Remove any mistake before saving or submitting."
          : "The first image will be the cover photo. Nothing uploads until you save."}
      </FieldDescription>
    </Field>
  );
}
