'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface SettingsContextType {
  isDarkMode: boolean | undefined;
  toggleDarkMode: (forcedState?: boolean) => void;
}

const SettingContext = createContext<SettingsContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useSettings = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSettings can only be used inside NavProvider!");
  }
  return context;
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>();

  const toggleDarkMode = (forcedState?: boolean) => {
    if (!forcedState) {
      setIsDarkMode((prevVal) => !prevVal)
      return;
    }
    setIsDarkMode(() => forcedState);
  };

  useEffect(() => {
    if (isDarkMode != undefined && !!localStorage) {
      if (localStorage.getItem('dark-mode') != String(isDarkMode)) {
        localStorage.setItem('dark-mode', String(isDarkMode))
      }
    }
  }, [isDarkMode])

  useEffect(() => {
    const isDarkMode = Boolean(localStorage.getItem('dark-mode'))
    setIsDarkMode(isDarkMode)
    localStorage.setItem('dark-mode', String(isDarkMode))
  }, [])

  return (
    <SettingContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </SettingContext.Provider>
  );
};
