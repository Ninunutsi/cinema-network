import SeatMap, { MOCK_SEAT_MAP } from "../components/organism/SeatMap";

const SessionsPage = () => {
  return (
    <main className="flex flex-col gap-8 pt-40">
      <SeatMap sections={MOCK_SEAT_MAP.data.sections} />
    </main>
  );
};

export default SessionsPage;
