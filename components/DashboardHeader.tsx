"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Check, CheckCheck, Pencil, X } from "lucide-react";

type DashboardHeaderProps = {
  activeBatchName: string;
  completedBatchName: string;
  onEdit: () => void;
};

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};

function createNotifications(
  activeBatchName: string,
  completedBatchName: string,
): NotificationItem[] {
  return [
    {
      id: "attendance",
      title: "Attendance reminder",
      detail: `${activeBatchName} attendance closes in 30 minutes.`,
      time: "2m",
      unread: true,
    },
    {
      id: "submission",
      title: "New submission",
      detail: "A student submitted the Week 04 video edit.",
      time: "18m",
      unread: true,
    },
    {
      id: "completed",
      title: "Batch archived",
      detail: `${completedBatchName} has been marked as completed.`,
      time: "1d",
      unread: false,
    },
  ];
}

export function DashboardHeader({
  activeBatchName,
  completedBatchName,
  onEdit,
}: DashboardHeaderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    createNotifications(activeBatchName, completedBatchName),
  );
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationAreaRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((item) => item.unread).length;

  useEffect(() => {
    if (!isNotificationsOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        notificationAreaRef.current &&
        !notificationAreaRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNotificationsOpen]);

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false })),
    );
  };

  return (
    <>
      <header className="relative z-30 flex items-center px-4 pt-4 pb-4 sm:px-8 sm:pt-6 sm:pb-5 lg:px-10 xl:px-12">
        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-y-0">
          {/* Brand */}
          <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-2.5 sm:col-auto sm:row-auto sm:gap-3.5">
            <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[12px] bg-neon text-[#001329] shadow-[0_0_22px_rgba(0,229,255,0.3),inset_0_1px_0_rgba(255,255,255,0.45)] sm:h-[46px] sm:w-[46px] sm:rounded-[14px]">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent"
              />
              <svg
                viewBox="0 0 64 64"
                className="relative h-5 w-5 sm:h-6 sm:w-6"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M21 46V18h13.2c7.1 0 11.8 3.9 11.8 10.2 0 4.4-2.2 7.6-6.1 9.1L47.5 46h-8.2l-6.2-7.8h-4.8V46H21Zm7.3-14h5.3c3 0 4.8-1.4 4.8-3.9 0-2.5-1.8-3.8-4.8-3.8h-5.3V32Z" />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="font-display text-[16px] leading-none font-bold tracking-[0.15em] whitespace-nowrap text-white sm:text-[21px] xl:text-[23px]">
                ROOTME
              </p>
              <p className="mt-1 truncate text-[7px] leading-none font-semibold tracking-[0.18em] text-[#79a6bd] sm:mt-1.5 sm:text-[7px] sm:tracking-[0.25em] xl:text-[8px]">
                LEARNING MANAGEMENT
              </p>
            </div>
          </div>

          {/* Current batch */}
          <p className="col-span-2 row-start-2 justify-self-center whitespace-nowrap px-1 font-display text-[11px] leading-none font-semibold tracking-[0.16em] text-white sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:text-[15px] sm:tracking-[0.22em] lg:text-base">
            {activeBatchName.toUpperCase()}
          </p>

          {/* Actions */}
          <div
            ref={notificationAreaRef}
            className="relative col-start-2 row-start-1 flex items-center justify-self-end gap-1.5 sm:col-start-3 sm:gap-2.5"
          >
            <button
              type="button"
              onClick={onEdit}
              aria-label="Edit dashboard information"
              className="group flex h-10 items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-2.5 text-[11px] font-semibold text-[#b9d0df] transition-colors duration-200 hover:border-neon/35 hover:bg-neon/[0.06] hover:text-white sm:h-11 sm:px-3.5"
            >
              <Pencil
                className="h-3.5 w-3.5 text-[#8bb4ca] transition-colors group-hover:text-neon"
                strokeWidth={1.9}
                aria-hidden="true"
              />
              <span className="hidden md:inline">Edit</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNotificationsOpen((open) => !open)}
              aria-label={
                unreadCount > 0
                  ? `Notifications, ${unreadCount} unread`
                  : "Notifications"
              }
              aria-expanded={isNotificationsOpen}
              aria-controls="notifications-panel"
              className={`relative grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-200 sm:h-11 sm:w-11 ${
                isNotificationsOpen
                  ? "border-neon/45 bg-neon/[0.08] text-neon"
                  : "border-white/[0.09] bg-white/[0.025] text-[#a8c4d5] hover:border-neon/35 hover:bg-neon/[0.06] hover:text-white"
              }`}
            >
              <Bell className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" strokeWidth={1.9} aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="status-pulse absolute inline-flex h-full w-full rounded-full bg-neon" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon shadow-[0_0_8px_rgba(0,229,255,0.9)]" />
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div
                id="notifications-panel"
                className="absolute top-[calc(100%+12px)] right-0 z-50 w-[min(348px,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-[#10536e] bg-[#001a31]/[0.98] shadow-[0_24px_70px_rgba(0,0,0,0.65),0_0_40px_rgba(0,229,255,0.06)] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-[#0b3b54] px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm font-semibold text-white">Notifications</p>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-neon/10 px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-neon uppercase">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    aria-label="Close notifications"
                    className="grid h-7 w-7 place-items-center rounded-lg text-[#7499ae] transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                <ul className="max-h-[270px] overflow-y-auto">
                  {notifications.map((item) => (
                    <li key={item.id} className="border-b border-[#0a3047]/80 last:border-b-0">
                      <button
                        type="button"
                        onClick={() => markAsRead(item.id)}
                        className="group flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.035]"
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            item.unread
                              ? "bg-neon shadow-[0_0_7px_rgba(0,229,255,0.8)]"
                              : "bg-[#31566c]"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3">
                            <span className={`text-[12.5px] font-semibold ${item.unread ? "text-white" : "text-[#abc3d2]"}`}>
                              {item.title}
                            </span>
                            <span className="shrink-0 text-[9px] text-[#63869c]">{item.time}</span>
                          </span>
                          <span className="mt-1 block text-[11px] leading-relaxed text-[#7fa2b7]">
                            {item.detail}
                          </span>
                        </span>
                        {item.unread && (
                          <Check
                            className="mt-0.5 h-3 w-3 shrink-0 text-[#466f86] opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#0b3b54] p-2">
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-[#8eb4c9] uppercase transition-colors hover:bg-white/[0.04] hover:text-neon disabled:cursor-default disabled:opacity-40"
                  >
                    <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[#0b5471]/90 to-transparent sm:mx-8 lg:mx-10 xl:mx-12" />
    </>
  );
}
