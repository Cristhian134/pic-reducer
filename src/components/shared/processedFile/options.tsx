import { DeleteIcon, DownloadIcon } from "@/components/icons";
import { IMAGE_STATES_CONST } from "@/constants";
import { useImages } from "@/hooks/useImages";
import { useSettings } from "@/hooks/useSettings";
import { ImageFile, ImageType } from "@/types";
import { compareSizes } from "@/utils";
import clsx from "clsx";

export function Options({ image }: { image: ImageType }) {
  const { removeImage } = useImages();
  const { settings } = useSettings();
  const { step, id, pd } = image;
  const { larger, percentage } = compareSizes(image.old.size, image.pd.size);

  const handleDownload = (image: ImageFile, step: string) => {
    if (
      step === IMAGE_STATES_CONST.IMAGE_UPLOADED ||
      step === IMAGE_STATES_CONST.IMAGE_REPROCESSING
    )
      return;
    if (!image) return;

    const url = URL.createObjectURL(image);
    const a = document.createElement("a");
    a.href = url;

    const lastDotIndex = image.name.lastIndexOf(".");
    const nameWithoutExt = image.name.substring(0, lastDotIndex);
    const extension = image.name.substring(lastDotIndex);

    a.download = `${nameWithoutExt}${settings.sufix.trim()}${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="right-0 flex gap-2 justify-center pr-4">
      <span
        className={clsx(
          "text-xl mr-4 font-bold size-12 flex justify-center",
          {
            "text-green-500":
              (step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
                step === IMAGE_STATES_CONST.IMAGE_REPROCESSED) &&
              larger === -1,
          },
          {
            "text-gray-500":
              (step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
                step === IMAGE_STATES_CONST.IMAGE_REPROCESSED) &&
              larger === 0,
          },
          {
            "text-red-500":
              (step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
                step === IMAGE_STATES_CONST.IMAGE_REPROCESSED) &&
              larger === 1,
          }
        )}
      >
        {step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
        step === IMAGE_STATES_CONST.IMAGE_REPROCESSED ? (
          percentage
        ) : (
          <span className="rounded-md animate-pulse bg-gray-200 size-12"></span>
        )}
      </span>
      <button
        disabled={
          step === IMAGE_STATES_CONST.IMAGE_UPLOADED ||
          step === IMAGE_STATES_CONST.IMAGE_REPROCESSING
        }
        onClick={() => {
          handleDownload(pd, step);
        }}
        className={clsx(
          "w-10 aspect-square flex h-fit items-center justify-center rounded-full bg-zinc-800 p-0 m-0 text-white",
          {
            "opacity-50 disabled:cursor-not-allowed":
              step === IMAGE_STATES_CONST.IMAGE_UPLOADED ||
              step === IMAGE_STATES_CONST.IMAGE_REPROCESSING,
          }
        )}
      >
        <DownloadIcon />
      </button>
      <button
        onClick={() => {
          removeImage({ id });
        }}
        className="w-10 aspect-square h-fit flex items-center justify-center rounded-full bg-zinc-800 p-0 m-0 text-white"
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
