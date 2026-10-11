import { useModalStore } from "../../store/modalStore";
import { modalRegistry } from "./ModalRegistry";

type ModalHistoryState = {
  modal?: boolean;
  depth?: number;
} | null;

const closing = new Set<string>();

export function openModal(
  key: keyof typeof modalRegistry & string,
  params: Record<string, string> = {},
) {
  const meta = modalRegistry[key];
  if (!meta) return;

  const { stack, push } = useModalStore.getState();
  const top = stack[stack.length - 1];

  if (
    top?.key === key &&
    JSON.stringify(top.urlParams) === JSON.stringify(params)
  ) {
    return;
  }

  const depth = stack.length + 1;

  window.history.pushState({ modal: true, depth }, "", window.location.href);

  push({
    key,
    urlParams: params,
    props: meta.fromParams(params),
  });
}

export function switchTopModal(
  key: keyof typeof modalRegistry & string,
  params: Record<string, string> = {},
) {
  const meta = modalRegistry[key];
  if (!meta) return;

  const { stack, setStack } = useModalStore.getState();
  const top = stack[stack.length - 1];

  if (!top) {
    openModal(key, params);
    return;
  }

  setStack([
    ...stack.slice(0, -1),
    {
      ...top,
      key,
      urlParams: params,
      props: meta.fromParams(params),
    },
  ]);

  window.history.replaceState(
    { modal: true, depth: stack.length },
    "",
    window.location.href,
  );
}

export function closeModal(id: string) {
  const modal = useModalStore.getState().stack.find((entry) => entry.id === id);

  if (!modal || closing.has(id)) return;

  if (window.history.state?.modal) {
    closing.add(id);
    window.history.back();
    return;
  }

  useModalStore.getState().popById(id);
}

export function syncStackToHistory(state: ModalHistoryState) {
  const depth = state?.modal ? (state.depth ?? 1) : 0;

  closing.clear();

  const { stack, popById } = useModalStore.getState();

  stack.slice(depth).forEach((entry) => {
    popById(entry.id);
  });
}

export function dismissTopModal() {
  const { stack, popById } = useModalStore.getState();
  const top = stack[stack.length - 1];

  if (top) popById(top.id);
}
