import Slider from "../components/organism/Slider";
import NowPlaying from "../components/organism/NowPlaying";
import { Separator } from "@base-ui/react/separator";
import ComingSoon from "../components/organism/ComingSoon";

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
