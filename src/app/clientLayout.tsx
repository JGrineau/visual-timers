// components/ClientLayout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/components/side-bar/Page";
import MobileMenu from "@/components/mobile-menu/Page";
import { Menu } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 left-4 z-10 lg:hidden p-2"
        aria-label="Open menu"
      >
        <Menu size={28} className="text-[var(--primary-color)]" />
      </button>

      {/* Mobile Menu with animation */}
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />

      {/* Main Layout */}
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{
          transform: menuOpen ? "translateX(16rem)" : "translateX(0)", // 16rem = 256px (w-64)
        }}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <main
          className={`flex-1 bg-white transition-all duration-300 min-h-screen ${
            isCollapsed ? "lg:ml-16" : "lg:ml-64"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
