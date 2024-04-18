'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import Breadcrumb from './breadcrumb'
import { IconMenu, IconMenu2 } from '@tabler/icons-react'
import CustomScrollbar from 'custom-react-scrollbar';
// import style then
import 'custom-react-scrollbar/dist/style.css';


function Header() {
  const scrollEl = useRef<HTMLDivElement>(null!);
  const scrollToRight = useCallback(() => scrollEl.current.scrollTo({ left: scrollEl.current.scrollWidth, behavior: 'smooth' }), []);

  useEffect(() => {
    if (scrollEl) {
      scrollToRight()
    }
  }, [scrollEl])

  return (
    <nav className='fixed top-0 right-[250px] left-[250px] px-2 py-2' style={{width: 'calc(100% - 250px)'}}>
      <div className='flex w-full h-12 px-4 rounded-xl dark:bg-gray-800'>
        <button className='self-center font-bold uppercase me-auto dark:text-gray-100'><IconMenu2/></button>
        <CustomScrollbar ref={scrollEl} fixedThumb direction='horizontal' style={{height: '2.5rem', display:'flex'}} wrapperClassName='mx-auto hidden md:flex items-center self-center w-full max-w-xs lg:max-w-sm dark:bg-gray-700 rounded-xl overflow-x-hidden' contentClassName='px-1 md:flex items-center' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Breadcrumb withAppName homeName='dashboard'/>
        </CustomScrollbar>
        <div className='flex items-center self-stretch justify-center my-1 -mr-3 text-white rounded-lg ms-auto bg-pink-950 aspect-square'>YZ</div>
      </div>
    </nav>
  )
}

export default Header