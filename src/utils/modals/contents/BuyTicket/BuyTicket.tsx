import SeatMap, {
  MOCK_SEAT_MAP,
} from "../../../../components/organism/SeatMap";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import SeatStatus from "../../../../components/atoms/SeatStatus";
import ZoomableSeatMap from "./ZoomableSeatMap";
import BuyTicketHeader from "./BuyTicketHeader";
import { Separator } from "../../../../components/ui/separator";
import SelectedSeat from "../../../../components/molecules/SelectedSeat";
import { Button } from "@base-ui/react";
import BookingConfirmation from "./BookingConfirmation";

const BuyTicketTabs = () => {
  const triggerClass = [
    "rounded-full px-4 h-full cursor-pointer",
    "font-sans text-xs font-semibold leading-none tracking-normal",
    "data-active:bg-danger data-active:text-white data-active:shadow-none",
    "dark:data-active:bg-danger dark:data-active:text-white dark:data-active:border-transparent",
  ].join(" ");

  return (
    <Tabs
      defaultValue="account"
      className="min-h-0 min-h-0 w-180 min-w-0 shrink-0"
    >
      <TabsList className="w-full shrink-0 rounded-full bg-surface mb-6 p-0 group-data-horizontal/tabs:h-11">
        <TabsTrigger value="account" className={triggerClass}>
          SEATS
        </TabsTrigger>
        <TabsTrigger value="password" className={triggerClass}>
          CHECKOUT
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="min-h-0 min-w-0">
        <div className="flex h-full min-h-0 flex-col gap-3">
          <ZoomableSeatMap>
            <div className="flex w-max flex-col items-center gap-8 p-2">
              <div className="flex h-7.5 w-170 shrink-0 items-center justify-center gap-3.5 rounded-b-[20px] bg-surface-secondary px-5">
                <p className="font-sans text-xs font-semibold leading-none tracking-normal text-white">
                  SCREEN
                </p>
              </div>
              <SeatMap sections={MOCK_SEAT_MAP.data.sections} />
            </div>
          </ZoomableSeatMap>

          <div className="flex shrink-0 items-center justify-center gap-6">
            <SeatStatus variant="available" />
            <SeatStatus variant="selected" />
            <SeatStatus variant="sold" />
            <SeatStatus variant="held" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="password" className="min-h-0 min-w-0">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
};

const BuyTicket = () => {
  return (
    <div className="flex h-auto min-h-150 w-276.5 max-w-full flex-col gap-8">
      {/* <BuyTicketHeader />

      <div className="flex min-h-0 flex-1 gap-8">
        <BuyTicketTabs />
        <Separator orientation="vertical" className="bg-background-tint" />
        <div className="min-w-0 flex-1 flex flex-col jus">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex h-87.75 shrink-0 flex-col gap-3">
              <p className="shrink-0 font-sans text-sm font-extrabold leading-none tracking-normal text-white">
                Your seats · Max 3
              </p>

              {false && (
                <p className="shrink-0 font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
                  Pick up to 3 seats from the map. Each seat can carry its own
                  ticket type.
                </p>
              )}

              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto pr-1 scrollbar-thin">
                <SelectedSeat />
                <SelectedSeat />
                <SelectedSeat />
                <SelectedSeat />
                <SelectedSeat />
                <SelectedSeat />
                <SelectedSeat />
                <SummaryTicket />
                const SummaryTicket = () => (
  <TicketCard
    className="w-80.25 rounded-2xl p-3.75"
    title="THE ODYSSEY"
    subtitle="Hall B · Tue 15 Sep · 16:30"
    details={[
      { label: "Seats", value: "B3, B4, B5" },
      { label: "Tickets", value: "2 x Adult, 1 x Child" },
    ]}
  />
);
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 pt-2.5">
              <div className="flex items-center justify-between px-1.25">
                <p className="font-sans text-xs font-semibold leading-none tracking-normal text-white">
                  SUBTOTAL
                </p>
                <h1 className="font-sans text-2xl font-extrabold leading-none tracking-normal text-white">
                  ₾ 32
                </h1>
              </div>
              <Button className="flex cursor-pointer h-10.25 w-full items-center justify-center gap-0.5 rounded-full bg-danger px-3.25 font-sans text-sm font-extrabold leading-none tracking-normal text-white">
                Next: Checkout
              </Button>
            </div>
          </div>
        </div>
      </div> */}
      <BookingConfirmation />
    </div>
  );
};
export default BuyTicket;
