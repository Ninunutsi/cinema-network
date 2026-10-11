import { Suspense } from "react";
import { useModalStore } from "../../store/modalStore";
import { modalRegistry } from "./ModalRegistry";
import { closeModal } from "./modalActions";
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { cn } from "cn";
import { useMountEffect } from "../../hooks/useMountEffect";

export function ModalManager() {
  const stack = useModalStore((s) => s.stack);

  useMountEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.modal) return;

      const currentStack = useModalStore.getState().stack;

      if (currentStack.length > 0) {
        const topModal = currentStack[currentStack.length - 1];
        useModalStore.getState().popById(topModal.id);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return (
    <>
      {stack.map((entry) => {
        const meta = modalRegistry[entry.key];
        if (!meta) return null;

        const Component = meta.component;
        const onClose = () => closeModal(entry.id);

        return (
          <Dialog
            key={entry.id}
            open
            onOpenChange={(open) => !open && onClose()}
          >
            <DialogContent
              className={cn(
                "bg-background w-fit sm:max-w-none p-8",
                meta.className,
              )}
            >
              <DialogTitle className="sr-only">{entry.key}</DialogTitle>

              <Suspense
                fallback={
                  <div className="p-6 text-sm text-muted-foreground">
                    Loading…
                  </div>
                }
              >
                <Component {...entry.props} onClose={onClose} />
              </Suspense>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
}
