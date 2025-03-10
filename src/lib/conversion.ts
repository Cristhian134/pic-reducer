import { MIMES_TYPES } from "@/constants";
import { ImageFile, ImageFormat } from "@/types";

export async function convertImageService({
  image,
  convertTo = "Original",
  enableConvertTo = false,
  url = "",
}: {
  image: ImageFile;
  convertTo?: ImageFormat;
  enableConvertTo?: boolean;
  url: string;
}): Promise<ImageFile> {
  if (convertTo === "Original" || enableConvertTo === false) {
    return image;
  }
  return new Promise((resolve, reject) => {
    const originalUrl = url ? url : URL.createObjectURL(image);
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return reject(new Error("No se pudo obtener el contexto del canvas"));
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          const blobFormatted = blob as ImageFile;
          const lastDotIndex = image.name.lastIndexOf(".");
          const nameWithoutExt = image.name.substring(0, lastDotIndex);
          blobFormatted.name = `${nameWithoutExt}.${convertTo}`;

          if (blob) {
            resolve(blob as ImageFile);
          } else {
            reject(new Error("Error al convertir la imagen"));
          }
        },
        MIMES_TYPES[convertTo],
        0.6
      );
    };

    img.onerror = () => reject(new Error("Error al cargar la imagen"));
    img.src = originalUrl;
  });
}
