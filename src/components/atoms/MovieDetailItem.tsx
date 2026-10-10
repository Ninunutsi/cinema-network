interface MovieDetailItemProps {
  label: string;
  value: string;
}

export const MovieDetailItem = ({ label, value }: MovieDetailItemProps) => {
  return (
    <div className="flex flex-col gap-1.75">
      <dt className="text-xs font-semibold leading-[100%] tracking-normal text-muted">
        {label}
      </dt>
      <dd className="text-sm font-semibold leading-[100%] tracking-normal">
        {value || "Not available"}
      </dd>
    </div>
  );
};
