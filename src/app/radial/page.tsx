'use client';

import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const TIME_LIMIT = 600; // 10 minutes
  const FULL_DASH_ARRAY = 2 * Math.PI * 180; // circumference for radius 180
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1 && intervalRef.current) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      const offset = FULL_DASH_ARRAY * (timeLeft / TIME_LIMIT);
      progressRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="relative w-[400px] h-[400px]">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            className="stroke-gray-700"
            cx="200"
            cy="200"
            r="180"
            fill="none"
            strokeWidth="20"
          />
          <circle
            ref={progressRef}
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="#00ff88"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={FULL_DASH_ARRAY}
            strokeDashoffset={0}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 text-5xl transform -translate-x-1/2 -translate-y-1/2">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
