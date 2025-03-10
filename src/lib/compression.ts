import { MIMES_TYPES } from "@/constants";
import { ImageFile, SettingsFormType } from "@/types";
import imageCompression, { Options } from "browser-image-compression";
import Compressor from "compressorjs";

export async function imageCompressionService({
  imageFile,
  settings,
}: {
  imageFile: ImageFile;
  settings: SettingsFormType;
}) {
  if (settings.quality === 100) return imageFile;

  switch (imageFile.type) {
    // CompressorJS
    case MIMES_TYPES.jpg:
      const optionsCompressorJS: Compressor.Options = {
        quality: settings.quality / 100,
        convertSize: 0.001,
        mimeType: imageFile.type,
        ...(settings.keepResolution === false && {
          maxWidth: settings.maxWidth,
          maxHeight: settings.maxHeight,
        }),
      };
      const compressedBlob = (await new Promise((resolve, reject) => {
        new Compressor(imageFile, {
          ...optionsCompressorJS,
          success(result) {
            resolve(result as ImageFile);
          },
          error(error) {
            reject(error);
          },
        });
      })) as ImageFile;
      return compressedBlob;
      break;
    // Browser Image Compression
    case MIMES_TYPES.png:
    case MIMES_TYPES.webp:
      const optionsBrowserIC: Options = {
        maxSizeMB: 0.0001,
        initialQuality: settings.quality / 100,
        preserveExif: false,
        maxIteration: 20,
        useWebWorker: true,
        fileType: imageFile.type,
        alwaysKeepResolution: true,
        ...(settings.keepResolution === false && {
          maxWidthOrHeight:
            settings.maxWidth > 0 || settings.maxHeight > 0
              ? settings.maxWidth || settings.maxHeight
              : undefined,
        }),
      };
      try {
        const compressedFile = await imageCompression(
          // @ts-ignore
          imageFile as File,
          optionsBrowserIC
        );

        return compressedFile;
      } catch (error) {}
      break;
  }
  return imageFile;
}
