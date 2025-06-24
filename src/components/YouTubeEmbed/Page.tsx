import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

type YouTubeEmbedProps = {
  url: string;
  onPlay?: () => void;
  onPause?: () => void;
};

function extractVideoId(url: string): string | null {
  // Simple regex for YouTube video ID extraction
  const match = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  url,
  onPlay,
  onPause,
}) => {
  const videoId = extractVideoId(url);

  if (!videoId) {
    return <p className="text-red-500">Invalid YouTube URL</p>;
  }

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="w-full max-w-xs aspect-video rounded-xl shadow-lg overflow-hidden mx-0">
      <YouTube
        className="w-full h-full"
        videoId={videoId}
        opts={opts}
        onPlay={onPlay}
        onPause={onPause}
      />
    </div>
  );
};

export default YouTubeEmbed;
