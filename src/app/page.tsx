"use client";

import React from "react";
import YouTubeEmbed from "@/components/youtube-embed/Page";
import AutoVideoSlider from "@/components/auto-video-slider/Page";

import "../app/globals.css";

export default function Page() {
  return (
    <div className="flex min-h-screen mx-auto">
      <div className="flex-1 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-4">
        <h1 className="text-3xl font-extrabold text-(--text-color) mb-8 text-center mt-18 md:text-4xl lg:text-6xl ">
          Visual Timers
        </h1>

        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center md:text-2xl lg:text-4xl">
          Welcome to the Visual Timers application
        </h2>
        <p className="text-center text-md m-2 px-4 mt-2 md:text-lg lg:text-xl text-gray-600">
          This is a Next.js application designed to help you visualize time
          through various timer components.
          <br />
          You can explore different timer types and their functionalities. Check
          out my YouTube page where I upload custom timers and visualizations.
        </p>

        <h1 className="text-lg font-bold mb-4 text-center md:text-2xl lg:text-4xl mt-5">
          Featured Video Of The Day
        </h1>
        <div className="flex justify-center mb-8 m-4">
          <YouTubeEmbed url="https://www.youtube.com/watch?v=Fu4q274II08&t=75s" />
        </div>
        <div className="flex justify-center">
          <AutoVideoSlider />
        </div>
      </div>
    </div>
  );
}
