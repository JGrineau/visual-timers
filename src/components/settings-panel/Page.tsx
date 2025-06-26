"use client";

import React, { useState } from "react";
import { Settings, X } from "lucide-react";

const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);
  const closePanel = () => setIsOpen(false);

  return (
    <>
      {/* Settings Icon Button */}
      <button
        onClick={togglePanel}
        className="p-2 text-[var(--accent-color)] hover:scale-110 hover:cursor-pointer transition-transform duration-200"
        title="Settings"
        aria-label="Open Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm  flex items-center justify-center z-50"
          onClick={closePanel}
          aria-modal="true"
          role="dialog"
          aria-labelledby="settings-title"
          aria-describedby="settings-desc"
        >
          {/* Modal Content */}
          <div
            className="bg-white border-1 rounded-lg p-6 max-w-md w-[90vw] relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={closePanel}
              className="absolute top-3 right-3 p-1 rounded hover:bg-gray-200 transition"
              aria-label="Close Settings"
            >
              <X className="w-5 h-5" />
            </button>

            <h2
              id="settings-title"
              className="text-lg font-semibold mb-4 text-gray-800"
            >
              Settings
            </h2>

            {/* Size Selection */}
            <div className="mb-4">
              <label
                htmlFor="size-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Size
              </label>
              <select
                id="size-select"
                className="w-full p-2 border rounded"
                defaultValue="Medium"
              >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>

            {/* Duration Selection */}
            <div>
              <label
                htmlFor="duration-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration
              </label>
              <select
                id="duration-select"
                className="w-full p-2 border rounded"
                defaultValue="30 minutes"
              >
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;
