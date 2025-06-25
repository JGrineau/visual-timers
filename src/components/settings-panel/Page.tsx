"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Settings Icon Button */}
      <button
        onClick={togglePanel}
        className="p-2 text-[var(--accent-color)] hover:scale-110 transition-transform duration-200"
        title="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Popup Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 z-50 w-64 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Settings</h2>

          {/* Size Selection Placeholder */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <select className="w-full p-2 border rounded">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          {/* Duration Selection Placeholder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <select className="w-full p-2 border rounded">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
