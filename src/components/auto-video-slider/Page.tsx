import React, { useState, useEffect } from "react";
import YouTubeEmbed from "../youtube-embed/Page";
import { ArrowRightCircle, ArrowLeftCircle } from "lucide-react";

// Responsive hook
function useItemsPerPage() {
  const [items, setItems] = useState(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) setItems(1); // mobile
      else if (window.innerWidth < 1024) setItems(2); // tablet
      else setItems(3); // desktop
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return items;
}

const videoList = [
  "https://www.youtube.com/watch?v=ka3dJSm37dk",
  "https://www.youtube.com/watch?v=jHy81Am8p6s",
  "https://www.youtube.com/watch?v=okUYFz68xU8",
  "https://www.youtube.com/watch?v=KhRk2bHZ-os&t=14s",
  "https://www.youtube.com/watch?v=QRRlWHNWAUo&t=6s",
  "https://www.youtube.com/watch?v=Fu4q274II08&t=11s",
  "https://www.youtube.com/watch?v=0NX1NiUFTZI&t=73s",
  "https://www.youtube.com/watch?v=6b6h_phRoKo",
  "https://www.youtube.com/watch?v=B9fu04BtzQM",
];

const AUTO_ROTATE_INTERVAL = 10000;

const AutoVideoSlider: React.FC = () => {
  const itemsPerPage = useItemsPerPage();
  const [startIndex, setStartIndex] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);

  // handle slider pause on video interaction
  const handleVideoInteraction = () => {
    setSliderPaused(true);
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage >= videoList.length ? 0 : prev + itemsPerPage
    );
  };

  useEffect(() => {
    if (sliderPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [sliderPaused, itemsPerPage, startIndex]);

  const visibleVideos = videoList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">More Timers</h2>

      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-4">
        {/* Videos */}
        <div className="flex gap-2 sm:gap-4 justify-center">
          {visibleVideos.map((url, index) => (
            <div
              key={index}
              className="w-64 sm:w-80 aspect-video rounded-xl shadow-lg overflow-hidden"
            >
              <YouTubeEmbed url={url} onPlay={handleVideoInteraction} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-6 mt-4">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="p-2 text-text hover:scale-110 hover:cursor-pointer"
        >
          <ArrowLeftCircle size={34} />
        </button>
        <button
          onClick={handleNext}
          className="p-2 text-text hover:scale-110 hover:cursor-pointer"
        >
          <ArrowRightCircle size={34} />
        </button>
      </div>
    </div>
  );
};

export default AutoVideoSlider;
