import { useCallback, useSyncExternalStore } from "react";
import type { CarouselApi } from "../../components/ui/carousel";

export const useCarouselIndex = (api: CarouselApi | undefined): number => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {};

      const handleSelect = () => {
        api.plugins().autoplay?.reset();
        onStoreChange();
      };

      api.on("select", handleSelect);
      api.on("reInit", onStoreChange);

      return () => {
        api.off("select", handleSelect);
        api.off("reInit", onStoreChange);
      };
    },
    [api],
  );

  const getSnapshot = useCallback(() => api?.selectedScrollSnap() ?? 0, [api]);

  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
};
