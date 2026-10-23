import { BatchDashboard } from "@/components/BatchDashboard";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-stretch justify-center overflow-hidden bg-void p-3 sm:p-5 lg:p-7 xl:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(0,161,199,0.13),transparent_65%),radial-gradient(ellipse_40%_40%_at_100%_100%,rgba(0,118,162,0.08),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-neon/[0.035] blur-[110px]"
      />

      <section className="dashboard-shell relative z-10 flex min-h-[calc(100svh-1.5rem)] w-full max-w-[1440px] flex-col overflow-hidden rounded-[26px] border border-[#0a455e]/75 sm:min-h-[calc(100svh-2.5rem)] sm:rounded-[30px] lg:min-h-[calc(100svh-3.5rem)] xl:min-h-[calc(100svh-5rem)] xl:rounded-[34px]">
        <BatchDashboard />
      </section>
    </main>
  );
}
