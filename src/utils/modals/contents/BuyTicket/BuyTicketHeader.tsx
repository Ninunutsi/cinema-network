const BuyTicketHeader = () => {
  return (
    <header className="flex justify-between items-center ">
      <div className="flex flex-col gap-2">
        <h2 className="font-sans text-xl font-extrabold leading-none tracking-normal text-white">
          THE ODYSSEY
        </h2>
        <p className="font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
          Galleria Tbilisi · Hall B · Tuesday 15 September · 16:30 · Standard ·
          Original + Subtitles
        </p>
      </div>
      <div className="w-25.5 h-11.5 rounded-xl flex flex-col items-center justify-center gap-0.5 px-3.5 py-2 bg-background-tint">
        <p className="font-sans text-xs font-semibold leading-none tracking-normal text-muted">
          SEATS HELD
        </p>
        <p className="font-sans text-sm font-extrabold leading-none tracking-normal text-white">
          7:48
        </p>
      </div>
    </header>
  );
};

export default BuyTicketHeader;
