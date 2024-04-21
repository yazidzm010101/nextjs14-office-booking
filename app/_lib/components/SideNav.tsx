'use client'

import className from "@/components/sidenav.module.scss";
import { useNav } from '@/state/nav-state';
import { IconCalendar, IconHome, IconSettings } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", exact: true, href: "/", icon: <IconHome className='w-5'/> },
  { name: "Reservations", href: "/reservations", icon: <IconCalendar className='w-5'/> },
  { name: "Settings", href: "/settings", icon: <IconSettings className='w-5'/> },
];

function SideNav() {
  const { isSideNavActive } = useNav()
  const pathname = usePathname()
  const checkActive = (href: string, exact?: boolean) => {
    const dashboardHref = href == '/' ? '/dashboard' : `/dashboard${href}`
    return exact ? pathname === dashboardHref : pathname.startsWith(dashboardHref)
  }
  return (
    <nav className={clsx(className.nav, isSideNavActive && className.active)}>
      <ul className={className.menu}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={'/dashboard' + link.href}
              className={clsx(
                className.item,
                checkActive(link.href, link.exact) && className.active
              )}
            >
              <span className='inline-block mb-1 align-middle me-2'>{link.icon}</span>
              <span className='inline-block'>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideNav