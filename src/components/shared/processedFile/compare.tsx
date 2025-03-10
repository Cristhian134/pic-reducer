import { DragArrowIcon, ImageZoomIcon } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageFile } from "@/types";
import { compareSizes } from "@/utils";
import { useEffect, useRef, useState } from "react";

type CompareImagesType = {
  oldImage: ImageFile;
  newImage: ImageFile;
};

const imageCompareSizesClass = (width: number, height: number) => {
  if (height < width) {
    return "w-[50dvw]";
  } else {
    return "h-[80dvh]";
  }
};

export function CompareImages({ oldImage, newImage }: CompareImagesType) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(50);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const translateXValue = (size.width + 3) * ((offset - 50) / 100);
  const { newSize, oldSize } = compareSizes(oldImage.size, newImage.size);

  useEffect(() => {
    const { width, height }: any =
      containerRef.current?.getBoundingClientRect();
    setSize({ width, height });
  }, [offset]);

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
      const clientX =
        "touches" in moveEvent
          ? moveEvent.touches[0].clientX
          : moveEvent.clientX;
      const { left, width } = container.getBoundingClientRect();
      let newOffset = ((clientX - left) / (width + 3)) * 100;

      newOffset = Math.max(0, Math.min(100, newOffset));
      setOffset(newOffset);
    };

    const stopHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", stopHandler);
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", stopHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", stopHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("touchend", stopHandler);
  };

  return (
    <>
      <div className="my-4 -mb-16 sm:my-0 @min-[--theme(--breakpoint-sm)]:-mx-8 flex justify-center items-center">
        <div
          className="absolute inset-x-1/2 inset-y-[-50vh] z-10 h-[100vh + 5rem] w-1 -translate-x-1/2 bg-sky-400 pointer-events-none"
          style={{
            transform: `translateX(${translateXValue - 2}px)`,
          }}
        ></div>
        <div>
          <div
            title="Drag to resize"
            className="-ml-5 absolute -mt-5 inset-1/2 z-10 flex size-10 shrink-0 -translate-1/2 cursor-ew-resize items-center justify-center rounded-full bg-sky-500"
            draggable="false"
            style={{
              transform: `translateX(${translateXValue}px)`,
              userSelect: "none",
              touchAction: "pan-y",
            }}
            onMouseDown={handleDrag}
            onTouchStart={handleDrag}
          >
            <DragArrowIcon />
            <div className="absolute inset-1 rounded-full bg-sky-500 not-in-data-dragging:animate-ping"></div>
          </div>
        </div>
        <div className="isolate flex h-full w-full items-center justify-center">
          <div
            ref={containerRef}
            className={`relative justify-center grid grid-cols-1 grid-rows-1 overflow-hidden rounded-t-4xl bg-gray-950/10 items-center ${imageCompareSizesClass(
              newImage.width,
              newImage.height
            )}`}
          >
            <div className="flex absolute justify-center items-center w-full h-full">
              {oldImage ? (
                <img
                  className="w-full h-full bg-zinc-100"
                  src={oldImage.url}
                  style={{ clipPath: `inset(0 ${100 - offset}% 0 0)` }}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="col-start-1 row-start-1 bg-zinc-100 w-full h-full">
              {newImage ? (
                <img className={`w-full h-full`} src={newImage.url} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-36 pointer-events-none text-xl text-white absolute bottom-[calc(0px+50%+0rem-50dvh)] w-dvw flex justify-between items-center px-4">
        <div className="flex justify-center flex-col gap-2 bg-zinc-800/75 p-3 rounded-xl font-semibold">
          <span className="">{oldImage.name}</span>
          <span className="">Before: {oldSize}</span>
          <span className="">
            Width: {oldImage.width} | Height: {oldImage.height}
          </span>
        </div>
        <div className="flex justify-center flex-col gap-2 bg-zinc-800/75 p-3 rounded-xl font-semibold">
          <span className="">{newImage.name}</span>
          <span className="">After: {newSize}</span>
          <span className="">
            Width: {newImage.width} | Height: {newImage.height}
          </span>
        </div>
      </div>
    </>
  );
}

export function Compare({ oldImage, newImage }: CompareImagesType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute left-0 w-fit h-fit p-0 m-0 flex items-center justify-center border-0">
          <ImageZoomIcon className="absolute p-1 rounded-md box-content bg-gray-50/30 hover:bg-gray-50/45 hover:scale-[1.03] transition-transform" />
        </button>
      </DialogTrigger>
      <DialogContent
        className={`p-0 max-${imageCompareSizesClass(
          newImage.width,
          newImage.height
        )} max-w-[max-content] [&>button:last-child>svg]:size-8 [&>button:last-child>svg]:stroke-[2px] [&>button:last-child]:flex [&>button:last-child]:bg-[rgb(0 0 0 / 0.8)] [&>button:last-child]:justify-center [&>button:last-child]:items-center [&>button:last-child]:text-white [&>button:last-child]:top-[calc(0px+50%+0.5rem-50dvh+1rem)] [&>button:last-child]:right-[calc(0px+50%+4rem-50dvw)] [&>button:last-child]:p-0 [&>button:last-child]:size-[2.5rem] bg-transparent border-0 w-dvw h-fit flex justify-center items-center`}
      >
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <CompareImages oldImage={oldImage} newImage={newImage} />
      </DialogContent>
    </Dialog>
  );
}
