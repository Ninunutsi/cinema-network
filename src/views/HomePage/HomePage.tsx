import NowPlaying from "./components/NowPlaying";

import Slider from "./components/slider/Slider";
import { Separator } from "../../components/ui/separator";
import ComingSoon from "./components/ComingSoon";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-8">
      <Slider />
      <NowPlaying />
      <Separator className="bg-background-tint" />
      <ComingSoon />
    </main>
  );
};

export default HomePage;
