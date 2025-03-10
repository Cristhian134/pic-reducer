import { ImagesContext } from "@/contexts/images";
import { useContext } from "react";

export function useImages() {
  const imagesContext = useContext(ImagesContext)
  
  if (imagesContext === undefined ) {
    throw new Error('useImages must be used within a ImagesProvider')
  }
  
  return imagesContext 
}