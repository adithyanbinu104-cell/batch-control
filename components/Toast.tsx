"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 3600);
    return () => window.clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[360px]">
      <div
        role="status"
        aria-live="polite"
        className="toast-enter relative overflow-hidden rounded-2xl border border-neon/35 bg-[#002039]/[0.97] shadow-[0_22px_65px_rgba(0,0,0,0.6),0_0_42px_rgba(0,229,255,0.1)] backdrop-blur-xl"
      >
        <div className="flex items-start gap-3 px-4 py-3.5 pr-11">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-neon"
            strokeWidth={1.9}
            aria-hidden="true"
          />
          <p className="text-[12.5px] leading-relaxed font-medium text-[#e1f1f8]">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="absolute top-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-lg text-[#6f93a8] transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <div className="h-px bg-neon/10">
          <div className="toast-progress h-px bg-neon/70" />
        </div>
      </div>
    </div>
  );
}
