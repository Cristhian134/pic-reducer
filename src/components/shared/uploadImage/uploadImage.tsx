import { useImages } from "@/hooks/useImages";
import clsx from "clsx";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadImageIcon } from "../../icons";
import { IMAGE_STATES_CONST, IMAGES_FORMAT } from "@/constants";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "../../ui/button";
import { DownloadButton } from "./downloadButton";
import { formatterList } from "@/utils";

export function UploadImage() {
  const { images, uploadImage, processImage, clearImages } = useImages();
  const { settings } = useSettings();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      uploadImage(file);
    });
  }, []);

  useEffect(() => {
    if (images.length < 1) return;
    images.forEach((image) => {
      if (image.step === IMAGE_STATES_CONST.IMAGE_UPLOADED) {
        processImage({ image, settings });
      }
    });
  }, [images.length]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "image/png": [],
      "image/webp": [],
      "image/jpeg": [],
    },
    onDrop,
  });

  return (
    <div className="flex flex-col gap-2 drop items-center">
      <div className="flex gap-2">
        <Button className="w-fit" onClick={() => open()}>
          Add Files
        </Button>
        <Button className="w-fit" onClick={() => clearImages()}>
          Clear All
        </Button>
        <DownloadButton />
      </div>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={clsx(
          "pb-3 box-border flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",
          "hover:bg-gray-100",
          {
            "bg-gray-100": isDragActive,
            "bg-gray-50": !isDragActive,
          }
        )}
      >
        <input {...getInputProps()} />
        <UploadImageIcon
          className="text-gray-300"
          width={"200"}
          height={"200"}
          strokeWidth={"1.4"}
        />
        <p className="mb-2 text-lg text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
          {formatterList.format(IMAGES_FORMAT.slice(1))}
        </p>
      </div>
    </div>
  );
}
