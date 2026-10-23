import { ArrowUpRight, Check, Users } from "lucide-react";

type BatchStatusCardsProps = {
  activeBatchName: string;
  completedBatchName: string;
  onSelect: (batch: "active" | "completed") => void;
};

export function BatchStatusCards({
  activeBatchName,
  completedBatchName,
  onSelect,
}: BatchStatusCardsProps) {
  return (
    <section
      aria-label="Batch status"
      className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4"
    >
      {/* Active batch */}
      <button
        type="button"
        onClick={() => onSelect("active")}
        aria-label={`${activeBatchName}, ongoing. Open active batch.`}
        className="batch-card-active group relative flex min-h-[148px] flex-col justify-between overflow-hidden rounded-[20px] border border-neon/55 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-neon/90 hover:shadow-[0_0_42px_rgba(0,229,255,0.18),0_20px_44px_rgba(0,0,0,0.32)] focus-visible:-translate-y-0.5 sm:min-h-[168px] sm:p-[18px]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-neon/30 bg-neon/[0.09] text-neon shadow-[inset_0_0_14px_rgba(0,229,255,0.06)]">
            <Users className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <ArrowUpRight
            className="mt-1 h-4 w-4 text-neon/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <div className="mt-5">
          <p className="font-display text-[17px] leading-none font-semibold tracking-[-0.015em] text-white sm:text-[19px]">
            {activeBatchName}
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="status-pulse absolute inline-flex h-full w-full rounded-full bg-neon" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_7px_rgba(0,229,255,0.95)]" />
            </span>
            <span className="text-[10px] font-semibold tracking-[0.1em] text-[#7eeeff]">
              Ongoing
            </span>
          </div>
        </div>
      </button>

      {/* Completed batch */}
      <button
        type="button"
        onClick={() => onSelect("completed")}
        aria-label={`${completedBatchName}, completed. Open archived batch.`}
        className="batch-card-completed group relative flex min-h-[148px] flex-col justify-between overflow-hidden rounded-[20px] border border-[#17425e] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2b6688] focus-visible:-translate-y-0.5 sm:min-h-[168px] sm:p-[18px]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#1b4057] bg-[#0a2a43]/70 text-[#587a92]">
            <Users className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <ArrowUpRight
            className="mt-1 h-4 w-4 text-[#41667e] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#79a3ba]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <div className="mt-5">
          <p className="font-display text-[17px] leading-none font-semibold tracking-[-0.015em] text-[#c5d8e4]/85 sm:text-[19px]">
            {completedBatchName}
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <Check className="h-3 w-3 text-[#5d8198]" strokeWidth={2.2} aria-hidden="true" />
            <span className="text-[10px] font-semibold tracking-[0.1em] text-[#6d8fa4]">
              Completed
            </span>
          </div>
        </div>
      </button>
    </section>
  );
}
