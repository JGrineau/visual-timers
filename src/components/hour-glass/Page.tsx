import React, { useEffect, useState } from 'react';

const Hourglass: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex justify-center items-center h-[300px] transition-transform duration-500 ${
        isFlipped ? 'rotate-180' : ''
      }`}
    >
      <div className="relative w-[100px] h-[200px]">
        {/* Top sand */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[20px] w-[60px] rounded-full bg-yellow-400 opacity-90 animate-emptyTop" />

        {/* Sand stream */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[80px] w-[8px] h-[40px] rounded-full bg-yellow-400 animate-streamFlow" />

        {/* Bottom sand */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[20px] w-[60px] rounded-full bg-yellow-400 opacity-90 animate-fillBottom" />
      </div>
    </div>
  );
};

export default Hourglass;
