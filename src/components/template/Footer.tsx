import { Logo } from "@/components/atoms/Logo";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full h-24.5 flex flex-col gap-5 px-8.5 pt-6.75 pb-8.5">
      <Separator className="bg-background-tint" />
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <p className="font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
          © 2026 Kino XII. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
