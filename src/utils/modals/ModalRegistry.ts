import type { ComponentType } from "react";
import AuthModal from "./contents/AuthModal";
import BuyTicket from "./contents/BuyTicket/BuyTicket";
import RefundConfirmationModal from "./contents/RefundConfirmationModal";

export interface ModalComponentProps {
  onClose: () => void;
  [key: string]: unknown;
}

export interface ModalRegistryItem {
  component: ComponentType<any>;
  kind: "dialog";
  fromParams: (params: Record<string, string>) => Record<string, unknown>;
  className?: string;
}

export const modalRegistry: Record<string, ModalRegistryItem> = {
  AuthModal: {
    component: AuthModal,
    kind: "dialog",
    fromParams: (p) => ({ mode: p.mode === "signup" ? "signup" : "login" }),
  },
  buyTicket: {
    component: BuyTicket,
    kind: "dialog",
    fromParams: (p) => ({ sessionId: Number(p.sessionId) }),
  },
  RefundConfirmationModal: {
    component: RefundConfirmationModal,
    kind: "dialog",
    fromParams: (p) => ({
      order: p.orderId,
      movieTitle: p.movieTitle ?? "this booking",
    }),
  },
};
