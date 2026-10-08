import { create } from "zustand";

export interface ModalEntry {
  id: string;
  key: string;
  props?: Record<string, unknown>;
  urlParams?: Record<string, string>;
}

interface ModalState {
  stack: ModalEntry[];
  push: (entry: Omit<ModalEntry, "id">) => string;
  popById: (id: string) => void;
  closeAll: () => void;
  setStack: (stack: ModalEntry[]) => void;
}

let counter = 0;
const nextId = () => `modal_${Date.now()}_${counter++}`;

export const useModalStore = create<ModalState>((set) => ({
  stack: [],
  push: (entry) => {
    const id = nextId();
    set((s) => ({ stack: [...s.stack, { ...entry, id }] }));
    return id;
  },
  popById: (id) => set((s) => ({ stack: s.stack.filter((m) => m.id !== id) })),
  closeAll: () => set({ stack: [] }),
  setStack: (stack) => set({ stack }),
}));
