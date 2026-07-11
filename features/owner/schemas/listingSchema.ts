import { z } from "zod";

export const listingSchema = z.object({
  name: z.string().trim().min(3, "Enter a name with at least 3 characters.").max(120),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  description: z
    .string()
    .trim()
    .min(80, "Add at least 80 characters so students understand the property.")
    .max(3000),
  monthlyPrice: z.coerce.number().min(0, "Price cannot be negative.").max(100000),
  address: z.string().trim().min(8, "Enter the complete address.").max(240),
  city: z.string().min(2, "Select a city."),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  genderPolicy: z.enum(["male", "female", "mixed"]),
  contactName: z.string().trim().min(2).max(100),
  contactPhone: z.string().trim().min(7).max(30),
  contactEmail: z.union([z.literal(""), z.email("Enter a valid email address.")]),
  amenities: z.array(z.string()).min(1, "Select at least one amenity."),
  submitForReview: z.boolean(),
});

export type ListingFormInput = z.input<typeof listingSchema>;
export type ListingFormData = z.output<typeof listingSchema>;
