'use client'

import clsx from "clsx";
import CustomScrollbar from "custom-react-scrollbar";

import BottomNav from "@/components/BottomNav";
import Breadcrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import { useNav } from "@/state/nav-state";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSideNavActive } = useNav()
  return (
    <main className="min-h-[100vh] w-full bg-slate-100 dark:bg-gray-900">
      <SideNav/>
      <Header/>
      <BottomNav/>
      <CustomScrollbar className="h-[100vh] w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
        <div className={clsx("pt-20", isSideNavActive && "sm:pl-[250px]" )}>
          <div className="flex p-1 mx-3 rounded-lg md:hidden">
            <Breadcrumb/>
          </div>
          <div className="px-4 py-2">
            {children}
          </div>
        </div>
      </CustomScrollbar>
    </main>
  );
}

export default DashboardLayout;
