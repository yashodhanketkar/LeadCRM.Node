import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainRouter } from "./lib/router";

const App = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />
      <MainRouter />
      <Footer />
    </div>
  );
};

export default App;
