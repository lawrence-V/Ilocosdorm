"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, SendIcon } from "lucide-react";
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
  DormImageUpload,
  type PendingDormImage,
} from "@/features/owner/components/DormImageUpload";
import { ListingLocationMap } from "@/features/owner/components/ListingLocationMap";
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

const DEFAULT_LATITUDE = 18.196;
const DEFAULT_LONGITUDE = 120.593;

function coordinateValue(value: unknown, fallback: number) {
  if (typeof value !== "string" && typeof value !== "number") return fallback;
  const coordinate = Number(value);
  return Number.isFinite(coordinate) ? coordinate : fallback;
}

export function ListingFormFeature({ dorm }: { dorm?: Dorm }) {
  const router = useRouter();
  const [images, setImages] = useState<PendingDormImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const previewUrls = useRef(new Set<string>());
  const form = useForm<ListingFormInput, unknown, ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: defaults(dorm),
  });
  const [city, genderPolicy, latitudeValue, longitudeValue, selectedAmenities = []] = useWatch({
    control: form.control,
    name: ["city", "genderPolicy", "latitude", "longitude", "amenities"],
  });
  const latitude = coordinateValue(latitudeValue, DEFAULT_LATITUDE);
  const longitude = coordinateValue(longitudeValue, DEFAULT_LONGITUDE);
  const updatePosition = useCallback(
    (nextLatitude: number, nextLongitude: number) => {
      form.setValue("latitude", Number(nextLatitude.toFixed(6)), {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("longitude", Number(nextLongitude.toFixed(6)), {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [form],
  );
  useEffect(
    () => () => {
      previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.current.clear();
    },
    [],
  );
  const submit = (forReview: boolean) =>
    form.handleSubmit(async (values) => {
      try {
        const result = await saveListing({ ...values, submitForReview: forReview }, dorm?.id);
        if (images.length) {
          await uploadCurrentOwnerImages(
            result.id,
            images.map((image) => image.file),
          );
        }
        toast.success(forReview ? "Listing submitted for review." : "Draft saved.");
        router.push("/owner");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to save the listing.");
      }
    })();
  const handleImages = async (list: FileList | null) => {
    if (!list) return;
    if (images.length + list.length > 5) {
      toast.error(`Choose up to ${5 - images.length} more photo${images.length === 4 ? "" : "s"}.`);
      return;
    }
    try {
      setProcessing(true);
      const processed = await processDormImages(Array.from(list));
      const nextImages = processed.map((file) => {
        const previewUrl = URL.createObjectURL(file);
        previewUrls.current.add(previewUrl);
        return { id: crypto.randomUUID(), file, previewUrl };
      });
      setImages((current) => [...current, ...nextImages]);
      toast.success(
        `${processed.length} image${processed.length === 1 ? "" : "s"} ready to upload.`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to process the images.");
    } finally {
      setProcessing(false);
    }
  };
  const removeImage = (imageId: string) => {
    const image = images.find((item) => item.id === imageId);
    if (image) {
      URL.revokeObjectURL(image.previewUrl);
      previewUrls.current.delete(image.previewUrl);
    }
    setImages((current) => current.filter((item) => item.id !== imageId));
  };
  return (
    <form className="mt-8 max-w-5xl">
      <FieldGroup className="gap-6">
        <section className="grid gap-6 rounded-2xl bg-card p-5 ring-1 ring-foreground/10 sm:p-7">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">Property details</h2>
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
                className="h-11"
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
                className="h-11"
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
                className="h-11"
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
                <SelectTrigger id="city" className="h-11 w-full">
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
                <SelectTrigger id="policy" className="h-11 w-full">
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
        <section className="grid gap-6 rounded-2xl bg-card p-5 ring-1 ring-foreground/10 sm:p-7">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">Address and map</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use precise coordinates so families can plan a visit.
            </p>
          </div>
          <Field data-invalid={Boolean(form.formState.errors.address)}>
            <FieldLabel htmlFor="address">Complete address</FieldLabel>
            <Input
              id="address"
              aria-invalid={Boolean(form.formState.errors.address)}
              className="h-11"
              {...form.register("address")}
            />
            <FieldError errors={[form.formState.errors.address]} />
          </Field>
          <ListingLocationMap
            latitude={latitude}
            longitude={longitude}
            onPositionChange={updatePosition}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={Boolean(form.formState.errors.latitude)}>
              <FieldLabel htmlFor="latitude">Latitude</FieldLabel>
              <Input
                id="latitude"
                type="number"
                step="0.000001"
                aria-invalid={Boolean(form.formState.errors.latitude)}
                className="h-11"
                {...form.register("latitude")}
              />
              <FieldError errors={[form.formState.errors.latitude]} />
            </Field>
            <Field data-invalid={Boolean(form.formState.errors.longitude)}>
              <FieldLabel htmlFor="longitude">Longitude</FieldLabel>
              <Input
                id="longitude"
                type="number"
                step="0.000001"
                aria-invalid={Boolean(form.formState.errors.longitude)}
                className="h-11"
                {...form.register("longitude")}
              />
              <FieldError errors={[form.formState.errors.longitude]} />
            </Field>
          </div>
        </section>
        <section className="grid gap-6 rounded-2xl bg-card p-5 ring-1 ring-foreground/10 sm:p-7">
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
        <section className="grid gap-6 rounded-2xl bg-card p-5 ring-1 ring-foreground/10 sm:p-7">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">Owner contact</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              These details appear publicly on approved listings.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="contactName">Contact name</FieldLabel>
              <Input id="contactName" className="h-11" {...form.register("contactName")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="contactPhone">Phone number</FieldLabel>
              <Input
                id="contactPhone"
                type="tel"
                className="h-11"
                {...form.register("contactPhone")}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="contactEmail">Email address (optional)</FieldLabel>
            <Input
              id="contactEmail"
              type="email"
              className="h-11"
              {...form.register("contactEmail")}
            />
            <FieldError errors={[form.formState.errors.contactEmail]} />
          </Field>
        </section>
        <section className="grid gap-4 rounded-2xl bg-card p-5 ring-1 ring-foreground/10 sm:p-7">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">Dorm images</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload up to five images. They are resized to 1,200 px and converted to WebP before
              upload.
            </p>
          </div>
          <DormImageUpload
            images={images}
            processing={processing}
            onFilesSelected={handleImages}
            onRemove={removeImage}
          />
        </section>
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={form.formState.isSubmitting || processing}
            onClick={() => submit(false)}
            size="lg"
            className="h-11"
          >
            <SaveIcon data-icon="inline-start" />
            Save draft
          </Button>
          <Button
            type="button"
            disabled={form.formState.isSubmitting || processing}
            onClick={() => submit(true)}
            size="lg"
            className="h-11"
          >
            <SendIcon data-icon="inline-start" />
            Submit for review
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
