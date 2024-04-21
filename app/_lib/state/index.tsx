'use client'

import { ReactNode } from "react";
import { NavProvider } from "./nav-state";
import { SettingsProvider } from "./settings-state";

export default function RootState({ children }: { children: ReactNode }) {
  return (
      <SettingsProvider>
        <NavProvider>{children}</NavProvider>
      </SettingsProvider>
  );
}
