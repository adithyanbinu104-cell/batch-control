import { Clapperboard } from "lucide-react";
import type { DashboardContent } from "@/lib/dashboard";

type CourseOverviewProps = {
  content: Pick<
    DashboardContent,
    "courseTitle" | "welcomeText" | "heading" | "description"
  >;
};

export function CourseOverview({ content }: CourseOverviewProps) {
  return (
    <section
      aria-labelledby="batch-overview-heading"
      className="relative mx-auto w-full max-w-[580px] lg:mx-0"
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        <div className="relative shrink-0">
          <div className="grid h-[60px] w-[60px] place-items-center rounded-[18px] border border-neon/55 bg-neon/[0.045] shadow-[inset_0_0_22px_rgba(0,229,255,0.055),0_0_28px_rgba(0,229,255,0.08)] sm:h-[72px] sm:w-[72px] sm:rounded-[21px]">
            <Clapperboard
              className="h-7 w-7 text-neon sm:h-8 sm:w-8"
              strokeWidth={1.45}
              aria-hidden="true"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-neon shadow-[0_0_10px_rgba(0,229,255,0.85)]"
          />
        </div>

        <div className="min-w-0">
          <p className="text-[8px] font-semibold tracking-[0.28em] text-[#6f9cb4] uppercase sm:text-[9px] sm:tracking-[0.32em]">
            Course
          </p>
          <p className="mt-1.5 font-display text-[13px] leading-tight font-semibold tracking-[0.12em] text-white sm:text-[16px] sm:tracking-[0.14em] xl:text-[18px]">
            {content.courseTitle}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12 xl:mt-14">
        <p className="flex items-center gap-2.5 text-[11px] leading-none font-semibold tracking-[0.16em] text-neon sm:text-xs">
          <span
            aria-hidden="true"
            className="h-px w-5 bg-neon/70 shadow-[0_0_8px_rgba(0,229,255,0.55)] sm:w-6"
          />
          {content.welcomeText}
        </p>

        <h1
          id="batch-overview-heading"
          className="mt-4 max-w-[620px] font-display text-[clamp(2.4rem,5.3vw,4.35rem)] leading-[1.02] font-semibold tracking-[-0.055em] text-white sm:mt-5"
        >
          {content.heading}
        </h1>

        <p className="mt-4 max-w-[430px] text-[14px] leading-6 text-[#93b5cb] sm:mt-5 sm:text-[15px] sm:leading-7">
          {content.description}
        </p>
      </div>
    </section>
  );
}
