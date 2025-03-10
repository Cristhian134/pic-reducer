import { ImageFile, ImageType } from "@/types";

export const compareSizes = (
  oldSize: number | number[],
  newSize: number | number[] = 0 || [],
  decimals = 2
) => {
  const old = Array.isArray(oldSize) ? sumArray(oldSize) : oldSize;
  const pd = Array.isArray(newSize) ? sumArray(newSize) : newSize;

  if (
    (old === 0 && pd === 0) ||
    (Array.isArray(oldSize) &&
      oldSize.length === 0 &&
      Array.isArray(newSize) &&
      newSize.length === 0)
  ) {
    return {
      oldSize: "0 Bytes",
      newSize: "0 Bytes",
      larger: 0,
      percentage: "0%",
    };
  }

  const k = 1024;
  const sizes = [
    " Bytes",
    " KB",
    " MB",
    " GB",
    " TB",
    " PB",
    " EB",
    " ZB",
    " YB",
  ];
  const i = Math.floor(Math.log(Math.abs(old)) / Math.log(k));

  if (!pd || (Array.isArray(newSize) && newSize.length === 0))
    return {
      oldSize: parseFloat((old / Math.pow(k, i)).toFixed(decimals)) + sizes[i],
      newSize: "0 Bytes",
      larger: 0,
      percentage: "0%",
    };

  const j = Math.floor(Math.log(Math.abs(pd)) / Math.log(k));
  const percentage = Math.round(((pd - old) / old) * 100);

  return {
    oldSize: parseFloat((old / Math.pow(k, i)).toFixed(decimals)) + sizes[i],
    newSize: parseFloat((pd / Math.pow(k, j)).toFixed(decimals)) + sizes[j],
    larger: pd > old ? 1 : pd < old ? -1 : 0,
    percentage: `${percentage}%`,
  };
};

export const getSizesList = (images: ImageType[]) => {
  const differenceSizes: number[] = [];
  const oldSizes: number[] = [];
  const newSizes: number[] = [];
  images.map(({ pd, old }) => {
    const oldAdd = old.size != undefined ? old.size : 0;
    const newAdd = pd.size != undefined ? pd.size : 0;
    differenceSizes.push(oldAdd - newAdd);
    oldSizes.push(oldAdd);
    newSizes.push(newAdd);
  });
  return {
    differenceSizes,
    oldSizes,
    newSizes,
  };
};

// @ts-ignore
export const formatterList = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

export const sumArray = (arr: number[]) =>
  arr.reduce((acc, num) => acc + num, 0);

export async function getImageDimensions({
  image,
  url,
}: {
  image: ImageFile;
  url?: string;
}): Promise<{ width: number; height: number; url: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url ? url : URL.createObjectURL(image);
    img.onload = () => {
      resolve({ width: img.width, height: img.height, url: img.src });
    };
    img.onerror = reject;
  });
}

export const formatFilesSize = (bytesList: number[], decimals = 2) => {
  const bytes = bytesList.reduce((acc, num) => acc + num, 0);
  if (bytes === 0) return { size: 0, type: " Bytes" };

  const k = 1024;
  const sizes = [
    " Bytes",
    " KB",
    " MB",
    " GB",
    " TB",
    " PB",
    " EB",
    " ZB",
    " YB",
  ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    size: parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)),
    type: sizes[i],
  };
};
