import { useLayoutEffect } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainRouter } from "./lib/router";

const App = () => {
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(localStorage.getItem("theme") || "light");
  }, []);

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />
      <MainRouter />
      <Footer />
    </div>
  );
};

export default App;
