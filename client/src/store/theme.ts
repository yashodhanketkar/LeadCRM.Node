import { create } from "zustand";

export type ThemeType = "light" | "dark";

type ThemeState = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const themeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem("theme") as ThemeType) || "light",

  toggleTheme: () => {
    const theme = localStorage.getItem("theme");
    document.documentElement.classList.remove("light", "dark");
    let newTheme: ThemeType;

    switch (theme) {
      case "light":
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
        newTheme = "dark";
        break;
      default:
        localStorage.setItem("theme", "light");
        document.documentElement.classList.add("light");
        newTheme = "light";
        break;
    }

    set({ theme: newTheme });
  },
}));
