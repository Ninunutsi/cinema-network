import { Film, House, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFound = () => {
  return (
    <main className="relative flex min-h-[calc(100vh)] items-center justify-center overflow-hidden bg-background px-6 py-20">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-danger/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#070c1c_75%)]" />
      </div>

      <section className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        {/* Film icon */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-surface">
          <Film className="h-7 w-7 text-danger" strokeWidth={1.7} />
        </div>

        {/* Error code */}
        <div className="relative">
          <span className="select-none text-[clamp(8rem,25vw,14rem)] leading-[0.8] font-extrabold tracking-[-0.09em] text-danger">
            404
          </span>
          <span className="absolute -right-3 top-0 h-3 w-3 rounded-full bg-danger shadow-[0_0_24px_4px_rgba(236,48,19,0.45)]" />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            This scene is missing.
          </h1>

          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-base">
            Looks like this page didn’t make the final cut. It may have been
            moved, or the link might be incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link to="/">
            <Button className="h-12 rounded-xl bg-danger cursor-pointer px-6 font-semibold text-white hover:bg-danger/90 flex items center gap-2">
              <House className=" h-4 w-4" />
              Back to home
            </Button>
          </Link>

          <Link to="/sessions">
            <Button className="h-12 rounded-xl border-white/10 bg-surface cursor-pointer px-6 font-semibold text-white hover:bg-surface/90 flex items center gap-2">
              <Search className=" h-4 w-4" />
              Browse sessions
            </Button>
          </Link>
        </div>

        <p className="mt-12 text-xs font-medium tracking-[0.18em] text-subtle uppercase">
          Kino XII <span className="mx-2 text-danger">•</span> End of reel
        </p>
      </section>
    </main>
  );
};

export default NotFound;
