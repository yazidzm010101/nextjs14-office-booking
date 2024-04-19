'use client'

import { ReactNode, createContext, useContext, useState } from "react";

interface NavContextType {
  isSideNavActive: boolean;
  toggleSideNav: (forcedState?: boolean) => void;
}

const NavContext = createContext<NavContextType>({
  isSideNavActive: false,
  toggleSideNav: () => {},
});

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav can only be used inside NavProvider!");
  }
  return context;
};

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [isSideNavActive, setIsSideNavActive] = useState(true);
  const toggleSideNav = (forcedState?: boolean) => {
    if (!forcedState) {
      setIsSideNavActive((prevVal) => !prevVal);
      return;
    }
    setIsSideNavActive(() => forcedState);
  };

  return (
    <NavContext.Provider value={{ isSideNavActive, toggleSideNav }}>
      {children}
    </NavContext.Provider>
  );
};
