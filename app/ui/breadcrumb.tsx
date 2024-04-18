"use client";
import { capitalize } from "@//lib/utils/formatUtils";
import { IconHome } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Breadcrumb({ homeName, withAppName }: {homeName?: string, withAppName?: boolean}) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((x) => !!x);
  return (
    <ul className="flex flex-nowrap">
      {
        withAppName && (
          <li className="flex items-center flex-nowrap">
            <Link
              href={"#"}
              className={clsx(
                "inline-block px-2 py-0.5 -me-2 text-nowrap whitespace-nowrap transition-all duration-200 rounded-lg text-gray-400",
              )}
            >
              <span className="text-xs">Office Booking</span>
            </Link>
            <span className="mx-1 mt-0.5 text-xl text-gray-400">/</span>
          </li>
        )
      }
      {paths.map((pathI, i) => {
        const path = "/" + paths.slice(0, i + 1).join("/");
        console.log({ path });
        return (
          <li key={i} className="flex items-center">
            <Link
              href={path}
              className={clsx(
                "inline-block px-2 text-nowrap whitespace-nowrap py-0.5 transition-all duration-200 rounded-lg",
                path != pathname && "bg-slate-200 hover:bg-black text-gray-700 hover:bg-opacity-20",
                path == pathname && "bg-blue-200 hover:bg-blue-950 text-gray-700 hover:bg-opacity-20",
              )}
            >
              {i == 0 && pathI.toLowerCase() == homeName && (
                <span className="inline-block mb-0.5 align-middle">
                  <IconHome className="w-4 me-0.5" />
                </span>
              )}
              <span className="text-xs">{capitalize(pathI)}</span>
            </Link>
            {
              ((i != (paths.length - 1)) || (!withAppName && path.length == 1)) && (
                <span className="mx-1 text-xl mt-0.5 text-gray-400">/</span>
              )
            }
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumb;
