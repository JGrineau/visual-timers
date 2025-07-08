// components/ClientLayout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/components/side-bar/Page";
import MobileMenu from "@/components/mobile-menu/Page";
import { Menu } from "lucide-react";
import DarkMode from "@/components/dark-mode/Page";

import "@/app/globals.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 left-4 z-10 lg:hidden p-2"
        aria-label="Open menu"
      >
        <Menu size={28} className="text-[var(--text-color)]" />
      </button>

      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />

      {/* Sidebar */}
      <div className="hidden lg:block">
        <div
          className={`fixed top-0 left-0 h-screen transition-all duration-300 z-20 border-primary border-solid ${
            isCollapsed ? "w-16" : "w-64"
          }`}
        >
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
      </div>

      {/* Main Layout */}
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{
          transform: menuOpen ? "translateX(16rem)" : "translateX(0)",
        }}
      >
        <main
          className={`flex-1 bg-background transition-all duration-300 min-h-screen ${
            isCollapsed ? "lg:ml-16" : "lg:ml-64"
          }`}
        >
          <div className="sticky top-0 z-30 flex items-center justify-end p-4 ">
            <DarkMode />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
