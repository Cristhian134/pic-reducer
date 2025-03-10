import { CheckIcon, LoadingSpinnerAnimation } from "@/components/icons";
import { IMAGE_STATES_CONST } from "@/constants";
import { Compare } from "./compare";
import { ImageFile } from "@/types";

export function Preview({
  step,
  oldImage,
  newImage,
}: {
  step: string;
  oldImage: ImageFile;
  newImage: ImageFile;
}) {
  const stepRenderCondition = {
    [IMAGE_STATES_CONST.IMAGE_UPLOADED]: (
      <span className="absolute text-xs">
        <LoadingSpinnerAnimation width={"2rem"} height={"2rem"} />
      </span>
    ),
    [IMAGE_STATES_CONST.IMAGE_REPROCESSING]: (
      <span className="absolute text-xs">
        <LoadingSpinnerAnimation width={"2rem"} height={"2rem"} />
      </span>
    ),
    [IMAGE_STATES_CONST.IMAGE_PROCESSED]: (
      <>
        <CheckIcon
          width={"16px"}
          height={"16px"}
          stroke="#fff"
          className="absolute -top-2 -left-1 bg-green-500 rounded-full p-0.5"
        />
        <span className="absolute w-fit h-fit p-0 m-0 flex items-center justify-center border-0">
          <Compare oldImage={oldImage} newImage={newImage} />
        </span>
      </>
    ),
    [IMAGE_STATES_CONST.IMAGE_REPROCESSED]: (
      <>
        <CheckIcon
          width={"16px"}
          height={"16px"}
          stroke="#fff"
          className="absolute -top-2 -left-1 bg-green-500 rounded-full p-0.5"
        />
        <span className="absolute w-fit h-fit p-0 m-0 flex items-center justify-center border-0">
          <Compare oldImage={oldImage} newImage={newImage} />
        </span>
      </>
    ),
  };

  return (
    <div className="flex justify-center items-center relative size-24">
      <img
        src={newImage.url ? newImage.url : oldImage.url}
        className="size-24 object-contain bg-gray-100"
      />
      {stepRenderCondition[step]}
    </div>
  );
}
