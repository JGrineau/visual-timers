"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../app/globals.css";
import {
  Menu,
  Timer,
  LineChart,
  Circle,
  Clock,
  CircleChevronLeft,
  HomeIcon,
  Footprints,
} from "lucide-react";
import React from "react";

// import MobileMenu from "../mobile-menu/Page";

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
};

export default function Page({ isCollapsed, setIsCollapsed }: Props) {
  const pathname = usePathname();
  const navItemAlignment = isCollapsed ? "justify-center" : "justify-start";

  return (
    <div className="flex min-h-screen fixed shadow-xl/20 ">
      <aside
        className={`hidden lg:flex h-screen bg-background-light text-text border-border flex-col p-2 transition-all duration-300 
        ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* Collapse Button */}
        <button
          className={`mb-6 text-text hover:scale-110 flex ${navItemAlignment} space-x-2 cursor-pointer p-2`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Menu size={28} />
          ) : (
            <>
              <CircleChevronLeft size={28} />
              <span className="text-sm font-semibold cursor-pointer ">
                Visual Types
              </span>
            </>
          )}
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            data-active={pathname === "/"}
            className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-primary hover:text-white p-2 rounded transition  data-[active=true]:bg-primary data-[active=true]:text-white`}
          >
            <span title="Home">
              <HomeIcon size={20} />
            </span>
            {!isCollapsed && <span>Home</span>}
          </Link>

          <div className="relative">
            <Link
              href="/pomodoro"
              data-active={pathname === "/pomodoro"}
              className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-primary hover:text-white p-2 rounded transition data-[active=true]:bg-primary data-[active=true]:text-white`}
            >
              <span title="Pomodoro">
                <Timer size={20} />
              </span>
              {!isCollapsed && <span>Pomodoro</span>}
            </Link>
          </div>

          <Link
            href="/linear"
            data-active={pathname === "/linear"}
            className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-primary hover:text-white p-2 rounded transition data-[active=true]:bg-primary data-[active=true]:text-white`}
          >
            <span title="Linear">
              <LineChart size={20} />
            </span>
            {!isCollapsed && <span>Linear</span>}
          </Link>
          <Link
            href="/radial"
            data-active={pathname === "/radial"}
            className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-primary hover:text-white p-2 rounded transition data-[active=true]:bg-primary data-[active=true]:text-white`}
          >
            <span title="Radial">
              <Circle size={20} />
            </span>
            {!isCollapsed && <span>Radial</span>}
          </Link>
          <Link
            href="/norwegian"
            data-active={pathname === "/norwegian"}
            className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-primary hover:text-white p-2 rounded transition data-[active=true]:bg-primary data-[active=true]:text-white`}
          >
            <span title="Norwegian 4X4">
              <Footprints size={20} />
            </span>
            {!isCollapsed && <span>Norwegian 4X4</span>}
          </Link>
          <Link
            href="/custom"
            data-active={pathname === "/custom"}
            className={`flex flex-col ${navItemAlignment} hover:hover:bg-primary hover:text-white p-2 rounded transition data-[active=true]:bg-primary data-[active=true]:text-white`}
          >
            <div className={`flex items-center ${navItemAlignment} space-x-2`}>
              <span title="Custom">
                <Clock size={20} />
              </span>
              {!isCollapsed && <span>Custom</span>}
            </div>
            {!isCollapsed && (
              <span className="ml-6 mt-1 bg-yellow-400 text-black text-xs font-semibold px-2 py-0.5 rounded">
                Coming Soon
              </span>
            )}
          </Link>
        </nav>
      </aside>
    </div>
  );
}
