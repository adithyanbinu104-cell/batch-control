"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

/**
 * The live session is three hours long. The demo starts 23 seconds into that
 * session so the first render matches the 02:59:37 reference state.
 */
const SESSION_DURATION_SECONDS = 3 * 60 * 60;
const INITIAL_OFFSET_SECONDS = 23;
const INITIAL_SECONDS = SESSION_DURATION_SECONDS - INITIAL_OFFSET_SECONDS;

type TimeUnitProps = {
  value: string;
  label: string;
};

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center">
      <span className="font-display text-[1.9rem] leading-none font-semibold tracking-[-0.05em] text-white tabular-nums sm:text-[2.55rem] lg:text-[2.3rem] xl:text-[2.8rem]">
        {value}
      </span>
      <span className="mt-1.5 text-[8px] leading-none font-bold tracking-[0.24em] text-neon uppercase sm:mt-2 sm:text-[9px] sm:tracking-[0.28em]">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const timeout = window.setTimeout(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [secondsLeft]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (value: number) => value.toString().padStart(2, "0");

  return (
    <section
      aria-label="Session countdown"
      className="timer-shell ml-auto w-full max-w-[560px] rounded-[22px] border border-neon/45 p-4 sm:p-5 lg:p-4 xl:p-5"
    >
      <div className="flex items-center gap-3 sm:gap-5 lg:gap-4 xl:gap-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-neon/30 bg-neon/[0.075] text-neon shadow-[inset_0_0_14px_rgba(0,229,255,0.07)] sm:h-12 sm:w-12 sm:rounded-[14px]">
          <Clock3 className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.7} aria-hidden="true" />
        </div>

        <div
          role="timer"
          aria-live="off"
          aria-label={`${hours} hours, ${minutes} minutes and ${seconds} seconds remaining`}
          className="flex min-w-0 flex-1 items-center justify-between"
        >
          <TimeUnit value={pad(hours)} label="Hr" />

          <span
            aria-hidden="true"
            className="mx-1 h-9 w-px shrink-0 bg-gradient-to-b from-transparent via-neon/30 to-transparent sm:mx-2 sm:h-11"
          />

          <TimeUnit value={pad(minutes)} label="Min" />

          <span
            aria-hidden="true"
            className="mx-1 h-9 w-px shrink-0 bg-gradient-to-b from-transparent via-neon/30 to-transparent sm:mx-2 sm:h-11"
          />

          <TimeUnit value={pad(seconds)} label="Sec" />
        </div>
      </div>
    </section>
  );
}
