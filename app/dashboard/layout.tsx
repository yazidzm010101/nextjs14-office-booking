import Breadcrumb from "@/ui/breadcrumb";
import SideNav from "../ui/sidenav";
import Header from "@/ui/header";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[100vh] w-full bg-slate-100 dark:bg-gray-900">
      <SideNav/>
      <Header/>
      <div className="pl-[250px] pt-20">
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
