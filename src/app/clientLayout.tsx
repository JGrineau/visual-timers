// components/ClientLayout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/components/side-bar/Page";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`flex-1 bg-white transition-all duration-300 p-4 min-h-screen ${
          isCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
