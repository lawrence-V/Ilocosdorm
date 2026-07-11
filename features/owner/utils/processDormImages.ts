import imageCompression from "browser-image-compression";

const MAX_IMAGES = 5;

export async function processDormImages(files: File[]) {
  if (files.length > MAX_IMAGES) throw new Error("You can upload up to five images per dorm.");
  const output: File[] = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image.`);
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      fileType: "image/webp",
      initialQuality: 0.82,
    });
    if (compressed.size > 1_048_576)
      throw new Error(`${file.name} is still larger than 1 MB after processing.`);
    output.push(new File([compressed], `${crypto.randomUUID()}.webp`, { type: "image/webp" }));
  }
  return output;
}
