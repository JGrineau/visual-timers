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

  // const toggleDark = () => {
  //   setIsDark(!isDark);
  //   document.documentElement.classList.toggle("dark", !isDark);
  // };

  return (
    <div className="fixed top-4 right-4 z-30">
      <button
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 hover:scale-110"
      >
        {isDark ? <Sun /> : <MoonStar />}
      </button>
    </div>
  );
}
