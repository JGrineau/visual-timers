import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import "@/app/globals.css";

export default function Page() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleDark = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className=" sticky flex items-center gap-2 justify-end">
      <button
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        className="justify-end p-2 text-text transition-colors duration-300 cursor-pointer hover:scale-110"
      >
        {isDark ? <Sun /> : <MoonStar />}
      </button>
    </div>
  );
}
