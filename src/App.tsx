import ComingSoon from "./components/organism/ComingSoon";
import NowPlaying from "./components/organism/NowPlaying";
import Slider from "./components/organism/Slider";
import Footer from "./components/template/Footer";
import { Header } from "./components/template/Header";
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
      <Footer />
    </div>
  );
}

export default App;
