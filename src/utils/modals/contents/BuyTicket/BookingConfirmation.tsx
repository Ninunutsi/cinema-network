import { Check } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import TicketCard from "../../../../components/molecules/TicketCard";

const BookingConfirmation = () => {
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className=" flex flex-col gap-4.5">
        <div className="flex items-center justify-center flex-col gap-4 w-91.25 m-auto">
          <div className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-[28px] p-4 bg-success">
            <Check className="text-white" />
          </div>
          <div className="flex flex-col gap-2.5">
            <h1 className="font-sans text-2xl font-extrabold leading-none tracking-normal text-center text-white">
              Booking confirmed!
            </h1>
            <p className="font-sans text-sm font-normal leading-[130%] tracking-normal text-center text-muted">
              Your tickets are ready. We've sent the confirmation to your email.
            </p>
          </div>
          <div className="w-47.5 h-6.5 rounded-full bg-surface-secondary font-sans text-xs font-semibold leading-none tracking-normal flex justify-center items-center text-white">
            ORDER #KX-48291
          </div>
        </div>
        <TicketCard
          className="m-auto w-168.25 rounded-xl p-5"
          posterSrc="/posters/the-odyssey.jpg"
          title="THE ODYSSEY"
          subtitle="Galleria Tbilisi · Hall B · Tue 15 Sep · 16:30"
          details={[
            { label: "Seats", value: "B3, B4, B5" },
            { label: "Tickets", value: "2 x Adult, 1 x Child" },
          ]}
          footer={
            <div className="flex items-center justify-between">
              <p className="font-sans text-xs font-normal leading-[130%] text-muted">
                TOTAL PAID
              </p>
              <p className="font-sans text-lg font-semibold leading-none text-white">
                ₾ 32
              </p>
            </div>
          }
        />
      </div>
      <div className="flex gap-3 justify-center items-center">
        <Button className="flex cursor-pointer h-10.25 w-38.5 items-center justify-center gap-0.5 rounded-full bg-danger px-3.25 font-sans text-sm font-extrabold leading-none tracking-normal text-white hover:bg-danger">
          View my tickets
        </Button>
        <Button className="flex cursor-pointer h-10.25 w-38.5 items-center justify-center gap-0.5 rounded-full bg-background-tint px-3.25 font-sans text-sm font-extrabold leading-none tracking-normal text-white hover:bg-background-tint">
          View my tickets
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
