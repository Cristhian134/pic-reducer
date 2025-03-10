import { useImages } from "@/hooks/useImages";

import { CompressedImage } from "./compressedImage";
import { CompressionInfo } from "./compressionInfo";
import { Progress } from "./progress";

export function CompressedImages() {
  const { images } = useImages();

  return (
    <>
      <aside className="rounded-lg gap-2 bg-white flex flex-col border-gray-100 border-[1px] filelist">
        <Progress />
        <ul className="flex flex-col gap-3 h-96 overflow-y-auto processedFileList p-2 pb-0 box-border">
          {images.map((image) => {
            return <CompressedImage image={{ ...image }} key={image.id} />;
          })}
        </ul>
        <CompressionInfo />
      </aside>
    </>
  );
}
