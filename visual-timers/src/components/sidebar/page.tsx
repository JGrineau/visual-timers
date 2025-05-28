'use client';
import Link from 'next/link';
import '../../app/globals.css';
import { Menu, Timer, LineChart, Circle, Clock, X, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import React from 'react';
import { useState } from 'react';


export default function Page() {
   const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-(--primary-color) text-white flex flex-col p-4 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
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
          href="/pomodoro"
          className="flex items-center space-x-2 hover:bg-(--accent-color) p-2 rounded transition"
        >
          <Timer size={20} />
          {!isCollapsed && <span>Pomodoro</span>}
        </Link>
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
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded transition"
        >
          <Clock size={20} />
          {!isCollapsed && <span>Custom</span>}
        </Link>
      </nav>
    </aside>
  );
}
