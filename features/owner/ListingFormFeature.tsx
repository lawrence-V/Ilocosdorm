"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlusIcon, SaveIcon, SendIcon } from "lucide-react";
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
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AMENITIES, ILOCOS_CITIES } from "@/constants/amenities";
import {
  listingSchema,
  type ListingFormData,
  type ListingFormInput,
} from "@/features/owner/schemas/listingSchema";
import { processDormImages } from "@/features/owner/utils/processDormImages";
import { saveListing, uploadCurrentOwnerImages } from "@/services/listingService";
import type { Dorm } from "@/types/Dorm";

function defaults(dorm?: Dorm): ListingFormInput {
  return {
    name: dorm?.name ?? "",
    slug: dorm?.slug ?? "",
    description: dorm?.description ?? "",
    monthlyPrice: dorm?.monthlyPrice ?? 0,
    address: dorm?.address ?? "",
    city: dorm?.city ?? "",
    latitude: dorm?.latitude ?? 18.196,
    longitude: dorm?.longitude ?? 120.593,
    genderPolicy: dorm?.genderPolicy ?? "mixed",
    contactName: dorm?.contactName ?? "",
    contactPhone: dorm?.contactPhone ?? "",
    contactEmail: dorm?.contactEmail ?? "",
    amenities: dorm?.amenities.map((item) => item.slug) ?? [],
    submitForReview: false,
  };
}

