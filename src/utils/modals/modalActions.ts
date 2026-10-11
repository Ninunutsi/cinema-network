import { useModalStore } from "../../store/modalStore";
import { modalRegistry } from "./ModalRegistry";

export function openModal(
  key: keyof typeof modalRegistry & string,
  params: Record<string, string> = {},
) {
  const meta = modalRegistry[key];
  if (!meta) return;

  window.history.pushState(
    { modal: true, modalKey: key },
    "",
    window.location.href,
  );

  useModalStore.getState().push({
    key,
    urlParams: params,
    props: meta.fromParams(params),
  });
}

export function closeModal(id: string) {
  const stack = useModalStore.getState().stack;
  const modal = stack.find((entry) => entry.id === id);

  if (!modal) return;

  if (window.history.state?.modal) {
    window.history.back();
    return;
  }

  useModalStore.getState().popById(id);
}
