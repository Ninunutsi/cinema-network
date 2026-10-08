type LogoProps = {
  size?: "sm" | "md" | "lg";
};

export const Logo = ({ size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-1.5">
      <h2
        className={`font-sans font-extrabold leading-none text-white ${sizeClasses[size]}`}
      >
        KINO
      </h2>

      <h2
        className={`font-sans font-extrabold leading-none text-danger ${sizeClasses[size]}`}
      >
        XII
      </h2>
    </div>
  );
};
