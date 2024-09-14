import { useEffect, useState } from "react";

export const useTheme = () => {
  const initialTheme = "light";
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    setTheme(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => e.matches && setTheme("dark"));
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => e.matches && setTheme("light"));
  }, []);
  return theme;
};
