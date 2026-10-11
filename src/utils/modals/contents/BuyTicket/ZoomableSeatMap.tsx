import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const MIN_SCALE = 0.5;
const MAX_SCALE = 1.5;
const STEP = 0.1;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const ZoomableSeatMap = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [fitScale, setFitScale] = useState(1);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [manualScale, setManualScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const measure = () => {
      const w = content.offsetWidth;
      const h = content.offsetHeight;
      setSize({ w, h });
      if (w > 0) {
        const widthScale = container.clientWidth / w;
        const heightScale = container.clientHeight / h;

        setFitScale(clamp(Math.min(widthScale, heightScale, 1), MIN_SCALE, 1));
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(content);
    return () => ro.disconnect();
  }, []);

  const scale = manualScale ?? fitScale;

  const zoom = (delta: number) =>
    setManualScale(clamp(scale + delta, MIN_SCALE, MAX_SCALE));

  const btn = [
    "flex size-8 cursor-pointer items-center justify-center text-white transition-colors",
    "hover:bg-white/10 active:bg-white/20",
    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
  ].join(" ");

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col gap-1">
      <div
        role="group"
        aria-label="Zoom controls"
        className="absolute right-4 top-2 z-10 flex flex-col items-center divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-background-tint/90 shadow-lg backdrop-blur-sm"
      >
        <button
          type="button"
          className={btn}
          onClick={() => zoom(STEP)}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>

        <span
          aria-live="polite"
          className="w-full py-1 text-center text-[10px] font-semibold tabular-nums text-muted"
        >
          {Math.round(scale * 100)}%
        </span>

        <button
          type="button"
          className={btn}
          onClick={() => zoom(-STEP)}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>

        <button
          type="button"
          className={`${btn} text-[10px] font-bold`}
          onClick={() => setManualScale(null)}
          aria-label="Fit to view"
        >
          FIT
        </button>
      </div>

      <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-lg">
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-auto scrollbar-thin"
        >
          <div
            className="mx-auto"
            style={{
              width: size.w * scale,
              height: size.h * scale,
            }}
          >
            <div
              ref={contentRef}
              className="w-max"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomableSeatMap;
