import { RightArrowIcon } from "@/components/icons";
import { IMAGE_STATES_CONST } from "@/constants";
import { compareSizes } from "@/utils";
import clsx from "clsx";
import { Preview } from "./preview";
import { Options } from "./options";
import { ImageType } from "@/types";

export function CompressedImage({ image }: { image: ImageType }) {
  const { newSize, oldSize, larger } = compareSizes(
    image.old.size,
    image.pd.size
  );

  return (
    <li className="w-full flex justify-between relative border-b-[1px] last:border-b-[0px] last:pb-0 pb-3">
      <div className="flex gap-3 ">
        <Preview newImage={image.pd} oldImage={image.old} step={image.step} />
        <div className="flex flex-col gap-2">
          <span
            title={image.pd.name}
            className="text-ellipsis overflow-hidden xl:w-[15rem] lg:w-[10rem] w-[15rem]"
          >
            {image.pd.name}
          </span>
          <div className="flex gap-2 text-gray-400 w-full">
            <span>{oldSize}</span>
            <RightArrowIcon />
            <span
              className={clsx(
                "font-semibold",
                {
                  "rounded-md animate-pulse bg-gray-200 w-20 h-6":
                    image.step === IMAGE_STATES_CONST.IMAGE_UPLOADED ||
                    image.step === IMAGE_STATES_CONST.IMAGE_REPROCESSING,
                },
                {
                  "text-green-500":
                    (image.step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
                      image.step === IMAGE_STATES_CONST.IMAGE_REPROCESSED) &&
                    larger === -1,
                },
                {
                  "text-gray-500":
                    (image.step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
                      image.step === IMAGE_STATES_CONST.IMAGE_REPROCESSED) &&
                    larger === 0,
                },
                {
                  "text-red-500":
                    (image.step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
                      image.step === IMAGE_STATES_CONST.IMAGE_REPROCESSED) &&
                    larger === 1,
                }
              )}
            >
              {image.step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
              image.step === IMAGE_STATES_CONST.IMAGE_REPROCESSED ? (
                <>{newSize}</>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </div>
      <Options image={image} />
    </li>
  );
}
