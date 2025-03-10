import { Button } from "@/components/ui/button";
import { useImages } from "@/hooks/useImages";
import { IMAGE_STATES_CONST } from "@/constants";
import JSZip from "jszip";
import { useSettings } from "@/hooks/useSettings";

export function DownloadButton() {
  const { images } = useImages();
  const { settings } = useSettings();

  const uploadedImagesTotal = images.filter(
    (image) =>
      image.step === IMAGE_STATES_CONST.IMAGE_UPLOADED ||
      image.step === IMAGE_STATES_CONST.IMAGE_REPROCESSING
  ).length;

  const downloadFiles = async () => {
    if (uploadedImagesTotal !== 0) {
      return;
    }

    const zip = new JSZip();

    images.forEach((image) => {
      const lastDotIndex = image.pd.name.lastIndexOf(".");
      const nameWithoutExt = image.pd.name.substring(0, lastDotIndex);
      const extension = image.pd.name.substring(lastDotIndex);
      zip.file(
        `${nameWithoutExt}${settings.sufix.trim()}${extension}`,
        image.pd
      );
    });

    const zipData = await zip.generateAsync({
      type: "blob",
    });

    const url = URL.createObjectURL(zipData);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed_images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      disabled={uploadedImagesTotal === 0 && images.length < 1}
      className="w-fit cursor-pointer"
      onClick={() => downloadFiles()}
    >
      Download zip
    </Button>
  );
}
