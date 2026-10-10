import { useCallback, useState } from "react";
import { useAuthStore } from "../../features/auth/store/authStore";
import { Logo } from "../atoms/Logo";
import { Profile } from "../molecules/Profile";
import { Button } from "../ui/button";
import { openModal } from "../../utils/modals/modalActions";
import { SearchPopover } from "../molecules/SearchPopever";

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const lockScroll = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || !isSearchOpen) return;

      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previous;
      };
    },
    [isSearchOpen],
  );

  return (
    <>
      <div
        ref={lockScroll}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 motion-reduce:transition-none ${
          isSearchOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between bg-[linear-gradient(180deg,#000000_-212.35%,rgba(0,0,0,0.51)_32.09%,rgba(0,0,0,0)_93.93%)] px-15 pt-7.5 pb-10">
        <div className="flex items-center gap-8">
          <Logo />
          <p className="cursor-pointer font-sans text-xs font-semibold leading-none uppercase tracking-wide text-white">
            sessions
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div role="search">
            <SearchPopover
              setIsSearchOpen={setIsSearchOpen}
              isSearchOpen={isSearchOpen}
            />
          </div>

          {isAuthenticated ? (
            <Profile />
          ) : (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => openModal("AuthModal", { mode: "signup" })}
                className="h-10 w-24 cursor-pointer rounded-full bg-danger px-5.5 py-3 font-sans text-sm font-extrabold leading-none text-white hover:bg-danger"
              >
                Sign Up
              </Button>

              <Button
                onClick={() => openModal("AuthModal", { mode: "login" })}
                className="h-10 w-24 cursor-pointer rounded-full bg-white px-5.5 py-3 font-sans text-sm font-extrabold leading-none text-background hover:bg-white"
              >
                Log In
              </Button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
