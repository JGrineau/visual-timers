"use client";
import Link from "next/link";
import "../../app/globals.css";
import {
  Menu,
  Timer,
  LineChart,
  Circle,
  Clock,
  CircleChevronLeft,
  HomeIcon,
} from "lucide-react";
import React from "react";

// import MobileMenu from "../mobile-menu/Page";

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
};

export default function Page({ isCollapsed, setIsCollapsed }: Props) {
  const navItemAlignment = isCollapsed ? "justify-center" : "justify-start";

  return (
    <div className="flex min-h-screen fixed shadow-xl/20 ">
      <aside
        className={`hidden lg:flex h-screen bg-background text-text border-primary border-solid flex-col p-2 transition-all duration-300 
        ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* Collapse Button */}
        <button
          className={`mb-6 text-text hover:text-accent flex ${navItemAlignment} space-x-2 cursor-pointer`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Menu size={28} />
          ) : (
            <>
              <CircleChevronLeft size={28} />
              <span className="text-sm font-semibold cursor-pointer">
                Visual Types
              </span>
            </>
          )}
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-accent p-2 rounded transition`}
          >
            <HomeIcon size={20} />
            {!isCollapsed && <span>Home</span>}
          </Link>

          <div className="relative">
            <Link
              href="/pomodoro"
              className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-accent p-2 rounded transition`}
            >
              <Timer size={20} />
              {!isCollapsed && <span>Pomodoro</span>}
            </Link>
            {!isCollapsed && (
              <span className="absolute -top-2 left-20 bg-yellow-400 text-text text-xs font-semibold px-2 py-0.5 rounded">
                Coming Soon
              </span>
            )}
          </div>

          <Link
            href="/linear"
            className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-accent p-2 rounded transition`}
          >
            <LineChart size={20} />
            {!isCollapsed && <span>Linear</span>}
          </Link>
          <Link
            href="/radial"
            className={`flex items-center ${navItemAlignment} space-x-2 hover:bg-accent p-2 rounded transition`}
          >
            <Circle size={20} />
            {!isCollapsed && <span>Radial</span>}
          </Link>
          <Link
            href="/custom"
            className={`flex flex-col ${navItemAlignment} hover:bg-gray-700 p-2 rounded transition`}
          >
            <div className={`flex items-center ${navItemAlignment} space-x-2`}>
              <Clock size={20} />
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
