import NowPlaying from "./components/NowPlaying";

import Slider from "./components/slider/Slider";
import { Separator } from "@/components/ui/separator";
import ComingSoon from "./components/ComingSoon";
import RecentlyViewed from "./components/RecentlyViewed";
import { useRecentlyViewed } from "./useRecentlyViewed";

const HomePage = () => {
  const { movies } = useRecentlyViewed();

  return (
    <main className="flex flex-col gap-8">
      <Slider />
      <RecentlyViewed />
      {movies.length > 0 && <Separator className="bg-background-tint" />}
      <NowPlaying />
      <Separator className="bg-background-tint" />
      <ComingSoon />
    </main>
  );
};

export default HomePage;
