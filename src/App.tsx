import NowPlaying from "./components/organism/NowPlaying";
import Slider from "./components/organism/Slider";
import { Header } from "./components/template/Header/Header";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="flex flex-col gap-8">
        <Slider />
        <NowPlaying />
      </main>
    </div>
  );
}

export default App;
