"use client";

import { type FormEvent, useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import type { DashboardContent } from "@/lib/dashboard";

type EditDashboardModalProps = {
  open: boolean;
  content: DashboardContent;
  onClose: () => void;
  onSave: (content: DashboardContent) => void;
};

const inputClasses =
  "w-full rounded-xl border border-[#124763] bg-[#001c36] px-3.5 py-3 text-sm text-white placeholder:text-[#5e8199] transition-colors duration-200 focus:border-neon/70 focus:bg-[#001f3c] focus:outline-none focus:ring-2 focus:ring-neon/10";

const labelClasses =
  "mb-2 block text-[9px] font-semibold tracking-[0.2em] text-[#7eabc2] uppercase";

export function EditDashboardModal({
  open,
  content,
  onClose,
  onSave,
}: EditDashboardModalProps) {
  const [form, setForm] = useState<DashboardContent>(content);

  useEffect(() => {
    if (open) {
      setForm(content);
    }
  }, [open, content]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const updateField = (field: keyof DashboardContent, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave({
      courseTitle: form.courseTitle.trim(),
      welcomeText: form.welcomeText.trim(),
      heading: form.heading.trim(),
      description: form.description.trim(),
      activeBatchName: form.activeBatchName.trim(),
      completedBatchName: form.completedBatchName.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-dashboard-title"
        className="my-auto w-full max-w-[600px] overflow-hidden rounded-[24px] border border-[#0f5571] bg-[#00182e] shadow-[0_35px_100px_rgba(0,0,0,0.8),0_0_70px_rgba(0,229,255,0.07)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#0b3c55] px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-neon/30 bg-neon/[0.07] text-neon">
              <Pencil className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div>
              <h2
                id="edit-dashboard-title"
                className="font-display text-[17px] font-semibold tracking-[-0.01em] text-white"
              >
                Edit dashboard
              </h2>
              <p className="mt-1 text-[11px] text-[#7fa2b7]">
                Update the details shown on your control panel.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit dashboard"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.07] text-[#7e9db0] transition-colors hover:border-white/15 hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5 sm:px-6">
          <div>
            <label htmlFor="courseTitle" className={labelClasses}>
              Course title
            </label>
            <input
              id="courseTitle"
              value={form.courseTitle}
              onChange={(event) => updateField("courseTitle", event.target.value)}
              className={inputClasses}
              required
              maxLength={44}
              autoFocus
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="welcomeText" className={labelClasses}>
                Welcome label
              </label>
              <input
                id="welcomeText"
                value={form.welcomeText}
                onChange={(event) => updateField("welcomeText", event.target.value)}
                className={inputClasses}
                required
                maxLength={36}
              />
            </div>

            <div>
              <label htmlFor="heading" className={labelClasses}>
                Overview heading
              </label>
              <input
                id="heading"
                value={form.heading}
                onChange={(event) => updateField("heading", event.target.value)}
                className={inputClasses}
                required
                maxLength={36}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className={labelClasses}>
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              className={`${inputClasses} resize-none`}
              rows={3}
              required
              maxLength={140}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="activeBatchName" className={labelClasses}>
                Ongoing batch
              </label>
              <input
                id="activeBatchName"
                value={form.activeBatchName}
                onChange={(event) =>
                  updateField("activeBatchName", event.target.value)
                }
                className={inputClasses}
                required
                maxLength={24}
              />
            </div>

            <div>
              <label htmlFor="completedBatchName" className={labelClasses}>
                Completed batch
              </label>
              <input
                id="completedBatchName"
                value={form.completedBatchName}
                onChange={(event) =>
                  updateField("completedBatchName", event.target.value)
                }
                className={inputClasses}
                required
                maxLength={24}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2.5 border-t border-[#0b3c55] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-white/[0.09] px-5 text-xs font-semibold text-[#a8c2d2] transition-colors hover:border-white/20 hover:bg-white/[0.035] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 rounded-xl bg-neon px-5 text-xs font-bold tracking-[0.03em] text-[#001329] shadow-[0_0_24px_rgba(0,229,255,0.2)] transition-all hover:bg-[#42edff] hover:shadow-[0_0_32px_rgba(0,229,255,0.3)]"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
