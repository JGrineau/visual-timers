import Link from 'next/link';
import { Timer, LineChart, Circle, Clock, HomeIcon, XCircle, Menu } from 'lucide-react';
import '../../app/globals.css';
import { createPortal } from 'react-dom';


export default function Page({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
    // setOpen toggles the menu open/close state by calling onClose when closing
    function setOpen(value: boolean) {
        if (!value) {
            onClose();
        }
    }

  return createPortal(
    <div className="fixed inset-0 bg-(--primary-color) text-white flex flex-col p-4 transition-all duration-300 pt-20">
        <button
                className="fixed top-4 left-4 z-99999 flex md:hidden bg-[var(--primary-color)] text-white p-2 rounded-full shadow-lg hover:bg-[var(--accent-color)] transition"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <XCircle size={24} /> : <Menu size={24} />}
              </button>
      <nav className="flex flex-col space-y-4">
        <Link href="/" onClick={onClose} className="flex items-center space-x-2 p-2 rounded transition"><HomeIcon size={20} /><span>Home</span></Link>
        <Link href="/pomodoro" onClick={onClose}  className="flex items-center space-x-2 p-2 rounded transition"><Timer size={20} /><span>Pomodoro</span></Link>
        <Link href="/linear" onClick={onClose}  className="flex items-center space-x-2 p-2 rounded transition"><LineChart size={20} /><span>Linear</span></Link>
        <Link href="/radial" onClick={onClose}  className="flex items-center space-x-2 p-2 rounded transition"><Circle size={20} /><span>Radial</span></Link>
        <Link href="/custom" onClick={onClose}  className="flex items-center space-x-2 p-2 rounded transition"><Clock size={20} /><span>Custom</span></Link>
      </nav>
    </div>,
    document.body
  );
}