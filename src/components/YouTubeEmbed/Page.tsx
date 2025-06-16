import React from 'react';

interface YouTubeEmbedProps {
  url: string; // Full YouTube URL like https://www.youtube.com/watch?v=abc123
}

const extractVideoId = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/.*(?:\?v=|\/embed\/|\/v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  const videoId = extractVideoId(url);

  if (!videoId) {
    return <p className="text-red-500">Invalid YouTube URL</p>;
  }

  return (
    <div className="w-full max-w-2xl aspect-video mx-auto">
      <iframe
        className="w-full h-full rounded-xl shadow-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
