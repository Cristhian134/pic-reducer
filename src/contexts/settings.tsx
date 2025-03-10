import { settingsInitialState } from "@/constants";
import { SettingsContextType, SettingsFormType } from "@/types";
import { createContext, useState } from "react";

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] =
    useState<SettingsFormType>(settingsInitialState);
  const [open, setOpen] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        open,
        setOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
