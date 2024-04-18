'use client'

import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import { IconCalendar, IconHome, IconSettings } from '@tabler/icons-react';
import className from "./sidenav.module.scss";

const navLinks = [
  { name: "Home", href: "/", icon: <IconHome className='w-5'/> },
  { name: "Reservations", href: "/reservations", icon: <IconCalendar className='w-5'/> },
  { name: "Administrator", href: "/administrator", icon: <IconSettings className='w-5'/> },
];

function SideNav() {
  const pathname = usePathname()
  const checkActive = (href: string) => {
    const dashboardHref = href == '/' ? '/dashboard' : `/dashboard${href}`
    console.log({dashboardHref, pathname})
    return pathname === dashboardHref
  }
  return (
    <nav className={className.nav}>
      <ul className={className.menu}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={'/dashboard' + link.href}
              className={clsx(
                className.item,
                checkActive(link.href) && className.active
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