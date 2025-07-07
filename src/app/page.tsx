"use client";

import React from "react";
import YouTubeEmbed from "@/components/youtube-embed/Page";
import AutoVideoSlider from "@/components/auto-video-slider/Page";

import "../app/globals.css";

export default function Page() {
  return (
    <div className="flex min-h-screen mx-auto">
      <div className="flex-1 bg-background scroll">
        <h1 className="text-3xl font-extrabold text-(--text-color) mb-8 text-center md:text-4xl lg:text-6xl ">
          Visual Timers
        </h1>

        <p className="text-center text-md m-2 px-4 mt-2 md:text-lg lg:text-xl text-(--text-color)">
          This is a Next.js application designed to help you visualize time
          through various timer components.
          <br />
          You can explore different timer types and their functionalities. Check
          out my
          <a
            href="https://www.youtube.com/@visual-timers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {" "}
            YouTube{" "}
          </a>
          page where I upload custom timers and visualizations.
        </p>

        <h3 className="text-lg font-bold mb-4 text-center md:text-xl lg:text-2xl mt-5">
          Featured Video Of The Day
        </h3>
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
