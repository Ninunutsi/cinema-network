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
  fromParams: (params: Record<string, string>) => Record<string, unknown>;
  className?: string;
  showCloseButton?: boolean;
}

export const modalRegistry: Record<string, ModalRegistryItem> = {
  AuthModal: {
    component: AuthModal,
    fromParams: (p) => ({ mode: p.mode === "signup" ? "signup" : "login" }),
  },
  buyTicket: {
    component: BuyTicket,
    fromParams: (p) => ({ sessionId: Number(p.sessionId) }),
    showCloseButton: false,
  },
  RefundConfirmationModal: {
    component: RefundConfirmationModal,
    fromParams: (p) => ({
      order: p.orderId,
      movieTitle: p.movieTitle ?? "this booking",
    }),
  },
};
