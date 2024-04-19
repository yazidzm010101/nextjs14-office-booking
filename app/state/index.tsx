import { ReactNode } from "react";
import { NavProvider } from "./nav-provider";

export default function RootState({ children }: { children: ReactNode }) {
  return <NavProvider>{children}</NavProvider>;
}
