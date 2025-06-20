'use client';
import Link from 'next/link';
import '../../app/globals.css';
import { Menu, Timer, LineChart, Circle, Clock, CircleChevronLeft, HomeIcon, XCircle } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

import MobileMenu from '../mobile-menu/Page'; 


export default function Page() {
   const [isCollapsed, setIsCollapsed] = useState(false);
    const [open, setOpen] = useState(false);

  return (
    <div>
    <aside
      className={`hidden md:flex h-screen bg-(--primary-color) text-white flex-col p-4 transition-all duration-300 
        ${isCollapsed ? "w-16" : "w-64" }`} >
    {/* Collapse Button */}
      <button
        className="mb-6 text-white hover:text-(--accent-color) flex items-center space-x-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <Menu size={24} />
        ) : (
          <>
            <CircleChevronLeft size={24} />
            <span className="text-sm font-semibold">Visual Types</span>
          </>
        )}
      </button>
      
      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">

        <Link
          href="/"
          className="flex items-center space-x-2 hover:bg-(--accent-color) p-2 rounded transition"
        >
          <HomeIcon size={20} />
          {!isCollapsed && <span>Home</span>}
        </Link>
        
       <div className="relative">
        <Link
          href="/pomodoro"
          className="flex items-center space-x-2 hover:bg-(--accent-color) p-2 rounded transition"
        >
          <Timer size={20} />
          {!isCollapsed && <span>Pomodoro</span>}
        </Link>
          {!isCollapsed && (
            <span className="absolute -top-2 left-20 bg-yellow-400 text-black text-xs font-semibold px-2 py-0.5 rounded">
              Coming Soon
            </span>
          )}
        </div>

        <Link
          href="/linear"
          className="flex items-center space-x-2 hover:bg-(--accent-color) p-2 rounded transition"
        >
          <LineChart size={20} />
          {!isCollapsed && <span>Linear</span>}
        </Link>
        <Link
          href="/radial"
          className="flex items-center space-x-2 hover:bg-(--accent-color) p-2 rounded transition"
        >
          <Circle size={20} />
          {!isCollapsed && <span>Radial</span>}
        </Link>
        <Link
    href="/custom"
    className="flex flex-col items-start hover:bg-gray-700 p-2 rounded transition"
  >
    <div className="flex items-center space-x-2">
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

      {/* Mobile/Tablet Menu Button */}
      <button
          className="fixed top-4 left-4 z-99999 flex md:hidden bg-[var(--primary-color)] text-white p-2 rounded-full shadow-lg hover:bg-[var(--accent-color)] transition"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <XCircle size={24} /> : <Menu size={24} />}
        </button>
        <MobileMenu open={open} onClose={() => setOpen(false)} />

  </div> //end of return
  );
}