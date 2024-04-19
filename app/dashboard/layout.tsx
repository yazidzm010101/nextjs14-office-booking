'use client'

import Breadcrumb from "@/ui/breadcrumb";
import SideNav from "../ui/sidenav";
import Header from "@/ui/header";
import { useNav } from "@/state/nav-provider";
import clsx from "clsx";
import BottomNav from "@/ui/bottomnav";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSideNavActive } = useNav()
  return (
    <main className="min-h-[100vh] w-full bg-slate-100 dark:bg-gray-900">
      <SideNav/>
      <Header/>
      <BottomNav/>
      <div className={clsx("pt-20", isSideNavActive && "sm:pl-[250px]" )}>
        <div className="flex p-1 mx-3 rounded-lg md:hidden">
          <Breadcrumb/>
        </div>
        <div className="px-4 py-2">
          {children}
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
