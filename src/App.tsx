import NowPlaying from "./views/HomePage/components/NowPlaying";
import Footer from "./components/template/Footer";
import { Header } from "./components/template/Header";
import { Separator } from "./components/ui/separator";
import Slider from "./views/HomePage/components/slider/Slider";
import ComingSoon from "./views/HomePage/components/ComingSoon";

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
