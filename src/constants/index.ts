import { SettingsFormType } from "@/types";

export const IMAGES_FORMAT = ["Original", "jpg", "png", "webp"] as const;

export const IMAGE_STATES_CONST = {
  IMAGE_UPLOADING: "IMAGE_UPLOADING",
  IMAGE_PROCESSED: "IMAGE_PROCESSED",
  IMAGE_UPLOADED: "IMAGE_UPLOADED",
  IMAGE_REPROCESSING: "IMAGE_REPROCESSING",
  IMAGE_REPROCESSED: "IMAGE_REPROCESSED",
};

export const settingsInitialState: SettingsFormType = {
  convertTo: "Original",
  quality: 60,
  maxSize: 0,
  sufix: "",
  maxWidth: 0,
  maxHeight: 0,
  enableConvertTo: false,
  keepResolution: true,
};

export const MIMES_TYPES = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
} as const;
