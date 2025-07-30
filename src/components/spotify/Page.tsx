import React, { useState } from "react";

function PlaylistSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarStyle = {
    position: "fixed",
    top: "50%",
    right: isOpen ? "0" : "-260px", // partially off-screen when closed
    transform: "translateY(-50%)",
    transition: "right 0.3s ease-in-out",
    width: "300px",
    height: "400px",
    backgroundColor: "#1DB954", // Spotify green
    borderRadius: "12px 0 0 12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
    overflow: "hidden",
  };

  const toggleButtonStyle = {
    position: "absolute",
    left: "-40px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#191414", // dark background
    color: "#fff",
    border: "none",
    borderRadius: "6px 0 0 6px",
    padding: "8px",
    cursor: "pointer",
  };

  return (
    <div style={sidebarStyle}>
      <button onClick={() => setIsOpen(!isOpen)} style={toggleButtonStyle}>
        {isOpen ? "⮜" : "⮞"}
      </button>
      <iframe
        style={{
          border: "none",
          borderRadius: "12px",
          width: "100%",
          height: "100%",
        }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWYoYGBbGKurt?utm_source=generator"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default PlaylistSidebar;
