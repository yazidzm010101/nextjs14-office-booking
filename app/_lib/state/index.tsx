"use client";

import { ReactNode } from "react";
import { NavProvider } from "./nav-state";
import { SettingsProvider } from "./settings-state";
import { ToastProvider } from "./toast-state";

export default function RootState({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <NavProvider>
        <ToastProvider>{children}</ToastProvider>
      </NavProvider>
    </SettingsProvider>
  );
}
