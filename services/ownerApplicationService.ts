import type { OwnerApplicationFormData } from "@/features/owner/schemas/ownerApplicationSchema";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

const DOCUMENT_EXTENSIONS: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export async function submitOwnerApplication(values: OwnerApplicationFormData, document: File) {
  if (!hasSupabaseEnv()) return { preview: true };

  const supabase = createClient();
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (claimsError || !userId) throw new Error("Please sign in before applying.");

  const extension = DOCUMENT_EXTENSIONS[document.type];
  if (!extension) throw new Error("Upload a PDF, JPG, or PNG document.");

  const documentPath = `${userId}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from("owner-verification")
    .upload(documentPath, document, { contentType: document.type, upsert: false });
  if (uploadError) throw uploadError;

  const { error: applicationError } = await supabase.from("owner_applications").insert({
    user_id: userId,
    phone: values.phone,
    property_address: values.propertyAddress,
    relationship: values.relationship,
    document_path: documentPath,
  });

  if (applicationError) {
    await supabase.storage.from("owner-verification").remove([documentPath]);
    throw applicationError;
  }

  return { preview: false };
}
