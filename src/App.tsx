import ComingSoon from "./components/organism/ComingSoon";
import NowPlaying from "./components/organism/NowPlaying";
import Slider from "./components/organism/Slider";
import { Header } from "./components/template/Header/Header";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="flex flex-col gap-8">
        <Slider />
        <NowPlaying />
        <Separator className="bg-background-tint" />
        <ComingSoon />
      </main>
    </div>
  );
}

export default App;
