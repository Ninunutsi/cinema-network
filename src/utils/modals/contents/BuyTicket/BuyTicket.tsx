import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { Separator } from "../../../../components/ui/separator";
import { useCurrentUserQuery } from "../../../../api/queries/auth-queries";
import BookingConfirmation from "./BookingConfirmation";
import BuyTicketHeader from "../../../../components/molecules/BuyTicketHeader";
import CheckoutStep from "./CheckoutStep";
import HoldTimerChip from "../../../../components/atoms/HoldTimerChip";
import OrderSidebar from "./OrderSidebar";
import SeatsStep from "./SeatsStep";
import { useBuyTicketFlow } from "./hooks/useBuyTicketFlow";

const triggerClass = [
  "h-full cursor-pointer rounded-full px-4",
  "font-sans text-xs font-semibold leading-none tracking-normal",
  "data-active:bg-danger data-active:text-white data-active:shadow-none",
  "dark:data-active:border-transparent dark:data-active:bg-danger dark:data-active:text-white",
].join(" ");

interface BuyTicketProps {
  sessionId: number;
  onClose: () => void;
}

const BuyTicket = ({ sessionId }: BuyTicketProps) => {
  // const navigate = useNavigate();
  const { data: user } = useCurrentUserQuery();
  const flow = useBuyTicketFlow(sessionId);
  const { actions, hold, session } = flow;

  if (flow.order) {
    return (
      <BookingConfirmation
        order={flow.order}
        onClose={() => ""}
        onViewTickets={() => {
          // closeModal();
          // navigate("/my-tickets");
        }}
      />
    );
  }

  if (flow.isLoading) return <div className="text-white">Loading…</div>;
  if (flow.isError || !session || !flow.seatMap) {
    return <div className="text-white">Unable to load this session.</div>;
  }

  return (
    <div className="flex h-auto min-h-150 w-276.5 max-w-full flex-col gap-8">
      <BuyTicketHeader
        session={session}
        timer={
          hold && (
            <HoldTimerChip
              key={hold.holdId}
              seconds={hold.secondsRemaining}
              onExpire={actions.expireHold}
            />
          )
        }
      />

      <div className="flex min-h-0 flex-1 gap-8">
        <Tabs value={flow.step} className="min-h-0 w-180 min-w-0 shrink-0">
          <TabsList className="mb-6 w-full shrink-0 rounded-full bg-surface p-0 group-data-horizontal/tabs:h-11">
            <TabsTrigger value="seats" disabled className={triggerClass}>
              1. SEATS
            </TabsTrigger>
            <TabsTrigger value="checkout" disabled className={triggerClass}>
              2. CHECKOUT
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seats" className="min-h-0 min-w-0">
            <SeatsStep sections={flow.seatMap.sections} />
          </TabsContent>

          <TabsContent value="checkout" className="min-h-0 min-w-0">
            <CheckoutStep
              defaultValues={{
                fullName: user?.fullName ?? "",
                email: user?.email ?? "",
                mobileNumber: user?.mobileNumber ?? "",
              }}
              errors={flow.fieldErrors}
              isPaying={flow.isPaying}
              onFieldChange={actions.clearFieldError}
              onSubmit={actions.pay}
            />
          </TabsContent>
        </Tabs>

        <Separator orientation="vertical" className="bg-background-tint" />

        <OrderSidebar
          step={flow.step}
          seats={flow.seats}
          ticketOptions={flow.ticketOptions}
          hold={hold}
          subtotal={flow.subtotal}
          notice={flow.notice}
          canProceed={flow.canProceed}
          isHolding={flow.isHolding}
          onTicketTypeChange={actions.setTicketType}
          onRemoveSeat={actions.removeSeat}
          onProceed={actions.proceedToCheckout}
          onBack={actions.backToSeats}
          onDismissNotice={actions.dismissNotice}
        />
      </div>
    </div>
  );
};

export default BuyTicket;
