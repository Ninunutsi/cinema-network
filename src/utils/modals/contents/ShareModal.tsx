import { Button } from "../../../components/ui/button";
import { openModal } from "../modalActions";

export default function ShareModal({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Share product {productId}</h2>
      <Button onClick={() => openModal("comments", { productId })}>
        View comments
      </Button>
      <Button variant="outline" onClick={onClose}>
        Done
      </Button>
    </div>
  );
}
