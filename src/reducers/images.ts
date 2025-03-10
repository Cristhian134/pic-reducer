import { IMAGE_STATES_CONST } from "@/constants";
import {
  EditImageActionType,
  ImagesActionType,
  ImagesType,
  ImageType,
  ProcessImageActionType,
  RemoveImageActionType,
  UploadImageActionType,
} from "@/types";

export const IMAGES_ACTION_TYPES = {
  ADD_IMAGES: "ADD_IMAGES",
  ADD_IMAGE: "ADD_IMAGE",
  UPLOAD_IMAGE: "UPLOAD_IMAGE",
  PROCESS_IMAGE: "PROCESS_IMAGE",
  REMOVE_IMAGE: "REMOVE_IMAGE",
  CLEAR_IMAGES: "CLEAR_IMAGES",
  EDIT_IMAGE: "EDIT_IMAGE",
} as const;

export const imagesInitialState = { images: [] } as { images: ImageType[] };

const UPDATE_IMAGES_STATE_BY_ACTION = {
  [IMAGES_ACTION_TYPES.UPLOAD_IMAGE]: (
    state: ImagesType,
    action: UploadImageActionType
  ) => {
    const { file, width, height, url } = action.payload;
    const id =
      (
        Number(state.images.length > 0 ? state.images.at(-1)?.id : 0) + 1
      ).toString() || "0";
    file.width = width;
    file.height = height;
    file.url = url;
    const uploadedImage = {
      id,
      old: file,
      step: IMAGE_STATES_CONST.IMAGE_UPLOADED,
      pd: {
        name: file.name,
      },
    };

    return { images: [...state.images, uploadedImage] };
  },
  [IMAGES_ACTION_TYPES.PROCESS_IMAGE]: (
    state: ImagesType,
    action: ProcessImageActionType
  ) => {
    const { file, id, width, height, url } = action.payload;
    file.width = width;
    file.height = height;
    file.url = url;
    return {
      images: state.images.map((image) => {
        return image.id === id
          ? {
              ...image,
              pd: file,
              step: IMAGE_STATES_CONST.IMAGE_PROCESSED,
            }
          : image;
      }),
    };
  },
  [IMAGES_ACTION_TYPES.CLEAR_IMAGES]: (state: ImagesType) => {
    if (state.images.length > 0) {
      state.images.map((image) => {
        URL.revokeObjectURL(image.old.url);
        URL.revokeObjectURL(image.pd.url);
      });
      return { images: [] };
    } else {
      return state;
    }
  },
  [IMAGES_ACTION_TYPES.REMOVE_IMAGE]: (
    state: ImagesType,
    action: RemoveImageActionType
  ) => {
    const { id } = action.payload;
    const [removeImage] = [...state.images].filter((image) => image.id === id);

    URL.revokeObjectURL(removeImage.old.url);
    URL.revokeObjectURL(removeImage.pd.url);
    const updatedImages = [...state.images].filter((image) => image.id !== id);
    return {
      images: updatedImages,
    };
  },
  [IMAGES_ACTION_TYPES.EDIT_IMAGE]: (
    state: ImagesType,
    action: EditImageActionType
  ) => {
    const { id, edit } = action.payload;
    return {
      images: state.images.map((image) => {
        return image.id === id
          ? {
              ...image,
              ...edit,
            }
          : image;
      }),
    };
  },
};

export const imagesReducer = (state: ImagesType, action: ImagesActionType) => {
  const { type } = action;
  const updateState = UPDATE_IMAGES_STATE_BY_ACTION[type];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return updateState ? updateState(state, action) : state;
};
