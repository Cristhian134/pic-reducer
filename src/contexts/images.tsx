import { imageCompressionService } from "@/lib/compression";
import { convertImageService } from "@/lib/conversion";
import { imagesInitialState, imagesReducer } from "@/reducers/images";
import {
  ImageFile,
  ImagesContextType,
  ImageType,
  SettingsFormType,
} from "@/types";
import { getImageDimensions } from "@/utils";
import { createContext, useReducer } from "react";

export const ImagesContext = createContext<ImagesContextType | undefined>(
  undefined
);

function useImagesReducer() {
  const [state, dispatch] = useReducer(imagesReducer, imagesInitialState);

  const editImage = ({ id, edit }: { id: string; edit: any }) => {
    dispatch({
      type: "EDIT_IMAGE",
      payload: { id, edit },
    });
  };

  const uploadImage = async (image: ImageFile) => {
    const { width, height, url } = await getImageDimensions({
      image,
    });

    await dispatch({
      type: "UPLOAD_IMAGE",
      payload: { file: image, width, height, url },
    });
  };

  const processImage = async ({
    image,
    settings,
  }: {
    image: ImageType;
    settings: SettingsFormType;
  }) => {
    const convertedImage = await convertImageService({
      image: image.old,
      convertTo: settings.convertTo,
      enableConvertTo: settings.enableConvertTo,
      url: image.old.url,
    });

    const compressedImage = await imageCompressionService({
      imageFile: convertedImage,
      settings,
    });

    const { width, height, url } = await getImageDimensions({
      image: compressedImage as ImageFile,
      url: URL.createObjectURL(compressedImage),
    });

    URL.revokeObjectURL(image.pd.url);

    await dispatch({
      type: "PROCESS_IMAGE",
      payload: {
        file: compressedImage as ImageFile,
        id: image.id,
        step: image.step,
        height,
        width,
        url: url,
      },
    });
  };

  const clearImages = () => {
    dispatch({
      type: "CLEAR_IMAGES",
      payload: {},
    });
  };

  const removeImage = ({ id }: { id: string }) => {
    dispatch({
      type: "REMOVE_IMAGE",
      payload: { id },
    });
  };

  return {
    state,
    uploadImage,
    processImage,
    clearImages,
    removeImage,
    editImage,
  };
}

export function ImagesProvider({ children }: { children: React.ReactNode }) {
  const {
    state,
    uploadImage,
    processImage,
    clearImages,
    removeImage,
    editImage,
  } = useImagesReducer();

  return (
    <ImagesContext.Provider
      value={{
        images: state.images,
        uploadImage,
        processImage,
        clearImages,
        removeImage,
        editImage,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
}
