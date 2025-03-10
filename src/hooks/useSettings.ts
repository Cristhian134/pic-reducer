import { SettingsContext } from "@/contexts/settings";
import { useContext } from "react";

export function useSettings() {
  const settingsContext = useContext(SettingsContext);

  if (settingsContext === undefined) {
    throw new Error("useImages must be used within a ImagesProvider");
  }

  return settingsContext;
}
