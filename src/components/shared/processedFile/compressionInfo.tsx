import { RightArrowIcon } from "@/components/icons";
import { useImages } from "@/hooks/useImages";
import { compareSizes, getSizesList } from "@/utils";
import clsx from "clsx";

export function CompressionInfo() {
  const { images } = useImages();
  const { newSizes, oldSizes, differenceSizes } = getSizesList(images);

  const { newSize, oldSize, larger, percentage } = compareSizes(
    oldSizes,
    newSizes
  );
  const { oldSize: differenceSize } = compareSizes(differenceSizes);

  return (
    <div className="p-2 border-t-[1px] border-t-gray-100 h-8 flex justify-between items-center">
      <div className="flex gap-2">
        <span>{oldSize}</span>
        <RightArrowIcon />
        <span className="font-semibold">{newSize}</span>
      </div>
      <span className="font-semibold">
        Total Reduced {`${differenceSize} `}
        <span
          className={clsx(
            "font-bold",
            {
              "text-green-500": larger === -1,
            },
            {
              "text-gray-500": larger === 0,
            },
            {
              "text-red-500": larger === 1,
            }
          )}
        >
          ({percentage})
        </span>
      </span>
    </div>
  );
}
