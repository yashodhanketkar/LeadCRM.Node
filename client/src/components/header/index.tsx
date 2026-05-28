import { NavBar } from "./nav";

export const Header = () => {
  return (
    <header className="bg-border text-white text-center p-2 container my-2 rounded-md mx-auto flex flex-row">
      <h1>Header</h1>
      <NavBar />
    </header>
  );
};
