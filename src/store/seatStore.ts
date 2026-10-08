import { create } from "zustand";

export const MAX_SEATS = 4;
let timer: ReturnType<typeof setTimeout> | undefined;

type SeatStore = {
  selectedIds: number[];
  limitReached: boolean;
  toggleSeat: (id: number) => void;
  reset: (ids?: number[]) => void;
};

export const useSeatStore = create<SeatStore>((set, get) => ({
  selectedIds: [],
  limitReached: false,

  toggleSeat: (id) => {
    const { selectedIds } = get();

    if (selectedIds.includes(id)) {
      clearTimeout(timer);
      set({
        selectedIds: selectedIds.filter((x) => x !== id),
        limitReached: false,
      });
      return;
    }

    if (selectedIds.length >= MAX_SEATS) {
      clearTimeout(timer);
      set({ limitReached: true });
      timer = setTimeout(() => set({ limitReached: false }), 3000);
      return;
    }

    set({ selectedIds: [...selectedIds, id] });
  },

  reset: (ids = []) => {
    clearTimeout(timer);
    set({ selectedIds: ids, limitReached: false });
  },
}));