export function ListingFormFeature({ dorm }: { dorm?: Dorm }) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const form = useForm<ListingFormInput, unknown, ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: defaults(dorm),
  });
  const [city, genderPolicy, selectedAmenities = []] = useWatch({
    control: form.control,
    name: ["city", "genderPolicy", "amenities"],
  });
  const submit = (forReview: boolean) =>
    form.handleSubmit(async (values) => {
      try {
        const result = await saveListing({ ...values, submitForReview: forReview }, dorm?.id);
        if (files.length) await uploadCurrentOwnerImages(result.id, files);
        toast.success(forReview ? "Listing submitted for review." : "Draft saved.");
        router.push("/owner");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to save the listing.");
      }
    })();
  const handleImages = async (list: FileList | null) => {
    if (!list) return;
    try {
      setProcessing(true);
      const processed = await processDormImages(Array.from(list));
      setFiles(processed);
      toast.success(
        `${processed.length} image${processed.length === 1 ? "" : "s"} ready to upload.`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to process the images.");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <form className="mt-10 max-w-4xl">
      <FieldGroup>
        <section className="grid gap-6 rounded-lg border p-6">
          <div>
            <h2 className="font-heading text-2xl">Property details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell students what makes this place a good fit.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={Boolean(form.formState.errors.name)}>
              <FieldLabel htmlFor="name">Dorm name</FieldLabel>
              <Input
                id="name"
                aria-invalid={Boolean(form.formState.errors.name)}
                {...form.register("name")}
              />
              <FieldError errors={[form.formState.errors.name]} />
            </Field>
            <Field data-invalid={Boolean(form.formState.errors.slug)}>
              <FieldLabel htmlFor="slug">URL slug</FieldLabel>
              <Input
                id="slug"
                aria-invalid={Boolean(form.formState.errors.slug)}
                placeholder="balay-estudyante-laoag"
                {...form.register("slug")}
              />
              <FieldError errors={[form.formState.errors.slug]} />
            </Field>
          </div>
          <Field data-invalid={Boolean(form.formState.errors.description)}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              rows={7}
              aria-invalid={Boolean(form.formState.errors.description)}
              {...form.register("description")}
            />
            <FieldDescription>
              Include room setup, nearby campuses, house rules, and utilities.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.description]} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field data-invalid={Boolean(form.formState.errors.monthlyPrice)}>
              <FieldLabel htmlFor="price">Monthly price</FieldLabel>
              <Input
                id="price"
                type="number"
                min="0"
                aria-invalid={Boolean(form.formState.errors.monthlyPrice)}
                {...form.register("monthlyPrice")}
              />
              <FieldError errors={[form.formState.errors.monthlyPrice]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Select
                value={city}
                onValueChange={(value) =>
                  form.setValue("city", value ?? "", { shouldValidate: true })
                }
              >
                <SelectTrigger id="city" className="w-full">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {ILOCOS_CITIES.map((cityOption) => (
                      <SelectItem key={cityOption} value={cityOption}>
                        {cityOption}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="policy">Resident policy</FieldLabel>
              <Select
                value={genderPolicy}
                onValueChange={(value) =>
                  value && form.setValue("genderPolicy", value as ListingFormData["genderPolicy"])
                }
              >
                <SelectTrigger id="policy" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </section>
        <section className="grid gap-6 rounded-lg border p-6">
          <div>
            <h2 className="font-heading text-2xl">Address and map</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use precise coordinates so families can plan a visit.
            </p>
          </div>
          <Field data-invalid={Boolean(form.formState.errors.address)}>
            <FieldLabel htmlFor="address">Complete address</FieldLabel>
            <Input
              id="address"
              aria-invalid={Boolean(form.formState.errors.address)}
              {...form.register("address")}
            />
            <FieldError errors={[form.formState.errors.address]} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="latitude">Latitude</FieldLabel>
              <Input id="latitude" type="number" step="0.000001" {...form.register("latitude")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="longitude">Longitude</FieldLabel>
              <Input id="longitude" type="number" step="0.000001" {...form.register("longitude")} />
            </Field>
          </div>
        </section>
        <section className="grid gap-6 rounded-lg border p-6">
          <FieldSet>
            <FieldLegend>Amenities</FieldLegend>
            <FieldDescription>Select every amenity currently available.</FieldDescription>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AMENITIES.map((amenity) => {
                const selected = selectedAmenities.includes(amenity.slug);
                return (
                  <Field key={amenity.slug} orientation="horizontal">
                    <Checkbox
                      id={`amenity-${amenity.slug}`}
                      checked={selected}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("amenities");
                        form.setValue(
                          "amenities",
                          checked
                            ? [...current, amenity.slug]
                            : current.filter((slug) => slug !== amenity.slug),
                          { shouldValidate: true },
                        );
                      }}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={`amenity-${amenity.slug}`}>{amenity.name}</FieldLabel>
                    </FieldContent>
                  </Field>
                );
              })}
            </div>
            <FieldError errors={[form.formState.errors.amenities]} />
          </FieldSet>
        </section>
        <section className="grid gap-6 rounded-lg border p-6">
          <div>
            <h2 className="font-heading text-2xl">Owner contact</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              These details appear publicly on approved listings.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="contactName">Contact name</FieldLabel>
              <Input id="contactName" {...form.register("contactName")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="contactPhone">Phone number</FieldLabel>
              <Input id="contactPhone" type="tel" {...form.register("contactPhone")} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="contactEmail">Email address (optional)</FieldLabel>
            <Input id="contactEmail" type="email" {...form.register("contactEmail")} />
            <FieldError errors={[form.formState.errors.contactEmail]} />
          </Field>
        </section>
        <section className="grid gap-4 rounded-lg border p-6">
          <div>
            <h2 className="font-heading text-2xl">Dorm images</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload up to five images. They are resized to 1,200 px and converted to WebP before
              upload.
            </p>
          </div>
          <Field>
            <FieldLabel
              htmlFor="images"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center hover:bg-muted"
            >
              <ImagePlusIcon className="size-5" />
              {processing ? "Processing images…" : "Choose dorm images"}
            </FieldLabel>
            <Input
              id="images"
              className="sr-only"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={processing}
              onChange={(event) => handleImages(event.target.files)}
            />
            <FieldDescription>
              {files.length
                ? `${files.length} processed image${files.length === 1 ? "" : "s"} ready.`
                : "The first image will be used as the cover."}
            </FieldDescription>
          </Field>
        </section>
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={form.formState.isSubmitting || processing}
            onClick={() => submit(false)}
          >
            <SaveIcon data-icon="inline-start" />
            Save draft
          </Button>
          <Button
            type="button"
            disabled={form.formState.isSubmitting || processing}
            onClick={() => submit(true)}
          >
            <SendIcon data-icon="inline-start" />
            Submit for review
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
