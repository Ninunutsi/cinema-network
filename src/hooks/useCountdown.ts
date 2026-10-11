import { useRef, useState, useSyncExternalStore } from "react";

interface Timer {
  endAt: number;
  pausedMs: number | null;
}

interface UseCountdownOptions {
  onComplete?: () => void;
}

const TICK_MS = 250;
const noop = () => {};

const formatCountdown = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

const createTimer = (seconds: number): Timer => ({
  endAt: Date.now() + Math.max(0, seconds) * 1000,
  pausedMs: null,
});

export const useCountdown = (
  seconds: number,
  { onComplete }: UseCountdownOptions = {},
) => {
  const [timer, setTimer] = useState(() => createTimer(seconds));
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);

  const isPaused = timer.pausedMs !== null;

  const getSecondsLeft = () => {
    const ms = timer.pausedMs ?? Math.max(0, timer.endAt - Date.now());
    return Math.ceil(ms / 1000);
  };

  const subscribe = (notify: () => void) => {
    if (isPaused) return noop;

    const id = setInterval(() => {
      notify();

      if (Date.now() >= timer.endAt) {
        clearInterval(id);
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
      }
    }, TICK_MS);

    return () => clearInterval(id);
  };

  const secondsLeft = useSyncExternalStore(
    subscribe,
    getSecondsLeft,
    getSecondsLeft,
  );

  const pause = () => {
    if (isPaused || secondsLeft === 0) return;
    setTimer({ ...timer, pausedMs: Math.max(0, timer.endAt - Date.now()) });
  };

  const resume = () => {
    if (!isPaused) return;
    setTimer({ endAt: Date.now() + timer.pausedMs!, pausedMs: null });
  };

  const reset = (nextSeconds: number = seconds) => {
    completedRef.current = false;
    setTimer(createTimer(nextSeconds));
  };

  return {
    secondsLeft,
    minutes: Math.floor(secondsLeft / 60),
    seconds: secondsLeft % 60,
    formatted: formatCountdown(secondsLeft),
    isPaused,
    isComplete: secondsLeft === 0,
    pause,
    resume,
    reset,
  };
};
