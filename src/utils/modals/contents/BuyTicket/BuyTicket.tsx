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
      className="h-full min-h-0 w-180 min-w-0 shrink-0"
    >
      <TabsList className="w-full shrink-0 rounded-full bg-background-tint mb-6 p-0 group-data-horizontal/tabs:h-11">
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
              <div className="flex h-7.5 w-170 shrink-0 items-center justify-center gap-3.5 rounded-b-[20px] bg-background-tint px-5">
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
    <div className="flex h-149.75 w-286.5 max-w-full flex-col gap-8">
      <BuyTicketHeader />

      {/* the tabs and whatever sits next to them share this row */}
      <div className="flex min-h-0 flex-1 gap-8">
        <BuyTicketTabs />
        <div className="min-w-0 flex-1">
          {/* your other content (order summary, etc.) */}
        </div>
      </div>
    </div>
  );
};
export default BuyTicket;
