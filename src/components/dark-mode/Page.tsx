import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import "@/app/globals.css"; // Ensure your global styles are imported

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
    <div className="fixed top-4 right-4 z-30">
      <button onClick={toggleDark} aria-label="Toggle dark mode">
        {isDark ? <MoonStar /> : <Sun />}
      </button>
    </div>
  );
}
