import { lazy, type ComponentType } from "react";

export interface ModalComponentProps {
  onClose: () => void;
  [key: string]: unknown;
}

export interface ModalRegistryItem {
  component: React.LazyExoticComponent<ComponentType<any>>;
  kind: "dialog";
  fromParams: (params: Record<string, string>) => Record<string, unknown>;
}

export const modalRegistry: Record<string, ModalRegistryItem> = {
  share: {
    component: lazy(() => import("./contents/ShareModal")),
    kind: "dialog",
    fromParams: (p) => ({ productId: p.productId }),
  },
};
