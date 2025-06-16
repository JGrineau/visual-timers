import React, { useState, useEffect } from 'react';
import YouTubeEmbed from '../YouTubeEmbed/Page';
import { ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';

const videoList = [
  'https://www.youtube.com/watch?v=ka3dJSm37dk',
  'https://www.youtube.com/watch?v=jHy81Am8p6s',
  'https://www.youtube.com/watch?v=okUYFz68xU8',
  'https://www.youtube.com/watch?v=KhRk2bHZ-os&t=14s',
  'https://www.youtube.com/watch?v=QRRlWHNWAUo&t=6s',
  'https://www.youtube.com/watch?v=Fu4q274II08&t=11s',
  'https://www.youtube.com/watch?v=0NX1NiUFTZI&t=73s',
  'https://www.youtube.com/watch?v=6b6h_phRoKo',
  'https://www.youtube.com/watch?v=B9fu04BtzQM',

];

const ITEMS_PER_PAGE = 3;
const AUTO_ROTATE_INTERVAL = 10000; 

const AutoVideoSlider: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + ITEMS_PER_PAGE >= videoList.length ? 0 : prev + ITEMS_PER_PAGE
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval); 
  }, []);

  const visibleVideos = videoList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">More Timers</h2>

      <div className="flex items-center justify-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="p-2 text-gray-600 hover:text-black disabled:opacity-30 text-2xl"
        >
            <ArrowLeftCircle size={44} />
        </button>

        {/* 3 Video Thumbnails */}
        <div className="flex gap-4">
          {visibleVideos.map((url, index) => (
            <div key={index} className="w-94">
              <YouTubeEmbed url={url} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="p-2 text-gray-600 hover:text-black text-2xl"
        >
          <ArrowRightCircle size={44} />
        </button>
      </div>
    </div>
  );
};

export default AutoVideoSlider;
