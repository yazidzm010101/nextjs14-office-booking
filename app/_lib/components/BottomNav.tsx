'use client'

import { IconCalendar, IconHome, IconSettings } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", exact: true, href: "/", icon: <IconHome className='w-5'/> },
  { name: "Reservations", href: "/reservations", icon: <IconCalendar className='w-5'/> },
  { name: "Settings", href: "/settings", icon: <IconSettings className='w-5'/> },
];

function BottomNav() {
  const pathname = usePathname()
  const checkActive = (href: string, exact?: boolean) => {
    const dashboardHref = href == '/' ? '/dashboard' : `/dashboard${href}`
    return exact ? pathname === dashboardHref : pathname.startsWith(dashboardHref)
  }
  return (
    <nav className={"sm:hidden z-10  fixed bottom-0 left-0 px-2 py-2 w-full" }>
      <ul className={" flex justify-evenly items-start w-full dark:bg-gray-800 rounded-lg shadow-xl border dark:border-black dark:border-opacity-15"}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={'/dashboard' + link.href}
              className={clsx(
                "relative flex p-2 pt-3 flex-col items-center dark:text-gray-500",
                checkActive(link.href, link.exact) && "dark:text-orange-600"
              )}
            >
              { checkActive(link.href, link.exact) && <span className='absolute top-0 w-5 h-1 -translate-x-1/2 bg-orange-600 rounded-b-sm left-1/2'/> }
              <span className='inline-block mb-1'>{link.icon}</span>
              <span className='inline-block text-xs'>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BottomNav