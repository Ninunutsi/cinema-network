import { useModalStore } from "../../store/modalStore";
import { modalRegistry } from "./ModalRegistry";

export function openModal(
  key: keyof typeof modalRegistry & string,
  params: Record<string, string> = {},
) {
  const meta = modalRegistry[key];
  if (!meta) return;
  useModalStore.getState().push({
    key,
    urlParams: params,
    props: meta.fromParams(params),
  });
}

export function closeModal(id: string) {
  useModalStore.getState().popById(id);
}
