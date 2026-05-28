import { themeStore } from "@/store/theme";
import { NavBar } from "./nav";
import { Moon } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center w-full px-4 py-2 mt-0 mb-4 sm:mt-4 container mx-auto border border-border/25 sm:rounded-lg bg-accent/5 hover:bg-accent/15 hover:shadow-lg shadow-accent/15">
      <h1>CRM - LM</h1>
      <NavBar />
      <ThemeToggle />
    </header>
  );
};

const ThemeToggle = () => {
  const { toggleTheme } = themeStore();
  return (
    <button
      onFocus={(e) => e.target.blur()}
      className="rounded-full ml-2 bg-transparent"
      onClick={toggleTheme}
    >
      <Moon className="size-5 fill-amber-500 stroke-amber-500" />
    </button>
  );
};
