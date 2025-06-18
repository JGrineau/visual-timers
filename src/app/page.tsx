"use client";

import React from "react";
import YouTubeEmbed from "@/components/YouTubeEmbed/Page";
import AutoVideoSlider from "@/components/AutoVideoSlider/Page";

import '../app/globals.css'; 

export default function Page() {
  

    return (
      <div className="flex min-h-screen">
        <div className="flex-1 bg-white p-8 m-8 overflow-auto">
            <h1 className="text-6xl font-extrabold text-(--text-color) mb-8 text-center">
    Hello Visual Timers!
  </h1>

  <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
    Welcome to the Visual Timers application
  </h2>
            <p className="text-center">
                This is a Next.js application designed to help you visualize time
                through various timer components.
                <br />
                
                You can explore different timer types
                and their functionalities.

                Check out my YouTube page where I upload custom timers and
                visualizations. 
            </p>

             <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Featured Video Of The Day</h1>
      <YouTubeEmbed url="https://www.youtube.com/watch?v=Fu4q274II08&t=75s" />
    </div>
    <AutoVideoSlider />

        </div>
        </div>
    );
}