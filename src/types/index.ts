import { IMAGES_FORMAT } from "@/constants";

export type IMAGE_STATES_TYPE = "IMAGE_PROCESSED";

export type ImageFile = Blob & {
  name: string;
  width: number;
  height: number;
  url: string;
};

export type ImageDimmensions = {
  width: number;
  height: number;
};

export type ImageType = {
  id: string;
  old: ImageFile;
  pd: ImageFile;
  step: string;
};

export type ImagesType = {
  images: ImageType[];
};

export type ImagesContextType = {
  images: ImageType[];
  uploadImage: any;
  processImage: any;
  clearImages: any;
  removeImage: any;
  editImage: any;
};

export type UploadImageActionType = {
  type: "UPLOAD_IMAGE";
  payload: { file: ImageFile; width: number; height: number; url: string };
};

export type ProcessImageActionType = {
  type: "PROCESS_IMAGE";
  payload: {
    file: ImageFile;
    id: string;
    step: string;
    width: number;
    height: number;
    url: string;
  };
};

export type ClearImagesActionType = {
  type: "CLEAR_IMAGES";
  payload: {};
};

export type RemoveImageActionType = {
  type: "REMOVE_IMAGE";
  payload: { id: string };
};

export type EditImageActionType = {
  type: "EDIT_IMAGE";
  payload: { id: string; edit: any };
};

export type ImagesActionType =
  | UploadImageActionType
  | ProcessImageActionType
  | ClearImagesActionType
  | RemoveImageActionType
  | EditImageActionType;

export type SettingsType = {
  dropImagesTotal: number;
};

export type ImageFormat = (typeof IMAGES_FORMAT)[number];

export type SettingsFormType = {
  convertTo: ImageFormat;
  quality: number;
  maxSize: number;
  sufix: string;
  maxWidth: number;
  maxHeight: number;
  enableConvertTo: boolean;
  keepResolution: boolean;
};

export type SettingsContextType = {
  settings: SettingsFormType;
  setSettings: any;
  open: boolean;
  setOpen: any;
};
