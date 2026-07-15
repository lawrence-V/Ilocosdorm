import { z } from "zod";

const ALLOWED_DOCUMENT_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const MAX_DOCUMENT_SIZE = 1024 * 1024;

export const ownerApplicationSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30, "Phone number is too long."),
  propertyAddress: z
    .string()
    .trim()
    .min(8, "Enter the complete property address.")
    .max(240, "Property address is too long."),
  relationship: z.enum(["owner", "manager", "authorized_representative"], {
    error: "Select your relationship to the property.",
  }),
  declaration: z.boolean().refine(Boolean, "Confirm that the information is accurate."),
});

export const proofDocumentSchema = z
  .custom<File>((value) => value instanceof File, "Choose a verification document.")
  .superRefine((file, context) => {
    if (!(file instanceof File)) return;
    if (!ALLOWED_DOCUMENT_TYPES.has(file.type)) {
      context.addIssue({ code: "custom", message: "Upload a PDF, JPG, or PNG document." });
    }
    if (file.size > MAX_DOCUMENT_SIZE) {
      context.addIssue({ code: "custom", message: "The document must be 1 MB or smaller." });
    }
  });

export type OwnerApplicationFormData = z.infer<typeof ownerApplicationSchema>;
