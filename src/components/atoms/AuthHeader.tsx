const AuthHeader = ({ type }: { type: string }) => {
  return (
    <div className="h-11.5 flex flex-col gap-2">
      <h2 className="font-sans text-xl font-extrabold leading-none tracking-normal text-white">
        {type}
      </h2>
      <p className="font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
        Welcome back to Kino XII
      </p>
    </div>
  );
};

export default AuthHeader;
