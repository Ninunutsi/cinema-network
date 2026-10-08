import { Suspense } from "react";
import { useModalStore } from "../../store/modalStore";
import { modalRegistry } from "./ModalRegistry";
import { closeModal } from "./modalActions";
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";

export function ModalManager() {
  const stack = useModalStore((s) => s.stack);

  return (
    <>
      {stack.map((entry) => {
        const meta = modalRegistry[entry.key];
        if (!meta) return null;

        const Component = meta.component;
        const onClose = () => closeModal(entry.id);
        const body = (
          <Suspense
            fallback={
              <div className="p-6 text-sm text-muted-foreground">Loading…</div>
            }
          >
            <Component {...entry.props} onClose={onClose} />
          </Suspense>
        );

        return (
          <Dialog
            key={entry.id}
            open
            onOpenChange={(open) => !open && onClose()}
          >
            <DialogContent className="bg-background">
              <DialogTitle className="sr-only">{entry.key}</DialogTitle>
              {body}
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
}
