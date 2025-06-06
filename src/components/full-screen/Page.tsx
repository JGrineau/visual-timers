'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';

type FullscreenTimerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FullscreenTimer({ children, className }: FullscreenTimerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef<HTMLDivElement | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && timerRef.current) {
      timerRef.current.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={timerRef}
        className={`relative flex justify-center items-center ${
    isFullscreen ? 'w-screen h-screen' : ''
        } ${className ?? ''}`}
      >
        {children}
      </div>

     {!isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-10 right-10 p-4 bg-white text-black rounded-full shadow-md hover:bg-gray-100 hover:scale-110"
          aria-label="Enter Fullscreen"
        >
          <Maximize size={24} />
        </button>
      )}

      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded flex items-center justify-center"
          aria-label="Exit Fullscreen"
        >
          <Minimize size={24} />
        </button>
      )}
    </div>
  );
}
