import Slider from "./components/organism/Slider";
import { Header } from "./components/template/Header/Header";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Slider />
      </main>
    </div>
  );
}

export default App;
