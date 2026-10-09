import { lazy, type ComponentType } from "react";

export interface ModalComponentProps {
  onClose: () => void;
  [key: string]: unknown;
}

export interface ModalRegistryItem {
  component: React.LazyExoticComponent<ComponentType<any>>;
  kind: "dialog";
  fromParams: (params: Record<string, string>) => Record<string, unknown>;
  className?: string;
}

export const modalRegistry: Record<string, ModalRegistryItem> = {
  AuthModal: {
    component: lazy(() => import("./contents/AuthModal")),
    kind: "dialog",
    fromParams: (p) => ({ mode: p.mode === "signup" ? "signup" : "login" }),
  },
  buyTicket: {
    component: lazy(() => import("./contents/BuyTicket/BuyTicket")),
    kind: "dialog",
    fromParams: (p) => ({ ticketID: p.ticketID }),
    // className: "w-fit sm:max-w-none",
  },
};
