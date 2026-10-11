import { Suspense } from "react";
import { useModalStore } from "@/store/modalStore";
import { modalRegistry } from "./ModalRegistry";
import { closeModal, syncStackToHistory } from "./modalActions";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "cn";
import { useMountEffect } from "@/hooks/useMountEffect";

export function ModalManager() {
  const stack = useModalStore((s) => s.stack);

  useMountEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("buyTicket");

    if (sessionId && /^\d+$/.test(sessionId)) {
      const { stack, push } = useModalStore.getState();

      if (!stack.some((entry) => entry.key === "buyTicket")) {
        const params = { sessionId };
        const meta = modalRegistry.buyTicket;

        window.history.replaceState(
          {
            ...window.history.state,
            modal: true,
            depth: 1,
          },
          "",
          url.toString(),
        );

        push({
          key: "buyTicket",
          urlParams: params,
          props: meta.fromParams(params),
        });
      }
    }

    const handlePopState = (event: PopStateEvent) => {
      syncStackToHistory(event.state);
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
              showCloseButton={meta.showCloseButton}
              closeButtonClassName="top-4 right-4 cursor-pointer"
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
