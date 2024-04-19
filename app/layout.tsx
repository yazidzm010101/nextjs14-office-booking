import type { Metadata } from "next";
import { Cabin, Inter, Lato, Libre_Franklin, Montserrat, Quicksand } from "next/font/google";
import "./globals.scss";
import clsx from "clsx";
import RootState from "./state";

const header = Cabin({ subsets: ["latin"], variable: '--font-header' });
const body = Libre_Franklin({ subsets: ["latin"], weight: '400', variable: '--font-body' });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(body.variable, header.variable)}>
        <RootState>
          {children}
        </RootState>
      </body>
    </html>
  );
}
