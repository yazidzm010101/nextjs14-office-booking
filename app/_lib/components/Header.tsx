"use client";

import { useNav } from "@/state/nav-state";
import { IconMenu2 } from "@tabler/icons-react";
import clsx from "clsx";
import CustomScrollbar from "custom-react-scrollbar";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Breadcrumb from "@/components/BreadCrumb";

function Header() {
  const { isSideNavActive, toggleSideNav } = useNav();
  const [floating, setFloating] = useState(false);
  const scrollEl = useRef<HTMLDivElement>(null!);
  const scrollToRight = useCallback(
    () =>
      scrollEl.current.scrollTo({
        left: scrollEl.current.scrollWidth,
        behavior: "smooth",
      }),
    []
  );

  const handleScroll = () => {
    const main = document.querySelector("main .scrollbar__scroller");
    if (main) {
      console.log(main);
    }
    const positionY = main?.scrollTop || 0;
    setFloating(positionY > 0);
  };

  useEffect(() => {
    const main = document.querySelector("main .scrollbar__scroller");
    if (main) {
      console.log(main);
      main.addEventListener("scroll", handleScroll, { passive: true });
      return () => main.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (scrollEl) {
      scrollToRight();
    }
  }, [scrollEl]);

  return (
    <nav
      className={clsx(
        "fixed z-10 top-0 right-[250px] px-2 py-2 transition-all duration-300 w-full left-0",
        isSideNavActive
          ? "sm:left-[250px] sm:w-[calc(100%-250px)]"
          : "sm:w-full"
      )}
    >
      <div
        className={clsx(
          "flex w-full h-12 px-4 rounded-xl dark:bg-gray-800 border  transition-all duration-300",
          (floating &&
            "dark:bg-opacity-50 backdrop-blur-lg rounded-lg shadow-xl  dark:border-black dark:border-opacity-15") ||
            "dark:border-transparent"
        )}
      >
        <button
          onClick={() => toggleSideNav()}
          className="self-center hidden font-bold uppercase sm:block me-auto dark:text-gray-100"
        >
          <IconMenu2 />
        </button>
        <h4 className="self-center sm:hidden me-auto dark:text-gray-100">
          <Link href={"/"}>Office Booking</Link>
        </h4>
        <CustomScrollbar
          ref={scrollEl}
          fixedThumb
          direction="horizontal"
          style={{ height: "2.5rem", display: "flex" }}
          wrapperClassName="mx-auto hidden md:flex items-center self-center w-full max-w-xs lg:max-w-sm dark:bg-gray-700 rounded-xl overflow-x-hidden"
          contentClassName="px-1 md:flex items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Breadcrumb homeName="dashboard" />
        </CustomScrollbar>
        <div className="flex items-center self-stretch justify-center my-1 -mr-3 text-white rounded-lg ms-auto bg-pink-950 aspect-square">
          YZ
        </div>
      </div>
    </nav>
  );
}

export default Header;
