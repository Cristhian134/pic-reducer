import { CheckIcon, LoadingSpinnerAnimation } from "@/components/icons";
import { useImages } from "@/hooks/useImages";
import { IMAGE_STATES_CONST } from "@/constants";
import { compareSizes, getSizesList } from "@/utils";
import clsx from "clsx";

type CurrentStatus = "EMPTY" | "COMPRESSING" | "COMPRESSED";

export function Progress() {
  const { images } = useImages();
  const { newSizes, oldSizes, differenceSizes } = getSizesList(images);
  const { percentage } = compareSizes(newSizes, oldSizes);
  const { oldSize: differenceSize } = compareSizes(differenceSizes);

  const completedImagesProgress = images.filter(
    (image) =>
      image.step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
      image.step === IMAGE_STATES_CONST.IMAGE_REPROCESSED
  ).length;
  const totalImagesProgress = images.length;
  const progress = (completedImagesProgress / totalImagesProgress) * 100;

  const currentStatus = (): CurrentStatus => {
    if (completedImagesProgress === 0 && totalImagesProgress === 0)
      return "EMPTY";

    if (completedImagesProgress !== totalImagesProgress) {
      return "COMPRESSING";
    } else {
      return "COMPRESSED";
    }
  };

  const statusDisplay = {
    EMPTY: (
      <span className="text-black">Unlimited images, No File Size Limits.</span>
    ),
    COMPRESSING: (
      <>
        <span className="flex items-center gap-1">
          <LoadingSpinnerAnimation height={"1rem"} width={"1rem"} />
          Compressing {completedImagesProgress}/{totalImagesProgress} images...
        </span>
      </>
    ),
    COMPRESSED: (
      <span className="flex items-center gap-1">
        <CheckIcon height={"1rem"} width={"1rem"} />
        Compressesd {completedImagesProgress}/{totalImagesProgress} Images.
        Reduced {differenceSize} ({percentage})
      </span>
    ),
  };

  return (
    <div
      className={clsx(
        "p-0 rounded-tl-md rounded-tr-md bg-gray-200  w-full h-fit",
        {
          "bg-green-200": currentStatus() === "COMPRESSED",
        },
        {
          "bg-green-100": currentStatus() === "COMPRESSING",
        }
      )}
    >
      <div className="text-sm font-medium text-green-900 p-2 h-8 flex items-center">
        {statusDisplay[currentStatus()]}
      </div>
      <div className="w-full bg-gray-200 h-1">
        <div
          className={clsx("h-1 transition-all", {
            "bg-gray-400": currentStatus() === "EMPTY",
            "bg-green-400": currentStatus() !== "EMPTY",
          })}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
