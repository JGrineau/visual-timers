import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Timer, LineChart, Circle, Clock, HomeIcon, X } from "lucide-react";
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function MobileMenu({ open, setOpen }: Props) {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      setAnimateIn(false);
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 pointer-events-auto ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-in Panel */}
      <div
        className={`absolute top-0 left-0 h-full w-64 bg-background text-text p-4 pt-20 transform transition-transform duration-300 pointer-events-auto z-50 ${
          animateIn ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 left-4 z-[99999] lg:hidden p-1 transition"
          onClick={() => {
            setOpen(false);
          }}
          aria-label="Close menu"
        >
          <X size={28} className="text-text" />
        </button>

        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-2 p-2"
          >
            <HomeIcon size={20} />
            <span>Home</span>
          </Link>
          <Link
            href="/pomodoro"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-2 p-2"
          >
            <Timer size={20} />
            <span>Pomodoro</span>
          </Link>
          <Link
            href="/linear"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-2 p-2"
          >
            <LineChart size={20} />
            <span>Linear</span>
          </Link>
          <Link
            href="/radial"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-2 p-2"
          >
            <Circle size={20} />
            <span>Radial</span>
          </Link>
          <Link
            href="/custom"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-2 p-2"
          >
            <Clock size={20} />
            <span>Custom</span>
          </Link>
        </nav>
      </div>
    </div>,
    document.body
  );
}
