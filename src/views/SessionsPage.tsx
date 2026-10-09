import SeatMap, { MOCK_SEAT_MAP } from "../components/organism/SeatMap";
import BuyTicket from "../utils/modals/contents/BuyTicket/BuyTicket";
import { openModal } from "../utils/modals/modalActions";

const SessionsPage = () => {
  return (
    <main className="flex flex-col gap-8 pt-40">
      {/* <SeatMap sections={MOCK_SEAT_MAP.data.sections} /> */}
      <button
        onClick={() => openModal("buyTicket", { ticketID: "42" })}
        className="text-white border border-white p-3 w-50 m-auto"
      >
        open modal
      </button>
      <BuyTicket />
    </main>
  );
};

export default SessionsPage;
