import { Search } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { Input } from "../atoms/Input";
import { Logo } from "../atoms/Logo";
import { Profile } from "../molecules/Profile";
import { Button } from "../ui/button";
import { openModal } from "../../utils/modals/modalActions";

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className=" absolute inset-x-0 top-0 z-50 flex items-center justify-between bg-[linear-gradient(180deg,#000000_-212.35%,rgba(0,0,0,0.51)_32.09%,rgba(0,0,0,0)_93.93%)] px-15 pt-7.5 pb-10">
      <div className="flex gap-8 items-center">
        <Logo />
        <p className="font-sans text-xs font-semibold leading-none uppercase tracking-wide text-white cursor-pointer">
          sessions
        </p>
      </div>
      <div className="flex items-center gap-8">
        <Input
          placeholder="Search films and live events"
          className="text-white bg-background-tint w-94 placeholder:text-white"
          startIcon={<Search className="size-4 text-white" />}
        />
        {isAuthenticated ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-3">
            <Button className="cursor-pointer  flex h-10 w-24 items-center gap-1 rounded-full px-5.5 py-3 font-sans text-sm font-extrabold leading-none bg-danger hover:bg-danger text-white">
              Sign Up
            </Button>
            <Button
              onClick={() => openModal("share", { productId: "42" })}
              className="cursor-pointer flex h-10 w-24 items-center gap-1 rounded-full px-5.5 py-3 font-sans text-sm font-extrabold leading-none bg-white hover:bg-white text-background"
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
